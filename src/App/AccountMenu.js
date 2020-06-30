import React from 'react';

import ArcgisAccount, {
  ArcgisAccountMenuItem,
} from 'calcite-react/ArcgisAccount';

const AccountMenu = ({ user }) => {
  return (
    <ArcgisAccount
      user={user.arcgis_user}
      portal={user.portal || {}}
      token={user.session._token}
      hideSwitchAccount={true}
      onRequestSignOut={() => console.log('logout()')}
    >
      <ArcgisAccountMenuItem
        onClick={() => console.log('Profile & Settings clicked')}
      >
        Profile & Settings
      </ArcgisAccountMenuItem>
      <ArcgisAccountMenuItem onClick={() => console.log('My Esri clicked')}>
        My Esri
      </ArcgisAccountMenuItem>
      <ArcgisAccountMenuItem onClick={() => console.log('Training clicked')}>
        Training
      </ArcgisAccountMenuItem>
      <ArcgisAccountMenuItem
        onClick={() => console.log('Community & Forums clicked')}
      >
        Community & Forums
      </ArcgisAccountMenuItem>
      <ArcgisAccountMenuItem
        onClick={() => console.log('ArcGIS Online clicked')}
      >
        ArcGIS Online
      </ArcgisAccountMenuItem>
    </ArcgisAccount>
  );
};

export default AccountMenu;
