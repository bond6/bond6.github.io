import * as React from "react";
import ReactDOM from "react-dom";


import App from './App';
import * as serviceWorker from './serviceWorker';


//import store from "./store";

const rootElement = document.getElementById('root');
ReactDOM.render(

    <App />,
  rootElement
);

serviceWorker.register({
  onUpdate: async (registration: ServiceWorkerRegistration) => {
    await registration.unregister();
    window.location.reload();
  }
});

// Auto-check for updates every 30 minutes (keeps app fresh without manual button)
if ('serviceWorker' in navigator) {
  setInterval(() => {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        registration.update();
      }
    });
  }, 30 * 60 * 1000);
}
