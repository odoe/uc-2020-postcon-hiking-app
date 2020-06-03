import { loadModules, loadCss } from 'esri-loader';

const app = {};

export async function initWebMap() {
  const [ WebMap ] = await loadModules([
    'esri/WebMap'
  ]);

  const webmap = new WebMap({
    portalItem: {
      id: '8744e84b32e74bffb34b0b1edf0c3d60'
    }
  });

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