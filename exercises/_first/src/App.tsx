import * as React from 'react';
// import { Clock} from "./Clock";

interface IAppProps {
  thing?: string;
}

export const App: React.SFC<IAppProps> = ({ thing }) => {
  let x = 4;
  return (
    <div>
      <h2>
        What time is it
        {thing}
      </h2>
    </div>
  );
};

{
  /*
export class App extends React.Component<{}, {}> {
  public render() {
    let x = 4;
    return (
      <div>
        <h2> What time is it</h2>
      </div>
    );
  }
}*/
}
