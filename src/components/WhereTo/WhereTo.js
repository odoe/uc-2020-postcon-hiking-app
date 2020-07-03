// Framework and third-party non-ui
import React from 'react';

// App components

// JSON & Styles
import {
  StyledWhereTo,
  StyledSearchContainer,
  StyledQuickLinksContainer,
  StyledFormControl,
} from './WhereTo-styled';

// Third-party components (buttons, icons, etc.)
import { CalciteH2, CalciteA } from 'calcite-react/Elements';
import Button from 'calcite-react/Button';
import Search from 'calcite-react/Search';
import GpsOnIcon from 'calcite-ui-icons-react/GpsOnIcon';

const WhereTo = () => {
  const getQuickLinks = () => {
    const places = [
      {name: 'Denver', location: {}},
      {name: 'Aspen', location: {}},
      {name: 'Boulder', location: {}},
      {name: 'Steamboat Springs', location: {}},
      {name: 'Winter Park', location: {}},
    ];

    return places.map((place) => (
      <>
      <CalciteA key={place.name} href="#">
        {place.name}
      </CalciteA><>&nbsp;|&nbsp;</></>
    ));
  };

  return (
    <StyledWhereTo data-testid="WhereTo">
      <CalciteH2>Where to?</CalciteH2>
      <StyledSearchContainer>
        <StyledFormControl horizontal noValidation>
          <Search fullWidth />
          <Button iconButton icon={<GpsOnIcon />} />
        </StyledFormControl>
      </StyledSearchContainer>
      <StyledQuickLinksContainer>{getQuickLinks()}</StyledQuickLinksContainer>
    </StyledWhereTo>
  );
};

export default WhereTo;
