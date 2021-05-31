import { Usuario } from './acesso/usuario.model';
import firebase from 'firebase';

export class Autenticacao {
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
                console.log('Resposta autenticar user', resposta)
            })
            .catch((error: Error) => {
                console.log('Erro ao autenticar user', error)
            })
    }

    public salvarDadosDoUsuario(dadosUser: any, retry: number):void {
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
}