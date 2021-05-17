import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Imagem } from './imagem.model';


@Component({
  selector: 'instaclone-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('2s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'visivel'
  public imagens: Imagem[] = [
    { estado: 'visivel', url: '/assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_5.png' }
  ]
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.logicaRotacao(), 4000)
  }

  public logicaRotacao() {
    //auxilia na exibição da imagem seguinte
    let idx: number = 0

    // ocultar imagem
    for (let i = 0; i <= (this.imagens.length - 1); i++) {
      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido'
        idx = i === (this.imagens.length - 1) ? 0 : (i + 1)
        break
      }
    }

    // exibir a proxima imagem
    this.imagens[idx].estado = 'visivel'

    setTimeout(() => this.logicaRotacao(), 4000)
  }
}
