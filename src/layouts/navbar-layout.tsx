import * as React from 'react';
import { Navbar } from 'components';

interface Props {
  children: JSX.Element
}

export const NavbarLayout = (props: Props) => (
  <>
    <Navbar/>
    <div className="container-fluid">
      <div style={{ marginTop: '80px' }}>{props.children}</div>
    </div>
  </>
);
