import * as React from 'react';
import { IAppState, App } from './app';
import { PlaceSearchResult } from './place-search-result';

interface IResultListProps extends IAppState {
  handleSearch?: (this: App, term: string) => void;
}

const NO_OP = () => {};

export const PlaceSearchResultList: React.SFC<any> = p => {
  let handler = p.handleSearch || NO_OP;
  let resultSet: JSX.Element[] = [];
  if (p.term === '') {
    resultSet.push(<li className="blue">Please enter something</li>);
  } else if (p.inProgress) {
    resultSet.push(
      <li key="inProgress" className="blue">
        Searching for {p.term} . . .
      </li>
    );
  } else if (p.results.length > 0) {
    resultSet = p.results.map((r: any) => <PlaceSearchResult key={r.id} {...r} />);
  }

  return (
    <div>
      <h2> Search for a place </h2>
      <input onChange={e => handler(e.target.value)} placeholder="Search" type="search" />
      <ul className="results">{resultSet}</ul>
    </div>
  );
};
