import styled from 'styled-components';
import { CalciteH1 } from 'calcite-react/Elements';

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  background: #515E29;
  color: rgb(255, 255, 255);
  z-index: 2;
  justify-content: space-between;
  align-items: center;
  line-height: normal;
  background: ${({ theme }) => theme.palette.Brand_Blue_200};
`;

const StyledCalciteH1 = styled(CalciteH1)`
  margin: 1rem;
  font-size: 2rem;
  line-height: inherit;
`;

export { StyledHeader, StyledCalciteH1 };
