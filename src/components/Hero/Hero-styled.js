import styled from 'styled-components';
import HeroImage from 'assets/hero-bg.jpg';
import { CalciteH1 } from 'calcite-react/Elements';

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

const StyledCalciteH1 = styled(CalciteH1)`
  font-weight: bold;
  font-size: 5rem;
  color: 
`;

const StyledHeroContainer = styled.div`
  display: flex;
  flex: 0 2 auto;
  flex-direction: column;
`;

const StyledHeroTitle = styled.div`
  margin: 3rem auto;

`;

export { StyledHero, StyledCalciteH1, StyledHeroContainer, StyledHeroTitle };
