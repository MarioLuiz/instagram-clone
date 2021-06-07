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
  public publicacoes: any

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
      .then((publicacoes: any) => {
        //console.log('Publicações', publicacoes)
        this.publicacoes = publicacoes
      })
  }

}
