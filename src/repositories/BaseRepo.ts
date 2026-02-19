import {
  addDoc,
  type CollectionReference,
  type DocumentData,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  type QueryConstraint,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import type { Doc } from "../entities";

type DocWithDatetime = Omit<Doc, "datetime"> & {
  expenseDate?: Date | Timestamp;
  datetime?: Date | Timestamp;
};

export abstract class BaseRepo<T extends Doc> {
  constructor(private ref: CollectionReference) {}

  protected async queryDocs(
    constraints: QueryConstraint[] = [],
    orderByField = "datetime",
  ) {
    constraints = [
      where("owner", "==", this.getOwner()),
      ...constraints,
      orderBy(orderByField, "desc"),
    ];

    const snapshot = await getDocs(query(this.ref, ...constraints));

    return snapshot.docs.map<T>((item) => this.mapTimestampsToDate(item));
  }

  async save(item: T) {
    const data = this.mapDatesToTimestamp(item);
    return data.id ? this.updateItem(data) : this.addItem(data);
  }

  async delete(id: string) {
    return deleteDoc(doc(this.ref, id));
  }

  // Private methods

  private addItem(item: DocWithDatetime) {
    const data = { ...item, owner: this.getOwner(), datetime: Timestamp.now() };
    return addDoc(this.ref, data);
  }

  private updateItem(item: DocWithDatetime) {
    const data = { ...item, datetime: Timestamp.now() };
    delete data.id;
    return updateDoc(doc(this.ref, item.id), data);
  }

  private getOwner() {
    const user = sessionStorage.getItem("wallet_user");
    const uid = user && JSON.parse(user).uid;
    if (!uid) {
      sessionStorage.removeItem("wallet_user");
      throw new Error("User not authenticated");
    }
    return uid;
  }

  private mapTimestampsToDate(item: DocumentData) {
    const data = item.data();
    if (data.datetime) {
      data.datetime = (data.datetime as Timestamp).toDate();
    }
    if (data.expenseDate) {
      data.expenseDate = (data.expenseDate as Timestamp).toDate();
    }
    return { id: item.id, ...data } as T;
  }

  private mapDatesToTimestamp(item: Doc) {
    const data: DocWithDatetime = { ...item };
    if (data.datetime) {
      data.datetime = Timestamp.fromDate(data.datetime as Date);
    }
    if (data.expenseDate) {
      data.expenseDate = Timestamp.fromDate(data.expenseDate as Date);
    }
    return data;
  }
}
