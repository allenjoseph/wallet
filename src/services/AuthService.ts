import {
  type Auth,
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import type { User } from "../entities";
import { userRepo } from "../repositories";

class AuthService {
  private provider: GoogleAuthProvider;
  public auth: Auth;

  constructor() {
    this.provider = new GoogleAuthProvider();
    this.auth = getAuth();
  }

  async logIn() {
    return signInWithRedirect(this.auth, this.provider).catch((error) => {
      console.log({ error });
    });
  }

  async postAuth(user: User) {
    sessionStorage.setItem("wallet_user", JSON.stringify(user));
    await userRepo.save(user);
  }

  async logOut() {
    return signOut(this.auth)
      .then(() => {
        sessionStorage.removeItem("wallet_user");
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem("wallet_user") ?? "null") as User;
  }
}

export const authService = new AuthService();
