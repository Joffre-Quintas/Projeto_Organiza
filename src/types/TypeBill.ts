export interface IBill {
    id?: number,
    data: Date | null,
    tipo: string | null,
    subtipo: string | null,
    valor: number | null,
    descricao: string | null
}