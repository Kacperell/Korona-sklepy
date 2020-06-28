import coordinates from './partials/coordinates';
import dodajFormGodziny from './partials/dodajFormGodziny';
import addHomeScreen from './partials/addHomeScreen';
import dowoz from './partials/dowoz';
import mapa from './partials/mapa';


addHomeScreen();

dodajFormGodziny();
coordinates();
dowoz();
mapa();

/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worket.js');
}