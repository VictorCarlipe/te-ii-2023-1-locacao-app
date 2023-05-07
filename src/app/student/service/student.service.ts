import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentInterface } from '../type/student.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }

  getStudent(id:number): Observable<StudentInterface>{
    return this.http.get<StudentInterface>(`${environment.apiUrl}/student/${id}`);
  }

  getStudents(): Observable<StudentInterface[]>{
    return this.http.get<StudentInterface[]>(`${environment.apiUrl}/student`);
  }

  save(student: StudentInterface): Observable<StudentInterface>{
    return this.http.post<StudentInterface>(`${environment.apiUrl}/student`, student);
  }

  update(student: StudentInterface): Observable<StudentInterface>{
    return this.http.put<StudentInterface>(`${environment.apiUrl}/student/${student.id}`, student);
  }

  remove({id}: StudentInterface):Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/student/${id}`)
  }
}
