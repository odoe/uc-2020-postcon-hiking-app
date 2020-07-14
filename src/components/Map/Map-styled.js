import styled from 'styled-components';

const StyledMap = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledMapLoader = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: #fff;
  background-color: ${({ theme }) => theme.palette.themeColor};
  z-index: 1;
`;

export { StyledMap, StyledMapLoader };
