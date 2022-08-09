import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  Auth, User as FirebaseUser
} from "firebase/auth";
import { auth as GloablAuth } from "./firebase";
import { IAuthService, ICredentials, IUser, StateChanged } from "@/domain/services/auth";


export class User implements IUser {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) { }
}


export class AuthService implements IAuthService {
  private _auth: Auth
  private _user: FirebaseUser|null = null
  private _stateChanged: StateChanged

  constructor(stateChanged: StateChanged) {
    this._auth = GloablAuth
    this._stateChanged = stateChanged

    onAuthStateChanged(this._auth, (user) => this.onAuthStateChanged(user));
  }

  async signIn(credentials: ICredentials) {
    await signInWithEmailAndPassword(
      this._auth, credentials.username, credentials.password
    )
  }

  async signUp(credentials: ICredentials) {
    await createUserWithEmailAndPassword(
      this._auth, credentials.username, credentials.password
    )
  }

  private onAuthStateChanged(user: FirebaseUser|null) {
    this._user = user
    if (this.stateChanged) {
      this.stateChanged(this.user)
    }
  }

  get user(): IUser | null {
    if (!this._user) { return null }
    return new User(
      this._user.uid,
      this._user.displayName || ("User " + this._user.uid),
    )
  }

  get stateChanged(): StateChanged {
    return this._stateChanged
  }
}

