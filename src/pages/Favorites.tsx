import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLabel } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { isPlatform, getPlatforms } from '@ionic/react';

import './Home.css';

var isNative = getPlatforms().includes('capacitor');

interface FavItem {
  fruit: string;
  countries: string[];
  savedAt: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavItem[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    var result = await Preferences.get({ key: 'favorites' });
    if (result.value) {
      try {
        setFavorites(JSON.parse(result.value));
      } catch(e) {}
    }
  };

  const removeFavorite = async (index: number) => {
    if (isNative) { try { await Haptics.impact({style: ImpactStyle.Light}); } catch(e){} }
    var updated = favorites.filter(function(_,i) { return i !== index; });
    setFavorites(updated);
    await Preferences.set({ key: 'favorites', value: JSON.stringify(updated) });
  };

  const loadFavorite = (fav: FavItem) => {
    if (isNative) { try { Haptics.impact({style: ImpactStyle.Medium}); } catch(e){} }
    // Store the favorite to load, then navigate to home
    Preferences.set({ key: 'loadFavorite', value: JSON.stringify(fav) });
    window.location.hash = '/home';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{"--background": "#f2f2f7"}}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Favorites</IonTitle>
          </IonToolbar>
        </IonHeader>

        {favorites.length === 0 ? (
          <div className="fav-empty">
            <div className="fav-empty-icon">&#9734;</div>
            <div className="fav-empty-title">No Favorites Yet</div>
            <div className="fav-empty-sub">
              Search for MRL data and tap the star to save your frequently used fruit and country combinations here.
            </div>
          </div>
        ) : (
          favorites.map(function(fav, i) {
            return (
              <div className="fav-card" key={i}>
                <div className="fav-card-info">
                  <div className="fav-card-fruit">{fav.fruit}</div>
                  <div className="fav-card-countries">{fav.countries.join(', ')}</div>
                </div>
                <div className="fav-card-actions">
                  <IonButton size="small" color="primary" onClick={function() { loadFavorite(fav); }}>
                    <IonLabel>Load</IonLabel>
                  </IonButton>
                  <IonButton size="small" color="medium" onClick={function() { removeFavorite(i); }}>
                    <IonLabel>Remove</IonLabel>
                  </IonButton>
                </div>
              </div>
            );
          })
        )}
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
