import * as React from "react";
import { Link } from "react-router-dom";
import { Image, Menu } from "semantic-ui-react";

export const Navbar = () => (
  <Menu fixed="top" inverted>
    <Menu.Item as={Link} to="/" header>
      <Image size="mini" src="/logo.png" style={{ marginRight: "1.5em" }} />
      Potifarfar
    </Menu.Item>
    <Menu.Item as="a">Link 1</Menu.Item>
    <Menu.Item as="a">Link 2</Menu.Item>
  </Menu>
);
