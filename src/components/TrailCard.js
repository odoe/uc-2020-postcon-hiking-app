import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@material-ui/core';

import { Biking, Dog, Hiking, Horse, Road, Vehicle } from './../icons/icons';

const percentSlope = (r, d) => (r > 0 && d > 0 ? (r / d) * 100 : 0.0);

const trailDifficulty = (slope) => {
  if (slope <= 5)
    return (
      <Chip
        size="small"
        label="Easy"
        style={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
      />
    );
  if (slope > 5 && slope <= 10)
    return <Chip size="small" label="Moderate" color="primary" />;
  if (slope > 10)
    return <Chip size="small" label="Difficult" color="secondary" />;
  return 'Unknown';
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '0.5rem',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 100,
  },
  controls: {
    display: 'flex',
    alignItems: 'left',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function TrailCard(props) {
  const classes = useStyles();
  const slope = percentSlope(
    props.max_elevat - props.min_elevat,
    props.length_mi_ * 1609.34
  );
  const difficulty = trailDifficulty(slope);

  const icons = [];
  if (props.bike !== 'no' && props.bike !== ' ') {
    icons.push(<Biking key={`bike-${props.FID}`} />);
  }
  if (props.dogs !== 'no' && props.dogs !== ' ') {
    icons.push(<Dog key={`dog-${props.FID}`} />);
  }
  if (props.horse !== 'no' && props.horse !== ' ') {
    icons.push(<Horse key={`horse-${props.FID}`} />);
  }
  if (props.atv !== 'no' && props.atv !== ' ') {
    icons.push(<Vehicle key={`atv-${props.FID}`} />);
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image="https://upload.wikimedia.org/wikipedia/commons/4/44/Natchez_Trace_Trail.jpg"
        title={props.name}
        loading="lazy"
        alt={props.name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography>{props.name}</Typography>
          {props.type === 'Road' ? (
            <Road key={`road-${props.FID}`} />
          ) : (
            <Hiking key={`hiking-${props.FID}`} />
          )}
          <Typography variant="subtitle2" color="textSecondary">
            {props.manager}
            <Typography variant="caption" display="block" gutterBottom>
              {props.length_mi_} miles at {slope.toFixed(1)} % slope
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {difficulty}
              <Button
                size="small"
                variant="contained"
                color="primary"
                style={{ float: 'right' }}
                onClick={async () => {
                  const { filterMapData } = await import('../data/map');
                  filterMapData([props.FID]);
                }}
              >
                Go
              </Button>
            </Typography>
          </Typography>
          {[icons]}
        </CardContent>
      </div>
    </Card>
  );
}
