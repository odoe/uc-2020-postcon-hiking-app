import styled from 'styled-components';
import { FormControl, FormControlLabel } from 'calcite-react/Form';

const StyledFilter = styled.nav`
  display: flex;
  padding: 0.6rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 2px 3px;
  z-index: 1;
`;

const StyledFormControl = styled(FormControl)`
  display: flex;
  flex-direction: column;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  font-size: 0.8rem;
  text-transform: capitalize;
`;

export { StyledFilter, StyledFormControl, StyledFormControlLabel };
