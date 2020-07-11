// Framework and third-party non-ui
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

// App components
import { MapContext } from 'contexts/MapContext';
import { init, suggest, search } from './TrailSearchController';

// JSON & Styles
import { StyledTrailSearch } from './TrailSearch-styled';

// Third-party components (buttons, icons, etc.)
import Search from 'calcite-react/Search';
import { ListItem, ListItemTitle, ListItemSubtitle } from 'calcite-react/List';
import GlobeIcon from 'calcite-ui-icons-react/GlobeIcon';
import WalkingIcon from 'calcite-ui-icons-react/WalkingIcon';
import CarIcon from 'calcite-ui-icons-react/CarIcon';
import PinIcon from 'calcite-ui-icons-react/PinIcon';

const TrailSearch = ({ ...rest }) => {
  const { mapView } = useContext(MapContext);
  const [vm, setVm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const history = useHistory();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

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
      const suggestions = await suggest({ vm, value: debouncedSearchTerm });
      setResults(suggestions);
    }
    if (vm && debouncedSearchTerm) {
      getSuggestions();
    }
  }, [vm, debouncedSearchTerm]);

  // Clear both the search term and results
  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
  };

  const getIcon = (source) => {
    switch (source) {
      case 'Trail':
        return <WalkingIcon size={32} />;
      case 'Trailhead':
        return <CarIcon size={32} />;
      case 'Place':
        return <PinIcon size={32} />;
      default:
        return <GlobeIcon size={32} />;
    }
  };

  // Handle Search's user actions
  const onUserAction = (inputValue) => {
    if (!inputValue) {
      return clearSearch();
    }

    if (inputValue === searchTerm) {
      return;
    }

    setSearchTerm(inputValue);
  };

  const onChange = async ({ value }) => {
    const result = await search({ vm, value });
    console.log(result);
    history.push('/details');
  };

  return (
    <StyledTrailSearch data-testid="TrailSearch">
      {/* TODO: How can we load the search before the mapView is ready...? */}
      <Search
        placeholder={vm ? 'Search...' : 'Loading...'}
        inputValue={searchTerm}
        onUserAction={onUserAction}
        onChange={onChange}
        onRequestClear={clearSearch}
        dataSourceConfig={{ label: 'text', value: 'text' }}
        remote
        {...rest}
      >
        {results.map((item) => {
          return (
            <ListItem
              key={item.key}
              value={item.suggestResult}
              label={item.text}
              leftNode={getIcon(item.source)}
            >
              <ListItemTitle>{item.text}</ListItemTitle>
              <ListItemSubtitle>{item.source}</ListItemSubtitle>
            </ListItem>
          );
        })}
      </Search>
    </StyledTrailSearch>
  );
};

export default TrailSearch;
