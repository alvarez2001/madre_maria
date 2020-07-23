export class RegistroEstudiantesClass{

  static registroObj(obj:any){
    return new RegistroEstudiantesClass(
      obj['tipo_solicitud'],
      obj['grado_solicitud'],
      obj['nacionalidad_estudiante'],
      obj['cedula_estudiante'],
      obj['nombres_estudiante'],
      obj['apellidos_estudiante'],
      obj['lugar_nacimiento'],
      obj['estado'],
      obj['pais'],
      obj['password'],
      obj['nacionalidad_representante'],
      obj['cedula_representante'],
      obj['nombres_representante'],
      obj['apellidos_representante'],
      obj['parentesco'],
      obj['celular_representante'],
      obj['email'],
      obj['ocupacion_representante'],
      obj['tlf_representante'],
      obj['fecha_nacimiento'],
      obj['lateralidad'],
      obj['email_estudiante'],
      /* OPCIONALES */
      obj['celular_estudiante'],
      obj['sangre_estudiante'],
      obj['factor_rh'],
      obj['guarderia'],
      obj['casa_hogar'],
    )
  }


  constructor(
    public tipo_solicitud:string,
    public grado_solicitud:string,
    public nacionalidad_estudiante:string,
    public cedula_estudiante:string,
    public nombres_estudiante:string,
    public apellidos_estudiante:string,
    public lugar_nacimiento:string,
    public estado:string,
    public pais:string,
    public password:string,
    public nacionalidad_representante:string,
    public cedula_representante:string,
    public nombres_representante:string,
    public apellidos_representante:string,
    public parentesco:string,
    public celular_representante:string,
    public email:string,
    public ocupacion_representante:string,
    public tlf_representante:string,
    public fecha_nacimiento:string,
    public lateralidad:string,
    public email_estudiante:string,
    /* OPCIONALES */
    public celular_estudiante:string,
    public sangre_estudiante:string,
    public factor_rh:string,
    public guarderia:string,
    public casa_hogar:string,
  ){

  }
}




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
