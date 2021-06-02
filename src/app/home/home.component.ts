import { Component, OnInit } from '@angular/core';
import { Autenticacao } from 'src/app/autenticacao.service';

@Component({
  selector: 'instaclone-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private autenticacao: Autenticacao) { }

  ngOnInit(): void {
  }

  public sair(): void {
    this.autenticacao.sair()
  }

}
