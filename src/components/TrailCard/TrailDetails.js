// Framework and third-party non-ui
import React from 'react';

// App components
import TrailDifficulty from './common/TrailDifficulty';
import { getRandomImage } from 'data/images';
import { getSlope } from 'utils/utils';

// JSON & Styles
import {
  StyledTrailDetails,
  IconsWrapper,
  IconWrapper,
  StatsWrapper,
  DistanceWrapper,
  ElevationWrapper,
} from './TrailCard-styled';

// Third-party components (buttons, icons, etc.)
import { CardImage } from 'calcite-react/Card';
import Label from 'calcite-react/Label';
import Button from 'calcite-react/Button';
import ElevationIcon from 'calcite-ui-icons-react/AltitudeIcon';
import DistanceIcon from 'calcite-ui-icons-react/MeasureLineIcon';
import { Biking, Dog, Hiking, Horse, Road, Vehicle } from 'icons/icons';

const TrailDetails = ({ trail }) => {
  const {
    FID,
    access,
    atv,
    bike,
    dogs,
    hiking,
    horse,
    length_mi_,
    name,
    type,
  } = trail;

  const slope = getSlope(trail);

  const isHikingAllowed = () => {
    return hiking !== 'no';
  };

  const isBikingAllowed = () => {
    return bike !== 'no';
  };

  const isHorseAllowed = () => {
    return horse !== 'no';
  };

  const isDogAllowed = () => {
    return dogs !== 'no';
  };

  const isAtvAllowed = () => {
    return atv !== 'no';
  };

  const getAccess = (access) => {
    if (access === ' ') {
      return <Label green>Year-round</Label>;
    }

    return <Label yellow>{access}</Label>;
  };

  return (
    <StyledTrailDetails data-testid="TrailDetails">
      <CardImage src={getRandomImage()} />
      {name}
      {getAccess(access)}
      <Button>Directions</Button>
      <Button>Hotels</Button>

      <TrailDifficulty slope={slope} />

      <IconsWrapper>
        <IconWrapper isActive={isHikingAllowed()}>
          <Hiking key={`hiking-${FID}`} />
        </IconWrapper>
        <IconWrapper isActive={type === 'Road'}>
          <Road key={`road-${FID}`} />
        </IconWrapper>
        <IconWrapper isActive={isBikingAllowed()}>
          <Biking key={`biking-${FID}`} />
        </IconWrapper>
        <IconWrapper isActive={isHorseAllowed()}>
          <Horse key={`horse-${FID}`} />
        </IconWrapper>
        <IconWrapper isActive={isDogAllowed()}>
          <Dog key={`dog-${FID}`} />
        </IconWrapper>
        <IconWrapper isActive={isAtvAllowed()}>
          <Vehicle key={`atv-${FID}`} />
        </IconWrapper>
      </IconsWrapper>
      <StatsWrapper>
        <TrailDifficulty slope={slope} />
        <DistanceWrapper>
          <DistanceIcon size={16} /> {length_mi_}mi
        </DistanceWrapper>
        <ElevationWrapper>
          <ElevationIcon size={16} /> {slope.toFixed(1)}%
        </ElevationWrapper>
      </StatsWrapper>
    </StyledTrailDetails>
  );
};

export default TrailDetails;
