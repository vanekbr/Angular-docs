import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { AuthServiceLoader } from './auth/auth-service.loader';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/documents',
        pathMatch: 'full'
      },
      {
        path: 'documents',
        canActivate: [AuthServiceLoader],
        children: [
          {
            path: '',
            component: DocumentListComponent,
          },
          {
            path: ':documentId',
            component: DocumentEditComponent
          }
        ]
      },
      { path: '**',
        redirectTo: '/documents',
        pathMatch: 'full'
      },
    ])
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
