import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { DataType } from '../types';

interface ResultsProps {
  data: DataType[];
}
const Results = ({ data }: ResultsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page') ?? '';
  const hasDetails = searchParams.has('details');

  const closeDetails = () => {
    navigate(`/?page=${page}`);
  };

  const onItemClick = (name: string) => {
    setSearchParams({
      page,
      details: name,
    });
    navigate(`/planet?page=${page}&details=${name}`);
  };

  const dataList = data.map(({ name, description }) => (
    <li key={name} onClick={() => onItemClick(name)}>
      <p>{name}</p>
      <p>{description}</p>
    </li>
  ));

  return (
    <div className="resultsContainer">
      <div>
        <div>
          {hasDetails && <button onClick={closeDetails}>close</button>}
          <p>Name</p>
          <p>Description</p>
        </div>
        <ul>{dataList}</ul>
      </div>
      <Outlet context={{ closeDetails }} />
    </div>
  );
};

export default Results;
