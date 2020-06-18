import { loadModules, loadCss } from "esri-loader";

const app = {};
const trailheadRenderer = {
  type: "simple",
  symbol: {
    type: "web-style",
    name: "trail",
    styleName: "Esri2DPointSymbolsStyle"
  }
}
const trailSym = {
  type: "cim",
  // CIM Line Symbol
  data: {
    type: "CIMSymbolReference",
    symbol: {
      type: "CIMLineSymbol",
      symbolLayers: [
        {
          // white dashed layer at center of the line
          type: "CIMSolidStroke",
          effects: [
            {
              type: "CIMGeometricEffectDashes",
              dashTemplate: [2, 2, 2, 2], // width of dashes and spacing between the dashes
              lineDashEnding: "NoConstraint",
              controlPointEnding: "NoConstraint",
            },
          ],
          enable: "true", // must be set to true in order for the symbol layer to be visible
          capStyle: "Butt",
          joinStyle: "Round",
          width: 1,
          color: [255, 255, 255, 255],
        },
        {
          // lighter green line layer that surrounds the dashes
          type: "CIMSolidStroke",
          enable: "true",
          capStyle: "Butt",
          joinStyle: "Round",
          width: 3,
          color: [56, 168, 0, 255],
        },
        {
          // darker green outline around the line symbol
          type: "CIMSolidStroke",
          enable: true,
          capStyle: "Butt",
          joinStyle: "Round",
          width: 6,
          color: [0, 115, 76, 255],
        },
      ],
    },
  },
};

export async function initWebMap() {
  const [
    WebMap,
    Bookmark,
    ElevationLayer,
    FeatureLayer,
    GraphicsLayer,
    TileLayer,
    GroupLayer,
  ] = await loadModules([
    "esri/WebMap",
    "esri/webmap/Bookmark",
    "esri/layers/ElevationLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/layers/TileLayer",
    "esri/layers/GroupLayer",
  ]);

  const bookmarksLocal =
    JSON.parse(localStorage.getItem("trail-bookmarks")) || [];

  const webmap = new WebMap({
    portalItem: {
      id: "8744e84b32e74bffb34b0b1edf0c3d60",
    },
    bookmarks: bookmarksLocal.map((a) => Bookmark.fromJSON(a)),
  });

  const elevationLayer = new ElevationLayer({
    url:
      "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer/",
  });

  await elevationLayer.load();

  const trailLayer = new GraphicsLayer({ id: "trail" });

  const terrainLayer = new TileLayer({
    blendMode: "source-in",
    portalItem: {
      id: "99cd5fbd98934028802b4f797c4b1732",
    },
    opacity: 1,
  });

  const groupLayer = new GroupLayer({
    id: "group",
    layers: [trailLayer, terrainLayer],
  });

  webmap.add(groupLayer);

  app.elevationLayer = elevationLayer;
  app.webmap = webmap;

  await webmap.load();
  webmap.layers.forEach((layer) => {
    console.log(layer.title, layer.id);
  });
  // trailheads layer
  const layer = webmap.findLayerById("17275f72a2b-layer-0");
  await layer.load();
  console.log("popup template", layer.popupTemplate);
  layer.popupTemplate.actions = layer.popupTemplate.actions || [];
  layer.popupTemplate.actions.push({
    id: "fetch-directions",
    title: "Directions",
    className: "esri-icon-directions",
  });
  layer.visible = true;

  return webmap;
}

export async function initView(container) {
  loadCss();
  const [MapView, BasemapToggle, Bookmarks, Expand] = await loadModules([
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Bookmarks",
    "esri/widgets/Expand",
  ]);

  const view = new MapView({
    map: app.webmap,
    container,
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
        height: 100,
      },
    },
  });

  const bookmarksExpand = new Expand({
    content: bookmarks,
  });

  view.ui.add(toggle, "bottom-right");
  view.ui.add(bookmarksExpand, "top-right");

  app.view = view;

  app.view.popup.actions.add({
    id: "query-elevation",
    title: "Elevation",
  });

  app.view.when(() => {
    // set up bookmarks
    bookmarks.bookmarks.on("change", ({ added }) => {
      const bookmarJson = added.map((x) => x.toJSON());
      let bookmarkStored =
        JSON.parse(localStorage.getItem("trail-bookmarks")) || [];
      localStorage.removeItem("trail-bookmarks");
      bookmarkStored = bookmarkStored.concat(bookmarJson);
      localStorage.setItem("trail-bookmarks", JSON.stringify(bookmarkStored));
    });
  });

  app.view.popup.on("trigger-action", ({ action }) => {
    if (action.id === "query-elevation") {
      const { selectedFeature } = app.view.popup;
      app.elevationLayer
        .queryElevation(selectedFeature.geometry)
        .then((result) => {
          console.log("elevation result", result);
          console.log(calculateAltitudeGainLoss(result.geometry.paths));
        });
    }
  });

  return view;
}

