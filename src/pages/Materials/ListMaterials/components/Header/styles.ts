import styled from 'styled-components';
import { Form as UForm } from '@unform/web';

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  h1 {
    font-weight: normal;
    font-size: 32px;
    margin-left: auto;
  }
`;

export const Form = styled(UForm)`
  display: flex;
  max-width: 415px;
  width: 100%;
`;
