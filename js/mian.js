var can = document.getElementById("myCanvas");
var $c = new CanvasHead(can);





var shipSize = 100;
var shipSpriteFront = "e082fc2df9a92be044b6308800339622.png";
var shipSpriteRight = "40ac9396208891d772c5302467d24838.png";
var shipSpriteLeft = "40ac9396208891d772c5302467d24838I.png";
var bulletSprite = "plasma.png";
var maxEnergy = 500;
var energy = maxEnergy;
var energyRate = 0.2;
var maxHp = 100;
var hp = maxHp;
var hpRate = 0;
var shipSprite = shipSprite;
var bullets = [];
var volume = 80;
var music = document.getElementById("music");
var bulletSpeed = 5;
var shootingRate = 3;
var shootingCost = 15;
var shotSound = new Audio('blaster.mp3');
var maxShots = 6;
var shotIndx = 0;
var drag = 20;

function drawShip( x,y ){
    $c.drawImage(shipSprite,x,y,shipSize,shipSize);
}


var enBar = document.getElementById("energy");
function updateEnergy(){
    var pr = (energy/maxEnergy) * 100;
    if(energy<maxEnergy){
        energy+= energyRate;
    }
    enBar.innerHTML = '<h3>Energy</h3>\
    <div class="progress" style="height: 10px; width:100%">\
        <div class="progress-bar" role="progressbar" style="width: '+pr+'%;" aria-valuenow="'+pr+'" aria-valuemin="0" aria-valuemax="100"></div>\
    </div>';
}

var hpBar = document.getElementById("hp");
function updateHp(){
    var pr = (hp/maxHp) * 100;
    if(hp<maxHp){
        hp+= hpRate;
    }
    hpBar.innerHTML = '<h3>Energy</h3>\
    <div class="progress" style="height: 10px; width:100%">\
        <div class="progress-bar bg-danger" role="progressbar" style="width: '+pr+'%;" aria-valuenow="'+pr+'" aria-valuemin="0" aria-valuemax="100"></div>\
    </div>';
}

var volControl = document.getElementById("volume");
function updateVolume(){
    volume = volControl.value;
    music.volume = volume/100;
}

function drawShot(x, y){
    $c.strokeWeight(4);
    //$c.line(x,y,x,y+10);
    $c.drawImage(bulletSprite,x,y,30,70);
    $c.strokeWeight(1);
};

var bullet = function(posX, posY){
    this.posX = posX;
    this.posY = posY;
};


var shoot = function(x,y){
    
    if(shotIndx === maxShots){ shotIndx=0; };
    
    if((energy)>shootingCost){
        bullets[shotIndx] = new bullet(x,y);
        energy-=shootingCost;
        shotIndx++;
        var shotSound = new Audio('blaster.mp3');
        shotSound.volume = volume/100;
        shotSound.play();
        delete shotSound;
    }
    
    
};

var xPos = 0;
var yPos = 0;
var dX = 0;
var dY = 0;

window.onload = function(){
    $c.draw = function(){
        dX = $c.mouseX - xPos;
        dY = $c.mouseY - yPos;
        xPos += (dX/drag);
        yPos += (dY/(drag*2));
    
        if(dX>40){
            shipSprite = shipSpriteRight;
        }else if(dX<-40){
            shipSprite = shipSpriteLeft;
        }else{
            shipSprite = shipSpriteFront;
        }
    
        updateEnergy();
        updateHp();
        updateVolume();
    
        
        $c.mouseReleased = function(){
            shoot(xPos, yPos);
        }
    
        $c.clearCanvas();
        drawShip(xPos - shipSize / 2, yPos - shipSize / 2);
    
        bullets.forEach(function(e,i){
            drawShot(e.posX,e.posY-=bulletSpeed);
        });
    };
};


