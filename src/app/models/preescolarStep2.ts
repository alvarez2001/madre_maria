export class PreescolarStep2{


  static preescolarObj(obj1:any, obj2:any, obj3:any, obj4:any, obj5:any){


    if(obj3['especialista'] === 'Otro'){
      obj3['especialista'] = obj3['otro']
    }




    return new PreescolarStep2(
      obj1['iglesia_frecuenta'],
      obj1['parque_frecuenta'],
      obj1['playa_frecuenta'],
      obj1['rio_frecuenta'],
      obj1['piscina_frecuenta'],
      obj1['museos_frecuenta'],
      obj1['cine_frecuenta'],
      obj1['familiares_frecuenta'],
      obj1['amigos_frecuenta'],
      /*  */

      obj2['papa_juega'],
      obj2['mama_juega'],
      obj2['hermanos_juega'],
      obj2['vecinos_juega'],
      obj2['desconocidos_juega'],
      obj2['sola_juega'],


      /*  */

      obj3['especialista'],
      obj3['motivos'],

      /*  */

      obj4['embarazo_prenatales'],
      obj4['enfermedad_prenatales'],
      obj4['trabajo_embarazo'],
      obj4['tipo_trabajo'],
      obj4['accidente_embarazo'],
      obj4['explique_accidente'],


      /*  */
      obj5['tipo_parto'],
      obj5['edad_parto'],
      obj5['problema_embarazo'],
      obj5['explique_problema'],
    )
  }

  constructor(
    public iglesia_frecuenta:string,
    public parque_frecuenta:string,
    public playa_frecuenta:string,
    public rio_frecuenta:string,
    public piscina_frecuenta:string,
    public museos_frecuenta:string,
    public cine_frecuenta:string,
    public familiares_frecuenta:string,
    public amigos_frecuenta:string,

    /*  */

    public papa_juega:string,
    public mama_juega:string,
    public hermanos_juega:string,
    public vecinos_juega:string,
    public desconocidos_juega:string,
    public sola_juega:string,


    /*  */


    public especialista:string,
    public motivos:string,

    /*  */


    public embarazo_prenatales:string,
    public enfermedad_prenatales:string,
    public trabajo_embarazo:string,
    public tipo_trabajo:string,
    public accidente_embarazo:string,
    public explique_accidente:string,


    /*  */


    public tipo_parto:string,
    public edad_parto:number,
    public problema_embarazo:string,
    public explique_problema:string,



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