const calculateAltitudeGainLoss = (paths) => {
  let gain = 0;
  let loss = 0;
  console.log("paths ", paths);
  for(let i = 0; i < paths[0].length - 1; i++){
    console.log("p ", paths[0][i][2]);
    const diff = paths[0][i][2] - paths[0][i+1][2];
    console.log('diff ', diff);
    if(Math.sign(diff) == 1){
      gain += diff;
    }
    else {
      loss += diff;
    }
  }
  return {
    gain: gain,
    loss: loss
  }
}

const applyTrailRenderer = (exp) => {
  const renderer = {
    type: "unique-value",
    valueExpression: exp,
    uniqueValueInfos: [
      {
        value: true,
        symbol: trailSym,
        label: "cim",
      },
    ],
  };
  return renderer;
}

export async function fetchMaxElevation() {
  if (!app.webmap) {
    return;
  }
  const maxStat = {
    statisticType: "max",
    onStatisticField: "max_elevat",
    outStatisticFieldName: "Max_Elevation",
  };
  const layer = app.webmap.layers.getItemAt(1); // could be better

  await layer.load();
  const query = layer.createQuery();
  query.where = "1=1";
  query.outStatistics = [maxStat];
  const results = await layer.queryFeatures(query);
  const elev = results.features[0].attributes["Max_Elevation"];
  return elev;
}

export async function fetchTrails(elevation, { dogs, bike, horse }) {
  const [min, max] = elevation;
  if (!app.webmap) return;
  await app.webmap.load();
  const layer = app.webmap.layers.getItemAt(1); // could be better
  layer.outFields = ["name", "name_1"];
  await layer.load();
  const query = layer.createQuery();
  query.returnDistinct = true;
  query.outFields = ["*"];
  query.where = `(min_elevat > ${min} AND max_elevat < ${max}) AND ${
    dogs ? "(dogs <> 'no' AND dogs <> ' ')" : "(dogs = 'no' OR dogs = ' ')"
  } AND ${
    bike ? "(bike <> 'no'  AND bike <> ' ')" : "(bike = 'no' OR bike = ' ')"
  } AND ${
    dogs ? "(horse <> 'no'  AND horse <> ' ')" : "(horse = 'no' OR horse = ' ')"
  }`;
  const { features } = await layer.queryFeatures(query);
  return { features };
}

export async function filterMapData(names) {
  if (!app.webmap) return;
  const [{ whenFalseOnce }, geometryEngine] = await loadModules([
    "esri/core/watchUtils",
    "esri/geometry/geometryEngine",
  ]);

  const where = `FID in (${names.join(",")})`;

  await app.webmap.load();
  const layer = app.webmap.layers.getItemAt(1); // could be better
  layer.outFields = ["*"];
  await layer.load();
  await app.view.when();
  const layerView = await app.view
    .whenLayerView(layer)
    .catch((err) => console.log(err.message));
  if (!layerView) return;

  await whenFalseOnce(layerView, "updating");
  const query = layer.createQuery();
  query.where = where;
  const { features } = await layer.queryFeatures(query);

  console.log('features ', features);

  const ids = await layer.queryObjectIds(query.clone());
  const arcade =
    `
     if(indexof([` +
    ids +
    `], $feature.FID) != -1){
      return true;
    }
    else {
      return false;
    } 
  `;

  console.log("applyRenderer", layer);
  const renderer = applyTrailRenderer(arcade);
  layer.renderer = renderer;

  const groupLayer = app.webmap.findLayerById("group");
  const trailLayer = app.webmap.findLayerById("trail");
  const trailHeadsLayer = app.webmap.layers.getItemAt(3); // figure out Id?
  trailHeadsLayer.renderer = trailheadRenderer;

  const geometry = geometryEngine.union(
    geometryEngine.buffer(
      features.map((x) => x.geometry),
      1,
      "miles"
    )
  );
  trailLayer.add({
    attributes: {},
    geometry,
    symbol: {
      type: "simple-fill",
      outline: { color: [255, 255, 255, 1] },
      color: [255, 255, 255, 0.5],
    },
  });

  groupLayer.visible = true;
  app.webmap.basemap.visible = false;
  await app.view.goTo(geometry);
  layerView.effect = {
    filter: {
      where,
    },
    excludedEffect: "grayscale(25%) opacity(35%)",
  };
}
