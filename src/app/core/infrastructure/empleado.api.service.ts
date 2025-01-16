import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empleado } from '@Empleados/core/domain/empleado.model';
import { EmpleadoRepository } from '@Empleados/core/domain/empleado.repository';

@Injectable({ providedIn: 'root' })
export class EmpleadoApiService implements EmpleadoRepository {
  private apiUrl = 'http://localhost:8080/api/empleados';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.info as Empleado[])
    );
  }

  agregarEmpleado(empleado: Empleado): Observable<void> {
    return this.http.post<void>(this.apiUrl, empleado);
  }

  actualizarEmpleado(id: number, empleado: Empleado): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, empleado);
  }

  eliminarEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
