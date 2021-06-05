import firebase from 'firebase';

export class Bd {
    public publicar(publicacao: any): void {

        console.log('Chegamos até o Bd, Publicacao: ', publicacao)

        let nomeImagem = publicacao.imagem.name + Date.now()

        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                // acompanhamento do progresso do upload
                (snapshot: any) => {
                    console.log('snapshot', snapshot)
                },
                (error) => {
                    console.log('Erro upload', error)
                },
                () => {
                    // finalização do processo de upload
                    console.log('Upload completo')
                }
            )

        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        //     .push({ titulo: publicacao.titulo })
    }
}