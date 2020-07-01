// Framework and third-party non-ui
import React from 'react';

// App components

// JSON & Styles
import trails from './trails.json';
import { StyledPopularTrail } from './PopularTrail-styled';

// Third-party components (buttons, icons, etc.)
import Card, { CardTitle, CardContent, CardImage } from 'calcite-react/Card';
import Button from 'calcite-react/Button';

const PopularTrail = ({ id }) => {
  const trail = trails[id];

  return (
    <StyledPopularTrail data-testid="PopularTrail">
      <Card style={{ maxWidth: '400px' }}>
        <CardImage src={trail.photo} alt={trail.name} />
        <CardContent>
          <CardTitle>{trail.name}</CardTitle>
          <p>{trail.description}</p>
          <Button>Check it out!</Button>
        </CardContent>
      </Card>
    </StyledPopularTrail>
  );
};

export default PopularTrail;
