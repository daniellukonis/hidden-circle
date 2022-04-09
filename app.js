const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const fingerPrint = document.querySelector('#fingerPrint');
const hint = document.querySelector('section');
let arcCoords = [0,0];
let gameRestart = false;

function randomInt(min,max){
    return Math.floor(Math.random()*max)+min;
};

function resizeCanvas(canvas){
    const xMax = window.innerWidth;
    const yMax = window.innerHeight;
    canvas.width = xMax;
    canvas.height = yMax;
};

function fillContext(canvas,context){
    context.save();
    context.fillStyle = 'rgba(255,255,255,1)'
    const xMax = canvas.width;
    const yMax = canvas.height;
    context.fillRect(0,0,xMax,yMax);
    context.restore();
}

function drawRandomArc(canvas,context){
    const xMax = canvas.width;
    const yMax = canvas.height;
    let x = randomInt(10,xMax-20);
    let y = randomInt(100,yMax-110);
    context.fillStyle = 'rgb(255,255,255)';
    context.lineWidth = 2;
    context.strokeStyle = 'rgb(0,0,0)'
    context.save();
    context.beginPath();
    context.arc(x,y,10,0,Math.PI*2);
    context.fill()
    context.stroke();
    context.restore();
    return [x,y];
}

function drawRectangle(canvas,context){
    const x = randomInt(10,50);
    const y = randomInt(10,50);
    context.strokeStyle = 'rgb(0,0,0)';
    context.fillStyle = 'rgb(255,255,255)'
    context.lineWidth = '2';
    context.beginPath();
    context.rect(0,0,x,y);
    context.fill();
    context.stroke();
};

function randomRectangle(canvas,context){
    const xMax = canvas.width;
    const yMax = canvas.height;
    let x = randomInt(-10,xMax+10);
    let y = randomInt(-10,yMax+10);
    const exclusionX = arcCoords[0];
    const exclusionY = arcCoords[1];
    const area = 75;
    
    if(
        x>exclusionX-area && x<exclusionX+area && y>exclusionY-area && y<exclusionY+area
    ){
        x = 0;
        y = 0;
    };

    context.save();
    context.translate(x,y);
    drawRectangle(canvas,context);
    context.restore();
};

function scatterRectangles(canvas,context){
    for(let i=0; i<2000; i++){
        randomRectangle(canvas,context);
    };
};

function startScatter(){
    let iv = window.setInterval(()=>{randomRectangle(canvas,context)},'100');
    return iv;
};

function moveFingerPrint(arcCoords){
    let x = arcCoords[0] - 42;
    let y = arcCoords[1] - 42;
    fingerPrint.style.left = `${x}px`;
    fingerPrint.style.top = `${y}px`;
};

resizeCanvas(canvas);
fillContext(canvas,context);
scatterRectangles(canvas,context);
arcCoords = drawRandomArc(canvas,context);
startScatter();

window.addEventListener('resize', ()=>{
    location.reload()
})

fingerPrint.addEventListener('click', ()=>{
    if(!gameRestart){
        fingerPrint.classList.toggle('win');
        gameRestart = true;
    }
    else{
        location.reload()
    };
});

hint.addEventListener('click', ()=>{
    fingerPrint.classList.toggle('hint');
});

moveFingerPrint(arcCoords);