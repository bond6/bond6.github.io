import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLabel } from '@ionic/react';
import { isPlatform, getPlatforms } from '@ionic/react';
import * as serviceWorker from '../serviceWorker';

import './Home.css';

var isNative = getPlatforms().includes('capacitor');

const Info: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(function() {
    var onOnline = function() { setIsOnline(true); };
    var onOffline = function() { setIsOnline(false); };
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return function() {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{"--background": "#f2f2f7"}}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="info-card">
          <h3>Citrus MRL</h3>
          <p>
            Maximum Residue Limit (MRL) reference tool for the citrus industry.
            Look up approved active ingredients, MRL values, and registered products
            across 13 countries for 5 citrus fruit types.
          </p>
        </div>

        <div className="info-card">
          <h3>How to Use</h3>
          <p>
            1. Select a citrus fruit type{'\n'}
            2. Choose one or more import countries{'\n'}
            3. Tap Submit to see the lowest applicable MRL values{'\n'}
            4. Save frequent searches to Favorites for quick access
          </p>
        </div>

        <div className="info-card">
          <h3>Data Source</h3>
          <p>
            MRL data is sourced from official regulatory databases and updated periodically.
            Data is stored locally for offline access.
          </p>
        </div>

        <div className="info-card">
          <h3>Status</h3>
          <p style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: isOnline ? '#34c759' : '#ff3b30',
              display: 'inline-block'
            }}></span>
            {isOnline ? 'Online — data up to date' : 'Offline — using saved data'}
          </p>
        </div>

        <div className="info-card">
          <h3>Quick Links</h3>
          <p>
            <IonButton expand="block" color="primary" style={{"--border-radius": "10px", marginBottom: "8px"}}
              onClick={function() { window.open("http://icaonline.co.za",'_system', 'location=yes'); }}>
              <IonLabel>ICA Website</IonLabel>
            </IonButton>
            <IonButton expand="block" color="medium" style={{"--border-radius": "10px"}}
              onClick={function() { serviceWorker.unregister(); window.location.href = window.location.origin; window.location.reload(); }}>
              <IonLabel>Force Update</IonLabel>
            </IonButton>
          </p>
        </div>

        <div className="info-card">
          <h3>Disclaimer</h3>
          <p style={{color: '#ff3b30', fontSize: '13px'}}>
            No guarantees are given that the MRL data is correct at time of use.
            It is the user's responsibility to be familiar with the latest MRL
            requirements of their markets.
          </p>
        </div>

        <div className="info-version">
          Citrus MRL V6.0<br/>
          &copy; ICA International Chemicals
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Info;
