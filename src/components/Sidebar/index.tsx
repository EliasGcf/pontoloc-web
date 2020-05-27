import React, { useState, useCallback, useEffect, memo } from 'react';
import { FiX, FiTruck, FiUsers, FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import toolSvg from '../../assets/tool.svg';

import { Container } from './styles';

const Sidebar: React.FC = () => {
  const [isOpened, setIsOpened] = useState(() => {
    const sidebarState = localStorage.getItem('@PontoLoc:sidebarState');

    if (sidebarState) {
      return true;
    }

    return false;
  });

  const handleToggleSidebar = useCallback(() => {
    setIsOpened(state => !state);
  }, []);

  useEffect(() => {
    if (isOpened) {
      localStorage.setItem('@PontoLoc:sidebarState', String(isOpened));
    } else {
      localStorage.removeItem('@PontoLoc:sidebarState');
    }
  }, [isOpened]);

  return (
    <Container isOpened={!!isOpened}>
      <div>
        <button type="button" onClick={handleToggleSidebar}>
          {isOpened ? <FiX size={32} /> : <FiMenu size={32} />}
        </button>
      </div>
      <nav>
        <NavLink to="/contracts">
          {isOpened && 'Aluguéis'}
          <FiTruck size={24} />
        </NavLink>
        <NavLink to="/clients">
          {isOpened && 'Clientes'}
          <FiUsers size={24} />
        </NavLink>
        <NavLink to="/materials">
          {isOpened && 'Materiais'}
          <img src={toolSvg} alt="tool" />
        </NavLink>
      </nav>
    </Container>
  );
};

export default memo(Sidebar);
