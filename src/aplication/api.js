import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import Axios from 'axios';

const apiBase = 'https://asesores.segurospiramide.com/asg-api/dbo/budgets';

// CREATE
export const createInspection = async (obj) => {
  const colRef = collection(db, 'inspections');
  const data = await addDoc(colRef, obj);
  return data.id;
};

// UPDATE
export const updateItem = async (id, obj) => {
  const colRef = collection(db, 'inspections');
  await updateDoc(doc(colRef, id), obj);
};

// READ
export const getInspections = async (setListInspection) => {
  const colRef = collection(db, 'inspections');
  const result = await getDocs(query(colRef));
  setListInspection(getArrayFromCollection(result));
  return getArrayFromCollection(result);
};

// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta
export const getItemsByCondition = async (value) => {
  const colRef = collection(db, 'inspections');
  const result = await getDocs(query(colRef, where('age', '==', value)));
  return getArrayFromCollection(result);
};

export const getItemById = async (id) => {
  const colRef = collection(db, 'inspections');
  const result = await getDoc(doc(colRef, id));
  return result.data();
};

// DELETE
export const deleteItem = async (id) => {
  const colRef = collection(db, 'inspections');
  await deleteDoc(doc(colRef, id));
};

const getArrayFromCollection = (collection) => {
  return collection.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

export const getAutoYears = async (setArrayYears) => {
  try {
    let response = await Axios.post(`${apiBase}/get_years`);

    setArrayYears(response.data.p_years);
  } catch (error) {
    console.error(error);
  }
};
