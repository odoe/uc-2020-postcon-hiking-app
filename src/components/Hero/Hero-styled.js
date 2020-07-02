import styled from 'styled-components';
import HeroImage from 'assets/hero-bg.jpg';

const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
  background-position: center;
  width: 100wh;
  height: 850px;
  padding: 2rem;
  background: lightgray;
  background-image: url(${() => HeroImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledHeroContainer = styled.div`
  display: flex;
  flex: 0 2 auto;
  flex-direction: column;
  margin: auto;
  width: 50%;
`;

const StyledHeroTitle = styled.div`
  color: white;
  flex: 0 1 auto;
  display: flex;
  overflow: auto;
  width: 100%;
`;

const StyledHeroHeadline = styled.div`
  padding-left: 1rem;
  text-align: left;
`;

export { StyledHero, StyledHeroContainer, StyledHeroTitle, StyledHeroHeadline };
