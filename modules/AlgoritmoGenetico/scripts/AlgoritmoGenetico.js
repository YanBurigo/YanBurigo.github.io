function AlgoritmoGenetico(populacao, valueMut){
    var pontuacao=[];
    var novaPopulacao = [];
    elitismo = populacao.length;
    elite = []

    melhoresIndividuos = [];
    pontuacoesMelhores = [];
    cont2 = 0;
    
    for(var geracao = 0; geracao < 10000; geracao++){

        for(var i=0; i<populacao.length; i++){
            pontuacao[i] = avaliacao(populacao[i]);
            if(pontuacao[i]==1000){
                cont++;
                break;
            }
        }
        novaPopulacao = getMelhorIndividuo();
        var posicao = [];
        for(var i=novaPopulacao.length; i<populacao.length-1; i=i+2){
            for(var o=0; o<2; o++){
                var sortear = sorteio(0,pontuacaoTotal);
                var chance = 0;
                for(var j=0; j<pontuacao.length; j++){
                    chance = chance + pontuacao[j];
                    if(chance >= sortear){
                        posicao[o] = j;
                        break;
                    }
                }
            }
            reproduz(populacao[posicao[0]],populacao[posicao[1]]);
            if(sorteio(0,100)<valueMut){
                primeiroFilho=mutacao(primeiroFilho);
            }
            novaPopulacao[i] = primeiroFilho;
            if(sorteio(0,100)<valueMut){
                segundoFilho=mutacao(segundoFilho);
            }
            novaPopulacao[i+1] = segundoFilho;
        }
        geracoes = geracao;
        if(cont == 1){
            break;
        }
        pontuacaoTotal=0;
        populacao = novaPopulacao;
    }

    cont = 0;
    
    return getMelhorIndividuo()[0];
}