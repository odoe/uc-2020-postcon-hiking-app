import styled from 'styled-components';

const StyledInnerWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const StyledSidebar = styled.div`
  display: flex;
  flex: 1 1 auto;
  border: 2px solid dodgerblue;
`;

const StyledMapContainer = styled.div`
  display: flex;
  flex: 2 2 auto;
  border: 2px solid tomato;
`;

export { StyledInnerWrapper, StyledSidebar, StyledMapContainer };
