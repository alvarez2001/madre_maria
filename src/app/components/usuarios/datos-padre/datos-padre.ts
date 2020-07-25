export interface datosPadre {
  vive:string;
  apellidos:string;
  nombres:string;
  nacionalidad:string;
  cedula:string;
  lugar_nacimiento:string;
  fecha_nacimiento:Date|null;
  direccion:string;
  celular:string;
  email:string;
  tlf_local:string;
  estado_civil:string;

  /* INFORMACION RELIGIOSA */
  religion:string;
  va_misa:string;
  reconciliacion:string;
  grupo_apostolico:string;
  nombre_grupo:string;
  parroquia:string;

  /* INFORMACION GENERAL */
  nivel_academico:string;
  jubilado:string;
  profesion:string;
  ocupacion:string;
  trabaja:string;
  cargo:string;
  empresa:string;
  direccion_empresa:string;
  tlf_empresa:string;
  viaja:string;
}
