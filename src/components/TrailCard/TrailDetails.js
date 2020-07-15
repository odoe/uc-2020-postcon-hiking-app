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
  ImageWrapper,
  Title,
  ButtonWrapper,
  ContentWrapper,
  SubTitleWrapper,
  StyledLabel,
  StyledCardImage,
} from './TrailCard-styled';

// Third-party components (buttons, icons, etc.)
import Button from 'calcite-react/Button';
import ElevationIcon from 'calcite-ui-icons-react/AltitudeIcon';
import DistanceIcon from 'calcite-ui-icons-react/MeasureLineIcon';
import { Biking, Dog, Hiking, Horse, Road, Vehicle } from 'icons/icons';
import Skeleton from 'react-loading-skeleton';

const TrailDetails = ({ ready, trail }) => {
  const unknownTrail = {
    FID: 0,
    access: 'Trail not found',
    atv: 'no',
    bike: 'no',
    dogs: 'no',
    hiking: 'no',
    horse: 'no',
    length_mi_: 0,
    max_elevat: 0,
    min_elevat: 0,
    name: 'Where the streets have no name',
    type: 'unknown',
  };
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
  } = trail || unknownTrail;

  const slope = trail ? getSlope(trail) : 0;

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

  const getAccess = (ready, access) => {
    if (ready) {
      if (access === ' ') {
        return <StyledLabel white>Year-round</StyledLabel>;
      }
      return <StyledLabel yellow>{access}</StyledLabel>;
    } else {
      return <StyledLabel yellow>Loading...</StyledLabel>;
    }
  };

  return (
    <StyledTrailDetails data-testid="TrailDetails">
      <ImageWrapper>
        {ready ? (
          <StyledCardImage src={getRandomImage()} />
        ) : (
          <Skeleton height={300} width={500} />
        )}
      </ImageWrapper>
      <ContentWrapper>
        <SubTitleWrapper>
          {getAccess(ready, access)}
          {ready ? (
            <ButtonWrapper>
              <Button>Directions</Button>
              <Button>Hotels</Button>
            </ButtonWrapper>
          ) : null}
        </SubTitleWrapper>

        <Title>{ready ? name : <Skeleton width={200} />}</Title>

        <StatsWrapper>
          {ready ? (
            <TrailDifficulty slope={slope} />
          ) : (
            <Skeleton height={24} width={80} />
          )}
          <DistanceWrapper>
            {ready ? (
              <>
                <DistanceIcon size={16} /> {length_mi_}mi
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </DistanceWrapper>
          <ElevationWrapper>
            {ready ? (
              <>
                <ElevationIcon size={16} /> {slope.toFixed(1)}%
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </ElevationWrapper>
        </StatsWrapper>

        <IconsWrapper large>
          {ready ? (
            <>
              <IconWrapper large isActive={isHikingAllowed()}>
                <Hiking key={`hiking-${FID}`} />
              </IconWrapper>
              <IconWrapper large isActive={type === 'Road'}>
                <Road key={`road-${FID}`} />
              </IconWrapper>
              <IconWrapper large isActive={isBikingAllowed()}>
                <Biking key={`biking-${FID}`} />
              </IconWrapper>
              <IconWrapper large isActive={isHorseAllowed()}>
                <Horse key={`horse-${FID}`} />
              </IconWrapper>
              <IconWrapper large isActive={isDogAllowed()}>
                <Dog key={`dog-${FID}`} />
              </IconWrapper>
              <IconWrapper large isActive={isAtvAllowed()}>
                <Vehicle key={`atv-${FID}`} />
              </IconWrapper>
            </>
          ) : (
            <Skeleton width={32} height={32} count={6} />
          )}
        </IconsWrapper>
      </ContentWrapper>
    </StyledTrailDetails>
  );
};

export default TrailDetails;
