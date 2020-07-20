import { Hermana } from './EstructuraFamiliar';

export class HermanaModel{
  static hermanaObj(obj:Hermana){
    return new HermanaModel(
      obj['grado'],
      obj['fullname']
    );
  }
  constructor(
    public grado:    string,
    public fullname: string,
  ){}
}
