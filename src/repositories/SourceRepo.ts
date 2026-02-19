import { collection } from "firebase/firestore";
import { db } from "../db";
import type { Source } from "../entities";
import { BaseRepo } from "./BaseRepo";

class SourceRepo extends BaseRepo<Source> {
  async getAll() {
    return this.queryDocs().then((docs) =>
      docs.toSorted((a, b) => a.name.localeCompare(b.name)),
    );
  }
}

const ref = collection(db, "sources");
export const sourceRepo = new SourceRepo(ref);
