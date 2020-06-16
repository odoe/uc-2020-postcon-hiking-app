import React, { useEffect, useContext, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Slider,
  Typography,
} from "@material-ui/core";

import { MapContext } from "../context";
import useTrails from "../hooks/useTrails";
import useView from "../hooks/useView";
import useSelected from "../hooks/useSelected";
import useFilter from "../hooks/useFilter";
import { fetchTrails } from "../data/map";

const Trails = () => {
  const setView = useView();
  const webmapid = useContext(MapContext);
  const maxElevation = useTrails(webmapid) || [];
  const { value, setCurrentValue } = useSelected();
  const elementRef = useRef(null);
  const [name, setName] = useState(null);

  const [dogs, setDogs] = useState(false);
  const [bike, setBike] = useState(false);
  const [horse, setHorse] = useState(false);

  const [elevValue, setValue] = useState([1, 500]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const doSearch = async () => {
    const { features } = await fetchTrails(elevValue, { dogs, bike, horse });
    const names = features.map(a => a.attributes.name);
    setCurrentValue(features);
  };

  useFilter([name]);

  useEffect(() => {
    setView(elementRef.current);
  }, [setView, name]);

  function valueText(value) {
    return `${value} Meters`;
  }

  console.log(value)

  if (name) {
    return (
      <div style={{ width: "100%", height: "100%" }} ref={elementRef}></div>
    );
  } else {
    return (
      <main>
        <Container fixed>
          <Typography id="discrete-slider-small-steps" gutterBottom>
            Select Min/Max Elevation
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography id="discrete-slider-small-steps" gutterBottom>
                Min: {elevValue[0]}
              </Typography>
            </Grid>

            <Slider
              value={elevValue}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              onChange={handleChange}
              getAriaValueText={valueText}
              min={1}
              max={maxElevation}
            />

            <Grid item>
              <Typography id="discrete-slider-small-steps" gutterBottom>
                Max: {elevValue[1]}
              </Typography>
            </Grid>
          </Grid>

          <p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dogs}
                  onChange={() => {
                    setDogs(!dogs);
                  }}
                  name="dogs"
                />
              }
              label="Dogs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={bike}
                  onChange={() => {
                    setBike(!bike);
                  }}
                  name="bike"
                />
              }
              label="Bike"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={horse}
                  onChange={() => {
                    setHorse(!horse);
                  }}
                  name="horse"
                />
              }
              label="Horse"
            />
          </p>

          <p>
            <Button onClick={doSearch}>Search</Button>
          </p>
        </Container>
        <Container fixed> 
        <List>
              {(value || []).filter(({attributes}) => (
                attributes.name.length > 2
              )).map(({ attributes: { FID, name, name_1 } }, idx) => (
                <ListItem button key={`list-item-${name}-${idx}`} onClick={() => setName(FID)}>
                  <ListItemText>{name} - {name_1}</ListItemText>
                </ListItem>
              ))}
        </List>
        </Container>
      </main>
    );
  }
};

export default Trails;
