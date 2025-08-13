import { collection, CollectionReference } from "firebase/firestore";
import { BaseRepository } from "./BaseRepository";
import { db } from "./db";
import type { Doc } from "../entities";

class SourceRepository extends BaseRepository<Doc> {
  constructor(ref: CollectionReference) {
    super(ref);
  }

  query() {
    return this.queryDocs();
  }
}

const ref = collection(db, "sources");
export const sourceRepository = new SourceRepository(ref);
