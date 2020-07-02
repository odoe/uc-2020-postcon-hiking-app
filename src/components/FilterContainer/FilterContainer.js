// Framework and third-party non-ui
import React from 'react';

// App components
import FilterSelect from 'components/FilterSelect';

// JSON & Styles
import { StyledFilterContainer } from './FilterContainer-styled';

// Third-party components (buttons, icons, etc.)
import Search from 'calcite-react/Search';
import { FormControl, FormControlLabel } from 'calcite-react/Form';

const FilterContainer = () => {
  return (
    <StyledFilterContainer data-testid="FilterContainer">
      <FormControl noValidation>
        <Search />
      </FormControl>
      <FormControl noValidation horizontal>
        <FormControlLabel>Difficulty</FormControlLabel>
        <FilterSelect options={difficultyOptions} />
      </FormControl>
      <FormControl noValidation horizontal>
        <FormControlLabel>Distance</FormControlLabel>
        <FilterSelect options={distanceOptions} />
      </FormControl>
      <FormControl noValidation horizontal>
        <FormControlLabel>Elevation Gain</FormControlLabel>
        <FilterSelect options={gainOptions} />
      </FormControl>
      <FormControl noValidation horizontal>
        <FormControlLabel>Trail Type</FormControlLabel>
        <FilterSelect options={typeOptions} />
      </FormControl>
    </StyledFilterContainer>
  );
};

export default FilterContainer;

const difficultyOptions = [
  { value: '0', label: 'Easy' },
  { value: '1', label: 'Medium' },
  { value: '2', label: 'Hard' },
];

const distanceOptions = [
  { value: '0', label: 'Short' },
  { value: '1', label: 'Medium' },
  { value: '2', label: 'Long' },
];

const gainOptions = [
  { value: '0', label: 'A little' },
  { value: '1', label: 'A lot' },
];

const typeOptions = [
  { value: '0', label: 'Paved' },
  { value: '1', label: 'Gravel' },
  { value: '2', label: 'Other' },
];
