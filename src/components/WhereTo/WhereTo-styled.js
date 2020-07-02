import styled from 'styled-components';

import { FormControl } from 'calcite-react/Form';

const StyledWhereTo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  background: #ffffffc9;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  width: 100%;
`;

const StyledQuickLinksContainer = styled.div`
  display: flex;
  padding-top: 1rem;
  width: 100%;
  justify-content: space-evenly;

  a {
    margin: 0 0.5rem;
  }
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  align-items: center;
`;

export {
  StyledWhereTo,
  StyledSearchContainer,
  StyledQuickLinksContainer,
  StyledFormControl,
};
