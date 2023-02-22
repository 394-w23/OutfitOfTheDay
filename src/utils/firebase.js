import { useEffect, useState, useCallback } from "react";
import { getDatabase, onValue, ref, update } from "firebase/database";
import {
  getStorage,
  ref as sRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCXfdPxRt8Qvi3AZsXu1lxl9VJXuRlga_8",
  authDomain: "outfitoftheday-c3adf.firebaseapp.com",
  databaseURL: "https://outfitoftheday-c3adf-default-rtdb.firebaseio.com",
  projectId: "outfitoftheday-c3adf",
  storageBucket: "outfitoftheday-c3adf.appspot.com",
  messagingSenderId: "160151796856",
  appId: "1:160151796856:web:510e79243373c60cd0c18d",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const storage = getStorage(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useStorageUpdate = (path) => {
  const [result, setResult] = useState();

  const useStorage = useCallback(
    (file) => {
      const storageRef = sRef(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setResult(url);
          });
        }
      );
    },
    [path]
  );

  return [useStorage, result];
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [path]
  );
  return [updateData, result];
};

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return [user];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut, database };
