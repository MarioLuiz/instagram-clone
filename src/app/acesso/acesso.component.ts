import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'instaclone-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.scss'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({opacity: 0, transform: 'translate(-75px, 0px)'}),
        animate('500ms 0s ease-in-out') // duração, dalay e aceleração 
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({opacity: 0, transform: 'translate(75px, 0px)'}),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner:string = 'criado'
  public estadoPainel: string = 'criado'

  public cadastro:boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainel(event:string):void{
    this.cadastro = event ==='cadastro' ? true : false
  }

}
