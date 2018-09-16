import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export const Navbar = () => (
	<Menu fixed="top" inverted>
		<Menu.Item as={Link} to="/home">Home</Menu.Item>
		<Menu.Item as={Link} to="/ability-scores">Abilities</Menu.Item>
		<Menu.Item as={Link} to="/eq-test">Equipment test</Menu.Item>
	</Menu>
);
