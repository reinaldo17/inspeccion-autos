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
export const updateInspection = async (id, obj) => {
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
  const result = await getDocs(query(colRef, where('placa', '===', value)));
  console.log(7, getArrayFromCollection(result));
  return getArrayFromCollection(result);
};

export const getItemById = async (
  id,
  setInspectionSelected,
  setOpenVehicle,
  setOpen
) => {
  setOpen(true);
  const colRef = collection(db, 'inspections');
  const result = await getDoc(doc(colRef, id));
  console.log(7, result.data());
  setInspectionSelected(result.data());
  setOpen(true);
  setTimeout(() => {
    setOpen(false);
    setOpenVehicle(true);
  }, 4500);
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

const getAutoMarksAdapter = (data) => {
  return {
    p_year: `${data}`,
  };
};

const getAutoModelsAdapter = (carYear, carMark) => {
  return {
    p_year: `${carYear}`,
    p_mark: `${carMark}`,
  };
};

const getAutoVersionsAdapter = (carYear, carMark, carModel) => {
  return {
    p_year: `${carYear}`,
    p_mark: `${carMark}`,
    p_model: `${carModel}`,
  };
};

const getAutoYearsPresenter = (data) => {
  if (data.type === 'error') {
    return {
      data: 'error',
      message:
        'No se ha podido obtener los años de los vehículos manera éxitosa',
    };
  }
  return {
    data: data.data.p_years,
    message: 'Se ha podido obtener los años de los vehículos manera éxitosa',
  };
};

const getAutoMarksPresenter = (data) => {
  if (data.type === 'error') {
    return {
      data: 'error',
      message:
        'No se ha podido obtener las marcas de los vehículos manera éxitosa',
    };
  }
  return {
    data: data.data.p_marks,
    message: 'Se ha podido obtener las marcas de los vehículos manera éxitosa',
  };
};

const getAutoModelsPresenter = (data) => {
  if (data.type === 'error') {
    return {
      data: 'error',
      message:
        'No se ha podido obtener los modelos de los vehículos manera éxitosa',
    };
  }
  return {
    data: data.data.p_models,
    message: 'Se ha podido obtener los modelos de los vehículos manera éxitosa',
  };
};

const getAutoVersionsPresenter = (data) => {
  if (data.type === 'error') {
    return {
      data: 'error',
      message:
        'No se ha podido obtener las versiones de los vehículos manera éxitosa',
    };
  }
  return {
    data: data.data.p_versions,
    message:
      'Se ha podido obtener las versiones de los vehículos manera éxitosa',
  };
};

const generateAutoBudgetPresenter = (data) => {
  if (data.type === 'error') {
    return {
      data: 'error',
      message:
        'No se ha podido generar la cotización de hogar de manera éxitosa.',
    };
  }
  return {
    data: data.data.p_budget_id,
    message: 'Se ha generado la cotización de auto de manera éxitosa',
  };
};

export const getAutoYears = async (setArrayYears) => {
  try {
    let response = await Axios.post(`${apiBase}/get_years`);

    setArrayYears(response.data.p_years);
  } catch (error) {
    console.error(error);
  }
};

export const getAutoMarks = async (carYear, setArrayMarks) => {
  try {
    let response = await Axios.post(
      `${apiBase}/get_marks`,
      getAutoMarksAdapter(carYear)
    );
    console.log(getAutoMarksPresenter(response));
    setArrayMarks(getAutoMarksPresenter(response).data);
    return getAutoMarksPresenter(response);
  } catch (error) {
    console.error(error);
  }
};

export const getAutoModels = async (carYear, carMark, setArrayModels) => {
  try {
    let response = await Axios.post(
      `${apiBase}/get_models`,
      getAutoModelsAdapter(carYear, carMark)
    );
    setArrayModels(getAutoModelsPresenter(response).data);
    return getAutoModelsPresenter(response);
  } catch (error) {
    console.error(error);
  }
};

export const getAutoVersions = async (
  carYear,
  carMark,
  carModel,
  setArrayVersion
) => {
  try {
    let response = await Axios.post(
      `${apiBase}/get_versions`,
      getAutoVersionsAdapter(carYear, carMark, carModel)
    );
    setArrayVersion(getAutoVersionsPresenter(response).data);
    return getAutoVersionsPresenter(response);
  } catch (error) {
    console.error(error);
  }
};

export const carColors = [
  'Azul',
  'Blanco',
  'Celeste',
  'Gris',
  'Marrón',
  'Negro',
  'Plateado',
  'Rojo',
  'Verde',
  'Amarillo',
  'Beige',
  'Bronce',
  'Burdeos',
  'Champagne',
  'Cobre',
  'Dorado',
  'Gris Oscuro',
  'Gris Plata',
  'Naranja',
  'Oro',
  'Púrpura',
  'Turquesa',
  'Verde Oscuro',
  'Otro',
];
