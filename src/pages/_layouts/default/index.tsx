import React from 'react';

import Sidebar from '../../../components/Sidebar';

import { Wrapper } from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Sidebar />
      {children}
    </Wrapper>
  );
};

export default DefaultLayout;
