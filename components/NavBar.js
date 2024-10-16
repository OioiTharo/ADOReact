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
  
  &.desactive {
    color: white;
  }
`;

const NavBarComponent = () => {
  const { activeMenu, updateActiveMenu } = useNavbar(); // Usando o contexto

  return (
    <NavBar>
      <Menu>
        <Link href="/" passHref>
          <MenuItem
            className={activeMenu === '/' ? 'active' : 'desactive'}
            onClick={() => updateActiveMenu('/')}
          >
            Home
          </MenuItem>
        </Link>
        <Link href="/concluidas" passHref>
          <MenuItem
            className={activeMenu === '/concluidas' ? 'active' : 'desactive'}
            onClick={() => updateActiveMenu('/concluidas')}
          >
            Concluídas
          </MenuItem>
        </Link>
        <Link href="/pendentes" passHref>
          <MenuItem
            className={activeMenu === '/pendentes' ? 'active' : 'desactive'}
            onClick={() => updateActiveMenu('/pendentes')}
          >
            Pendentes
          </MenuItem>
        </Link>
        <Link href="/adicionar" passHref>
          <MenuItem
            className={activeMenu === '/adicionar' ? 'active' : 'desactive'}
            onClick={() => updateActiveMenu('/adicionar')}
          >
            Adicionar Tarefa
          </MenuItem>
        </Link>
      </Menu>
    </NavBar>
  );
};

export default NavBarComponent;
