var chao;
var bk;
var fundoAzul;
var invisibleground;
var princess, princessImg, princessJumpImg, princessCry;
var enemy1,enemy2,enemy3,enemy4,enemy5;
var coin;
var platform, platformImg;
var star, starImg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  fundoAzul = loadImage("fundomario1.png");
  chao= loadImage("chao.png");
  princessImg= loadAnimation("prin1.png","prin2.png");
  princessJumpImg = loadAnimation("prinjump1.png","prinjump2.png","prinjump2.png","prinjump2.png","prinjump2.png","prinjump2.png","prinjump2.png","prinjump2.png","prinjump2.png");
  princessCry = loadAnimation("cry.png");
  coin = loadImage("moeda.png");
  enemy1 = loadImage("inimigoss1.png");
  enemy2 = loadImage("inimigoss3.png"); 
  enemy3 = loadImage("inimigoss4.png");
  enemy4 = loadImage("inimigoss5.png");
  enemy5 = loadImage("inimigoss6.png");
  platformImg = loadImage("plataforma.png");
  starImg = loadImage ("star.png");
}
function setup(){
  createCanvas(windowWidth,windowHeight);
  
  bk = createSprite(width/2 ,height-80,width,height)
  bk.addImage("chao",chao)
  bk.scale = 3.0;
  bk.x = bk.width/2 + 600;
  bk.velocityX = -4;

  princess = createSprite(150, height-35, 40,40);
  princess.addAnimation("princesa", princessImg);
  princess.addAnimation("jump", princessJumpImg);
  princess.addAnimation("cry", princessCry);
  princess.scale = 0.3

  //princess.debug=true;
  princess.setCollider("rectangle",0,0,200,250)

  invisibleground = createSprite(0,height-35, 800, 10);
  invisibleground.visible = false;

  rewardGroup = new Group();
  obsGroup = new Group();
  obs1Group = new Group();
  platformGroup = new Group();
  starGroup = new Group();
}
function draw(){
  console.log(score)

  background(fundoAzul);

  textSize(20)
  fill ("#ffffff");
  text("Pontuação: "+score, 100, 60);


  if(gameState === PLAY){ 
  if(bk.x < 520){
    bk.x = bk.width/2 +400;
  }

  princess.changeAnimation("princesa");
    
if(keyDown("SPACE") && princess.y >500){
  princess.velocityY = -15;
  princess.changeAnimation("jump");
}

princess.velocityY = princess.velocityY+1;
princess.x = 250;

princess.collide(invisibleground);
princess.bounceOff(platformGroup);


if(rewardGroup.isTouching(princess)){
  rewardGroup.destroyEach();
  score = score+5;
}

else if(starGroup.isTouching(princess)){
  starGroup.destroyEach();
  score = score+20;
}


obstacles(150,300,700, enemy1, 0.3, -5, 400, obsGroup)
obstacles(180,height-65,height-65, enemy3, 0.3, -7, 400, obs1Group)

reward();
plataforms();
superReward();

if(obsGroup.isTouching(princess) || obs1Group.isTouching(princess)){
  gameState = END
}
  }

  else if(gameState === END){
    princess.changeAnimation("cry")
    princess.velocityY = 0;
    princess.velocityX = 0;
    bk.velocityX = 0;
    obsGroup.setVelocityXEach(0);
    obs1Group.setVelocityXEach(0);
    platformGroup.setVelocityXEach(0);
    rewardGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);

    obsGroup.setLifetimeEach(-1);
    obs1Group.setLifetimeEach(-1);
    platformGroup.setLifetimeEach(-1);
    rewardGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);

      
  }
  drawSprites();
  
}

/* fc = quantidade de frames para os obstaculos serem gerados
 valor1 e valor2 = posições dos obstaculos
inimigos = imagens dos obstaculos
velocidade = velocidade dos obstaculos
tempovida = tempo de vida dos sprites

*/
function obstacles(fc, valor1, valor2, inimigos, tamanho, velocidade, tempovida, obstaclesGroup){
  if(frameCount % fc === 0){
    var obstaculo = createSprite(width, height, 50,50);
    obstaculo.y = Math.round(random(valor1,valor2));
    obstaculo.addImage(inimigos);
    obstaculo.scale = tamanho;
    obstaculo.velocityX = velocidade;

    obstaculo.lifetime = tempovida;

    obstaclesGroup.add(obstaculo);
  }
}

function reward(){
  if(frameCount % 250 === 0){
    var dindin = createSprite(width, Math.round(random(500, 350)),40,40);
    dindin.addImage(coin);
    dindin.scale = 0.1;
    dindin.velocityX = -4;
    dindin.lifetime = 500;
    rewardGroup.add(dindin);

  }
}

function superReward() {
  if(frameCount % 450 === 0){
    star = createSprite(width,platform.y-30,30,30);
    star.addImage(starImg);
    star.scale = 0.3;
    star.velocityX = -4;
    star.lifetime = 500;
    starGroup.add(star);

  }
}

function plataforms(){
  if(frameCount % 150 === 0){
    platform = createSprite(width, Math.round(random(700,450)), 30, 30);
    platform.addImage(platformImg);
    platform.scale = 1.2;
    platform.velocityX = -4;
    platform.lifetime = 500;
    platformGroup.add(platform);
  }
}