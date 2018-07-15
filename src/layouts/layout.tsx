import * as React from 'react';
import { Navbar } from 'components';
import './style';

interface Props {
  children: JSX.Element
}

export const Layout = (props: Props) => (
  <>
    <Navbar/>
    <div className='content'>{props.children}</div>
  </>
);
