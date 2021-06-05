import firebase from 'firebase';
import { Injectable } from '@angular/core';
import { ProgressoService } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progressoService: ProgressoService) { }
    public publicar(publicacao: any): void {

        console.log('Chegamos até o Bd, Publicacao: ', publicacao)

        let nomeImagem = publicacao.imagem.name + Date.now()

        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                // acompanhamento do progresso do upload
                (snapshot: any) => {
                    this.progressoService.status = 'andamento'
                    this.progressoService.estado = snapshot
                    // console.log('Snapshot capturado no on()', snapshot)
                },
                (error) => {
                    this.progressoService.status = 'erro'
                    console.log('Erro upload', error)
                },
                () => {
                    // finalização do processo de upload
                    this.progressoService.status = 'concluido'
                    // console.log('Upload completo')
                }
            )

        // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        //     .push({ titulo: publicacao.titulo })
    }
}