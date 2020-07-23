export class Usuario{

  static UsuarioObj(obj:Usuario){
    return new Usuario(
      obj['id'],
      obj['nombres'],
      obj['apellidos'],
      obj['nacionalidad'],
      obj['cedula'],
      obj['celular'],
      obj['email'],
      obj['status'],
      obj['tipo'],
      obj['created_at'],
      obj['updated_at']
    )
  }

  constructor(
      public  id:           number,
      public  nombres:      string,
      public  apellidos:    string,
      public  nacionalidad: string,
      public  cedula:       string,
      public  celular:      string,
      public  email:        string,
      public  status:       string,
      public  tipo:         string,
      public  created_at:   string,
      public  updated_at:   string,
  ){}


  get nombreCompleto(){
    return this.apellidos+ ', ' + this.nombres
  }
}

