import firebase from 'firebase';

export class Bd {
    public publicar(publicacao: any): void {

        console.log('Chegamos até o Bd, Publicacao: ', publicacao)

        let nomeImagem = publicacao.imagem.name + Date.now()

        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)

        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        //     .push({ titulo: publicacao.titulo })
    }
}