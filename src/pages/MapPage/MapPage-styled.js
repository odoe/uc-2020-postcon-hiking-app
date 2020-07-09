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

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(250px, 35%) 1fr;
  height: 100%;
  width: 100%;
`;

const SidebarWrapper = styled.aside`
  background: ${({ theme }) => theme.palette.background};
`;

const MapWrapper = styled.main``;

export { MapPageLayout, ContentWrapper, SidebarWrapper, MapWrapper };
