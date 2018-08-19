import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    ClipboardModule,
    FormsModule,
  ],
  declarations: [
    DocumentListComponent,
    DocumentEditComponent,
    ChatComponent,
  ],
})
export class DocumentsModule {
}

