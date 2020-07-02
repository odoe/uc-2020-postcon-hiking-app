import React, { useEffect, useContext, useRef } from 'react';

import { MapContext } from '../context';
import useSelected from '../hooks/useSelected';
// import useFilter from '../hooks/useFilter';
import { initView, initWebMap } from '../data/map';

import TrailCard from './TrailCard';

const Trails = () => {
  const webmapid = useContext(MapContext);
  const { value } = useSelected();
  const elementRef = useRef(null);
  const searchRef = useRef(null);
  // const [name] = useState(null);

  async function init(id) {
    const webmap = await initWebMap(id);
    await webmap.load();
    // wait for the webmap to load
    // then init the mapview
    initView(elementRef.current, searchRef.current);
  }

  // useFilter([name]);

  useEffect(() => {
    init(webmapid);
  }, [webmapid]);


  return (
    <section className="app-container">
      <div className="toolbar">
        <div ref={searchRef}></div>
      </div>
      <div className="map-container">
        <div className="sidebar">
          <h3>Trails</h3>
          {(value || [])
            .filter(({ attributes }) => attributes.name.length > 2)
            .map(({ attributes }, idx) => (
              <TrailCard
                {...attributes}
                key={`trail-${attributes.name}-${idx}`}
              />
            ))}
        </div>
        <div style={{ width: '100%', height: '100%' }} ref={elementRef}></div>
      </div>
    </section>
  );
};

export default Trails;
