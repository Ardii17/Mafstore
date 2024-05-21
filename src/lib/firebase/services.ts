import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { StaticRequire } from "next/dist/shared/lib/get-img-props";

const firestore = getFirestore(app);
const storage = getStorage(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data: any = snapshot.data();
  data.id = snapshot.id;
  return data;
}

export async function retrieveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function addData(
  collectionName: string,
  data: any,
  callback: Function
) {
  await addDoc(collection(firestore, collectionName), data).then((res) => {
    callback(true, res.path);
  });
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  callback: Function
) {
  await updateDoc(doc(firestore, collectionName, id), data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteData(
  collectionName: string,
  id: string,
  callback: Function
) {
  await deleteDoc(doc(firestore, collectionName, id))
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function uploadImage(
  id: string,
  newName: string,
  collection: string,
  file: any,
  callback: Function
) {
  if (file.size < 1048576) {
    const storageRef = ref(storage, `images/${collection}/${id}/${newName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        callback(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          callback(true, downloadURL);
        });
      }
    );
  } else {
    callback(false);
  }
}

export async function getPictureFromStorage(folderName: string) {
  const storageRef = ref(storage, `/images/${folderName}`);
  try {
    const res = await listAll(storageRef);
    const urls = await Promise.all(
      res.items.map((item: any) =>
        getDownloadURL(item).then((downloadUrl: string) => ({
          link: downloadUrl,
          name: item.name,
        }))
      )
    );
    return urls;
  } catch (error) {
    console.log(error);
  }
}
