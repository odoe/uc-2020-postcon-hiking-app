import styled from 'styled-components';
import { CalciteH1 } from 'calcite-react/Elements';

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.palette.white};
  z-index: 2;
  justify-content: space-between;
  align-items: center;
  line-height: normal;
  background: ${({ theme }) => theme.palette.themeColor};
`;

const StyledCalciteH1 = styled(CalciteH1)`
  font-family: ${({ theme }) => theme.type.accent};
  color: ${({ theme }) => theme.palette.white};
  margin: 0.5rem 1rem;
  font-size: 2rem;
  line-height: inherit;
`;

export { StyledHeader, StyledCalciteH1 };
