import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { DocumentModel } from '../../shared/models/document.model';

@Component({
  selector: 'app-documents-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  documentsEndpoint = '/documents/';
  documents: DocumentModel[] = [];
  documentsLoaded = false;
  createNewDocumentMode: false;

  constructor(private db: AngularFireDatabase) { }
  ngOnInit() {
    const test = this.db.list(this.documentsEndpoint);
    test.snapshotChanges().pipe(map((changes) => {
      return changes.map(c => ({ id: c.payload.key, ...c.payload.val() }));
    })).subscribe((documents: DocumentModel[]) => {
      this.documents = documents;
      this.documentsLoaded = true;
    });
  }

  createDocument(name: string) {
    const newDocumentId = this.db.list(this.documentsEndpoint).push({
      name,
    }).key;

    const newChatId = this.db.list('/chats/').push({
      documentId: newDocumentId,
    }).key;

    this.db.object(this.documentsEndpoint + newDocumentId).update({
      chatId: newChatId,
    });

    this.createNewDocumentMode = false;
  }

  deleteDocument(document: DocumentModel) {
    this.db.list('/chats/').remove(document.chatId);
    this.db.list(this.documentsEndpoint).remove(document.id);
  }
}
