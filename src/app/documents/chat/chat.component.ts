import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/index';
import * as firebase from 'firebase';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  chatsEndpoint = '/chats/';
  userMessage = '';
  items: Observable<any[]>;
  private _chatId: string;

  @Input()
  public set chatId(id: string) {
    if (id) {
      this._chatId = id;
      this.items = this.db.list(this.chatsEndpoint + this._chatId + '/messages', ref => ref.limitToLast(10))
        .valueChanges().pipe(map((messages) => messages.reverse()));
    }
  }

  constructor( private db: AngularFireDatabase,
               private authService: AuthService, ) {
  }

  sendMessage(message: string) {
    if (message) {
      this.db.list(this.chatsEndpoint + this._chatId + '/messages').push({
        text: message,
        posted: firebase.database.ServerValue.TIMESTAMP,
        authorId: this.authService.currentUserId,
      });

      this.userMessage = '';
    }
  }

  getUserName(userId: string) {
    const name = this.authService.getUserName(userId);

    return name ? name : userId;
  }
}
