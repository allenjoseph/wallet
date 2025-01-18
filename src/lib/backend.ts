import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  type UserInfo,
} from "firebase/auth";
import {
  CollectionReference,
  getAggregateFromServer,
  getDocs,
  getFirestore,
  orderBy,
  query,
  sum,
  Timestamp,
  where,
} from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import type { BaseDoc, Expense } from "./types";
import dayjs from "dayjs";
import { toTimestamp } from "./utils";

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
export const auth = getAuth();

const expensesRef = collection(db, "expenses");
const categoriesRef = collection(db, "categories");
const sourcesRef = collection(db, "sources");

export async function logIn() {
  return signInWithRedirect(auth, provider).catch((error) => {
    console.log({ error });
  });
}

export async function postAuth(user: UserInfo) {
  sessionStorage.setItem("wallet_user", JSON.stringify(user));
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
}

export async function logOut() {
  return signOut(auth)
    .then(() => {
      sessionStorage.removeItem("wallet_user");
    })
    .catch((error) => {
      console.log({ error });
    });
}

export async function getTotal() {
  const owner = getOwner();
  const snapshot = await getAggregateFromServer(
    query(
      expensesRef,
      where("owner", "==", owner),
      where("expenseDate", ">=", toTimestamp(dayjs().startOf("month").toDate()))
    ),
    { total: sum("amount") }
  );
  return snapshot.data().total;
}

export const saveExpense = saveItem.bind(null, expensesRef);
export const saveCategory = saveItem.bind(null, categoriesRef);
export const saveSource = saveItem.bind(null, sourcesRef);

async function saveItem(docRef: CollectionReference, item: any) {
  return item.id ? updateItem(docRef, item) : addItem(docRef, item);
}

async function addItem(docRef: CollectionReference, item: any) {
  const data = { ...item, owner: getOwner(), datetime: Timestamp.now() };
  return addDoc(docRef, data);
}

async function updateItem(docRef: CollectionReference, item: any) {
  const data = { ...item, datetime: Timestamp.now() };
  delete data.id;
  return updateDoc(doc(docRef, item.id), data);
}

export const getExpenses = () => getItems<Expense>(expensesRef, "expenseDate");
export const getCategories = () => getItems(categoriesRef);
export const getSources = () => getItems(sourcesRef);

async function getItems<T = BaseDoc>(
  docRef: CollectionReference,
  orderByField = "datetime"
): Promise<T[]> {
  const owner = getOwner();
  const docs = await getDocs(
    query(docRef, where("owner", "==", owner), orderBy(orderByField, "desc"))
  );
  return docs.docs.map((doc) => formatDoc(doc));
}

export const deleteExpense = deleteItem.bind(null, expensesRef);
export const deleteCategory = deleteItem.bind(null, categoriesRef);
export const deleteSource = deleteItem.bind(null, sourcesRef);

async function deleteItem(docRef: CollectionReference, id: string) {
  return deleteDoc(doc(docRef, id));
}

//#region utils functions

function getFirebaseConfig() {
  return JSON.parse(atob(import.meta.env.VITE_FIREBASE_CONFIG));
}

function getOwner() {
  const user = sessionStorage.getItem("wallet_user");
  const uid = user && JSON.parse(user).uid;
  !uid && logOut();

  return uid;
}

function formatDoc<T>(doc: any) {
  const data = doc.data();
  if (data.datetime) {
    data.datetime = (data.datetime as Timestamp).toDate();
  }
  if (data.expenseDate) {
    data.expenseDate = (data.expenseDate as Timestamp).toDate();
  }
  return { id: doc.id, ...data } as T;
}

//#endregion
