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
