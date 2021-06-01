import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class Autenticacao {

    public token_id: string | null | undefined

    constructor(private router: Router) { }

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        console.log('Chegamos até o serviço: ', usuario)
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                // removendo a senha do atrubuto senha do obj usuario
                // @ts-expect-error
                delete usuario.senha
                this.salvarDadosDoUsuario(usuario, 3)
                return resposta
            })
        // .catch((error: Error) => {
        //    console.log('Erro ao Cadastrar user', error)
        //    return new Error(error.message)
        // })
    }

    public autenticar(email: string, senha: string): void {
        console.log('email: ', email)
        console.log('senha: ', senha)
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta) => {
                firebase.auth().currentUser?.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', this.token_id)
                        this.router.navigate(['home'])
                    })
                console.log('Resposta autenticar user', resposta)
            })
            .catch((error: Error) => {
                console.log('Erro ao autenticar user', error)
            })
    }

    public salvarDadosDoUsuario(dadosUser: any, retry: number): void {
        // registrando dados complementares do usuário no path email na base64
        // console.log('Reposta Firebase', resposta)
        firebase.database().ref(`usuario_detalhe/${btoa(dadosUser.email)}`)
            .set(dadosUser)
            .then((resposta) => {
                console.log('Dados do usuário salvo com sucesso na base', resposta)
            })
            .catch((error: Error) => {
                console.log('Erro ao salvar dados do usuario BD Firebase', error)
                if (retry > 0) { // Condição para mais tentativas de salvar dados
                    this.salvarDadosDoUsuario(dadosUser, (retry - 1))
                }
            })
    }

    public autenticado(): boolean {

        if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken')
        }
        return this.token_id !== undefined
    }
}