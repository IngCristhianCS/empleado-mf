import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '@Empleados/core/domain/empleado.model';
import { EmpleadoRepository } from '@Empleados/core/domain/empleado.repository';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  constructor(
    @Inject(EmpleadoRepository) private repository: EmpleadoRepository
  ) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.repository.getEmpleados();
  }

  agregarEmpleado(empleado: Empleado): Observable<void> {
    return this.repository.agregarEmpleado(empleado);
  }

  actualizarEmpleado(id: number, empleado: Empleado): Observable<void> {
    return this.repository.actualizarEmpleado(id, empleado);
  }

  eliminarEmpleado(id: number): Observable<void> {
    return this.repository.eliminarEmpleado(id);
  }
}
