import React from 'react';
import { IonBackButton,IonButtons, IonContent,IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid  } from '@ionic/react';



import './Dosage.css';
const Dosage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Dosage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Dosages as registered in RSA:</IonTitle>
          </IonToolbar>
        </IonHeader>
            <IonGrid id="table_products">

               <IonRow class="headrow">
                  <IonCol class="col" size="4"> Product</IonCol>
                  <IonCol class="col" className="ion-align-self-center" size="8" >Dosage in 100 <span>&#8467;</span></IonCol>
               </IonRow>
               <IonRow class="headrow">
                  <IonCol class="col" size="4"></IonCol>
                  <IonCol class="col" size="4">Water Application</IonCol>
                  <IonCol class="col" size="4">Wax Application</IonCol>
               </IonRow>
               <IonRow class='row1'>
                  <IonCol class="col" size="4">CitriCure</IonCol>
                  <IonCol class="col" size="4">0.48 <span>&#8467;</span> </IonCol>
                  <IonCol class="col" size="4">-</IonCol>
               </IonRow>
               <IonRow class='row0'>
                  <IonCol class="col" size="4">EcoTizer</IonCol>
                  <IonCol class="col" size="4">2 <span>&#8467;</span>   </IonCol>
                  <IonCol class="col" size="4">-</IonCol>
               </IonRow>
               <IonRow class='row1'>
                  <IonCol class="col" size="4">Evolve 480 SC</IonCol>
                  <IonCol class="col" size="4">0.25 <span>&#8467;</span>   </IonCol>
                  <IonCol class="col" size="4">-</IonCol>
               </IonRow>
               <IonRow class='row0'>
                  <IonCol class="col" size="4">HyperCide</IonCol>
                  <IonCol class="col" size="4">0.1 - 0.2 <span>&#8467;</span>   </IonCol>
                  <IonCol class="col" size="4">-</IonCol>
               </IonRow>
               <IonRow class='row1'>
                  <IonCol class="col" size="4">ICA Prochloraz 450 EC</IonCol>
                  <IonCol class="col" size="4">0.33 <span>&#8467;</span>   </IonCol>
                  <IonCol class="col" size="4">-</IonCol>
               </IonRow>
               <IonRow class='row1'>
                  <IonCol class="col" size="4">ICA Thiabendazole 500 SC</IonCol>
                  <IonCol class="col" size="4">0.2 (Drench) - 0.4 (Bath) <span>&#8467;</span> </IonCol>
                  <IonCol class="col" size="4">0.8 <span>&#8467;</span> </IonCol>
               </IonRow>
               <IonRow class='row0'>
                  <IonCol class="col" size="4">ImaCulate 300 EC </IonCol>
                  <IonCol class="col" size="4">-</IonCol>
                  <IonCol class="col" size="4">1 <span>&#8467;</span> </IonCol>
               </IonRow>
               <IonRow class='row1'>
                  <IonCol class="col" size="4">ImazaCure 500 EC</IonCol>
                  <IonCol class="col" size="4">0.2 <span>&#8467;</span> </IonCol>
                  <IonCol class="col" size="4">0.4 - 0.6 <span>&#8467;</span> </IonCol>
               </IonRow>
               <IonRow class='row0'>
                  <IonCol class="col" size="4">ImazaCure 750 SG</IonCol>
                  <IonCol class="col" size="4">67 g</IonCol>
                  <IonCol class="col" size="4">-</IonCol>
               </IonRow>


               <IonRow class='row1'>
                  <IonCol class="col" size="4">PropiCure 250 EC</IonCol>
                  <IonCol class="col" size="4">0.24 <span>&#8467;</span> </IonCol>
                  <IonCol class="col" size="4">0.72 <span>&#8467;</span> </IonCol>
               </IonRow>
               <IonRow class='row0'>
                  <IonCol class="col" size="4">Propirly 270 EC</IonCol>
                  <IonCol class="col" size="4">0.5 <span>&#8467;</span> </IonCol>
                  <IonCol class="col" size="4">-</IonCol>
               </IonRow>
               <IonRow class='row0'>
                  <IonCol class="col" size="4">Protector 400 SC</IonCol>
                  <IonCol class="col" size="4">0.25 <span>&#8467;</span> </IonCol>
                  <IonCol class="col" size="4">1 <span>&#8467;</span> </IonCol>
               </IonRow>


               <IonRow class='row1'>
                  <IonCol class="col" size="4">Sporekill</IonCol>
                  <IonCol class="col" size="4">0.1 - 0.15 <span>&#8467;</span>  </IonCol>
                  <IonCol class="col" size="4">-</IonCol>
               </IonRow>


               <IonRow class='row0'>
                  <IonCol class="col" size="4">StrobiCure 250 SC</IonCol>
                  <IonCol class="col" size="4">0.45 <span>&#8467;</span>   </IonCol>
                  <IonCol class="col" size="4">-</IonCol>
               </IonRow>
               <IonRow class='row0'>
                  <IonCol class="col" size="4">Teacher 230 SC</IonCol>
                  <IonCol class="col" size="4">0.26 <span>&#8467;</span> </IonCol>
                  <IonCol class="col" size="4">1 - 2 <span>&#8467;</span> </IonCol>
               </IonRow>
            </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dosage;
