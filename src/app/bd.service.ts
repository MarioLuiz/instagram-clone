import firebase from 'firebase';

export class Bd {
    public publicar(publicacao: any): void {
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
        console.log('Chegamos até o Bd, Publicacao: ', publicacao)
    }
}