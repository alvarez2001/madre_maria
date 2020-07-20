import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[formateadorMiles]'
})
export class MilesDirective {

  constructor(private el:ElementRef) {
  }

  @HostListener('blur') onblur(){
      this.agregarMiles();
  }

  @HostListener('focus') onFocus(){
    if(this.el.nativeElement.value !== null){
      this.remplazar();

    }

  }


  private formatoNumero(number:string){
    const exp= /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    let arr = number.toString().split('.');
    arr[0]=arr[0].replace(exp,rep)
    return arr[1]?arr.join(','):arr[0];

}
private remplazar(){
    const remplazar = this.el.nativeElement.value;
    if(remplazar !== ''){
        const ingresar = remplazar.replace(/[.]/g, '').replace(/[,]/g, '.');
        this.el.nativeElement.value = '';
        this.el.nativeElement.value += ingresar;
    }
}

private agregarMiles(){
  if(!isNaN(this.el.nativeElement.value)){
      let guardarValor = this.el.nativeElement.value;
      this.el.nativeElement.value = '';
      if(guardarValor !== ''){
          this.el.nativeElement.value = this.formatoNumero(guardarValor);
      }
      if(!this.el.nativeElement.value.includes(',') && this.el.nativeElement.value !== ''){
          this.el.nativeElement.value = this.el.nativeElement.value + ',00'
      }
      if(this.el.nativeElement.value === ''){
          this.el.nativeElement.value = '0,00';
      }
  }else{
    this.el.nativeElement.value = +this.el.nativeElement.value.replace(/[,]/g, '.');
    if(!isNaN(this.el.nativeElement.value)){
      this.agregarMiles();
    }else{
      this.el.nativeElement.value = '';
    }
  }
}




}
