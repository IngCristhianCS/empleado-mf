import { Routes } from '@angular/router';
import { ConsultaEmpleadosComponent } from '@Empleados/core/presentation/consulta-empleados/consulta-empleados.component';

export const EMPLEADO_ROUTES: Routes = [
  { path: '', redirectTo: 'consulta', pathMatch: 'full' },
  { path: 'consulta', component: ConsultaEmpleadosComponent },
];
