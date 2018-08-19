import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthServiceLoader } from './auth-service.loader';

@NgModule({})
export class AuthModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthServiceLoader,
      ]
    };
  }
}
