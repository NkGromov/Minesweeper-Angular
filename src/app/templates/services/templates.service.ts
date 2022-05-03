import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Template } from '../models/templates';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private http: HttpClient) {}

  getTemplates(modeId = 1): Observable<Template[]> {
    return this.http.get<Template[]>(`${env.apiBase}/templates/get`, {
      params: {
        modeId: modeId,
      },
    });
  }
}
