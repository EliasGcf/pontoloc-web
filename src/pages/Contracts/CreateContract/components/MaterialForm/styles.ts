import styled from 'styled-components';
import { Form as UnForm } from '@unform/web';

import { InputLabel } from '../../../../../components/Form';

export const MaterialsForm = styled(UnForm)`
  margin-top: 16px;

  display: flex;
  align-items: flex-end;
`;

export const QuantityInput = styled(InputLabel)`
  max-width: 270px;
  width: 100%;
  margin-left: 16px;
`;

export const AddButton = styled.button`
  height: 56px;
  max-width: 56px;
  width: 100%;
  border: none;
  border-radius: 10px;
  margin-left: 16px;

  background: ${({ theme }) => theme.colors.yellow};

  display: flex;
  align-items: center;
  justify-content: center;
`;
