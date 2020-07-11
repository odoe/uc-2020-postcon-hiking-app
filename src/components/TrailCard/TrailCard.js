// Framework and third-party non-ui
import React from 'react';

// App components
import Chip from 'components/Chip';

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
import image01 from 'assets/thumbnails/image01.jpg';
import image02 from 'assets/thumbnails/image02.jpg';
import image03 from 'assets/thumbnails/image03.jpg';
import image04 from 'assets/thumbnails/image04.jpg';
import image05 from 'assets/thumbnails/image05.jpg';
import image06 from 'assets/thumbnails/image06.jpg';
import image07 from 'assets/thumbnails/image07.jpg';
import image08 from 'assets/thumbnails/image08.jpg';
import image09 from 'assets/thumbnails/image09.jpg';
import image10 from 'assets/thumbnails/image10.jpg';
import image11 from 'assets/thumbnails/image11.jpg';
import image12 from 'assets/thumbnails/image12.jpg';
import image13 from 'assets/thumbnails/image13.jpg';
import image14 from 'assets/thumbnails/image14.jpg';
import image15 from 'assets/thumbnails/image15.jpg';
import image16 from 'assets/thumbnails/image16.jpg';
import image17 from 'assets/thumbnails/image17.jpg';
import image18 from 'assets/thumbnails/image18.jpg';
import ElevationIcon from 'calcite-ui-icons-react/AltitudeIcon';
import DistanceIcon from 'calcite-ui-icons-react/MeasureLineIcon';

const percentSlope = (r, d) => (r > 0 && d > 0 ? (r / d) * 100 : 0.0);

const images = [
  image01,
  image02,
  image03,
  image04,
  image05,
  image06,
  image07,
  image08,
  image09,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
];

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

  const getImage = () => {
    const index = Math.floor(Math.random() * 18);
    return images[index];
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
      <CardImage wide src={getImage()} />
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
