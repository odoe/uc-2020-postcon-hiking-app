// Framework and third-party non-ui
import React, { useContext, useState, useEffect } from 'react';

// App components
import { MapContext } from 'contexts/MapContext';
import { init, suggest } from './TrailSearchController';

// JSON & Styles
import { StyledTrailSearch } from './TrailSearch-styled';

// Third-party components (buttons, icons, etc.)
import Search from 'calcite-react/Search';

const TrailSearch = ({ ...rest }) => {
  const { mapView } = useContext(MapContext);
  const [vm, setVm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // When the mapView is loaded from context, create a SearchViewModel
  useEffect(() => {
    async function loadVM() {
      const vm = await init({ view: mapView });
      setVm(vm);
    }
    if (mapView) {
      loadVM();
    }
  }, [mapView]);

  // When the search term changes, ask the view model for suggestions
  useEffect(() => {
    async function getSuggestions() {
      const suggestions = await suggest({ vm, value: searchTerm });
      setResults(suggestions);
    }
    if (vm && searchTerm) {
      getSuggestions();
    }
  }, [vm, searchTerm]);

  // Clear both the search term and results
  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
  };

  // Handle Search's user actions
  const onUserAction = (inputValue, selectedItemVal) => {
    if (!inputValue) {
      return clearSearch();
    }

    if (inputValue === searchTerm) {
      return;
    }

    setSearchTerm(inputValue);
  };

  return (
    <StyledTrailSearch data-testid="TrailSearch">
      {/* TODO: How can we load the search before the mapView is ready...? */}
      <Search
        placeholder={vm ? 'Search...' : 'Loading...'}
        inputValue={searchTerm}
        items={results}
        onUserAction={onUserAction}
        onRequestClear={clearSearch}
        dataSourceConfig={{ label: 'text', value: 'text' }}
        remote
        {...rest}
      />
    </StyledTrailSearch>
  );
};

export default TrailSearch;
