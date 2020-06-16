import styled from 'styled-components';
import RInputMask from 'react-input-mask';

export const ReactInputMask = styled(RInputMask)`
  background: ${({ theme }) => theme.colors.dark};
  border: 0;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 16px;
  height: 56px;
  width: 100%;
  font-size: 18px;
`;

export const Error = styled.small`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.error};
  display: block;
  margin: 8px 0 0 8px;
`;
