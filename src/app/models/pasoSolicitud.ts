export class PasoSolicitud{

  static pasoSolicitudObj( Obj:any ):PasoSolicitud{
    return  new PasoSolicitud(
      parseInt(Obj['paso']),
      parseFloat(Obj['porcentaje']),
      Obj['tipoSolicitud']
    )
  }

  constructor(
    public paso:number,
    public porcentaje:number,
    public tipoSolicitud:string
  ){}
}
