import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const {notifications, settings} = await makeRequest(
      `http://127.0.0.1:5001/avada-first-app-330f6/us-central1/apiClient/apiClient/notifications-with-setting?shopDomain=${shopifyDomain}`
      // `https://${appConfig.baseUrl}/apiClient/notifications-with-setting?shopDomain=${shopifyDomain}`
    );
    console.log(notifications);
    console.log(settings);
    return {notifications, settings};
  };
}
