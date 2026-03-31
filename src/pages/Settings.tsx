import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonNote, IonIcon, IonButton, IonAlert, IonModal, IonSearchbar } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { isPlatform, getPlatforms } from '@ionic/react';
import { globeOutline, notificationsOutline, logoFacebook, linkOutline, flaskOutline, listOutline, newspaperOutline, refreshOutline, trashOutline, informationCircleOutline, shieldCheckmarkOutline, cloudDoneOutline } from 'ionicons/icons';
import * as serviceWorker from '../serviceWorker';
import './Home.css';

var isNative = getPlatforms().includes('capacitor');

// Country names (same as Home.tsx)
var sub_country: { [key: string]: any } = {"RSA":"RSA","Angola":"Codex A","Benin":"Codex A","Botswana":"Codex A","Canada":"Canada","China":"China","Codex A":"Codex A","Congo":"Codex A","EU":"EU","Gabon":"Codex A","Great Britain":"Great Britain","Hong Kong":"Hong Kong","Indonesia":"Indonesia","Japan":"Japan","Kenya":"Codex A","Korea":"Korea","Madagascar":"Codex A","Mali":"Codex A","Mauritius":"Codex A","Mauritania":"Codex A","Mozambique":"Codex A","Namibia":"Codex A","Philippines":"Codex A","Russia":"Russia","Reunion":"Codex A","Senegal":"Codex A","Seychelles":"Codex A","Singapore":"Codex A","Sudan":"Codex A","Taiwan":"Taiwan","Tanzania":"Codex A","USA":"USA","Vietnam":"Codex A","Malaysia":"Codex A"};
var allCountryNames = Object.keys(sub_country).filter(function(v, i, a) { return a.indexOf(v) === i; }).sort();

