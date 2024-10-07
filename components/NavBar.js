import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useNavbar } from "../src/app/context/NavbarContext.js";
import LogoImage from '../src/app/img/lista.png'; 

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #856a6a;
  padding: 10px 20px;
  color: #fff;
  border-radius: 6px;
`;

const Logo = styled.img`
  height: 40px;
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

  &:hover {
    color: #e5e6b8;
  }

  &.active {
    color: #e5e6b8;
  }
`;

const NavBarComponent = () => {
  const { activeMenu, updateActiveMenu } = useNavbar(); // Usando o contexto

  return (
    <NavBar>
      <Link href="/" passHref>
        <Logo src={LogoImage} alt="Logo" />
      </Link>
      <Menu>
        <Link href="/" passHref>
          <MenuItem
            className={activeMenu === '/' ? 'active' : ''}
            onClick={() => updateActiveMenu('/')}
          >
            Home
          </MenuItem>
        </Link>
        <Link href="/concluidas" passHref>
          <MenuItem
            className={activeMenu === '/concluidas' ? 'active' : ''}
            onClick={() => updateActiveMenu('/concluidas')}
          >
            Concluídas
          </MenuItem>
        </Link>
        <Link href="/pendentes" passHref>
          <MenuItem
            className={activeMenu === '/pendentes' ? 'active' : ''}
            onClick={() => updateActiveMenu('/pendentes')}
          >
            Pendentes
          </MenuItem>
        </Link>
        <Link href="/adicionar" passHref>
          <MenuItem
            className={activeMenu === '/adicionar' ? 'active' : ''}
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
