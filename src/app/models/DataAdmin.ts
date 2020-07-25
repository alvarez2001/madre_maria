export class DataAdmin{


  static dataObj(obj:any):DataAdmin{
    return new DataAdmin(
      obj['nombres'],
      obj['apellidos'],
      obj['nacionalidad'],
      obj['cedula'],
      obj['email'],
      obj['status'],
      obj['celular'],
      obj['password']
    )
  }

  constructor(
    public nombres:string,
    public apellidos:string,
    public nacionalidad:string,
    public cedula:string,
    public email:string,
    public status:string,
    public celular:string,
    public password:string
  ){}
}
