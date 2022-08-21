//Essa função irá sortear e retornar um número aleatório
function getProxCaminho(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//Essa função irá realizar a busca em árvore, recebendo uma posição inicial e um destino e irá retornar um vetor de caminhos
function buscaArvore(inicio, destino) {
  //irá chamar o nodo inicial e atribuir na variavel selecionado
  robo = chamar(inicio);
  selecionado = robo;
  //o vetor caminho irá guardar todo o caminho percorrido, e será retornado ao final do metodo
  var caminho = [];
  i=0;
  while(true){
    //o caminho irá receber o primeiro nodo e vai guardar
    caminho[i] = selecionado.valor;
    if((selecionado.esquerda!="null")&&(selecionado.direita!="null")){
      //caso a estante que queremos esteja a esquerda ou a direita do caminho que estamos ele irá entrar nesse if ou else if, e irá sair do while
      if(destino==selecionado.esquerda){
        i++;
        caminho[i] = selecionado.esquerda;
        break;
      }
      else if(destino==selecionado.direita){
        i++;
        caminho[i] = selecionado.direita;
        break;
      }
      else{
        //caso ainda não tenhamos chegado ao destinho, então vai chamar o proximo nodo
        while(true){
          //irá chamar a função de sorteio e vai guardar o proximo caminho na variável proximo
          var proximo = selecionado.prox[getProxCaminho(0,selecionado.prox.length)];
          //vai retirar a letra P da frente e verificar se não é igual a casa da onde veio, se não for vai chamar o proximo caminho e vai sair do while
          var nome = proximo.substr(1);
          if((caminho[i-1] != nome) && (nome != "1" && nome != "169"  && nome != "12")){
            selecionado = chamar(proximo);
            i++;
            break;
          }  
        }
      }
    }
    //Irá funcionar igual ao else de cima, mas caso a esquerda e direita forem null, então irá chamar o proximo nodo
    else{
      while(true){
        var proximo = selecionado.prox[getProxCaminho(0,selecionado.prox.length)];
        var nome = proximo.substr(1);
        if((caminho[i-1] != nome) && (nome != "1" && nome != "169" && nome != "12")){
          selecionado = chamar(proximo);
          i++;
          break;
        }  
      }
    }
  }
  //Após realizada a busca irá chamar o metodo entregar, que será responsável por levar a estante até o X
  entregar(selecionado, caminho);
  //Por fim retorna o vetor de caminhos percorridos.
  return caminho;
}

function entregar(estado, caminho){
  //Método responsável por levar a estante até o X
  cont = 0;
  while(true){
    cont++;
    if(estado.fim[0]=="x"){
      i++;
      caminho[i]=estado.valor;
      break;
    }
    else{
      i++
      caminho[i]=estado.valor;
      estado = chamar(estado.fim[0]);
    }
  }
  //aqui chama a volta do X para o local da estante
  voltar(cont, caminho);
}

function voltar(cont, caminho){
  //ele só irá fazer o caminho inverso do metodo entregar
  for(var j=1; j<=cont; j++){
    caminho[i+j]=caminho[i-j];
  }
}
//A função de busca por grafo é praticamente igual a da árvore, com a única diferença é que não deixa passar por caminhos já passados anteriormente
function buscaGrafo(inicio, destino) {
    robo = chamar(inicio);
    selecionado = robo;
    var caminho = [];
    var conte=0;
    var sair=0;
    var erro=0;
    i=0;
    while(true){
      caminho[i] = selecionado.valor;
      if((selecionado.esquerda!="null")&&(selecionado.direita!="null")){
        if(destino==selecionado.esquerda){
          i++;
          caminho[i] = selecionado.esquerda;
          break;
        }
        else if(destino==selecionado.direita){
          i++;
          caminho[i] = selecionado.direita;
          break;
        }
        else{
          while(true){
            var proximo = selecionado.prox[getProxCaminho(0,selecionado.prox.length)];
            var nome = proximo.substr(1);
            conte=0;
            for(var k=0; k<caminho.length; k++){
              
              if(nome == caminho[k]){
                conte++;
              } 
               
            }
            if(conte==0){
              if((caminho[i-1] != nome) && (nome != "1" && nome != "169" && nome != "12")){
                selecionado = chamar(proximo);
                i++;
              }
              break;
            }
            sair++;
            //caso não encontre um caminho irá ficar em loop infinito
            //então quando percorrer esse loop 100000 vezes, o sair atingirá o numero 100000 e entrará nesse if, que será responsável por marcar um erro e sair do loop
            if(sair==100000){
              erro++;
              sair=0;
              break;
            }
          }
        }
      }
      else{
        while(true){
          var proximo = selecionado.prox[getProxCaminho(0,selecionado.prox.length)];
          var nome = proximo.substr(1);
          conte=0;
          for(var k=0; k<caminho.length; k++){
            
            if(nome == caminho[k]){
              conte++;
            } 
             
          }
          if(conte==0){
            if((caminho[i-1] != nome) && (nome != "1" && nome != "169" && nome != "12")){
              selecionado = chamar(proximo);
              i++;
            }
            break;
          }
          sair++;
          if(sair==100000){
            erro++;
            sair=0;
            break;
          }
          
        }
      }
      //caso aconteça um ou mais erros, irá sair do primeiro loop
      if(erro>0){
        break;
      }
    }
    //se não tiver erros, irá chamar a função de entregar a estante ao X e irá retornar o caminho
    if(erro==0){
      entregar(selecionado, caminho);
      return caminho;
    }
    //caso tenha erros, irá marcar o primeiro elemente do vetor como -1 e irá retornar esse caminho, esse -1 será tratado no front, impedindo que o algoritmo do front seja executado
    else{
      caminho[0]=-1;
      return caminho;
    }
}


function chamar(prox) {
  //esse metodo convoca os nodos pelo nome
  if (prox == "p1") {
    return p1;
  } else if (prox == "p12") {
    return p12;
  } else if (prox == "p13") {
    return p13;
  } else if (prox == "p14") {
    return p14;
  } else if (prox == "p15") {
    return p15;
  } else if (prox == "p16") {
    return p16;
  } else if (prox == "p17") {
    return p17;
  } else if (prox == "p18") {
    return p18;
  } else if (prox == "p19") {
    return p19;
  } else if (prox == "p20") {
    return p20;
  } else if (prox == "p21") {
    return p21;
  } else if (prox == "p22") {
    return p22;
  } else if (prox == "p23") {
    return p23;
  } else if (prox == "p24") {
    return p24;
  } else if (prox == "p25") {
    return p25;
  } else if (prox == "p36") {
    return p36;
  } else if (prox == "p37") {
    return p37;
  } else if (prox == "p48") {
    return p48;
  } else if (prox == "p49") {
    return p49;
  } else if (prox == "p50") {
    return p50;
  } else if (prox == "p51") {
    return p51;
  } else if (prox == "p52") {
    return p52;
  } else if (prox == "p53") {
    return p53;
  } else if (prox == "p54") {
    return p54;
  } else if (prox == "p55") {
    return p55;
  } else if (prox == "p56") {
    return p56;
  } else if (prox == "p57") {
    return p57;
  } else if (prox == "p58") {
    return p58;
  } else if (prox == "p59") {
    return p59;
  } else if (prox == "p60") {
    return p60;
  } else if (prox == "p61") {
    return p61;
  } else if (prox == "p72") {
    return p72;
  } else if (prox == "p73") {
    return p73;
  } else if (prox == "p84") {
    return p84;
  } else if (prox == "p85") {
    return p85;
  } else if (prox == "p86") {
    return p86;
  } else if (prox == "p87") {
    return p87;
  } else if (prox == "p88") {
    return p88;
  } else if (prox == "p89") {
    return p89;
  } else if (prox == "p90") {
    return p90;
  } else if (prox == "p91") {
    return p91;
  } else if (prox == "p92") {
    return p92;
  } else if (prox == "p93") {
    return p93;
  } else if (prox == "p94") {
    return p94;
  } else if (prox == "p95") {
    return p95;
  } else if (prox == "p96") {
    return p96;
  } else if (prox == "p97") {
    return p97;
  } else if (prox == "p108") {
    return p108;
  } else if (prox == "p109") {
    return p109;
  } else if (prox == "p120") {
    return p120;
  } else if (prox == "p121") {
    return p121;
  } else if (prox == "p122") {
    return p122;
  } else if (prox == "p123") {
    return p123;
  } else if (prox == "p124") {
    return p124;
  } else if (prox == "p125") {
    return p125;
  } else if (prox == "p126") {
    return p126;
  } else if (prox == "p127") {
    return p127;
  } else if (prox == "p128") {
    return p128;
  } else if (prox == "p129") {
    return p129;
  } else if (prox == "p130") {
    return p130;
  } else if (prox == "p131") {
    return p131;
  } else if (prox == "p132") {
    return p132;
  } else if (prox == "p133") {
    return p133;
  } else if (prox == "p144") {
    return p144;
  } else if (prox == "p145") {
    return p145;
  } else if (prox == "p156") {
    return p156;
  } else if (prox == "p157") {
    return p157;
  } else if (prox == "p158") {
    return p158;
  } else if (prox == "p159") {
    return p159;
  } else if (prox == "p160") {
    return p160;
  } else if (prox == "p161") {
    return p161;
  } else if (prox == "p162") {
    return p162;
  } else if (prox == "p163") {
    return p163;
  } else if (prox == "p164") {
    return p164;
  } else if (prox == "p165") {
    return p165;
  } else if (prox == "p166") {
    return p166;
  } else if (prox == "p167") {
    return p167;
  } else if (prox == "p168") {
    return p168;
  } else if (prox == "p169") {
    return p169;
  } else if (prox == "p180") {
    return p180;
  }
}

//aqui é instanciado nodos, cada um com o seu valor, o seu proximo nodo, e as estantes que tem na direita e esquerda
//os que tem a variável fim, é o caminho que irá percorrer pra entregar as estantes
class nodo {}

const p1 = new nodo();
p1.valor = "1";
p1.prox = ["p13"];
p1.esquerda = "null";
p1.direita = "null";

const p12 = new nodo();
p12.valor = "12";
p12.prox = ["p24"];
p12.esquerda = "null";
p12.direita = "null";

const p13 = new nodo();
p13.valor = "13";
p13.prox = ["p1", "p14", "p25"];
p13.esquerda = "null";
p13.direita = "null";

const p14 = new nodo();
p14.valor = "14";
p14.prox = ["p13", "p15"];
p14.esquerda = "2";
p14.direita = "26";
p14.fim = ["p15"];

const p15 = new nodo();
p15.valor = "15";
p15.prox = ["p14", "p16"];
p15.esquerda = "3";
p15.direita = "27";
p15.fim = ["p16"];

const p16 = new nodo();
p16.valor = "16";
p16.prox = ["p15", "p17"];
p16.esquerda = "4";
p16.direita = "28";
p16.fim = ["p17"];

const p17 = new nodo();
p17.valor = "17";
p17.prox = ["p16", "p18"];
p17.esquerda = "5";
p17.direita = "29";
p17.fim = ["p18"];

const p18 = new nodo();
p18.valor = "18";
p18.prox = ["p17", "p19"];
p18.esquerda = "6";
p18.direita = "30";
p18.fim = ["p19"];

const p19 = new nodo();
p19.valor = "19";
p19.prox = ["p18", "p20"];
p19.esquerda = "7";
p19.direita = "31";
p19.fim = ["p20"];

const p20 = new nodo();
p20.valor = "20";
p20.prox = ["p19", "p21"];
p20.esquerda = "8";
p20.direita = "32";
p20.fim = ["p21"];

const p21 = new nodo();
p21.valor = "21";
p21.prox = ["p20", "p22"];
p21.esquerda = "9";
p21.direita = "33";
p21.fim = ["p22"];

const p22 = new nodo();
p22.valor = "22";
p22.prox = ["p21", "p23"];
p22.esquerda = "10";
p22.direita = "34";
p22.fim = ["p23"];

const p23 = new nodo();
p23.valor = "23";
p23.prox = ["p22", "p24"];
p23.esquerda = "11";
p23.direita = "35";
p23.fim = ["p24"];

const p24 = new nodo();
p24.valor = "24";
p24.prox = ["p12", "p23", "p36"];
p24.esquerda = "null";
p24.direita = "null";
p24.fim = ["p36"];

const p25 = new nodo();
p25.valor = "25";
p25.prox = ["p13", "p37"];
p25.esquerda = "null";
p25.direita = "null";

const p36 = new nodo();
p36.valor = "36";
p36.prox = ["p24", "p48"];
p36.esquerda = "null";
p36.direita = "null";
p36.fim = ["p48"];

const p37 = new nodo();
p37.valor = "37";
p37.prox = ["p25", "p49"];
p37.esquerda = "null";
p37.direita = "null";

const p48 = new nodo();
p48.valor = "48";
p48.prox = ["p36", "p60"];
p48.esquerda = "null";
p48.direita = "null";
p48.fim = ["p60"];

const p49 = new nodo();
p49.valor = "49";
p49.prox = ["p37", "p50", "p61"];
p49.esquerda = "null";
p49.direita = "null";

const p50 = new nodo();
p50.valor = "50";
p50.prox = ["p49", "p51"];
p50.esquerda = "38";
p50.direita = "62";
p50.fim = ["p51"];

const p51 = new nodo();
p51.valor = "51";
p51.prox = ["p50", "p52"];
p51.esquerda = "39";
p51.direita = "63";
p51.fim = ["p52"];

const p52 = new nodo();
p52.valor = "52";
p52.prox = ["p51", "p53"];
p52.esquerda = "40";
p52.direita = "64";
p52.fim = ["p53"];

const p53 = new nodo();
p53.valor = "53";
p53.prox = ["p52", "p54"];
p53.esquerda = "41";
p53.direita = "65";
p53.fim = ["p54"];

const p54 = new nodo();
p54.valor = "54";
p54.prox = ["p53", "p55"];
p54.esquerda = "42";
p54.direita = "66";
p54.fim = ["p55"];

const p55 = new nodo();
p55.valor = "55";
p55.prox = ["p54", "p56"];
p55.esquerda = "43";
p55.direita = "67";
p55.fim = ["p56"];

const p56 = new nodo();
p56.valor = "56";
p56.prox = ["p55", "p57"];
p56.esquerda = "44";
p56.direita = "68";
p56.fim = ["p57"];

const p57 = new nodo();
p57.valor = "57";
p57.prox = ["p56", "p58"];
p57.esquerda = "45";
p57.direita = "69";
p57.fim = ["p58"];

const p58 = new nodo();
p58.valor = "58";
p58.prox = ["p57", "p59"];
p58.esquerda = "46";
p58.direita = "70";
p58.fim = ["p59"];

const p59 = new nodo();
p59.valor = "59";
p59.prox = ["p58", "p60"];
p59.esquerda = "47";
p59.direita = "71";
p59.fim = ["p60"];

const p60 = new nodo();
p60.valor = "60";
p60.prox = ["p48", "p59", "p72"];
p60.esquerda = "null";
p60.direita = "null";
p60.fim = ["p72"];

const p61 = new nodo();
p61.valor = "61";
p61.prox = ["p49", "p73"];
p61.esquerda = "null";
p61.direita = "null";

const p72 = new nodo();
p72.valor = "72";
p72.prox = ["p60", "p84"];
p72.esquerda = "null";
p72.direita = "null";
p72.fim = ["p84"];

const p73 = new nodo();
p73.valor = "73";
p73.prox = ["p61", "p85"];
p73.esquerda = "null";
p73.direita = "null";

const p84 = new nodo();
p84.valor = "84";
p84.prox = ["p72", "p96"];
p84.esquerda = "null";
p84.direita = "null";
p84.fim = ["p96"];

const p85 = new nodo();
p85.valor = "85";
p85.prox = ["p73", "p86", "p97"];
p85.esquerda = "null";
p85.direita = "null";

const p86 = new nodo();
p86.valor = "86";
p86.prox = ["p85", "p87"];
p86.esquerda = "74";
p86.direita = "98";
p86.fim = ["p87"];

const p87 = new nodo();
p87.valor = "87";
p87.prox = ["p86", "p88"];
p87.esquerda = "75";
p87.direita = "99";
p87.fim = ["p88"];

const p88 = new nodo();
p88.valor = "88";
p88.prox = ["p87", "p89"];
p88.esquerda = "76";
p88.direita = "100";
p88.fim = ["p89"];

const p89 = new nodo();
p89.valor = "89";
p89.prox = ["p88", "p90"];
p89.esquerda = "77";
p89.direita = "101";
p89.fim = ["p90"];

const p90 = new nodo();
p90.valor = "90";
p90.prox = ["p89", "p91"];
p90.esquerda = "78";
p90.direita = "102";
p90.fim = ["p91"];

const p91 = new nodo();
p91.valor = "91";
p91.prox = ["p90", "p92"];
p91.esquerda = "79";
p91.direita = "103";
p91.fim = ["p92"];

const p92 = new nodo();
p92.valor = "92";
p92.prox = ["p91", "p93"];
p92.esquerda = "80";
p92.direita = "104";
p92.fim = ["p93"];

const p93 = new nodo();
p93.valor = "93";
p93.prox = ["p92", "p94"];
p93.esquerda = "81";
p93.direita = "105";
p93.fim = ["p94"];

const p94 = new nodo();
p94.valor = "94";
p94.prox = ["p93", "p95"];
p94.esquerda = "82";
p94.direita = "106";
p94.fim = ["p95"];

const p95 = new nodo();
p95.valor = "95";
p95.prox = ["p94", "p96"];
p95.esquerda = "83";
p95.direita = "107";
p95.fim = ["p96"];

const p96 = new nodo();
p96.valor = "96";
p96.prox = ["p84", "p95", "p108"];
p96.esquerda = "null";
p96.direita = "null";
p96.fim = ["p108"];

const p97 = new nodo();
p97.valor = "97";
p97.prox = ["p85", "p109"];
p97.esquerda = "null";
p97.direita = "null";

const p108 = new nodo();
p108.valor = "108";
p108.prox = ["p96", "p120"];
p108.esquerda = "null";
p108.direita = "null";
p108.fim = ["p120"];

const p109 = new nodo();
p109.valor = "109";
p109.prox = ["p97", "p121"];
p109.esquerda = "null";
p109.direita = "null";

const p120 = new nodo();
p120.valor = "120";
p120.prox = ["p108", "p132"];
p120.esquerda = "null";
p120.direita = "null";
p120.fim = ["p132"];

const p121 = new nodo();
p121.valor = "121";
p121.prox = ["p109", "p122", "p133"];
p121.esquerda = "null";
p121.direita = "null";

const p122 = new nodo();
p122.valor = "122";
p122.prox = ["p121", "p123"];
p122.esquerda = "110";
p122.direita = "134";
p122.fim = ["p123"];

const p123 = new nodo();
p123.valor = "123";
p123.prox = ["p122", "p124"];
p123.esquerda = "111";
p123.direita = "135";
p123.fim = ["p124"];

const p124 = new nodo();
p124.valor = "124";
p124.prox = ["p123", "p125"];
p124.esquerda = "112";
p124.direita = "136";
p124.fim = ["p125"];

const p125 = new nodo();
p125.valor = "125";
p125.prox = ["p124", "p126"];
p125.esquerda = "113";
p125.direita = "137";
p125.fim = ["p126"];

const p126 = new nodo();
p126.valor = "126";
p126.prox = ["p125", "p127"];
p126.esquerda = "114";
p126.direita = "138";
p126.fim = ["p127"];

const p127 = new nodo();
p127.valor = "127";
p127.prox = ["p126", "p128"];
p127.esquerda = "115";
p127.direita = "139";
p127.fim = ["p128"];

const p128 = new nodo();
p128.valor = "128";
p128.prox = ["p127", "p129"];
p128.esquerda = "116";
p128.direita = "140";
p128.fim = ["p129"];

const p129 = new nodo();
p129.valor = "129";
p129.prox = ["p128", "p130"];
p129.esquerda = "117";
p129.direita = "141";
p129.fim = ["p130"];

const p130 = new nodo();
p130.valor = "130";
p130.prox = ["p129", "p131"];
p130.esquerda = "118";
p130.direita = "142";
p130.fim = ["p131"];

const p131 = new nodo();
p131.valor = "131";
p131.prox = ["p130", "p132"];
p131.esquerda = "119";
p131.direita = "143";
p131.fim = ["p132"];

const p132 = new nodo();
p132.valor = "132";
p132.prox = ["p120", "p131", "p144"];
p132.esquerda = "null";
p132.direita = "null";
p132.fim = ["p144"];

const p133 = new nodo();
p133.valor = "133";
p133.prox = ["p121", "p145"];
p133.esquerda = "null";
p133.direita = "null";

const p144 = new nodo();
p144.valor = "144";
p144.prox = ["p132", "p156"];
p144.esquerda = "null";
p144.direita = "null";
p144.fim = ["p156"];

const p145 = new nodo();
p145.valor = "145";
p145.prox = ["p133", "p157"];
p145.esquerda = "null";
p145.direita = "null";

const p156 = new nodo();
p156.valor = "156";
p156.prox = ["p144", "p168"];
p156.esquerda = "null";
p156.direita = "null";
p156.fim = ["p168"];

const p157 = new nodo();
p157.valor = "157";
p157.prox = ["p145", "p158", "p169"];
p157.esquerda = "null";
p157.direita = "null";

const p158 = new nodo();
p158.valor = "158";
p158.prox = ["p157", "p159"];
p158.esquerda = "146";
p158.direita = "170";
p158.fim = ["p159"];

const p159 = new nodo();
p159.valor = "159";
p159.prox = ["p158", "p160"];
p159.esquerda = "147";
p159.direita = "171";
p159.fim = ["p160"];

const p160 = new nodo();
p160.valor = "160";
p160.prox = ["p159", "p161"];
p160.esquerda = "148";
p160.direita = "172";
p160.fim = ["p161"];

const p161 = new nodo();
p161.valor = "161";
p161.prox = ["p160", "p162"];
p161.esquerda = "149";
p161.direita = "173";
p161.fim = ["p162"];

const p162 = new nodo();
p162.valor = "162";
p162.prox = ["p161", "p163"];
p162.esquerda = "150";
p162.direita = "174";
p162.fim = ["p163"];

const p163 = new nodo();
p163.valor = "163";
p163.prox = ["p162", "p164"];
p163.esquerda = "151";
p163.direita = "175";
p163.fim = ["p164"];

const p164 = new nodo();
p164.valor = "164";
p164.prox = ["p163", "p165"];
p164.esquerda = "152";
p164.direita = "176";
p164.fim = ["p165"];

const p165 = new nodo();
p165.valor = "165";
p165.prox = ["p164", "p166"];
p165.esquerda = "153";
p165.direita = "177";
p165.fim = ["p166"];

const p166 = new nodo();
p166.valor = "166";
p166.prox = ["p165", "p167"];
p166.esquerda = "154";
p166.direita = "178";
p166.fim = ["p167"];

const p167 = new nodo();
p167.valor = "167";
p167.prox = ["p166", "p168"];
p167.esquerda = "155";
p167.direita = "179";
p167.fim = ["p168"];

const p168 = new nodo();
p168.valor = "168";
p168.prox = ["p156", "p167"];
p168.esquerda = "null";
p168.direita = "null";
p168.fim = ["p180"];

const p169 = new nodo();
p169.valor = "169";
p169.prox = ["p157"];
p169.esquerda = "null";
p169.direita = "null";

const p180 = new nodo();
p180.valor = "180";
p180.prox = ["null"];
p180.esquerda = "null";
p180.direita = "null";
p180.fim=["x"];
