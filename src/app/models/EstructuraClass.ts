import { EstructuraFamiliar, Hermana } from './EstructuraFamiliar';

export class EstructuraClass {
  static EstructuraObj(Obj: any): EstructuraClass {
    if (Obj['ingreso'] === '') {
      Obj['ingreso'] = 0;
    }
    if (Obj['mensualidad'] === '') {
      Obj['mensualidad'] = 0;
    }

    return new EstructuraClass(
      Obj['nombres'],
      Obj['parentesco'],
      parseInt(Obj['edad']),
      Obj['ocupacion'],
      parseFloat(Obj['ingreso']),
      Obj['nivel'],
      Obj['instituto'],
      parseFloat(Obj['mensualidad'])
    );
  }

  constructor(
    public nombres: string,
    public parentesco: string,
    public edad: number,
    public ocupacion: string,
    public ingreso: number,
    public nivel: string,
    public instituto: string,
    public mensualidad: number
  ) {}
}

export class EstructuraFamiliarClass {
  static EstructuraFamiliarObj(obj: any) {
    return new EstructuraFamiliarClass(
      obj['hermanas'],
      obj['estructura_familiar'],
      parseInt( obj['hermanos'] ),
      parseInt( obj['nro_hermanas'] ),
      parseInt( obj['viven'] )
    );
  }

  constructor(
    public hermanas: Hermana[],
    public estructura_familiar: EstructuraFamiliar[],
    public hermanos: number,
    public nro_hermanas: number,
    public viven: number
  ) {}
}
