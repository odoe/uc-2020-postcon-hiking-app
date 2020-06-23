import React, { useEffect, useContext, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@material-ui/core";

const percentSlope = (r, d) => (r > 0 && d > 0) ? (r/d) * 100 : 0.00;

const trailDifficulty = (slope) => {
  if (slope <= 5) return <Chip size="small" label="Easy" style={{ background: "rgb(76, 175, 80)", color: "#fff" }} />;
  if (slope > 5 && slope <= 10) return <Chip size="small" label="Moderate" color="primary" />;
  if (slope > 10) return <Chip size="small" label="Difficult" color="secondary" />;
  return "Unknown";
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '0.5rem'
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
    height: 100
  },
  controls: {
    display: 'flex',
    alignItems: 'left',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  }
}));

export default function TrailCard (props) {
  const classes = useStyles();
  const slope = percentSlope((props.max_elevat - props.min_elevat), (props.length_mi_ * 1609.34));
  const difficulty = trailDifficulty(slope);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image="https://calabashtown.com/wp-content/uploads/2018/10/Haunted-Trail.jpg"
        title="Trail Name?"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography>
            {props.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {props.manager}
            <Typography variant="caption" display="block" gutterBottom>
             {props.length_mi_} miles at {slope.toFixed(1)} % slope
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {trailDifficulty(slope)}
              <Button size="small" variant="contained" color="primary" style={{ float: "right" }} onClick={async () => {
                console.log("zoom map");
                const { filterMapData } = await import("../data/map");
                filterMapData([props.FID]);
              }}>
                Go
              </Button>
            </Typography>
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}