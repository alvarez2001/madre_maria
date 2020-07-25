export class PreescolarStep1{


  static PreescolarObj(obj1:any,obj2:any,obj3:any,obj4:any,obj5:any){


    if(obj2['quien_cuida_estudiante'] === 'otros'){
      obj2['quien_cuida_estudiante'] = obj2['otros']
    }

    return new PreescolarStep1(
      obj1['dormitorios_cantidad'],
      obj1['cocina_cantidad'],
      obj1['comedor_cantidad'],
      obj1['banos_cantidad'],
      obj1['garajes_cantidad'],
      obj1['depositos_cantidad'],
      obj1['lavandero_cantidad'],
      obj1['patios_cantidad'],


      /* obj2 */

      obj2['quien_cuida_estudiante'],

      /* obj3 */

      obj3['asistido_preescolar'],
      obj3['nombre_preescolar'],
      obj3['orientacion_estudiante'],
      obj3['como_orientacion'],


      /* obj4 */

      obj4['papa_relacion'],
      obj4['mama_relacion'],
      obj4['hermano_relacion'],
      obj4['hermana_relacion'],
      obj4['abuela_relacion'],
      obj4['familiares_relacion'],
      obj4['amigos_relacion'],
      obj4['perros_relacion'],

      /* obj5 */

      obj5['juego_estudiante']
    )


  }


  constructor(
    public dormitorios_cantidad:number,
    public cocina_cantidad:number,
    public comedor_cantidad:number,
    public banos_cantidad:number,
    public garajes_cantidad:number,
    public depositos_cantidad:number,
    public lavandero_cantidad:number,
    public patios_cantidad:number,

    //QUIEN CUIDA A LA NIÑA

    public quien_cuida_estudiante:string,

    //ANTECEDENTES PREESCOLAR

    public asistido_preescolar:string,
    public nombre_preescolar:string,
    public orientacion_estudiante:string,
    public como_orientacion:string,

    //RELACIONES ESTUDIANTE

    public papa_relacion:string,
    public mama_relacion:string,
    public hermano_relacion:string,
    public hermana_relacion:string,
    public abuela_relacion:string,
    public familiares_relacion:string,
    public amigos_relacion:string,
    public perros_relacion:string,

    //TIPO DE JUEGO ESTUDIANTE

    public juego_estudiante:string



  ){}


  public eliminar(datos:any){
    for (const propName in datos) {
      if (datos[propName] === null || datos[propName] === undefined || datos[propName] === '') {
        delete datos[propName];
      }
    }

    return datos;
  }
}
