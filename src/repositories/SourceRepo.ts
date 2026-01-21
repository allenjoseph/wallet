import { collection, CollectionReference } from "firebase/firestore";
import { BaseRepo } from "./BaseRepo";
import { db } from "../db";
import type { Source } from "../entities";

class SourceRepo extends BaseRepo<Source> {
  constructor(ref: CollectionReference) {
    super(ref);
  }

  async getAll() {
    return this.queryDocs().then((docs) =>
      docs.toSorted((a, b) => a.name.localeCompare(b.name)),
    );
  }
}

const ref = collection(db, "sources");
export const sourceRepo = new SourceRepo(ref);
