import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { DocumentModel } from '../../shared/models/document.model';
import { map } from 'rxjs/internal/operators';
import { ClipboardService } from 'ngx-clipboard';

const InvitationLinkText = 'Get invitation link';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss'],
  providers: [ClipboardService]
})
export class DocumentEditComponent implements OnInit {
  documentId: string;
  document: DocumentModel;
  caretPosition = 0;
  invitationLinkText = InvitationLinkText;
  opened = false;
  @ViewChild('documentText') documentTextInput: HTMLInputElement;

  constructor(private route: ActivatedRoute,
              private db: AngularFireDatabase,
              private clipboardService: ClipboardService,
              public elRef: ElementRef) { }

  ngOnInit() {
    this.documentId = this.route.snapshot.paramMap.get('documentId');

    this.db.object('/documents/' + this.documentId).snapshotChanges().pipe(map(res => {
      return res.payload.val();
    })).subscribe((document: DocumentModel) => {
      this.document = document;
      if (this.documentTextInput) {
        const el = this.elRef.nativeElement.querySelector('#document-text-container');
        setTimeout (() => {
          this.setCaretPosition(el, this.caretPosition);
        });
      }
    });
  }

  copyDocumentLink() {
    this.clipboardService.copyFromContent(window.location.href);
    this.invitationLinkText = 'Copied';
    setTimeout (() => {
      this.invitationLinkText = InvitationLinkText;
    }, 700);
  }

  getCaretPos(oField) {
    this.caretPosition = oField.selectionStart ? oField.selectionStart : 0;
  }

  setCaretPosition(elem, caretPos) {
    let range;
    if (elem.createTextRange) {
      range = elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else {
      elem.focus();
      elem.setSelectionRange(caretPos, caretPos);
    }
  }

  saveDocument() {
    const itemsRef = this.db.list('documents');
    itemsRef.update(this.documentId, { text: this.document.text });
  }
}
