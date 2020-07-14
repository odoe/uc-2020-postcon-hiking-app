// Framework and third-party non-ui
import React from 'react';

// App components
import { getRandomImage } from 'data/images';

// JSON & Styles
import { StyledTrailDetails } from './TrailDetails-styled';

// Third-party components (buttons, icons, etc.)
import { CardImage } from 'calcite-react/Card';

const TrailDetails = ({ trail }) => {
  console.log({ trail });

  return (
    <StyledTrailDetails data-testid="TrailDetails">
      <CardImage src={getRandomImage()} />
      {trail.attributes.name}
    </StyledTrailDetails>
  );
};

export default TrailDetails;
