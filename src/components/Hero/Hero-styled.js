import styled from 'styled-components';
import HeroImage from 'assets/hiking_cropped.jpg';
import { CalciteH1, CalciteH2 } from 'calcite-react/Elements';

const StyledHero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;
  width: 100%;
  background: #ffffff;
  background-image: url(${() => HeroImage});
  background-attachment: fixed;
  background-position: top;
  background-repeat: no-repeat;
`;

const StyledHeroTitle = styled.div`
  margin: 6rem auto 1rem;
  text-align: center;
  @media (max-width: 575px) {
    margin: 3rem auto 1rem;
  }
`;

const StyledCalciteH1 = styled(CalciteH1)`
  font-weight: bold;
  color: white;
  text-shadow: 0 0 3px #000000;
  font-size: 5rem;
  line-height: 5rem;
  @media (max-width: 575px) {
    font-size: 3rem;
    line-height: 3rem;
  }
`;

const StyledCalciteH2 = styled(CalciteH2)`
  font-weight: bold;
  color: white;
  text-shadow: 0 0 3px #000000;
  font-size: 2rem;
  @media (max-width: 575px) {
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
`;

const StyledHeroContainer = styled.div`
  display: flex;
  flex: 0 2 auto;
  flex-direction: column;
  width: 45rem;
  background: #ffffffef;
  box-shadow: 0 0 8px black;
  color: black;
  @media (max-width: 575px) {
    margin: 0 1rem;
    width: inherit;
  }
`;

export {
  StyledHero,
  StyledCalciteH1,
  StyledCalciteH2,
  StyledHeroContainer,
  StyledHeroTitle,
};
