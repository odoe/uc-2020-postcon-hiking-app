// Framework and third-party non-ui
import React, { useContext, useState, useEffect } from 'react';

// App components
import { MapContext } from 'contexts/MapContext';

// JSON & Styles
import { StyledTrailSearch } from './TrailSearch-styled';

// Third-party components (buttons, icons, etc.)
import Search from 'calcite-react/Search';
import { init, suggest } from './TrailSearchController';

const TrailSearch = ({ ...rest }) => {
  const { mapView } = useContext(MapContext);
  const [vm, setVm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function loadVM() {
      const vm = await init({ view: mapView });
      setVm(vm);
    }
    if (mapView) {
      loadVM();
    }
  }, [mapView]);

  useEffect(() => {
    async function getSuggestions() {
      const suggestions = await suggest({ vm, value: searchTerm });
      console.log(suggestions);
      setResults(suggestions);
    }
    if (vm && searchTerm) {
      getSuggestions();
    }
  }, [vm, searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
  };

  const onUserAction = (inputValue, selectedItemVal) => {
    if (!inputValue) {
      console.log('no input value!!!');
      clearSearch();
      return;
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
        {...rest}
      />
    </StyledTrailSearch>
  );
};

export default TrailSearch;
