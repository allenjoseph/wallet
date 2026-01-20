import { collection, CollectionReference } from "firebase/firestore";
import { BaseRepo } from "./BaseRepo";
import { db } from "../db";
import type { Category } from "../entities";

class CategoryRepo extends BaseRepo<Category> {
  constructor(ref: CollectionReference) {
    super(ref);
  }

  getAll() {
    return this.queryDocs();
  }
}

const ref = collection(db, "categories");
export const categoryRepo = new CategoryRepo(ref);
