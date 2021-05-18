import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'instaclone-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }
}
