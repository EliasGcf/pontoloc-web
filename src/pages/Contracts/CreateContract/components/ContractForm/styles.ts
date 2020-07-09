import styled from 'styled-components';
import { Form as UnForm } from '@unform/web';

import { InputCurrency } from '../../../../../components/Form';

export const Form = styled(UnForm)`
  margin-top: 32px;

  display: flex;
  align-items: flex-end;
`;

export const DeliveryPriceInput = styled(InputCurrency)`
  max-width: 190px;
  width: 100%;
  margin-left: 16px;
`;
