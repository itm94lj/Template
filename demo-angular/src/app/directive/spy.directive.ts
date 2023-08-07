import {Directive, OnDestroy, OnInit} from '@angular/core';


let nextId = 1;

@Directive({
  selector: '[appSpy]'
})
export class SpyDirective implements  OnInit, OnDestroy {
  private id = nextId++;

  constructor( ) { }


    ngOnInit():void {
      console.log(`Spy #${this.id} onInit`);
    }


    ngOnDestroy():void{
      console.log(`Spy #${this.id} onDestroy`);
    }
}
