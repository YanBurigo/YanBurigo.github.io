function sorteio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function reproduz(x,y) {
    var filho=[];
    var filho2=[];
    var n;
    n = sorteio(0, x.length);
    for(var i=0; i<x.length; i++){
        if(i<n){
            filho[i] = x[i];
            filho2[i] = y[i];
        }
        else{
            filho[i] = y[i];
            filho2[i] = x[i];
        }
    }
    
    primeiroFilho = filho;
    segundoFilho = filho2;
}

function mutacao(filho){
    var posicao = sorteio(0,40);
    if(posicao < 10){
        filho[posicao]=sorteio(1,6);
    }
    else if(posicao >=10 && posicao < 20){
        filho[posicao]=sorteio(6,12);
    }
    else if(posicao >= 20 && posicao < 30){
        filho[posicao]=sorteio(12,17);
    }
    else{
        filho[posicao]=sorteio(17,21);
    }
    return filho;
}

function getGeracoes(){
    return geracoes+1;
}