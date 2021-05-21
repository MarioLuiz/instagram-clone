import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'instaclone-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

}
