import {Firestore} from '@google-cloud/firestore';

const db = new Firestore();
const collection = db.collection('notifications');

export async function getNotificationsByShopId(shopId) {
  const notificationsSnapshot = await collection.where('shopId', '==', shopId).get();

  return notificationsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
}

export async function syncNotifications(notifications) {
  const batch = db.batch();
  notifications.forEach(notification => {
    batch.set(collection.doc(), notification, {merge: true});
  });
  return batch.commit();
}
