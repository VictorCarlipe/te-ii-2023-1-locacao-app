import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationInterface } from '../type/location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  getLocation(id:string | null): Observable<LocationInterface>{
    return this.httpClient.get<LocationInterface>(`${environment.apiUrl}/location/${id}`);
  }

  getLocations(): Observable<LocationInterface[]> {
    return this.httpClient.get<LocationInterface[]>(
      `${environment.apiUrl}/location`
    );
  }

  save(location: LocationInterface): Observable<LocationInterface> {
    return this.httpClient.post<LocationInterface>(`${environment.apiUrl}/location`, location);
  }

  update(location: LocationInterface): Observable<LocationInterface>{
    return this.httpClient.put<LocationInterface>(`${environment.apiUrl}/location/${location.id}`, location);
  }

  remove(location: LocationInterface):Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/location/${location.id}`)
  }
}