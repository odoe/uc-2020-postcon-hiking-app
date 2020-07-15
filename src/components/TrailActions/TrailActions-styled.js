import styled from 'styled-components';
import { CalciteH2 } from 'calcite-react/Elements';

const StyledTrailActions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`;

const Title = styled(CalciteH2)`
  font-size: 1.2rem;
  margin: 0;
`;

const ButtonsContainer = styled.div`
  button {
    margin-inline-start: 0.3rem;
  }
`;

export { StyledTrailActions, Title, ButtonsContainer };
