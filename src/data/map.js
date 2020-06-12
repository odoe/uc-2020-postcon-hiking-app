import { loadModules, loadCss } from "esri-loader";

const app = {};
const sym1 = {
  type: "cim",
  // CIM Line Symbol
  data: {
    type: "CIMLineSymbol",
    symbolLayers: [
      {
        // white dashed layer at center of the line
        type: "CIMSolidStroke",
        effects: [
          {
            type: "CIMGeometricEffectDashes",
            dashTemplate: [2, 2, 2, 2],
            lineDashEnding: "NoConstraint",
            controlPointEnding: "NoConstraint",
          },
        ],
        enable: "true",
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
    bookmarks.bookmarks.on("change", ({ added }) => {
      const bookmarJson = added.map((x) => x.toJSON());
      console.log(bookmarJson);
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
        });
    }
  });

  return view;
}

async function applyRenderer(exp, featureLayer) {
  const [UniqueValueRenderer] = await loadModules([
    "esri/renderers/UniqueValueRenderer",
  ]);

  const renderer = new UniqueValueRenderer({
    valueExpression: exp,
    uniqueValueInfos: [
      {
        value: "true",
        symbol: sym1,
        label: "cim",
      },
    ],
  });

  featureLayer.renderer = renderer;
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
  console.log(results);
  const elev = results.features[0].attributes["Max_Elevation"];
  console.log("elevation", elev);
  return elev;
}

export async function fetchTrails(elevation, { dogs, bike, horse }) {
  const [min, max] = elevation;
  await app.webmap.load();
  const layer = app.webmap.layers.getItemAt(1); // could be better

  await layer.load();
  const query = layer.createQuery();
  query.where = `(min_elevat > ${min} AND max_elevat < ${max}) AND ${dogs ? "(dogs <> 'no' AND dogs <> ' ')" : "(dogs = 'no' OR dogs = ' ')"} AND ${bike ? "(bike <> 'no'  AND bike <> ' ')" : "(bike = 'no' OR bike = ' ')"} AND ${dogs ? "(horse <> 'no'  AND horse <> ' ')" : "(horse = 'no' OR horse = ' ')"}`;
  const { features } = await layer.queryFeatures(query);
  console.log('elevation results', features);
  return { features };
  // const ids = await layer.queryObjectIds(query.clone());
}

export async function filterMapData(names) {
  const [{ whenFalseOnce }, geometryEngine] = await loadModules([
    "esri/core/watchUtils",
    "esri/geometry/geometryEngine",
  ]);
  await app.webmap.load();
  const layer = app.webmap.layers.getItemAt(1); // could be better

  await layer.load();
  const layerView = await app.view.whenLayerView(layer);
  await whenFalseOnce(layerView, "updating");
  const query = layer.createQuery();
  query.where = `name in ('${names.join("','")}')`;
  const { features } = await layer.queryFeatures(query);

  const ids = await layer.queryObjectIds(query.clone());
  const arcade =
    `
     if(indexof([` +
    ids +
    `], $feature.FID) != -1){
      // Apply a certain symbol
      return true;
    }
    else {
      // Or, apply a different symbol
      return false;
    } `;
  applyRenderer(arcade, layer);

  const groupLayer = app.webmap.findLayerById("group");
  const trailLayer = app.webmap.findLayerById("trail");
  console.log(trailLayer);

  const geometry = geometryEngine.union(
    geometryEngine.buffer(
      features.map((x) => x.geometry),
      2,
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
      where: `name in ('${names.join("','")}')`,
    },
    excludedEffect: "grayscale(25%) opacity(35%)",
  };
}
