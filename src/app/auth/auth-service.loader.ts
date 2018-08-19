import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthServiceLoader implements CanActivate {
  constructor(private _authService: AuthService) {
  }

  public canActivate(): boolean {
    this._authService.load();

    return true;
  }
}
