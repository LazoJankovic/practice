import { Store } from 'cx/data';
import { Url, History, Widget, startHotAppLoop, enableCultureSensitiveFormatting } from 'cx/ui';
import { Timing, Debug } from 'cx/util';

import './data/mock-api-service-worker';

enableCultureSensitiveFormatting();

//store
const store = new Store({
   data: {
      user: {
         firstName: 'Test',
         lastName: 'User',
         initials: 'TU',
         pictureUrl: 'https://source.unsplash.com/d-MfHM-jHwc/100x100/?face',
         email: 'test@example.com',
      },
   },
});

//Remove in the later stage of the project
window.store = store; /// for accessing store in console

//routing
//Url.setBaseFromScript("app*.js");
History.connect(store, 'url'); /// connect browser address with store url

//debug
Widget.resetCounter();
Timing.enable('app-loop');
Debug.enable('app-data'); ///show errors from Cx in console

//app loop
import Routes from './routes'; /// all routes from the app

startHotAppLoop(module, document.getElementById('app'), store, Routes); /// render the app in the elemnt with id='app', use the store and render Routes
/// allows us to refresh browser with any change
