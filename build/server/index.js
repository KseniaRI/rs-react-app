import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useSearchParams, Meta, Links, Scripts, ScrollRestoration, Outlet, useNavigate, useOutletContext } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, createContext, useContext, useState, useEffect, Component } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component2) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component2, props);
  };
}
const ThemeContext = createContext(false);
const ThemeUpdateContext = createContext(() => {
});
function useTheme() {
  return useContext(ThemeContext);
}
function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}
function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("darkTheme");
      if (storedTheme) {
        setDarkTheme(JSON.parse(storedTheme));
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark", darkTheme);
      document.body.classList.toggle("light", !darkTheme);
    }
  }, [darkTheme]);
  const toggleTheme = () => {
    setDarkTheme((prev) => {
      const newTheme = !prev;
      localStorage.setItem("darkTheme", JSON.stringify(newTheme));
      return newTheme;
    });
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: darkTheme, children: /* @__PURE__ */ jsx(ThemeUpdateContext.Provider, { value: toggleTheme, children }) });
}
const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/"
  }),
  endpoints: (build) => ({
    planetsList: build.query({
      query({ page }) {
        return {
          url: "planets/",
          params: {
            page
          },
          method: "GET"
        };
      }
    }),
    planet: build.query({
      query({ name }) {
        return {
          url: "planets/",
          params: {
            search: name
          },
          method: "GET"
        };
      }
    })
  })
});
const { usePlanetsListQuery, usePlanetQuery } = apiSlice;
const initialState = {
  planets: [],
  isLoading: false,
  selectedPlanet: null,
  checkedPlanets: [],
  next: null,
  prev: null
};
const planetsSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {
    setPlanets: (state, action) => {
      state.planets = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setPagination(state, action) {
      state.next = action.payload.next;
      state.prev = action.payload.prev;
    },
    setSelectedPlanet: (state, action) => {
      state.selectedPlanet = action.payload;
    },
    setCheckedPlanets: (state, action) => {
      state.checkedPlanets = action.payload;
    }
  }
});
const {
  setPlanets,
  setPagination,
  setSelectedPlanet,
  setCheckedPlanets,
  setLoading
} = planetsSlice.actions;
const planetsReducer = planetsSlice.reducer;
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    planets: planetsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    console.log("/ ~ ErrorBoundary ~ getDerivedStateFromError ~ error:", error);
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log("/ ~ componentDidCatch ~ errorInfo:", errorInfo);
    console.log("/ ~ ErrorBoundary ~ componentDidCatch ~ error:", error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
const fallback = "_fallback_ooo2v_1";
const styles$8 = {
  fallback
};
const Fallback = () => {
  return /* @__PURE__ */ jsx("p", { className: styles$8.fallback, children: "ErrorBoundary message: Something went wrong" });
};
function Providers({ children }) {
  return /* @__PURE__ */ jsx(ErrorBoundary, { fallback: /* @__PURE__ */ jsx(Fallback, {}), children: /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(ThemeProvider, { children }) }) });
}
const useAppSelector = useSelector;
const useData = () => {
  const dispatch = useDispatch();
  const planets = useAppSelector((state) => state.planets.planets);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  const currentPage = Number(page);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const isSearchingByQuery = Boolean(searchQuery);
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrev, setLoadingPrev] = useState(false);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    dispatch(setLoading(true));
    localStorage.setItem("query", query);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({ page: "1" });
    }
  };
  const changeCurrentPage = (page2) => {
    if (planets) {
      const maxPages = Math.floor(60 / planets.length);
      if (page2 <= maxPages) {
        const updatedParams = new URLSearchParams(searchParams.toString());
        updatedParams.set("page", page2.toString());
        setSearchParams(updatedParams);
        if (page2 > currentPage) {
          setLoadingNext(true);
        } else {
          setLoadingPrev(true);
        }
      }
    }
  };
  const onQueryChange = (e) => {
    setQuery(e.target.value.trim());
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedQuery = localStorage.getItem("query");
      if (storedQuery) {
        setQuery(storedQuery);
        setSearchQuery(storedQuery);
      }
    }
  }, []);
  useEffect(() => {
    if (currentPage === 0 && !isSearchingByQuery) {
      setSearchParams({ page: "1" });
    }
  }, [currentPage, isSearchingByQuery, setSearchParams]);
  useEffect(() => {
    if (currentPage > 0) {
      setLoadingNext(false);
      setLoadingPrev(false);
    }
  }, [currentPage]);
  return {
    query,
    onQueryChange,
    onSearchSubmit,
    loadingNext,
    loadingPrev,
    changeCurrentPage
  };
};
const useError = () => {
  const [error, setError] = useState(null);
  return {
    error,
    setCustomError: () => setError(new Error("Custom error generated!"))
  };
};
const loader$1 = "_loader_5qdom_1";
const styles$7 = {
  loader: loader$1
};
const Loader = () => {
  return /* @__PURE__ */ jsx("div", { className: styles$7.loader, "data-testid": "loader" });
};
const mainButton = "_mainButton_1jeps_1";
const styles$6 = {
  mainButton
};
const Button = ({
  children,
  type,
  loading,
  disabled,
  onClick
}) => {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: styles$6.mainButton,
      type,
      onClick,
      disabled,
      children: [
        loading && /* @__PURE__ */ jsx(Loader, {}),
        children
      ]
    }
  );
};
const paginationWrap = "_paginationWrap_1ceyq_1";
const styles$5 = {
  paginationWrap
};
const Pagination = ({
  loadingNext,
  loadingPrev,
  changeCurrentPage
}) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  const currentPage = Number(page) || 1;
  const { prev, next } = useAppSelector((state) => state.planets);
  return /* @__PURE__ */ jsxs("div", { className: styles$5.paginationWrap, children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        loading: loadingPrev,
        onClick: () => changeCurrentPage(currentPage - 1),
        disabled: !prev || loadingPrev,
        children: "Back"
      }
    ),
    /* @__PURE__ */ jsxs("span", { children: [
      " Page ",
      currentPage,
      " "
    ] }),
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        loading: loadingNext,
        onClick: () => changeCurrentPage(currentPage + 1),
        disabled: !next || loadingNext,
        children: "Next"
      }
    )
  ] });
};
const searchForm = "_searchForm_fieqh_1";
const searchInput = "_searchInput_fieqh_8";
const styles$4 = {
  searchForm,
  searchInput
};
const Search = ({ query, onQueryChange, onSearchSubmit }) => {
  const isLoading = useAppSelector((state) => state.planets.isLoading);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("h3", { children: [
      "Enter planet name to search desired planet or enter empty string and click Search to load planets list:",
      " "
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: (e) => onSearchSubmit(e), className: styles$4.searchForm, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          className: styles$4.searchInput,
          type: "text",
          defaultValue: query || void 0,
          onChange: onQueryChange,
          placeholder: "planet name (e.g. Hoth)"
        }
      ),
      /* @__PURE__ */ jsx(Button, { type: "submit", loading: isLoading, children: "Search" })
    ] })
  ] });
};
function PlanetsContent({
  children
}) {
  const {
    query,
    onQueryChange,
    onSearchSubmit,
    loadingNext,
    loadingPrev,
    changeCurrentPage
  } = useData();
  const { error, setCustomError } = useError();
  const planets = useAppSelector((state) => state.planets.planets);
  const showPagination = planets.length > 1;
  if (error) {
    throw error;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Search,
      {
        query,
        onQueryChange,
        onSearchSubmit
      }
    ),
    /* @__PURE__ */ jsx("div", { children }),
    showPagination && /* @__PURE__ */ jsx(
      Pagination,
      {
        loadingNext,
        loadingPrev,
        changeCurrentPage
      }
    ),
    /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => setCustomError(), children: "Generate Error" })
  ] });
}
const header = "_header_1ui9x_1";
const styles$3 = {
  header
};
const Header = () => {
  const toggleTheme = useThemeUpdate();
  const darkTheme = useTheme();
  return /* @__PURE__ */ jsxs("header", { className: styles$3.header, children: [
    /* @__PURE__ */ jsx("h3", { children: "SW Planets" }),
    /* @__PURE__ */ jsx(Button, { type: "button", onClick: toggleTheme, children: darkTheme ? "Light theme" : "Dark theme" })
  ] });
};
const stylesheet = "/assets/app-Gm93sRf4.css";
const links = () => {
  return [{
    rel: "stylesheet",
    href: stylesheet,
    as: "style"
  }];
};
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("title", {
        children: "SW Planets"
      }), /* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsx("body", {
      children: /* @__PURE__ */ jsxs(Providers, {
        children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx(PlanetsContent, {
          children: /* @__PURE__ */ jsxs("main", {
            children: [children, /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx(ScrollRestoration, {})]
          })
        })]
      })
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const extractDetails = (data) => {
  return data.map(
    ({
      name,
      climate,
      diameter,
      gravity,
      terrain,
      orbital_period,
      population
    }) => ({
      name: name ?? "",
      climate: climate ?? "",
      diameter: diameter ?? "",
      gravity: gravity ?? "",
      terrain: terrain ?? "",
      orbital_period: orbital_period ?? "",
      population: population ?? ""
    })
  );
};
const getShortDescription = (terrain, climate) => {
  return `Planet with ${terrain} and ${climate} climate`;
};
const resultsContainer = "_resultsContainer_1aimo_1";
const resultsLeftSection = "_resultsLeftSection_1aimo_9";
const resultsHeading = "_resultsHeading_1aimo_19";
const closeBtnWrap$1 = "_closeBtnWrap_1aimo_25";
const resultsList = "_resultsList_1aimo_29";
const loaderWrap = "_loaderWrap_1aimo_35";
const resultsItem = "_resultsItem_1aimo_38";
const resultName = "_resultName_1aimo_50";
const inputWrap = "_inputWrap_1aimo_53";
const resultsCheckbox = "_resultsCheckbox_1aimo_58";
const styles$2 = {
  resultsContainer,
  resultsLeftSection,
  resultsHeading,
  closeBtnWrap: closeBtnWrap$1,
  resultsList,
  loaderWrap,
  resultsItem,
  resultName,
  inputWrap,
  resultsCheckbox
};
const ResultsItem = ({ planet: planet2 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const checkedPlanets = useAppSelector((state) => state.planets.checkedPlanets);
  const planets = useAppSelector((state) => state.planets.planets);
  const findCheckedIdx = (planet22) => checkedPlanets.findIndex((pl) => pl.name === planet22.name);
  const onCheckboxChange = (planet22) => {
    const planetIdx = findCheckedIdx(planet22);
    if (planetIdx === -1) {
      dispatch(setCheckedPlanets([...checkedPlanets, planet22]));
    } else {
      const updatedCheckedPlanets = checkedPlanets.filter(
        (_, idx) => planetIdx !== idx
      );
      dispatch(setCheckedPlanets(updatedCheckedPlanets));
    }
  };
  const onItemClick = (name) => {
    const planet22 = planets.find((pl) => pl.name === name);
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("details", name);
    if (planet22) {
      dispatch(setSelectedPlanet(planet22));
      navigate(`/planet?${updatedParams}`);
    }
  };
  return /* @__PURE__ */ jsxs("li", { className: styles$2.resultsItem, onClick: () => onItemClick(planet2.name), children: [
    /* @__PURE__ */ jsxs("div", { className: styles$2.inputWrap, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          className: styles$2.resultsCheckbox,
          onClick: (e) => e.stopPropagation(),
          type: "checkbox",
          onChange: () => onCheckboxChange(planet2),
          checked: checkedPlanets.some((pl) => pl.name === planet2.name)
        }
      ),
      /* @__PURE__ */ jsx("p", { className: styles$2.resultName, children: planet2.name })
    ] }),
    /* @__PURE__ */ jsx("p", { children: getShortDescription(planet2.terrain, planet2.climate) })
  ] });
};
const ResultsList = () => {
  const planets = useAppSelector((state) => state.planets.planets);
  const isLoading = useAppSelector((state) => state.planets.isLoading);
  return /* @__PURE__ */ jsxs("ul", { className: styles$2.resultsList, children: [
    isLoading && /* @__PURE__ */ jsx("div", { className: styles$2.loaderWrap, children: /* @__PURE__ */ jsx(Loader, {}) }),
    planets.length === 0 && /* @__PURE__ */ jsx("p", { children: "No planets are present" }),
    planets.map((planet2) => /* @__PURE__ */ jsx(ResultsItem, { planet: planet2 }, planet2.name))
  ] });
};
const downloadCSV = (checkedPlanets) => {
  const headers = [
    "name",
    "terrain",
    "climate",
    "population",
    "diameter",
    "gravity",
    "orbital_period"
  ];
  const csvRows = [
    headers.join(";"),
    ...checkedPlanets.map(
      (planet2) => headers.map((header2) => planet2[header2]).join(";")
    )
  ];
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${checkedPlanets.length}_planets.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
const flyoutWrap = "_flyoutWrap_1r52w_1";
const styles$1 = {
  flyoutWrap
};
const Flyout = () => {
  const dispatch = useDispatch();
  const checkedPlanets = useAppSelector((state) => state.planets.checkedPlanets);
  if (checkedPlanets.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: styles$1.flyoutWrap, children: [
    /* @__PURE__ */ jsxs("h3", { children: [
      checkedPlanets.length,
      " items were selected"
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => dispatch(setCheckedPlanets([])), children: "Unselect" }),
    /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => downloadCSV(checkedPlanets), children: "Download" })
  ] });
};
const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const details = searchParams.get("details");
  const closeDetails = () => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.delete("details");
    navigate(`/?${updatedParams}`);
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$2.resultsContainer, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$2.resultsLeftSection, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$2.resultsHeading, children: [
        /* @__PURE__ */ jsx("p", { children: "Name" }),
        /* @__PURE__ */ jsx("p", { children: "Description" })
      ] }),
      /* @__PURE__ */ jsx(ResultsList, {}),
      details && /* @__PURE__ */ jsx("div", { className: styles$2.closeBtnWrap, children: /* @__PURE__ */ jsx(Button, { type: "button", onClick: closeDetails, children: "Close details" }) }),
      /* @__PURE__ */ jsx(Flyout, {})
    ] }),
    /* @__PURE__ */ jsx(Outlet, { context: { closeDetails } })
  ] });
};
async function loader({
  request
}) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const search = url.searchParams.get("search");
  const endpoint = search ? `https://swapi.dev/api/planets/?search=${search}` : `https://swapi.dev/api/planets/?page=${page}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch planets data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching planets data:", error);
  }
}
const home = withComponentProps(function HomePage({
  loaderData
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (loaderData) {
      dispatch(setLoading(false));
      dispatch(setPlanets(extractDetails(loaderData.results)));
      dispatch(setPagination({
        prev: loaderData.previous,
        next: loaderData.next
      }));
    }
  }, [dispatch, loaderData]);
  return /* @__PURE__ */ jsx(Results, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const detailsWrap = "_detailsWrap_1i97v_1";
const closeBtnWrap = "_closeBtnWrap_1i97v_13";
const shortDescription = "_shortDescription_1i97v_16";
const detailsList = "_detailsList_1i97v_20";
const detailsItem = "_detailsItem_1i97v_26";
const detail = "_detail_1i97v_1";
const styles = {
  detailsWrap,
  closeBtnWrap,
  shortDescription,
  detailsList,
  detailsItem,
  detail
};
const Details = () => {
  const { closeDetails } = useOutletContext();
  const planet2 = useAppSelector((state) => state.planets.selectedPlanet);
  if (!planet2) {
    return;
  }
  const {
    name,
    climate,
    diameter,
    gravity,
    terrain,
    orbital_period,
    population
  } = planet2;
  const detailsObj = { diameter, gravity, orbital_period, population };
  const detailList = Object.entries(detailsObj).map(([key, value], idx) => /* @__PURE__ */ jsxs("li", { className: styles.detailsItem, children: [
    /* @__PURE__ */ jsxs("span", { className: styles.detail, children: [
      key,
      ":"
    ] }),
    /* @__PURE__ */ jsx("span", { children: value })
  ] }, `${key}-${idx}`));
  return /* @__PURE__ */ jsxs("div", { className: styles.detailsWrap, children: [
    /* @__PURE__ */ jsx("h1", { children: name }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { className: styles.shortDescription, children: "Short description: " }),
      /* @__PURE__ */ jsx("span", { children: getShortDescription(terrain, climate) })
    ] }),
    /* @__PURE__ */ jsx("h3", { children: "Details:" }),
    /* @__PURE__ */ jsx("ul", { className: styles.detailsList, children: detailList }),
    /* @__PURE__ */ jsx("div", { className: styles.closeBtnWrap, children: /* @__PURE__ */ jsx(Button, { type: "button", onClick: closeDetails, children: "Close details" }) })
  ] });
};
const planet = withComponentProps(function PlanetPage() {
  return /* @__PURE__ */ jsx(Details, {});
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: planet
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DdI8O0_N.js", "imports": ["/assets/chunk-HA7DTUK3-CUXcnMEY.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-ldRNMH5E.js", "imports": ["/assets/chunk-HA7DTUK3-CUXcnMEY.js", "/assets/Button-nV2w7o7r.js", "/assets/planetsSlice-CViAhPlv.js"], "css": ["/assets/root-C-SKSljg.css", "/assets/Button-YF-ihEg9.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-IEaUPyLx.js", "imports": ["/assets/Button-nV2w7o7r.js", "/assets/chunk-HA7DTUK3-CUXcnMEY.js", "/assets/planetsSlice-CViAhPlv.js", "/assets/getShortDescription-DM8fiPlF.js"], "css": ["/assets/home-BKW_1P1t.css", "/assets/Button-YF-ihEg9.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/planet": { "id": "routes/planet", "parentId": "routes/home", "path": "planet", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/planet-BCiX_GBN.js", "imports": ["/assets/Button-nV2w7o7r.js", "/assets/chunk-HA7DTUK3-CUXcnMEY.js", "/assets/getShortDescription-DM8fiPlF.js"], "css": ["/assets/planet-Cqc2JvX0.css", "/assets/Button-YF-ihEg9.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-3d041381.js", "version": "3d041381" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/planet": {
    id: "routes/planet",
    parentId: "routes/home",
    path: "planet",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
