export interface RegistroEstudiante {
  tipo_solicitud:string;
  grado_solicitud:string;
  nacionalidad_estudiante:string;
  cedula_estudiante:string;
  nombres_estudiante:string;
  apellidos_estudiante:string;
  lugar_nacimiento:string;
  estado:string;
  pais:string;
  email_estudiante:string;

  password:string;

  nacionalidad_representante:string;
  cedula_representante:string;
  nombres_representante:string;
  apellidos_representante:string;
  parentesco:string;
  celular_representante:string;
  email:string;
  ocupacion_representante:string;
  tlf_representante:string;
  fecha_nacimiento:string;



  lateralidad:string;

  /* OPCIONALES */

  celular_estudiante:string;
  sangre_estudiante:string;
  factor_rh:string;
  guarderia:string;
}
