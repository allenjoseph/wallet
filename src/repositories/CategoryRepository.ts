import { collection, CollectionReference } from "firebase/firestore";
import { BaseRepository } from "./BaseRepository";
import { db } from "./db";
import type { Doc } from "../entities";

class CategoryRepository extends BaseRepository<Doc> {
  constructor(ref: CollectionReference) {
    super(ref);
  }

  query() {
    return this.queryDocs();
  }
}

const ref = collection(db, "categories");
export const categoryRepository = new CategoryRepository(ref);
