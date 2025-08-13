import {
  addDoc,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import type { Doc } from "../entities";

export class BaseRepository<T extends Doc> {
  constructor(private ref: CollectionReference) {}

  protected async queryDocs(
    constraints: QueryConstraint[] = [],
    orderByField = "datetime"
  ) {
    constraints = [
      where("owner", "==", this.getOwner()),
      ...constraints,
      orderBy(orderByField, "desc"),
    ];

    const snapshot = await getDocs(query(this.ref, ...constraints));

    return snapshot.docs.map((item) => this.formatDates(item));
  }

  async save(item: T) {
    return item.id ? this.updateItem(item) : this.addItem(item);
  }

  async delete(id: string) {
    return deleteDoc(doc(this.ref, id));
  }

  // Private methods

  private addItem(item: T) {
    const data = { ...item, owner: this.getOwner(), datetime: Timestamp.now() };
    return addDoc(this.ref, data);
  }

  private updateItem(item: T) {
    const data = { ...item, datetime: Timestamp.now() } as any;
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

  private formatDates(item: any) {
    const data = item.data();
    if (data.datetime) {
      data.datetime = (data.datetime as Timestamp).toDate();
    }
    if (data.expenseDate) {
      data.expenseDate = (data.expenseDate as Timestamp).toDate();
    }
    return { id: item.id, ...data } as T;
  }
}
