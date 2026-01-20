import { collection, CollectionReference } from "firebase/firestore";
import { BaseRepo } from "./BaseRepo";
import { db } from "../db";
import type { Source } from "../entities";

class SourceRepo extends BaseRepo<Source> {
  constructor(ref: CollectionReference) {
    super(ref);
  }

  getAll() {
    return this.queryDocs();
  }
}

const ref = collection(db, "sources");
export const sourceRepo = new SourceRepo(ref);
