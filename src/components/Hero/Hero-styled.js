import styled from 'styled-components';
import HeroImage from 'assets/hero-bg.jpg';

const StyledHero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 40rem;
  background: #3C1802;
  background-image: url(${() => HeroImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;

const StyledHeroContainer = styled.div`
  display: flex;
  flex: 0 2 auto;
  flex-direction: column;
  color: white;
`;

const StyledHeroTitle = styled.div`
  margin: 3rem auto;

`;

export { StyledHero, StyledHeroContainer, StyledHeroTitle };
