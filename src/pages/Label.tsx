import React, { useState }  from 'react';
import { IonBackButton,IonAlert,IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonItem, IonButton, IonLabel} from '@ionic/react';


import './Label.css';

const Label: React.FC = () => {
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
const [showAlert4, setShowAlert4] = useState(false);
const [showAlert5, setShowAlert5] = useState(false);
const [showAlert6, setShowAlert6] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Products</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={function() {window.open("https://www.icaonline.co.za/brandPages/citricure.html",'_system', 'location=yes');/*FullScreenImage.showImageURL('https://bond6.github.io/assets/img/labels/CitruCure1.jpg');*/}}><IonLabel>CitriCure</IonLabel></IonButton>
        </IonItem>
        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={() => setShowAlert1(true)}><IonLabel>EcoTizer</IonLabel></IonButton>
        </IonItem>
        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={function() {window.open("https://www.icaonline.co.za/brandPages/evolve480SC.html",'_system', 'location=yes');}}><IonLabel>Evolve 480 SC</IonLabel></IonButton>
        </IonItem>
        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={() => setShowAlert2(true)}><IonLabel>HyperCide</IonLabel></IonButton>
        </IonItem>
        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={function() {window.open("https://www.icaonline.co.za/brandPages/icaProchloraz450EC.html",'_system', 'location=yes');}}><IonLabel>ICA Prochloraz 450 EC</IonLabel></IonButton>
        </IonItem>
        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={function() {window.open("https://www.icaonline.co.za/brandPages/icaThiabendazole500SC.html",'_system', 'location=yes');}}><IonLabel>ICA Thiabendazole 500 SC</IonLabel></IonButton>
        </IonItem>
        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products"  onClick={function() {window.open("https://www.icaonline.co.za/brandPages/imaculate300.html",'_system', 'location=yes');}}><IonLabel>ImaCulate 300 EC</IonLabel></IonButton>
        </IonItem>
        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={function() {window.open("https://www.icaonline.co.za/brandPages/imazacure500EC.html",'_system', 'location=yes');}}><IonLabel>ImazaCure 500 EC</IonLabel></IonButton>
        </IonItem>
        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={() => setShowAlert3(true)}><IonLabel>ImazaCure 750 SG</IonLabel></IonButton>
        </IonItem>

        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={function() {window.open("https://www.icaonline.co.za/brandPages/propicure250EC.html",'_system', 'location=yes');}}><IonLabel>PropiCure 250 EC</IonLabel></IonButton>
        </IonItem>
        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={function() {window.open("https://www.icaonline.co.za/brandPages/propirly270EC.html",'_system', 'location=yes');}}><IonLabel>Propirly 270 EC</IonLabel></IonButton>
        </IonItem>

        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={() => setShowAlert4(true)}><IonLabel>Protector 400 SC</IonLabel></IonButton>
        </IonItem>


        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={() => setShowAlert5(true)}><IonLabel>Sporekill</IonLabel></IonButton>
        </IonItem>


        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={function() {window.open("https://www.icaonline.co.za/brandPages/strobicure250SC.html",'_system', 'location=yes');}}><IonLabel>StrobiCure 250 SC</IonLabel></IonButton>
        </IonItem>
        <IonItem>
            <IonButton expand="full" fill="clear"  color="dark" className="products" onClick={() => setShowAlert6(true)}><IonLabel>Teacher 230 SC</IonLabel></IonButton>
        </IonItem>
        <IonAlert
                  isOpen={showAlert1}
                  onDidDismiss={() => setShowAlert1(false)}
                  header={'EcoTizer'}
                  subHeader={'A broad spectrum disinfectant'}
                  buttons={[

            {
              text: 'Label and MSDS',
              handler: () => {
                window.open("https://www.icaonline.co.za/brandPages/ecotizer.html",'_system', 'location=yes');
                return false;
              },

            },
            {
              text: 'Test Kit Video',
              handler: () => {
                window.open("https://www.icaonline.co.za/vids/ICA_Ecotizer_Test_Kit_25_11_20.mp4",'_system', 'location=yes');
                return false;
              },

            },{
              text: 'Cancel',
              role: 'cancel',

            }
          ]}
          />

          <IonAlert
                          isOpen={showAlert2}
                          onDidDismiss={() => setShowAlert2(false)}
                          header={'HyperCide'}
                          subHeader={'Broad spectrum disinfectant.'}
                          buttons={[

                    {
                      text: 'Label and MSDS',
                      handler: () => {
                        window.open("https://www.icaonline.co.za/brandPages/HyperCide.html",'_system', 'location=yes');
                        return false;
                      },

                    },
                    {
                      text: 'Test Kit Video',
                      handler: () => {
                        window.open("https://www.icaonline.co.za/vids/hyperCideTestKit.mp4",'_system', 'location=yes');
                        return false;
                      },

                    },{
                      text: 'Cancel',
                      role: 'cancel',

                    }
                  ]}
                />

          <IonAlert
                          isOpen={showAlert3}
                          onDidDismiss={() => setShowAlert3(false)}
                          header={'ImazaCure 750 SG'}
                          subHeader={'A water soluble granule fungicide for post-harvest treatment of citrus.'}
                          buttons={[

                    {
                      text: 'Label and MSDS',
                      handler: () => {
                        window.open("https://www.icaonline.co.za/brandPages/imazacure750SG.html",'_system', 'location=yes');
                        return false;
                      },

                    },
                    {
                      text: 'Test Kit Video',
                      handler: () => {
                        window.open("https://www.icaonline.co.za/vids/firstMiniTitrationKit.mp4",'_system', 'location=yes');
                        return false;
                      },

                    },{
                      text: 'Cancel',
                      role: 'cancel',

                    }
                  ]}
                />

              <IonAlert
                              isOpen={showAlert4}
                              onDidDismiss={() => setShowAlert4(false)}
                              header={'Protector 400 SC'}
                              subHeader={'A suspension concentrate contact and translaminar fungicide for the control of various diseases in crops listed.'}
                              buttons={[

                        {
                          text: 'Label and MSDS',
                          handler: () => {
                            window.open("https://www.icaonline.co.za/brandPages/protector400SC.html",'_system', 'location=yes');
                            return false;
                          },

                        },
                        {
                          text: 'Test Kit Video',
                          handler: () => {
                            window.open("https://www.icaonline.co.za/vids/protectorTestKit.mp4",'_system', 'location=yes');
                            return false;
                          },

                        },{
                          text: 'Cancel',
                          role: 'cancel',

                        }
                      ]}
                    />
              <IonAlert
                              isOpen={showAlert5}
                              onDidDismiss={() => setShowAlert5(false)}
                              header={'Sporekill'}
                              subHeader={'A soluble concentrate contact bactericide and fungicide for the control of various diseases under crops as listed.'}
                              buttons={[

                        {
                          text: 'Label and MSDS',
                          handler: () => {
                            window.open("https://www.icaonline.co.za/brandPages/sporekillAct36.html",'_system', 'location=yes');
                            return false;
                          },

                        },
                        {
                          text: 'Test Kit Video',
                          handler: () => {
                            window.open("https://www.icaonline.co.za/vids/sporekillTestKit.mp4",'_system', 'location=yes');
                            return false;
                          },

                        },{
                          text: 'Cancel',
                          role: 'cancel',

                        }
                      ]}
                    />
              <IonAlert
                              isOpen={showAlert6}
                              onDidDismiss={() => setShowAlert6(false)}
                              header={'Teacher 230 SC'}
                              subHeader={'A contact suspension concentrate fungicide for the control of post-harvest diseases in various crops as listed.'}
                              buttons={[

                        {
                          text: 'Label and MSDS',
                          handler: () => {
                            window.open("https://www.icaonline.co.za/brandPages/teacher230SC.html",'_system', 'location=yes');
                            return false;
                          },

                        },
                        {
                          text: 'Test Kit Video',
                          handler: () => {
                            window.open("https://www.icaonline.co.za/vids/ICA_teacher_230_Test_kit_25_11_20.mp4",'_system', 'location=yes');
                            return false;
                          },

                        },{
                          text: 'Cancel',
                          role: 'cancel',

                        }
                      ]}
                    />
      </IonContent>
    </IonPage>
  );
};

export default Label;
