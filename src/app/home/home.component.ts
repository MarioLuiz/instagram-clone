import { Component, OnInit, ViewChild, } from '@angular/core';
import { Autenticacao } from 'src/app/autenticacao.service';

@Component({
  selector: 'instaclone-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes: any

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit(): void {
  }

  public sair(): void {
    this.autenticacao.sair()
  }

  public atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine()
  }

}
