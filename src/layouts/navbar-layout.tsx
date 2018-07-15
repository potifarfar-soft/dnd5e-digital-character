import * as React from 'react';
import { Navbar } from 'components';

interface Props {
  children: JSX.Element
}

export const NavbarLayout = (props: Props) => (
  <>
    <Navbar/>
    <div>{props.children}</div>
  </>
);
