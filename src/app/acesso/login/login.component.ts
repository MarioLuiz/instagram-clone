import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Autenticacao } from 'src/app/autenticacao.service';
import { Router } from '@angular/router';


@Component({
  selector: 'instaclone-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  mensagemErroSighIn: string = ''

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.minLength(7), Validators.maxLength(254),
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private autenticacao: Autenticacao,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void {
    //console.log('Formulario', this.formulario)
    this.autenticacao.autenticar(this.formulario.value.email, this.formulario.value.senha)
      .then((resposta) => {
        this.router.navigate(['/home'])
      })
      .catch((error: Error) => {
        console.log('Erro ao autenticar user', error)
        this.mensagemErroSighIn = error.message
      })
  }

}
