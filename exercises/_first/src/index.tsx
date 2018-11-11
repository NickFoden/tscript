import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';

const root = document.getElementById('root');

render(<App thing="hour" />, root);

if (module && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => render(<App thing="hour" />, root));
}

export default {};
