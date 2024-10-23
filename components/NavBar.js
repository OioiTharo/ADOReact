import Link from 'next/link';
import styled from 'styled-components';
import { useNavbar } from "../src/app/context/NavbarContext.js";

const NavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #856a6a;
  padding: 10px 20px;
  color: #fff;
  border-radius: 6px;
`;

const Logo = styled.i`
  color: white;
`;

const Menu = styled.ul`
  display: flex;
  list-style-type: none;
  text-decoration: none;
  gap: 20px;
`;

const MenuItem = styled.li`
  color: white;
  font-family: "Jost", sans-serif;
  text-decoration: none;

  &.active {
    color: #e5e6b8;
  }
`;

const NavBarComponent = () => {
  const { activeMenu, updateActiveMenu } = useNavbar();

  return (
    <NavBar>
      <Menu>
        {['/', '/semana', '/adicionar'].map((path, index) => (
          <Link key={index} href={path} passHref>
            <MenuItem
              className={activeMenu === path ? 'active' : ''}
              onClick={() => updateActiveMenu(path)}
            >
              {path === '/' ? 'Dia' : path.charAt(1).toUpperCase() + path.slice(2)}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </NavBar>
  );
};

export default NavBarComponent;
