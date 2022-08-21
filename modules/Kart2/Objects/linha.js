function gerarLinha(){
    var pontos = [];
    var xi = 0;
    var zi = 0;
    for(var i=0; i<4000; i++){
        pontos.push(new THREE.Vector3(xi,0,zi));
        xi -= 20 * Math.sin(i/630)/100;
        zi += 20 * Math.cos(i/630)/100;
    }
    return new THREE.BufferGeometry().setFromPoints(pontos);
}

var line = new THREE.Line(gerarLinha(), new THREE.LineBasicMaterial({color: 0x59fd8b}));
line.position.y = 1
line.position.x = 125
line.position.z = -5
cena.add(line)