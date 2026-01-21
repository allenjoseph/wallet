import { collection, CollectionReference } from "firebase/firestore";
import { BaseRepo } from "./BaseRepo";
import { db } from "../db";
import type { Category } from "../entities";

class CategoryRepo extends BaseRepo<Category> {
  constructor(ref: CollectionReference) {
    super(ref);
  }

  async getAll() {
    return this.queryDocs().then((docs) =>
      docs.toSorted((a, b) => a.name.localeCompare(b.name)),
    );
  }
}

const ref = collection(db, "categories");
export const categoryRepo = new CategoryRepo(ref);
