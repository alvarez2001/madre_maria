export class DetalleUsuario {
  static detalleObj(obj: any): DetalleUsuario {
    return new DetalleUsuario(
      obj['id'],
      obj['apellidos'],
      obj['nombres'],
      obj['lugar_nacimiento'],
      obj['estado'],
      obj['pais'],
      obj['fecha_nacimiento'],
      obj['nacionalidad'],
      obj['cedula'],
      obj['email'],
      obj['celular'],
      obj['lateralidad'],
      obj['tipo_sangre'],
      obj['factor_rh'],
      obj['guarderia'],
      obj['casa_hogar'],
      obj['representante_id'],
      obj['padre_id'],
      obj['madre_id'],
      obj['created_at'],
      obj['updated_at'],
      obj['representante'],
      obj['cupo']
    );
  }

  constructor(
    public id: number,
    public apellidos: string,
    public nombres: string,
    public lugar_nacimiento: string,
    public estado: string,
    public pais: string,
    public fecha_nacimiento: Date,
    public nacionalidad: string,
    public cedula: string,
    public email: string,
    public celular: string,
    public lateralidad: string,
    public tipo_sangre: string,
    public factor_rh: string,
    public guarderia: string,
    public casa_hogar: string,
    public representante_id: number,
    public padre_id: number,
    public madre_id: number,
    public created_at: Date,
    public updated_at: Date,
    public representante: Representante,
    public cupo:Cupo
  ) {}

  get nombreCompleto(): string {
    return this.apellidos + ', ' + this.nombres;
  }
}

export interface Cupo {
  estudiante_id: number;
  grado: string;
  id: number;
  tipo: string;
}

export class Representante {
  constructor(
    public id: number,
    public apellidos: string,
    public nombres: string,
    public nacionalidad: string,
    public cedula: string,
    public parentesco: string,
    public tlf_local: string,
    public celular: string,
    public email: string,
    public ocupacion: string,
    public created_at: Date,
    public updated_at: Date,
  ){}

  get nombresCompletos():string{
    return this.apellidos+', '+this.nombres;
  }
}
