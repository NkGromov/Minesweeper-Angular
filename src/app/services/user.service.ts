import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId = 0;
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  checkUser() {
    const token = this.jwtService.getToken() || this.userId;
    this.http
      .get<number>(`${env.apiBase}/users/checkUser`, {
        params: {
          userId: +token,
        },
      })
      .subscribe((token: number) => {
        this.jwtService.saveToken(token);
        this.userId = token;
      });
  }
}
