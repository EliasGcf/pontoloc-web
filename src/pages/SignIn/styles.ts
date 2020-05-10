import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;

  img {
    width: 300px;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;

    max-width: 340px;
    width: 100%;
  }
`;
