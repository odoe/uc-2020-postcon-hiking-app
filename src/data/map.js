import { loadModules, loadCss, setDefaultOptions } from 'esri-loader';

const app = {};
let sym2 = {}; 
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
  const [WebMap, ElevationLayer, SimpleLineSymbol ] = await loadModules([
    'esri/WebMap',
    'esri/layers/ElevationLayer',
    'esri/symbols/SimpleLineSymbol',
  ]);

  sym2 = new SimpleLineSymbol({
    color: "blue",
    width: "1px",
    style: "solid"
  })  

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
  setDefaultOptions({ version: 'next' })
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

async function applyRenderer (exp, featureLayer) {
  const [UniqueValueRenderer] = await loadModules([
    'esri/renderers/UniqueValueRenderer'
  ]);
  console.log("sym2 ", sym2);
  const renderer = new UniqueValueRenderer({
    valueExpression: exp,
    uniqueValueInfos: [{
      value: 'true',
      symbol: sym1,
      label: "red"
    },
    {
      value: 'false',
      symbol: sym2,
      label: "blue"
    }]
  });

  featureLayer.renderer = renderer;
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
  const ids = await layer.queryObjectIds(query.clone());
  console.log(ids);
  const arcade = `
     if(indexof([` + ids + `], $feature.FID) != -1){
      // Apply a certain symbol
      return true;
    }
    else {
      // Or, apply a different symbol
      return false;
    } 
  `
  console.log(arcade);
  applyRenderer(arcade, layer);
  // layer.queryFeatures(query).then(function (results) {
  //   console.log(results.features);
  //   results.features.forEach( (e) => {
  //     e.clone();
  //     e.symbol = sym1;
  //   });
  // });  
  await app.view.goTo(extent);
  layerView.effect = {
    filter: {
      where: `manager = '${name}'`
    },
    excludedEffect: 'grayscale(25%) opacity(35%)'
  };
}