const Settings: React.FC = () => {
  const [homeCountry, setHomeCountry] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showClearAlert, setShowClearAlert] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  useEffect(function() {
    Preferences.get({ key: 'homeCountry' }).then(function(result) {
      if (result.value) { setHomeCountry(result.value); }
    });
    var onOnline = function() { setIsOnline(true); };
    var onOffline = function() { setIsOnline(false); };
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return function() {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  var selectCountry = async function(name: string) {
    setHomeCountry(name);
    await Preferences.set({ key: 'homeCountry', value: name });
    if (isNative) { try { Haptics.notification({type: 'SUCCESS' as any}); } catch(e){} }
    setShowCountryPicker(false);
    setCountrySearch('');
  };

  var clearFavorites = async function() {
    await Preferences.set({ key: 'favorites', value: '[]' });
    if (isNative) { try { Haptics.notification({type: 'SUCCESS' as any}); } catch(e){} }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{"--background": "#f2f2f7"}}>

        {/* GENERAL */}
        <div className="settings-section-header">GENERAL</div>
        <IonList className="settings-group" lines="full" mode="ios">
          <IonItem button detail onClick={function() { setShowCountryPicker(true); }}>
            <div className="settings-icon settings-icon-blue" slot="start"><IonIcon icon={globeOutline} /></div>
            <IonLabel>Home Country</IonLabel>
            <IonNote slot="end">{homeCountry || 'Not set'}</IonNote>
          </IonItem>
          <IonItem button detail href="/dosage">
            <div className="settings-icon settings-icon-green" slot="start"><IonIcon icon={flaskOutline} /></div>
            <IonLabel>Dosages (RSA)</IonLabel>
          </IonItem>
          <IonItem button detail href="/label">
            <div className="settings-icon settings-icon-purple" slot="start"><IonIcon icon={listOutline} /></div>
            <IonLabel>Products</IonLabel>
          </IonItem>
        </IonList>

        {/* QUICK LINKS */}
        <div className="settings-section-header">QUICK LINKS</div>
        <IonList className="settings-group" lines="full" mode="ios">
          <IonItem button detail onClick={function() { window.open("http://icaonline.co.za",'_system', 'location=yes'); }}>
            <div className="settings-icon settings-icon-teal" slot="start"><IonIcon icon={linkOutline} /></div>
            <IonLabel>ICA Website</IonLabel>
          </IonItem>
          <IonItem button detail onClick={function() { window.open("https://www.facebook.com/ICAInternationalChemicals/?rf=1585922241735402",'_system', 'location=yes'); }}>
            <div className="settings-icon settings-icon-blue" slot="start"><IonIcon icon={logoFacebook} /></div>
            <IonLabel>Facebook</IonLabel>
          </IonItem>
          <IonItem button detail onClick={function() { window.open("https://visualprojects.co.za/Info-Hub/ICA/",'_system', 'location=yes'); }}>
            <div className="settings-icon settings-icon-orange" slot="start"><IonIcon icon={newspaperOutline} /></div>
            <IonLabel>ICA Magazine</IonLabel>
          </IonItem>
        </IonList>

        {/* DATA */}
        <div className="settings-section-header">DATA</div>
        <IonList className="settings-group" lines="full" mode="ios">
          <IonItem button onClick={function() { serviceWorker.unregister(); window.location.href = window.location.origin; window.location.reload(); }}>
            <div className="settings-icon settings-icon-green" slot="start"><IonIcon icon={refreshOutline} /></div>
            <IonLabel>Force Update</IonLabel>
          </IonItem>
          <IonItem button className="destructive" onClick={function() { setShowClearAlert(true); }}>
            <div className="settings-icon settings-icon-red" slot="start"><IonIcon icon={trashOutline} /></div>
            <IonLabel color="danger">Clear Favorites</IonLabel>
          </IonItem>
          <IonItem>
            <div className="settings-icon settings-icon-gray" slot="start"><IonIcon icon={cloudDoneOutline} /></div>
            <IonLabel>Status</IonLabel>
            <IonNote slot="end" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: isOnline ? '#34c759' : '#ff3b30',
                display: 'inline-block'
              }}></span>
              {isOnline ? 'Online' : 'Offline'}
            </IonNote>
          </IonItem>
        </IonList>

        {/* LEGAL */}
        <div className="settings-section-header">LEGAL</div>
        <IonList className="settings-group" lines="full" mode="ios">
          <IonItem>
            <div className="settings-icon settings-icon-red" slot="start"><IonIcon icon={shieldCheckmarkOutline} /></div>
            <IonLabel className="ion-text-wrap" style={{fontSize: '13px', color: '#ff3b30', lineHeight: '1.4'}}>
              No guarantees are given that the MRL data is correct at time of use.
              It is the user's responsibility to be familiar with the latest MRL
              requirements of their markets.
            </IonLabel>
          </IonItem>
        </IonList>

        {/* ABOUT */}
        <div className="settings-section-header">ABOUT</div>
        <IonList className="settings-group" lines="full" mode="ios">
          <IonItem>
            <div className="settings-icon settings-icon-teal" slot="start"><IonIcon icon={informationCircleOutline} /></div>
            <IonLabel className="ion-text-wrap">
              <h2 style={{fontWeight: 600}}>Citrus MRL</h2>
              <p style={{fontSize: '14px', color: '#3a3a3c', marginTop: '4px'}}>
                Maximum Residue Limit reference tool for the citrus industry.
                Look up approved active ingredients, MRL values, and registered products
                across 13 countries for 5 citrus fruit types.
              </p>
            </IonLabel>
          </IonItem>
        </IonList>

        <div className="settings-version">
          Citrus MRL V6.0<br/>
          &copy; ICA International Chemicals
        </div>

        {/* Country picker modal */}
        <IonModal isOpen={showCountryPicker} onDidDismiss={function() { setShowCountryPicker(false); setCountrySearch(''); }}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Home Country</IonTitle>
              <IonButton slot="end" fill="clear" color="light" onClick={function() { setShowCountryPicker(false); setCountrySearch(''); }}>Done</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent style={{"--background": "#f2f2f7"}}>
            <IonSearchbar
              placeholder="Search countries..."
              value={countrySearch}
              onIonChange={function(e: any) { setCountrySearch(e.detail.value || ''); }}
              mode="ios"
              style={{padding: '8px'}}
            />
            <IonList>
              {allCountryNames
                .filter(function(name) {
                  if (countrySearch === '') return true;
                  return name.toLowerCase().indexOf(countrySearch.toLowerCase()) >= 0;
                })
                .map(function(name) {
                  return (
                    <IonItem
                      key={name}
                      button
                      onClick={function() { selectCountry(name); }}
                      lines="full"
                      style={name === homeCountry ? {"--background": "#e8f4fd"} : {}}
                    >
                      <IonLabel>
                        <h2 style={{fontWeight: name === homeCountry ? 700 : 400}}>{name}</h2>
                        {name === homeCountry && <p style={{color: '#007aff', fontSize: '12px'}}>Currently selected</p>}
                      </IonLabel>
                    </IonItem>
                  );
                })
              }
            </IonList>
          </IonContent>
        </IonModal>

        {/* Clear favorites confirmation */}
        <IonAlert
          isOpen={showClearAlert}
          onDidDismiss={function() { setShowClearAlert(false); }}
          header="Clear Favorites"
          message="Are you sure you want to remove all saved favorites?"
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'Clear', cssClass: 'danger', handler: clearFavorites }
          ]}
        />

      </IonContent>
    </IonPage>
  );
};

export default Settings;
