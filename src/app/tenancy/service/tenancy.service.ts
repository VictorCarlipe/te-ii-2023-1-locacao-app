import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TenancyInterface } from '../type/tenancy.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenancyService {

  constructor(private httpClient: HttpClient) { }

  getTenancy(id: string | null): Observable<TenancyInterface>{
    return this.httpClient.get<TenancyInterface>(
      `${environment.apiUrl}/tenancy/${id}`
    )
  }

  getTenancys():Observable<TenancyInterface[]>{
    return this.httpClient.get<TenancyInterface[]>(
      `${environment.apiUrl}/tenancy`
    );
  }

  update(tenancy: TenancyInterface):Observable<TenancyInterface> {
    return this.httpClient.put<TenancyInterface>(
      `${environment.apiUrl}/tenancy/${tenancy.id}`, tenancy
    )
  }

  save(tenancy: TenancyInterface): Observable<TenancyInterface>{
    return this.httpClient.post<TenancyInterface>(
      `${environment.apiUrl}/tenancy`,tenancy
    )
  }

  remove(tenancy: TenancyInterface):Observable<void>{
    return this.httpClient.delete<void>(
        `${environment.apiUrl}/tenancy/${tenancy.id}`
    );
  }
}
