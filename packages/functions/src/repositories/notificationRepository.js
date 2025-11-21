import {Firestore} from '@google-cloud/firestore';
import {Timestamp} from '@google-cloud/firestore/build/src';

const db = new Firestore();
const collection = db.collection('notifications');

/**
 *
 * @param shopId
 * @param options {{limit: number, sortOrder: string, nextCursor?: {ts:number,id:string}, prevCursor?: {ts:number,id:string}}}
 * @returns {Promise<{data: *[], pageInfo: {hasNext: boolean, hasPrev: boolean, nextCursor: null|undefined, prevCursor: null|undefined}}>}
 */
export async function getNotificationsByShopId(shopId, options) {
  const {limit = 2, sortOrder = 'desc', nextCursor, prevCursor} = options;

  let query = collection
    .where('shopId', '==', shopId)
    .orderBy('timestamp', sortOrder)
    .orderBy('__name__');

  let hasPrev = false;
  let hasNext = false;
  let nextOut = null;
  let prevOut = null;

  const nextTs = nextCursor ? Timestamp.fromMillis(Number(nextCursor.ts)) : null;
  const prevTs = prevCursor ? Timestamp.fromMillis(Number(prevCursor.ts)) : null;

  if (nextCursor) {
    hasPrev = true;
    prevOut = nextCursor;
    query = query.startAt(nextTs, nextCursor.id);
  }

  if (prevCursor) {
    hasNext = true;
    nextOut = prevCursor;
    query = query.endAt(prevTs, prevCursor.id).limitToLast(limit + 2);
  } else {
    query = query.limit(limit + 1);
  }

  const snap = await query.get();
  const docs = snap.docs;

  if (!prevCursor && docs.length > limit) {
    hasNext = true;
    const doc = docs[limit];
    nextOut = {
      ts: doc.data().timestamp.toMillis(),
      id: doc.id
    };
  }

  if (prevCursor && docs.length > limit + 1) {
    hasPrev = true;
    const index = docs.length - limit - 1;
    const doc = docs[index];
    prevOut = {
      ts: doc.data().timestamp.toMillis(),
      id: doc.id
    };
  }

  const realDocs = docs.slice(0, limit);

  const data = realDocs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate()
  }));

  return {
    data,
    pageInfo: {
      hasNext,
      hasPrev,
      nextCursor: hasNext ? nextOut : undefined,
      prevCursor: hasPrev ? prevOut : undefined
    }
  };
}

/**
 *
 * @param shopId
 * @returns {Promise<(*&{id: *})[]>}
 */
export async function getNotificationsWithoutOptions(shopId) {
  const snap = await collection.where('shopId', '==', shopId).get();
  return snap.docs.map(doc => ({...doc.data(), id: doc.id}));
}

/**
 *
 * @param notifications
 * @returns {Promise<FirebaseFirestore.WriteResult[]>}
 */
export async function syncNotifications(notifications) {
  const batch = db.batch();
  notifications.forEach(notification => {
    const {id: notificationId, ...notificationData} = notification;
    const docId = notificationId || db.collection('notifications').doc().id;
    const ref = collection.doc(docId);
    batch.set(ref, notificationData, {merge: true});
  });
  return batch.commit();
}

/**
 *
 * @param notification
 * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>}
 */
export async function addNotification(notification) {
  return await collection.add(notification);
}
