import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  saveToken(token: number) {
    localStorage.setItem('jwtToken', token.toString());
  }

  destroyToken() {
    localStorage.removeItem('jwtToken');
  }
}
