var content;
var disponibilidade;
var pontuacaoTotal = 0;
var melhoresIndividuos = [];
var elite = [];
var pontuacoesMelhores = [];
var cont = 0;
var elitismo = 0;
var primeiroFilho = [];
var segundoFilho = [];
var cont2 = 0;
var geracoes = 0;


fetch("data/data.json")
.then(response => {
   return response.json();
})
.then(data => content = data);

fetch("data/disponibilidade.json")
.then(response => {
   return response.json();
})
.then(dis => disponibilidade = dis);

function main(populacao, valueMut){
   return AlgoritmoGenetico(populacao, valueMut) 
}