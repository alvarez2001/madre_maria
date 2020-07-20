export interface Estructura {
  hermanas:            Hermana[];
  estructura_familiar: EstructuraFamiliar[];
  hermanos:            number;
  nro_hermanas:        number;
  viven:                number;
}

export interface EstructuraFamiliar {
  nombres:     string;
  parentesco:  string;
  edad:        number;
  ocupacion:   string;
  ingreso:     number;
  nivel:       string;
  instituto:   string;
  mensualidad: number;
}

export interface Hermana {
  grado:    string;
  fullname: string;
}
