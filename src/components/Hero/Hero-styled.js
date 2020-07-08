import styled from 'styled-components';
import HeroImage from 'assets/hiking_cropped.jpg';
import { CalciteH1, CalciteH2 } from 'calcite-react/Elements';

const StyledHero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;
  width: 100%;
  background: #3c1802;
  background-image: url(${() => HeroImage});
  background-position: top;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const StyledHeroTitle = styled.div`
  margin: 6rem auto 1rem;
  text-align: center;
`;

const StyledCalciteH1 = styled(CalciteH1)`
  font-weight: bold;
  color: white;
  text-shadow: 0 0 3px #000000;
  font-size: 5rem;
`;

const StyledCalciteH2 = styled(CalciteH2)`
  font-weight: bold;
  color: white;
  text-shadow: 0 0 3px #000000;
  font-size: 2rem;
`;

const StyledHeroContainer = styled.div`
  display: flex;
  flex: 0 2 auto;
  flex-direction: column;
  width: 45rem;
  background: #ffffffef;
  box-shadow: 0 0 8px black;
  color: black;
`;

export {
  StyledHero,
  StyledCalciteH1,
  StyledCalciteH2,
  StyledHeroContainer,
  StyledHeroTitle,
};
