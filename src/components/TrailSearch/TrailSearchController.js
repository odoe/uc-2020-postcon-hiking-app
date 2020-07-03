import { loadModules } from 'esri-loader';

const init = async ({ view }) => {
  const [SearchViewModel, Locator] = await loadModules([
    'esri/widgets/Search/SearchViewModel',
    'esri/tasks/Locator',
  ]);
  const vm = new SearchViewModel({
    view,
    includeDefaultSources: false,
    sources: [
      {
        locator: new Locator({
          url:
            'https://utility.arcgis.com/usrsvcs/servers/b34c620191be4b6f9c25576a9758bfdb/rest/services/World/GeocodeServer',
        }),
        singleLineFieldName: 'SingleLine',
        name: 'Colorado Search',
        placeholder: 'Search Colorado',
        maxResults: 3,
        maxSuggestions: 6,
        minSuggestCharacters: 0,
      },
    ],
  });
  return vm;
};

const suggest = async ({ vm, value }) => {
  const suggestResponse = await vm.suggest(value);
  return suggestResponse.results[0].results;
};

export { init, suggest };
