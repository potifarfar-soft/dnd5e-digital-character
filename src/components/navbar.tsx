import * as React from 'react';
import { Menu, Image } from 'semantic-ui-react';

export const Navbar = () => (
  <Menu fixed='top' inverted>
    <Menu.Item as='a' href="/" header>
      <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
      Potifarfar
    </Menu.Item>
    <Menu.Item as='a'>Link 1</Menu.Item>
    <Menu.Item as='a'>Link 2</Menu.Item>
  </Menu>
);
