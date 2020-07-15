// Framework and third-party non-ui
import React from 'react';

// App components
import Breakpoint from 'App/Breakpoint';

// JSON & Styles
import {
  StyledTrailActions,
  Title,
  ButtonsContainer,
} from './TrailActions-styled';

// Third-party components (buttons, icons, etc.)
import Skeleton from 'react-loading-skeleton';
import Button from 'calcite-react/Button';
import SaveIcon from 'calcite-ui-icons-react/SaveIcon';
import ShareIcon from 'calcite-ui-icons-react/ShareIcon';
import TourIcon from 'calcite-ui-icons-react/TourIcon';
import EditIcon from 'calcite-ui-icons-react/AnnotateToolIcon';
import PhotoIcon from 'calcite-ui-icons-react/CameraIcon';
import PrintIcon from 'calcite-ui-icons-react/PrintIcon';

const TrailActions = ({ ready, trail }) => {
  const { name } = trail || { name: 'Where the streets have no name' };
  return (
    <StyledTrailActions data-testid="TrailActions">
      <Title>{ready ? name : <Skeleton width={200} />}</Title>
      <ButtonsContainer>
        <Button icon={<SaveIcon />} iconPosition="before">
          <Breakpoint name="desktop">Save</Breakpoint>
        </Button>
        <Button icon={<ShareIcon />} iconPosition="before">
          <Breakpoint name="desktop">Share</Breakpoint>
        </Button>
        <Button icon={<TourIcon />} iconPosition="before">
          <Breakpoint name="desktop">Directions</Breakpoint>
        </Button>
        <Button icon={<EditIcon />} iconPosition="before">
          <Breakpoint name="desktop">Suggest Edit</Breakpoint>
        </Button>
        <Button icon={<PhotoIcon />} iconPosition="before">
          <Breakpoint name="desktop">Upload Photo</Breakpoint>
        </Button>
        <Button icon={<PrintIcon />} iconPosition="before">
          <Breakpoint name="desktop">Print</Breakpoint>
        </Button>
      </ButtonsContainer>
    </StyledTrailActions>
  );
};

export default TrailActions;
