import { Usuario } from './acesso/usuario.model';
import firebase from 'firebase';

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario) {
        console.log('Chegamos até o serviço: ', usuario)
        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                // removendo a senha do atrubuto senha do obj usuario
                // @ts-expect-error
                delete usuario.senha

                // registrando dados complementares do usuário no path email na base64
                console.log('Reposta Firebase', resposta)
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)
            })
            .catch((error: Error) => {
                console.log('Erro ao salvar user Firebase', error)
            })
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
}