const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var birdSound;
var pigSound;
var gamestate="onSling";
var count=3;
var score=0;

function preload() {
    getBackgroundImage();
    birdSound = loadSound("sound/bird_flying.mp3");
    pigSound = loadSound("sound/pig_snort.mp3");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg) {
    background(backgroundImg);
    }
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    pig1.score();
    pig3.score();
    //log6.display();
    slingshot.display();  
    fill("black");
    textSize(20);
    text ("Score: "+ score, 1000, 350);
    if(count == 0) { 
   text ("Game Over", 600,200);
    }
}

function mouseDragged(){
    if(gamestate!="launched") {
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}
}


function mouseReleased(){
    slingshot.fly();
    gamestate="launched";
    birdSound.play();
    count--
}

function keyPressed(){
    if (gamestate!="onSling" && count>0) {
    if(keyCode === 32 && bird.body.speed<1){
        bird.trajectory=[];
        Matter.Body.setPosition(bird.body, {x: 200 , y: 50});
        slingshot.attach(bird.body);
        gamestate="onSling";
    }
    if(bird.body.position.x<0 || bird.body.position.x>1200 || bird.body.position.y<0 || bird.body.position.y>400) {
        bird.trajectory=[];
        Matter.Body.setPosition(bird.body, {x: 200 , y: 50});
        slingshot.attach(bird.body);
        gamestate="onSling";
    }
    }
}

async function getBackgroundImage() {
    var response=await fetch ("http://worldtimeapi.org/api/timezone/Asia/Singapore/");
    var responseJson=await response.json();
    console.log(responseJson);
    var daytime=responseJson.datetime;
    console.log(daytime);
    var hour=daytime.slice(11,13);
    console.log(hour);
    if(hour>6 && hour<19) {
       bg= "sprites/bg.png";
    }
    else{
        bg= "sprites/NightSky.jpg";
    }
   backgroundImg = loadImage(bg);
}