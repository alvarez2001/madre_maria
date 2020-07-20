export class PasoSolicitud{

  static pasoSolicitudObj( Obj:any ):PasoSolicitud{
    return  new PasoSolicitud(
      parseInt(Obj['paso']),
      parseFloat(Obj['porcentaje'])
    )
  }

  constructor(
    public paso:number,
    public porcentaje:number
  ){}
}
