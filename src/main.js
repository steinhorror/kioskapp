import App from './App.svelte';
import Display from "./display/Display.svelte"

let app;
if(location.search == "?display=true") app = new Display({ target: document.body });
else app = new App({ target: document.body });

export default app;