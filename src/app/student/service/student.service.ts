import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentInterface } from '../type/student.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<StudentInterface[]>{
    return this.httpClient.get<StudentInterface[]>(
      `${environment.apiUrl}/students`
    )
  }

  remove(student: StudentInterface):Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/students/${student.registration}`)
  }
}
