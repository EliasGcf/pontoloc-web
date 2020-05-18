import React from 'react';

import { Wrapper } from './styles';

import Sidebar from '../../../components/Sidebar';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Sidebar />
      {children}
    </Wrapper>
  );
};

export default DefaultLayout;
