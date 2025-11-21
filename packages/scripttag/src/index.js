import DisplayManager from './managers/DisplayManager';
import ApiManager from './managers/ApiManager';

console.log('This is the script tag');

(async () => {
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const {
    notifications: {data: notificationsData},
    settings
  } = await apiManager.getNotifications();
  await displayManager.initialize({notifications: notificationsData, settings});
})();
