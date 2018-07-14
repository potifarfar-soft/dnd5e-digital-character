import * as React from 'react';
import { render } from 'react-dom';
import { Home } from 'routes';

const root = (
  <Home/>
);

render(root, document.getElementById('react-root'));
