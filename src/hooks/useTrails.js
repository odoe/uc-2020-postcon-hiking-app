import { useEffect, useState } from 'react';

export default function useTrails(id) {
  const [trails, setTrails] = useState(null);

  const loadMap = async (id) => {
    const { initWebMap, fetchMaxElevation } = await import('../data/map');
    const webmap = await initWebMap(id);
    await webmap.load();

    const maxEl = await fetchMaxElevation();
    setTrails(Math.round(maxEl), 0);

    // const layer = webmap.layers.getItemAt(1) // could be better
    // await layer.load()
    // const query = layer.createQuery()
    // query.outFields = ['manager']
    // query.returnGeometry = false;
    // query.returnDistinctValues = true;
    // const { features } = await layer.queryFeatures(query)
    // const managers = features.map(({ attributes: a }) => a.manager)
    // setTrails(managers.sort());
  }

  useEffect(() => {
    loadMap(id);
  }, [id]);

  return trails || 1;
}
