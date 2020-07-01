// Framework and third-party non-ui
import React from 'react';

// App components

// JSON & Styles
import { StyledPageWrapper } from 'pages/Pages-styled';

// Third-party components (buttons, icons, etc.)
import { CalciteH1, CalciteP } from 'calcite-react/Elements';

function NoMatch() {
  return (
    <StyledPageWrapper data-testid="NoMatch">
      <CalciteH1>Uh oh! You've requested a page that doesn't exist.</CalciteH1>
      <CalciteP>
        You may have clicked an old link or have a typo in your URL.
      </CalciteP>
    </StyledPageWrapper>
  );
}

export default NoMatch;
