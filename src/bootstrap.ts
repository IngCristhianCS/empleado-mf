import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@Empleados/app.component';
import { RouterModule } from '@angular/router';
import { EMPLEADO_ROUTES } from '@Empleados/app.routes';
import { EmpleadoApiService } from '@Empleados/core/infrastructure/empleado.api.service';
import { EmpleadoRepository } from '@Empleados/core/domain/empleado.repository';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(EMPLEADO_ROUTES)),
    provideHttpClient(),
    { provide: EmpleadoRepository, useClass: EmpleadoApiService },
  ],
});
