import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import { search, star, settingsOutline } from 'ionicons/icons';
import Home from './pages/Home';
import Dosage from './pages/Dosage';
import Label from './pages/Label';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactHashRouter basename='/'>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route path="/dosage" component={Dosage} exact={true} />
          <Route path="/label" component={Label} />
          <Route path="/favorites" component={Favorites} exact={true} />
          <Route path="/settings" component={Settings} exact={true} />
          <Route path="/info" render={() => <Redirect to="/settings" />} exact={true} />
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" mode="ios">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={search} />
            <IonLabel>MRL Lookup</IonLabel>
          </IonTabButton>
          <IonTabButton tab="favorites" href="/favorites">
            <IonIcon icon={star} />
            <IonLabel>Favorites</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactHashRouter>
  </IonApp>
);

export default App;
