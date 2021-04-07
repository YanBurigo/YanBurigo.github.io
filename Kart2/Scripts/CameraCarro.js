var cont=0;
moveCamera = function(){
    camera.rotation.x = 0;
    camera.rotation.z = 0;
    camera.position.x = cameraPosition.position.x + 1;
    camera.position.z = cameraPosition.position.z - 1;
    camera.position.y = cameraPosition.position.y + 5;
}

document.onkeydown = function(event){
    if(event.keyCode == 67){
        if(cont==0){
            cameraMovement = setInterval(moveCamera, 10);}
        if(cont==1){
            clearInterval(cameraMovement)
        }
        document.onmousemove = function (evt){
            if(cont==1){
                if(evt.movementX < 0){
                    camera.rotation.y -= (evt.movementX/150);
                }
                else if(evt.movementX > 0){
                    camera.rotation.y -= (evt.movementX/150);
                }
            }
            
        }
        if(cont==1){
            cont--;
        }
        else if(cont==0){
            cont++;
        }
        
    }
}