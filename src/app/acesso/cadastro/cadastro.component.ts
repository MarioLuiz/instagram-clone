import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Autenticacao } from 'src/app/autenticacao.service';
import { Usuario } from '../usuario.model';


@Component({
  selector: 'instaclone-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit(): void {
  }

  exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }
  cadastrarUsuario(): void {
    // console.log(this.formulario)
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha,
    )
    this.autenticacao.cadastrarUsuario(usuario)
      .then((resposta: any) => {
          console.log('Usuário Salvo com sucesso', resposta)
          this.exibirPainelLogin()
      })
      .catch((error: Error) => {
        console.log('Erro ao Cadastrar user', error)
        return error
      })
  }
}
