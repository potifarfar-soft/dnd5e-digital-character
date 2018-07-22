import { Navbar } from 'components';
import * as React from 'react';

interface IProps {
  children: JSX.Element;
}

export const NavbarLayout = (props: IProps) => (
  <>
    <Navbar/>
    <div className="container-fluid">
      <div style={{ marginTop: '80px' }}>{props.children}</div>
    </div>
  </>
);
