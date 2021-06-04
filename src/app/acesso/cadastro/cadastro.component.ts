import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from 'src/app/autenticacao.service';
import { Usuario } from '../usuario.model';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'instaclone-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        // 0 void ----X---------------------X--X--X--X-X-X-------X criado 1.5s//
        animate('750ms 0s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.70, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.75, opacity: 1, transform: 'translateX(-20px)' }),
          style({ offset: 0.80, opacity: 1, transform: 'translateX(20px)' }),
          style({ offset: 0.85, opacity: 1, transform: 'translateX(-20px)' }),
          style({ offset: 0.90, opacity: 1, transform: 'translateX(20px)' }),
          style({ offset: 0.94, opacity: 1, transform: 'translateX(-20px)' }),
          style({ offset: 0.98, opacity: 1, transform: 'translateX(20px)' }),
          style({ offset: 1, opacity: 1, transform: 'translateY(0)' })
        ])) // duração, dalay e aceleração
      ])
    ])
  ]
})

export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public mensagemErroRegistro: string = ''
  public estadoAnimacaoPainelCadastro: string = 'void'

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.minLength(7), Validators.maxLength(254),
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    'nome_completo': new FormControl(null, [Validators.required]),
    'nome_usuario': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit(): void {
  }

  // conveniente getter para facil acesso dos campos do formulario
  get f() { return this.formulario.controls; }

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
        this.mensagemErroRegistro = error.message
        this.estadoAnimacaoPainelCadastro = 'criado'
      })
  }

  public onCardChange(event: any): void {
    //console.log('evento', event)
    this.estadoAnimacaoPainelCadastro = 'void'
    setTimeout(() => {
      if (this.f.email.invalid && this.f.email.touched) {
        this.estadoAnimacaoPainelCadastro = 'criado'
      }
      if (this.f.nome_completo.invalid && this.f.nome_completo.touched) {
        this.estadoAnimacaoPainelCadastro = 'criado'
      }
      if (this.f.nome_usuario.invalid && this.f.nome_usuario.touched) {
        this.estadoAnimacaoPainelCadastro = 'criado'
      }
      if (this.f.senha.invalid && this.f.senha.touched) {
        this.estadoAnimacaoPainelCadastro = 'criado'
      }
    }, 750)
  }
}
