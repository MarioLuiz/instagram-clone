import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
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
        style({ opacity: 0, transform: 'translate(-75px, 0px)' }),
        animate('500ms 0s ease-in-out') // duração, dalay e aceleração 
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(75px, 0px)' }),
        // 0 void ----X---------------------X--X--X--X-X-X-------X criado 1.5s//
        animate('1500ms 0s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)'}),
          style({ offset: 0.70, opacity: 1, transform: 'translateX(0)'}),
          style({ offset: 0.75, opacity: 1, transform: 'translateY(-20px)'}),
          style({ offset: 0.80, opacity: 1, transform: 'translateY(20px)'}),
          style({ offset: 0.85, opacity: 1, transform: 'translateY(-20px)' }),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(20px)' }),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(-20px)' }),
          style({ offset: 0.98, opacity: 1, transform: 'translateY(20px)' }),
          style({ offset: 1, opacity: 1, transform: 'translateY(0)'})
        ])) // duração, dalay e aceleração
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado'
  public estadoPainel: string = 'criado'

  public cadastro: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainel(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false
  }

  public inicioDaAnicacao():void {
    console.log('Inicio Da Animação')
  }

  public fimDaAnicacao(): void {
    console.log('Fim Da Animação')
  }

}
