import React, { useEffect, useContext, useRef, useState } from "react";
import { MapContext, SelectedContext } from "../context";
import useTrails from "../hooks/useTrails";
import useView from "../hooks/useView";
import useSelected from "../hooks/useSelected";
import useFilter from "../hooks/useFilter";

const Trails = () => {
  const setView = useView();
  const [loaded, setLoaded] = useState(false);
  const webmapid = useContext(MapContext);
  const names = useTrails(webmapid) || [];
  const { value, setCurrentValue }= useSelected();
  const elementRef = useRef(null);

  // const updateMap = async (val) => {
  //   useFilter(val)
  // }

  useFilter(value);

  useEffect(() => {
    setView(elementRef.current)
  }, [loaded, setView]);

  // useEffect(() => {
  //   if (value) {
  //     updateMap(value);
  //   }
  // }, [value]);

  if (value) {
    return <div style={
      { width: '100%', height: '100%' }
    } ref={elementRef}></div>;
  } else {
    return (
      <main>
        <ul>
          {names.map((n) => (
            <li
              key={`key-${n}`}
              onClick={() => {
                setCurrentValue(n);
                setLoaded(true);
              }}
            >
              {n}
            </li>
          ))}
        </ul>
      </main>
    );
  }
};

export default Trails;
