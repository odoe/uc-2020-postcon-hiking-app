import styled from 'styled-components';

const MapPageLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const StyledSidebar = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

const StyledMapContainer = styled.div`
  display: flex;
  flex: 2 2 auto;
`;

export { MapPageLayout, StyledInnerWrapper, StyledSidebar, StyledMapContainer };
