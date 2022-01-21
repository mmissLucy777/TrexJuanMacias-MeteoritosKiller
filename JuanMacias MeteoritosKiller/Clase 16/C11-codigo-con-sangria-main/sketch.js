var Trex, imgTrex;
var piso, imgpiso;
var pisoinv;
var imgnube;
var imgobs1;
var imgobs2;
var imgobs3;
var imgobs4;
var imgobs5;
var imgobs6;
var gamestate = 1;
var obstaculosg;
var nubes;
var meteoritosg;
var imgtrexm;
var gameover;
var reset;
var imggo;
var imgres;
var sondie;
var sonjump;
var sonchp;
var score;
var topeCielo



function preload(){
  imgTrex=loadAnimation("trex1.png", "trex3.png", "trex4.png");
  imgpiso=loadAnimation("ground2.png");
  imgnube=loadAnimation("cloud.png");
  imgobs1=loadImage("obstacle1.png");
  imgobs2=loadImage("obstacle2.png");
  imgobs3=loadImage("obstacle3.png");
  imgobs4=loadImage("obstacle4.png");
  imgobs5=loadImage("obstacle5.png");
  imgobs6=loadImage("obstacle6.png");
  imgtrexm=loadAnimation("trex_collided.png");
  imggo=loadImage("gameOver.png");
  imgres=loadImage("restart.png");
  sondie=loadSound("die.mp3");
  sonjump=loadSound("jump.mp3");
  sonchp=loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(600, 200);
  topeCielo = createSprite(100,10,200,10);
  Trex=createSprite(50, 140, 10, 10);
  Trex.addAnimation("Trexrunning", imgTrex);
  Trex.addAnimation("Trexmuerto", imgtrexm);
  Trex.scale=0.7;
  Trex.setCollider("circle", 0, 0, 50);
  piso = createSprite (30, 180, 800, 5);
  piso.addAnimation("Piso", imgpiso);
  pisoinv=createSprite(30, 190, 800, 5);
  //pisoinv.visible=false;
  obstaculosg=new Group();
  nubes=new Group();
  meteoritosg=new Group();
  gameover=createSprite(300, 100, 50, 50);
  gameover.addImage("Gameover", imggo);
  gameover.visible=false;
  reset=createSprite(565, 35, 30, 30);
  reset.addImage("Restart", imgres);
  reset.visible=false;
  score=0;
}

function draw (){
  background("lightgray");
  drawSprites();

  Trex.collide(pisoinv);
  textSize(15);
  text("Score "+score, 20, 12);
  if(gamestate===1){
    Trex.changeAnimation("Trexrunning", imgTrex);
    piso.velocityX=-(10+2*score/1000);

    meteoritosg.bounceOff(pisoinv);
    if(meteoritosg.bounceOff(topeCielo)){
//      meteoritosg.setVelocityXEach(0)  //PRUEBA DESCOMENTANDO ESTA LÍNEA PARA VER SI ES LO QUE BUSCAS CON LA GRAVEDAD

    }


    if(score%1000===0 && score>0){
      sonchp.play();
    }
    score=score+Math.round((frameCount%1===0)*10);
    if(keyDown("space")&& Trex.y>=150){
      sonjump.play();
      Trex.velocityY=-15;
    }
    Trex.velocityY+=1;
    if(obstaculosg.isTouching(Trex) ){
      sondie.play();
      score=0;
      gamestate=0;
    }
    if(piso.x<0){
      piso.x=30;
    }
    if(score>=30000){
      piso.destroy();
      pisoinv.destroy();
      obstaculosg.destroyEach();
    }
    if(Trex.y>=300){
      gamestate=0;
    }
    if(score>=1000){
      meteoritos();
    }
    clima();
    obstaculos();
  }

 
  else if(gamestate===0){
    Trex.changeAnimation("Trexmuerto", imgtrexm);
    piso.velocityX=0;
    nubes.setVelocityXEach(-1);
    nubes.setLifetimeEach(-1);
    obstaculosg.setVelocityXEach(0);
    obstaculosg.setLifetimeEach(-1);
    gameover.visible=true;
    gameover.depth+=2;
    reset.visible=true;
    reset.depth+=3;
    Trex.velocityY=0;
      if(mousePressedOver(reset)){
        gameover.visible=false;
        reset.visible=false;
        nubes.destroyEach();
        obstaculosg.destroyEach();
        obstaculos();
        gamestate=1;
      }
  }
}

function clima (){
  if(frameCount%40 === 0){
    var nube;
    nube=createSprite (600, 40, 25, 18);
    nube.addAnimation("Nube", imgnube);
    nube.scale=0.4;
    nube.lifetime=65;
    nube.velocityX=-(13+2*score/1000);
    nube.y=Math.round(random(30, 75));
    gameover,depth=reset.depth;
    Trex.depth=gameover.depth;
    nube.depth=Trex.depth;
    Trex.depth+=1;
    nubes.add(nube);
  }
}

function obstaculos (){
  if(frameCount%50===0){
    var obstacle;
    obstacle=createSprite(600, 160, 5, 5);
    obstacle.velocityX=-(15+2*score/1000);
    var obsr;
    obsr=Math.round(random(1, 6));
    switch(obsr){
      case 1: obstacle.addImage(imgobs1);
        break;
      case 2: obstacle.addImage(imgobs2);
        break;
      case 3: obstacle.addImage(imgobs3);
        break;
      case 4: obstacle.addImage(imgobs4);
        break;
      case 5: obstacle.addImage(imgobs5);
        break;
      case 6: obstacle.addImage(imgobs6);
        break;
      default: break;
    }
    obstacle.scale=0.7;
    obstacle.lifetime=60;
    obstaculosg.add(obstacle);
  }
}

function meteoritos(){
  if(frameCount%30===0){
    meteorito= createSprite(600, 0, 15, 15);
 
    meteorito.velocityX=-(10+1*score/1000);
    meteorito.velocityY=(8+1*score/1000);
   meteoritosg.add(meteorito);
  }
}
