import { loadModules, loadCss } from 'esri-loader';

const app = {};

export async function initWebMap() {
  const [ WebMap, ElevationLayer, FeatureLayer, GraphicsLayer, TileLayer, GroupLayer ] = await loadModules([
    'esri/WebMap',
    'esri/layers/ElevationLayer',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/layers/TileLayer',
    'esri/layers/GroupLayer'
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

  const trailLayer = new GraphicsLayer({ id: "trail" });


  const terrainLayer = new TileLayer({
    blendMode: 'source-in',
    portalItem: {
      id: '99cd5fbd98934028802b4f797c4b1732'
    },
    opacity: 1
  });

  const groupLayer = new GroupLayer({
    id: 'group',
    layers: [trailLayer, terrainLayer],
  });

  webmap.add(groupLayer);

  app.elevationLayer = elevationLayer;
  app.webmap = webmap;

  return webmap;
}

export async function initView(container) {
  loadCss();
  const [ MapView, BasemapToggle ] = await loadModules([
    'esri/views/MapView',
    'esri/widgets/BasemapToggle'
  ]);

  const view = new MapView({
    map: app.webmap,
    container
  });

  const toggle = new BasemapToggle({ view, nextBasemap: "hybrid" });

  view.ui.add(toggle, 'bottom-right');

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
  const [{ whenFalseOnce }, geometryEngine] = await loadModules(['esri/core/watchUtils', 'esri/geometry/geometryEngine']);
  const layer = app.webmap.layers.getItemAt(1) // could be better

  await layer.load();
  const layerView = await app.view.whenLayerView(layer);
  await whenFalseOnce(layerView, 'updating');
  const query = layer.createQuery();
  query.where = `manager = '${name}'`;
  const {features} = await layer.queryFeatures(query);
  console.log(features);
  const groupLayer = app.webmap.findLayerById('group');
  const trailLayer = app.webmap.findLayerById('trail');
  console.log(trailLayer);
  
  const buffd = geometryEngine.union(geometryEngine.buffer(features.map(x => x.geometry), 2, 'miles'));
  console.log(buffd);
  trailLayer.add({
    attributes: {},
    geometry: buffd,
    symbol: {
      type: "simple-fill",
      outline: { color: [255, 255, 255, 1] },
      color: [255, 255, 255, 0.5]
    }
  })

  groupLayer.visible = true;
  app.webmap.basemap.visible = false;
  await app.view.goTo(buffd);
  layerView.effect = {
    filter: {
      where: `manager = '${name}'`
    },
    excludedEffect: 'grayscale(25%) opacity(45%)'
  };
}