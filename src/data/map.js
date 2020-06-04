import { loadModules, loadCss } from 'esri-loader';

const app = {};

export async function initWebMap() {
  const [ WebMap, ElevationLayer ] = await loadModules([
    'esri/WebMap',
    'esri/layers/ElevationLayer'
  ]);

  const webmap = new WebMap({
    portalItem: {
      id: '8744e84b32e74bffb34b0b1edf0c3d60'
    }
  });

  const elevationLayer = new ElevationLayer({
    url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer/'
  });

  await elevationLayer.load();

  app.elevationLayer = elevationLayer;
  app.webmap = webmap;

  return webmap;
}

export async function initView(container) {
  loadCss();
  const [ MapView ] = await loadModules([
    'esri/views/MapView'
  ]);

  const view = new MapView({
    map: app.webmap,
    container
  });

  app.view = view;

  app.view.popup.actions.add({
    id: 'query-elevation',
    title: 'Elevation'
  });

  app.view.popup.on('trigger-action', ({ action }) => {
    if (action.id === 'query-elevation') {
      const { selectedFeature } = app.view.popup;
      app.elevationLayer.queryElevation(selectedFeature.geometry).then((result) => {
        console.log('elevation result', result);
      });
    }
  });

  return view;
}

export async function filterMapData(name) {
  const [{ whenFalseOnce }] = await loadModules(['esri/core/watchUtils']);
  const layer = app.webmap.layers.getItemAt(0) // could be better
  await layer.load();
  const layerView = await app.view.whenLayerView(layer);
  await whenFalseOnce(layerView, 'updating');
  const query = layer.createQuery();
  query.where = `manager = '${name}'`;
  const extent = await layer.queryExtent(query);
  await app.view.goTo(extent);
  layerView.effect = {
    filter: {
      where: `manager = '${name}'`
    },
    excludedEffect: 'grayscale(25%) opacity(45%)'
  };
}