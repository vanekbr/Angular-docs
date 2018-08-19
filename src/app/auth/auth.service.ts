import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserModel } from '../shared/models/user.model';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class AuthService {
  authState: any = null;
  users: UserModel[] = [];
  currentUser: UserModel;

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.currentUser ? this.currentUser.name : '';
  }

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {

    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.authState = auth;
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  createUser(globalId: string) {
    this.db.list('/users/').push({
      globalId,
      name: 'Pug',
    });
  }

  updateCurrentUserName(name: string) {
    this.db.object('/users/' + this.currentUser.id).update({
      name,
    });
  }

  load() {
    this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user;
        this.loadUsers();
      });
  }

  loadUsers() {
    const usersEndpoint1 = this.db.list('/users');

    return usersEndpoint1.snapshotChanges().pipe(map((changes) => {
      return changes.map(c => ({ id: c.payload.key, ...c.payload.val() }));
    })).subscribe((users: UserModel[]) => {
      this.users = users;

      this.currentUser = this.users.find(x => x.globalId === this.authState.uid);
      if (!this.currentUser) {
        this.createUser(this.authState.uid);
      }
    });
  }

  getUserName(userId: string) {
    return this.users.length ? this.users.find(user => user.globalId === userId).name : null;
  }
}
