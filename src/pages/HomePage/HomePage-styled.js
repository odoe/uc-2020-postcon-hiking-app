import styled from 'styled-components';

const HomePageLayout = styled.div`
  position: relative;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const PopularTrailsContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export { HomePageLayout, PopularTrailsContainer };
