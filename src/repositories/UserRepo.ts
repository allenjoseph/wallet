import { doc, setDoc } from "firebase/firestore";
import type { User } from "../entities";
import { db } from "../db";

class UserRepo {
  save(user: User) {
    return setDoc(doc(db, "users", user.uid), {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  }
}

export const userRepo = new UserRepo();
