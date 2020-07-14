// Framework and third-party non-ui
import React from 'react';

// App components
import Chip from 'components/Chip';
import { getRandomImage } from 'data/images';

// JSON & Styles
import {
  StyledCard,
  StyledCardTitle,
  StyledCardContent,
  IconsWrapper,
  IconWrapper,
  StatsWrapper,
  DistanceWrapper,
  ElevationWrapper,
} from './TrailCard-styled';

// Third-party components (buttons, icons, etc.)
import { CardImage } from 'calcite-react/Card';
import { Biking, Dog, Hiking, Horse, Road, Vehicle } from 'icons/icons';
import ElevationIcon from 'calcite-ui-icons-react/AltitudeIcon';
import DistanceIcon from 'calcite-ui-icons-react/MeasureLineIcon';

const percentSlope = (r, d) => (r > 0 && d > 0 ? (r / d) * 100 : 0.0);

const getTrailDifficulty = (slope) => {
  if (slope <= 5) return Chip.difficulty.easy;
  if (slope > 5 && slope <= 10) return Chip.difficulty.moderate;
  if (slope > 10) return Chip.difficulty.difficult;
  return Chip.difficulty.unknown;
};

export default function TrailCard(props) {
  // TODO: This needs to be removed once we have real props flowing again
  const style = props.style;
  if (!props.FID) props = defaultProps;
  props.style = style;

  const slope = percentSlope(
    props.max_elevat - props.min_elevat,
    props.length_mi_ * 1609.34
  );

  const isHikingAllowed = () => {
    return props.hiking !== 'no';
  };

  const isBikingAllowed = () => {
    return props.bike !== 'no';
  };

  const isHorseAllowed = () => {
    return props.horse !== 'no';
  };

  const isDogAllowed = () => {
    return props.dogs !== 'no';
  };

  const isAtvAllowed = () => {
    return props.atv !== 'no';
  };

  return (
    <StyledCard
      wide
      style={props.style}
      onClick={async () => {
        const { filterMapData } = await import('data/map');
        filterMapData([props.FID]);
      }}
    >
      <CardImage wide src={getRandomImage()} />
      <StyledCardContent wide>
        <StyledCardTitle>{props.name}</StyledCardTitle>
        <IconsWrapper>
          <IconWrapper isActive={isHikingAllowed()}>
            <Hiking key={`hiking-${props.FID}`} />
          </IconWrapper>
          <IconWrapper isActive={props.type === 'Road'}>
            <Road key={`road-${props.FID}`} />
          </IconWrapper>
          <IconWrapper isActive={isBikingAllowed()}>
            <Biking key={`biking-${props.FID}`} />
          </IconWrapper>
          <IconWrapper isActive={isHorseAllowed()}>
            <Horse key={`horse-${props.FID}`} />
          </IconWrapper>
          <IconWrapper isActive={isDogAllowed()}>
            <Dog key={`dog-${props.FID}`} />
          </IconWrapper>
          <IconWrapper isActive={isAtvAllowed()}>
            <Vehicle key={`atv-${props.FID}`} />
          </IconWrapper>
        </IconsWrapper>
        <StatsWrapper>
          <Chip difficulty={getTrailDifficulty(slope)} />
          <DistanceWrapper>
            <DistanceIcon size={16} /> {props.length_mi_}mi
          </DistanceWrapper>
          <ElevationWrapper>
            <ElevationIcon size={16} /> {slope.toFixed(1)}%
          </ElevationWrapper>
        </StatsWrapper>
      </StyledCardContent>
    </StyledCard>
  );
}

const defaultProps = {
  FID: 2744,
  ogc_fid: 1939,
  feature_id: '74040',
  place_id: 5798,
  name: 'Garnet Mesa Trail',
  place_id_1: 0,
  name_1: ' ',
  place_id_2: 0,
  name_2: ' ',
  place_id_3: 0,
  name_3: ' ',
  trail_num: ' ',
  surface: ' ',
  oneway: ' ',
  type: 'Trail',
  hiking: ' ',
  horse: ' ',
  bike: ' ',
  motorcycle: ' ',
  atv: ' ',
  ohv_gt_50: ' ',
  highway_ve: ' ',
  dogs: ' ',
  access: ' ',
  min_elevat: 1519.77038574,
  max_elevat: 1543.66088867,
  length_mi_: 0.1,
  manager: 'City of Delta',
  INPUT_DATE: 1569369600000,
  EDIT_DATE: 1569369600000,
  Shape__Length: 191.359418917475,
};
