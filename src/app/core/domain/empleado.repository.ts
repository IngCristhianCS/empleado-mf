import { Observable } from 'rxjs';
import { Empleado } from './empleado.model';

export abstract class EmpleadoRepository {
  abstract getEmpleados(): Observable<Empleado[]>;
  abstract agregarEmpleado(empleado: Empleado): Observable<void>;
  abstract actualizarEmpleado(id: number, empleado: Empleado): Observable<void>;
  abstract eliminarEmpleado(id: number): Observable<void>;
}
