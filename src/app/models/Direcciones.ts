export class Direcciones{


  static DireccionesObj(obj:any):Direcciones{
    return new Direcciones(
        obj['nombres'],
        obj['apellidos'],
        obj['parentesco'],
        obj['telefono'],
        obj['celular'],
        obj['tipo_vivienda'],
        obj['tenencia'],
        obj['piso'],
        obj['techo'],
        obj['agua'],
        obj['electricidad'],
        obj['cloacas'],
        obj['gas'],
        obj['aseo'],
        obj['telefono_vivienda'],
        obj['celular_vivienda'],
        obj['internet_vivienda'],
        obj['tvcable_vivienda'],
        obj['computador'],
        obj['otros'],
        obj['tipo_transporte'],
        obj['marca_vehiculo'],
        obj['ano_vehiculo'],
        obj['modelo_vehiculo'],
        obj['placa_vehiculo'],
        obj['color'],
        obj['responsable_vehiculo'],
        obj['cedula_transporte'],
        obj['celular_transporte']
    )

  }


  constructor(
      public nombres:              string,
      public apellidos:            string,
      public parentesco:           string,
      public telefono:             string,
      public celular:              string,
      /* TIPO DE VIVIENDA */
      public tipo_vivienda:        string,
      public tenencia:             string,
      public piso:                 string,
      public techo:                string,
      public agua:                 string,
      public electricidad:         string,
      public cloacas:              string,
      public gas:                  string,
      public aseo:                 string,
      public telefono_vivienda:    string,
      public celular_vivienda:     string,
      public internet_vivienda:    string,
      public tvcable_vivienda:     string,
      public computador:           string,
      public otros:                string,
      /* MEDIO DE TRANSPORTE */
      public tipo_transporte:      string,
      public marca_vehiculo:       string,
      public ano_vehiculo:         number,
      public modelo_vehiculo:      string,
      public placa_vehiculo:       string,
      public color:                string,
      public responsable_vehiculo: string,
      public cedula_transporte:    string,
      public celular_transporte:   string,

  ){}
}
