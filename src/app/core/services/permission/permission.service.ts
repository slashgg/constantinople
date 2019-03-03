import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private httpClient: HttpClient) {}

  public getPermissions() {
    return this.httpClient.get<string[]>('permissions');
  }
}
