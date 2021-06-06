export class ProgressoService {
    public status: string | undefined
    public estado: any
    // public tamanhoTotalArquivoBytes: number = 0
    // public bytesTransferidos: number = 0

    public limparCampos(): void {
        this.status = undefined
        this.estado = undefined
        // this.tamanhoTotalArquivoBytes = 0
        // this.bytesTransferidos = 0
    }
}