import { collection } from "firebase/firestore";
import { db } from "../db";
import type { Category } from "../entities";
import { BaseRepo } from "./BaseRepo";

class CategoryRepo extends BaseRepo<Category> {
  async getAll() {
    return this.queryDocs().then((docs) =>
      docs.toSorted((a, b) => a.name.localeCompare(b.name)),
    );
  }
}

const ref = collection(db, "categories");
export const categoryRepo = new CategoryRepo(ref);
