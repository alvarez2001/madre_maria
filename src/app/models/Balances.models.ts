export class BalanceModelEgreso {
  static balanceObj(obj: any) {

    for (const key in obj) {
      if(obj[key] === ''){
        obj[key] = 0
      }
    }

    return new BalanceModelEgreso(
      parseFloat(obj['alimentacion']),
      parseFloat(obj['vivienda']),
      parseFloat(obj['luz']),
      parseFloat(obj['agua']),
      parseFloat(obj['telefono']),
      parseFloat(obj['medicina']),
      parseFloat(obj['transporte']),
      parseFloat(obj['gas']),
      parseFloat(obj['educacion']),
      parseFloat(obj['tv']),
      parseFloat(obj['internet']),
      parseFloat(obj['otros']),
      obj['razon1'],
      obj['razon2'],
      obj['razon3']
    );
  }

  constructor(
    public alimentacion: number,
    public vivienda: number,
    public luz: number,
    public agua: number,
    public telefono: number,
    public medicina: number,
    public transporte: number,
    public gas: number,
    public educacion: number,
    public tv: number,
    public internet: number,
    public otros: number,
    public razon1:string,
    public razon2:string,
    public razon3:string
  ) {}
}

export class BalanceModel {
  static balanceObj(obj: any): BalanceModel {
    if (obj['sueldo'] === '') {
      obj['sueldo'] = 0;
    }
    if (obj['alimentacion'] === '') {
      obj['alimentacion'] = 0;
    }
    if (obj['pension'] === '') {
      obj['pension'] = 0;
    }
    if (obj['eventuales'] === '') {
      obj['eventuales'] = 0;
    }
    if (obj['sociales'] === '') {
      obj['sociales'] = 0;
    }
    if (obj['ayuda_familiar'] === '') {
      obj['ayuda_familiar'] = 0;
    }
    if (obj['remesas'] === '') {
      obj['remesas'] = 0;
    }

    return new BalanceModel(
      obj['portador'],
      parseFloat(obj['sueldo']),
      parseFloat(obj['alimentacion']),
      parseFloat(obj['pension']),
      parseFloat(obj['eventuales']),
      parseFloat(obj['sociales']),
      parseFloat(obj['ayuda_familiar']),
      parseFloat(obj['informal']),
      parseFloat(obj['remesas'])
    );
  }

  constructor(
    public portador: number,
    public sueldo: number,
    public alimentacion: number,
    public pension: number,
    public eventuales: number,
    public sociales: number,
    public ayuda_familiar: number,
    public informal: number,
    public remesas: number
  ) {}
}
