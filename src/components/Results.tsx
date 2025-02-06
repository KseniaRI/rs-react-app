import { DataType } from '../types';

interface ResultsProps {
  data: DataType[];
}
const Results = ({ data }: ResultsProps) => {
  const dataArray = data.map(({ name, description }) => (
    <li key={name}>
      <p>{name}</p>
      <p>{description}</p>
    </li>
  ));
  return (
    <div>
      <div>
        <p>Name</p>
        <p>Description</p>
      </div>
      <ul>{dataArray}</ul>
    </div>
  );
};

export default Results;
