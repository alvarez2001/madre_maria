export class PlantelesEstudiantes{

  static PlantelesObj (obj:any) : PlantelesEstudiantes{
    return new PlantelesEstudiantes(
      obj['ano'],
      obj['plantel'],
      obj['estado'],
      obj['ciudad'],
      obj['grado'],
      obj['calificacion'],
    )
  }

  constructor(
    public ano:string,
    public plantel:string,
    public estado:string,
    public ciudad:string,
    public grado:string,
    public calificacion:number,
  ){}
}
