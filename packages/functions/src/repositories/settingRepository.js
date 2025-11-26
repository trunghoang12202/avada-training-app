import {Firestore} from '@google-cloud/firestore';

const db = new Firestore();
const collection = db.collection('settings');

/**
 *
 * @param shopId
 * @returns {Promise<FirebaseFirestore.DocumentData|null>}
 */
export async function getSettingByShopId(shopId) {
  const settingsSnapshot = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (settingsSnapshot.empty) return null;
  return settingsSnapshot.docs[0].data();
}

/**
 *
 * @param shopId
 * @param data
 * @returns {Promise<(*&{id: string})|null>}
 */
export async function updateSettingByShopId(shopId, data) {
  const settingsSnapshot = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (settingsSnapshot.empty) return null;
  const settingsDoc = collection.doc(settingsSnapshot.docs[0].id);
  await settingsDoc.update(data);
  return {id: settingsDoc.id, ...settingsDoc.data(), ...data};
}

/**
 *
 * @param data
 * @returns {Promise<object>}
 */
export async function addDefaultSettings(data) {
  const shopSettings = await getSettingByShopId(data.shopId);

  if (shopSettings) return shopSettings;

  const created = await collection.add(data);
  return {id: created.id, ...data};
}
