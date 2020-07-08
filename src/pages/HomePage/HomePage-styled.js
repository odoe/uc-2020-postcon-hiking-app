import styled from 'styled-components';

const HomePageLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 2;
`;

const PopularTrailsContainer = styled.section`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);

  @media only screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  max-width: 100rem;
  margin: 4rem auto 0;
`;

export { HomePageLayout, PopularTrailsContainer };
