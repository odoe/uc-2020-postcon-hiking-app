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
import { CalciteH1, CalciteA } from 'calcite-react/Elements';
import Button from 'calcite-react/Button';
import Search from 'calcite-react/Search';
import GpsOnIcon from 'calcite-ui-icons-react/GpsOnIcon';

const WhereTo = () => {
  const getQuickLinks = () => {
    const places = [
      'Denver',
      'Aspen',
      'Boulder',
      'Steamboat Springs',
      'Winter Park',
    ];

    return places.map((place) => (
      <CalciteA key={place} href="#">
        {place}
      </CalciteA>
    ));
  };

  return (
    <StyledWhereTo data-testid="WhereTo">
      <CalciteH1>Where to?</CalciteH1>
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
