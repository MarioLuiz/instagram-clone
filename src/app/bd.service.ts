import firebase from 'firebase';
import { Injectable } from '@angular/core';
import { ProgressoService } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progressoService: ProgressoService) { }
    public publicar(publicacao: any): void {
        // console.log('Chegamos até o Bd, Publicacao: ', publicacao)
        let nomeImagem: string = ''
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {
                // console.log('Resposta publicacao bd', resposta)
                nomeImagem = resposta.key
            })
            .finally(() => {
                // this.progressoService.tamanhoTotalArquivoBytes = publicacao.imagem.size
                this.salvarImagemFireBase(nomeImagem, publicacao)
            })
    }

    public salvarImagemFireBase(nomeImagem: string, publicacao: any): void {
        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                // acompanhamento do progresso do upload
                (snapshot: any) => {
                    this.progressoService.status = 'andamento'
                    this.progressoService.estado = snapshot
                    // this.progressoService.tamanhoTotalArquivoBytes = snapshot.totalBytes
                    // this.progressoService.bytesTransferidos = snapshot.bytesTransferred
                    // console.log('Snapshot capturado no on()', snapshot)
                },
                (error) => {
                    this.progressoService.status = 'erro'
                    console.log('Erro upload', error)
                },
                () => {
                    // finalização do processo de upload
                    this.progressoService.status = 'concluido'
                    // this.progressoService.limparCampos()
                    // console.log('Upload completo')
                }
            )
    }
}