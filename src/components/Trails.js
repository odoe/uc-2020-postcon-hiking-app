import React, { useEffect, useContext, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Slider,
  Typography,
} from "@material-ui/core";

import { MapContext } from "../context";
import useTrails from "../hooks/useTrails";
import useView from "../hooks/useView";
import useSelected from "../hooks/useSelected";
import useFilter from "../hooks/useFilter";
import { fetchTrails, filterMapData } from "../data/map";

const Trails = () => {
  const setView = useView();
  const webmapid = useContext(MapContext);
  const maxElevation = useTrails(webmapid) || [];
  const { value, setCurrentValue } = useSelected();
  const elementRef = useRef(null);

  const [dogs, setDogs] = useState(false);
  const [bike, setBike] = useState(false);
  const [horse, setHorse] = useState(false);

  const [elevValue, setValue] = useState([1, 500]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const doSearch = async () => {
    console.log(elevValue);
    const { features } = await fetchTrails(elevValue, { dogs, bike, horse });
    const names = features.map(a => a.attributes.name);
    setCurrentValue(names);
  };

  useFilter(value);

  useEffect(() => {
    setView(elementRef.current);
  }, [setView, value]);

  function valueText(value) {
    return `${value} Meters`;
  }

  if (value) {
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
                    console.log("dogs setState()");
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
                    console.log("bike setState()");
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
                    console.log("horse setState()");
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
      </main>
    );
  }
};

export default Trails;
