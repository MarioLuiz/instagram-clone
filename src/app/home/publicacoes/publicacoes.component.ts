import { Component, OnInit } from '@angular/core';
import { Bd } from '../../bd.service'
import firebase from 'firebase'

@Component({
  selector: 'instaclone-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.scss']
})
export class PublicacoesComponent implements OnInit {

  public email: string = ''

  constructor(
    private bd: Bd
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.email = user.email
      this.atualizarTimeLine()
    })
  }

  public atualizarTimeLine(): void {
    this.bd.consultaPublicacoes(this.email)
  }

}
