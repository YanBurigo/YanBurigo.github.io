function avaliacao(x){
    var pontuacao = 1000;
    var cargaHoraria = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i=0; i<40; i++){
        for(var j=0; j<20; j++){
            if(x[i]==content[j].id){
                cargaHoraria[j]=cargaHoraria[j]+2;
            }
        }
    }
    for(var i=0; i<20; i++){
        if(cargaHoraria[i]!=content[i].cargaHoraria){
            pontuacao = pontuacao - 10;
        }
    }
    for(var i=0; i<30; i++){
        if(content[x[i]-1].professor==content[x[i+10]-1].professor){
            pontuacao = pontuacao - 6;
        }
        if(i<10){
            if(content[x[i]-1].professor==content[x[i+30]-1].professor){
                pontuacao = pontuacao - 6;
            }
        }
        if(i<20){
            if(content[x[i]-1].professor==content[x[i+20]-1].professor){
                pontuacao = pontuacao - 6;
            }
        }
    }
    for(var j=1; j<6; j++){
        for(var i=j; i<41; i=i+5){
            for(var k=0; k<disponibilidade.length; k++){
                if(content[x[i-1]-1].professor==disponibilidade[k].professor){
                    for(var m=0; m<disponibilidade[k].indisponivel.length; m++){
                        if(j==1 && disponibilidade[k].indisponivel[m]=="Segunda"){
                            pontuacao = pontuacao - 3;
                        }
                        else if(j==2 && disponibilidade[k].indisponivel[m]=="Terça"){
                            pontuacao = pontuacao - 3;
                        }
                        else if(j==3 && disponibilidade[k].indisponivel[m]=="Quarta"){
                            pontuacao = pontuacao - 3;
                        }
                        else if(j==4 && disponibilidade[k].indisponivel[m]=="Quinta"){
                            pontuacao = pontuacao - 3;
                        }
                        else if(j==5 && disponibilidade[k].indisponivel[m]=="Sexta"){
                            pontuacao = pontuacao - 3;
                        }
                    }
                }
            }
        }
    }

    var pontuacaoIndividuo=pontuacao;
    var auxPontuacao;
    
    var auxMelhorIndividuo =x;
    var auxIndividuo =[];

    for(var i=0; i<0.2*elitismo; i++){
        if(pontuacoesMelhores[i]==null){
            pontuacoesMelhores[i]=pontuacaoIndividuo;
            melhoresIndividuos[i]=auxMelhorIndividuo;
        }
        else if(pontuacaoIndividuo>pontuacoesMelhores[i]){
            
            auxPontuacao=pontuacoesMelhores[i];
            pontuacoesMelhores[i]=pontuacaoIndividuo;
            pontuacaoIndividuo = auxPontuacao;

            auxIndividuo=melhoresIndividuos[i];
            melhoresIndividuos[i]=auxMelhorIndividuo;
            auxMelhorIndividuo=auxIndividuo;
        }
        
    }

    avaliacaoAcumulada(pontuacao);
    return pontuacao;
}

function avaliacaoAcumulada(pontuacao){
    pontuacaoTotal = pontuacaoTotal + pontuacao;
}

function getMelhorIndividuo(){
    var individo=[];
    for(var i=0; i<0.2*elitismo; i++){
        individo[i]=melhoresIndividuos[i]
    }
    return individo;
}

function getMelhorPontuacao(){
    return pontuacoesMelhores;
}