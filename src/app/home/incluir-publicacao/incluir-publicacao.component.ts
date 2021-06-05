import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Bd } from '../../bd.service'
import firebase from 'firebase';

@Component({
  selector: 'instaclone-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.scss']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string | undefined
  private imagem: any

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })
  }

  public preparaImegemUpload(event: Event): void {
    console.log('Event', (<HTMLInputElement>event.target).files)
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
