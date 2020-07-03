import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.offWhite};
`;

export { StyledApp };
