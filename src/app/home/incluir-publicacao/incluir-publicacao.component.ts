import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import firebase from 'firebase';

import { Bd } from '../../bd.service'
import { ProgressoService } from '../../progresso.service'

import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'instaclone-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.scss']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string | undefined
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number | undefined

  private imagem: any

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd,
    private progressoService: ProgressoService
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

    let continua = new Subject<boolean>()
    continua.next(true)
    let acompanhamentoUpload = interval(250)

    acompanhamentoUpload.pipe(takeUntil(continua))
      .subscribe(() => {
        console.log('Status Upload: ', this.progressoService.status)
        console.log('Estado Upload: ', this.progressoService.estado)
        this.progressoPublicacao = 'andamento'
        this.porcentagemUpload = Math.round(
          (this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes) * 100
        )
        if (this.progressoService.status === 'concluido' || this.progressoService.status === 'erro') {
          this.progressoPublicacao = 'andamento'
          continua.next(false)
        }
      })
  }

  public preparaImegemUpload(event: Event): void {
    console.log('Event', (<HTMLInputElement>event.target).files)
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
