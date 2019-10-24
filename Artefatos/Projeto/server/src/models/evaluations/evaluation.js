class Evaluation {
    constructor(
        id,
        imc,
        peso,
        altura,
        id_user_avaliador,
        id_user_avaliado
    ){
        this.id = id;
        this.imc = imc;
        this.peso = peso;
        this.altura = altura;
        this.id_user_avaliador = id_user_avaliador;
        this.id_user_avaliado = id_user_avaliado;
    }
}

module.exports = {
    Evaluation
}