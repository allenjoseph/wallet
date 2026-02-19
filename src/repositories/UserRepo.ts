import { doc, setDoc } from "firebase/firestore";
import { db } from "../db";
import type { User } from "../entities";

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
