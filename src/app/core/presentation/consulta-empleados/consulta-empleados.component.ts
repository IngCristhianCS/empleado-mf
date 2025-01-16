import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from '@Empleados/core/application/empleado.service';
import { Empleado } from '@Empleados/core/domain/empleado.model';
import Swal from 'sweetalert2';

/**
 * Componente para la gestión de empleados.
 * Proporciona funcionalidades para agregar, editar y eliminar empleados.
 */
@Component({
  selector: 'app-consulta-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './consulta-empleados.component.html',
})
export class ConsultaEmpleadosComponent implements OnInit {
  /** Lista de empleados registrados */
  empleados: Empleado[] = [];
  /** Formulario reactivo para gestionar datos de empleados */
  empleadoForm!: FormGroup;
  /** Indica si el formulario está en modo de edición */
  isEdit = false;
  /** Empleado actual que se está editando */
  empleadoActual!: Empleado | null;

  /**
   * Constructor del componente.
   * @param fb - Servicio para construir formularios reactivos.
   * @param empleadoService - Servicio para gestionar operaciones relacionadas con empleados.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly empleadoService: EmpleadoService
  ) {}

  /**
   * Método de inicialización del componente.
   * Carga los empleados y crea el formulario reactivo.
   */
  ngOnInit(): void {
    this.cargarEmpleados();
    this.crearFormulario();
  }

  /**
   * Crea el formulario reactivo con validaciones para cada campo.
   */
  crearFormulario(): void {
    this.empleadoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      curp: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM]{1}(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/
          ),
        ],
      ],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      sexo: ['', [Validators.required]],
    });
  }

  /**
   * Carga los empleados desde el servicio y los almacena en la lista local.
   */
  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe((data: Empleado[]) => {
      this.empleados = data;
    });
  }

  /**
   * Guarda un empleado.
   * - Si `isEdit` es `true`, actualiza el empleado seleccionado.
   * - Si `isEdit` es `false`, crea un nuevo empleado.
   */
  guardarEmpleado(): void {
    if (this.empleadoForm.valid) {
      if (this.isEdit && this.empleadoActual) {
        // Actualiza el empleado existente
        const updatedEmpleado = { ...this.empleadoActual, ...this.empleadoForm.value };
        this.empleadoService.actualizarEmpleado(updatedEmpleado.id, updatedEmpleado).subscribe({
          next: (response) => {
            this.mostrarMensajeBackend(response);
            this.isEdit = false;
            this.empleadoActual = null;
            this.cargarEmpleados();
            this.empleadoForm.reset();
          },
          error: (err) => {
            this.mostrarError(err);
          },
        });
      } else {
        // Crea un nuevo empleado
        const nuevoEmpleado: Empleado = {
          id: 0,
          ...this.empleadoForm.value,
          estatus: 1,
        };
        this.empleadoService.agregarEmpleado(nuevoEmpleado).subscribe({
          next: (response) => {
            this.mostrarMensajeBackend(response);
            this.cargarEmpleados();
            this.empleadoForm.reset();
          },
          error: (err) => {
            this.mostrarError(err);
          },
        });
      }
    }
  }

  /**
   * Carga los datos de un empleado en el formulario para edición.
   * @param empleado - Empleado seleccionado para editar.
   */
  editarEmpleado(empleado: Empleado): void {
    this.isEdit = true;
    this.empleadoActual = empleado;
    this.empleadoForm.patchValue(empleado);
  }

  /**
   * Elimina un empleado después de confirmar la acción.
   * @param id - Identificador del empleado a eliminar.
   */
  eliminarEmpleado(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.eliminarEmpleado(id).subscribe({
          next: (response) => {
            this.mostrarMensajeBackend(response);
            this.cargarEmpleados();
          },
          error: (err) => {
            this.mostrarError(err);
          },
        });
      }
    });
  }

  /**
   * Cancela la edición y restablece el formulario.
   */
  cancelarEdicion(): void {
    this.isEdit = false;
    this.empleadoActual = null;
    this.empleadoForm.reset();
  }

  /**
   * Muestra errores del backend en un SweetAlert.
   * @param error - Error capturado del backend.
   */
  private mostrarError(error: any): void {
    const backendError = error.error || {};
    const uuid = backendError.uuid || 'N/A';
    const statusCode = backendError.statusCode || error.status || 'N/A';
    const message = backendError.message || 'Ocurrió un error inesperado.';

    Swal.fire({
      icon: 'error',
      title: `Error Código ${statusCode}`,
      html: `
        <p><strong>Mensaje:</strong> ${message}</p>
        <p><strong>UUID:</strong> ${uuid}</p>
      `,
    });
  }

  /**
   * Muestra mensajes del backend en un SweetAlert.
   * @param response - Respuesta del backend.
   */
  private mostrarMensajeBackend(response: any): void {
    const statusCode = response?.statusCode || 0;
    const message = response?.message || 'Operación completada.';

    if (statusCode === 1) {
      // Éxito
      Swal.fire({
        icon: 'success',
        title: 'Operación Exitosa',
        text: message,
      });
    } else if (statusCode === 0) {
      // Error
      Swal.fire({
        icon: 'error',
        title: 'Error en la Operación',
        text: message,
      });
    }
  }

}
