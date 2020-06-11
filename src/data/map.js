import { loadModules, loadCss, setDefaultOptions } from 'esri-loader';

const app = {};
const sym1 = {
  type: "cim",
  // CIM Line Symbol
  data: {
    type: "CIMLineSymbol",
    symbolLayers: [{
      // white dashed layer at center of the line
      type: "CIMSolidStroke",
      effects: [{
        type: "CIMGeometricEffectDashes",
        dashTemplate: [2, 2, 2, 2],
        lineDashEnding: "NoConstraint",
        controlPointEnding: "NoConstraint"
      }],
      enable: "true",
      capStyle: "Butt",
      joinStyle: "Round",
      width: 1,
      color: [
        255,
        255,
        255,
        255
      ]
    },
    {
      // lighter green line layer that surrounds the dashes
      type: "CIMSolidStroke",
      enable: "true",
      capStyle: "Butt",
      joinStyle: "Round",
      width: 3,
      color: [
        56,
        168,
        0,
        255
      ]
    },
    {
      // darker green outline around the line symbol
      type: "CIMSolidStroke",
      enable: true,
      capStyle: "Butt",
      joinStyle: "Round",
      width: 6,
      color: [
        0,
        115,
        76,
        255
      ]
    }
    ]
  }
}

export async function initWebMap() {
  const [ WebMap, Bookmark, ElevationLayer, FeatureLayer, GraphicsLayer, TileLayer, GroupLayer ] = await loadModules([
    'esri/WebMap',
    'esri/webmap/Bookmark',
    'esri/layers/ElevationLayer',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/layers/TileLayer',
    'esri/layers/GroupLayer'
  ]);

  const bookmarksLocal = JSON.parse(localStorage.getItem('trail-bookmarks')) || [];

  const webmap = new WebMap({
    portalItem: {
      id: '8744e84b32e74bffb34b0b1edf0c3d60'
    },
    bookmarks: bookmarksLocal.map(a => Bookmark.fromJSON(a))
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
  const [ MapView, BasemapToggle, Bookmarks, Expand ] = await loadModules([
    'esri/views/MapView',
    'esri/widgets/BasemapToggle',
    'esri/widgets/Bookmarks',
    'esri/widgets/Expand'
  ]);

  const view = new MapView({
    map: app.webmap,
    container
  });

  const toggle = new BasemapToggle({ view, nextBasemap: "hybrid" });

  const bookmarks = new Bookmarks({
    view: view,
    editingEnabled: true,
    bookmarkCreationOptions: {
      takeScreenshot: true,
      captureExtent: true,
      screenshotSettings: {
        width: 100,
        height: 100
      }
    }
 });

 const bookmarksExpand = new Expand({
   content: bookmarks
 });

  view.ui.add(toggle, 'bottom-right');
  view.ui.add(bookmarksExpand, 'top-right');

  app.view = view;

  app.view.popup.actions.add({
    id: 'query-elevation',
    title: 'Elevation'
  });

  app.view.when(() => {
    bookmarks.bookmarks.on('change', ({added}) => {
      const bookmarJson = added.map(x => x.toJSON());
      console.log(bookmarJson);
      let bookmarkStored = JSON.parse(localStorage.getItem('trail-bookmarks')) || [];
      localStorage.removeItem('trail-bookmarks');
      bookmarkStored = bookmarkStored.concat(bookmarJson);
      localStorage.setItem('trail-bookmarks', JSON.stringify(bookmarkStored))
    });
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

async function applyRenderer (exp, featureLayer) {
  const [UniqueValueRenderer] = await loadModules([
    'esri/renderers/UniqueValueRenderer'
  ]);

  const renderer = new UniqueValueRenderer({
    valueExpression: exp,
    uniqueValueInfos: [{
      value: 'true',
      symbol: sym1,
      label: "cim"
    }
  ]
  });

  featureLayer.renderer = renderer;
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

  const ids = await layer.queryObjectIds(query.clone());
  const arcade = `
     if(indexof([` + ids + `], $feature.FID) != -1){
      // Apply a certain symbol
      return true;
    }
    else {
      // Or, apply a different symbol
      return false;
    } `
  applyRenderer(arcade, layer);

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
    excludedEffect: 'grayscale(25%) opacity(35%)'
  };
}