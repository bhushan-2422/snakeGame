let inputDir = {
    x:0,
    y:0
};
let foodSound = new Audio('coin-eat.wav');
let gameOverSound = new Audio('game-over.mp3');
let musicSound = new Audio('music.mp3');
let moveSound = new Audio('click-sound.wav');
let speed = 5;
let lastPaintTime=0;
let score =0;

// let snakeArr ={
//     x:13,y:15
// }; // this is wrong 

let snakeArr = [
    { x:13, y:15 }
];
let food ={
    x:6,y:7
};

//buttons
let easy = document.getElementById("easy");
let medium = document.getElementsByClassName("medium")[0];
let hard = document.getElementsByClassName("hard")[0];
let music = document.getElementsByClassName("music")[0]; // or use getElementById if it has one

window.addEventListener('load', () => {
    speed = 5;
    easy.setAttribute("style", "background-color: pink");
    
});
medium.addEventListener('click', () => {
    speed = 8; // increase the speed for easy
    medium.setAttribute("style", "background-color: pink");
    easy.setAttribute("style", "background-color: transparent");
    hard.setAttribute("style", "background-color: transparent");


});
hard.addEventListener('click', () => {
    speed = 15; // increase the speed for easy
    hard.setAttribute("style", "background-color: pink");
    easy.setAttribute("style", "background-color: transparent");
    medium.setAttribute("style", "background-color: transparent");
});
music.addEventListener('click', () => {
    if (!musicSound.paused) {
        musicSound.pause();
        music.setAttribute("style", "background-color: #ff81b1");
    } else {
        musicSound.play();
        music.setAttribute("style", "background-color: rgb(171, 148, 255)");
    }
});







//game function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    // musicSound.play();
    gameEngine();
    // console.log(ctime);

}
function isCollide(snake){
    //if you touch yourself
    for (let i = 1; i < snakeArr.length; i++){
        if(snake[i].x ===snake[0].x && snake[i].y ===snake[0].y ){
            return true;
        }
       
    }
    //if you touch wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    

}
function gameEngine(){
    //part1: updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("game over. press any key to play again");
        location.reload(); // This will reload the entire page

        snakeArr =  [{ x:13, y:15 }];
        // musicSound.play();
        score =0;

    }

    //if you have eaten the food , increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        score++;
        if(score > highscoreval){
            highscoreval = score ;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            document.getElementById("highscoreBox").innerHTML = "high score: "+highscoreval;

        }
        document.getElementById("score").innerHTML= "score:" +score;
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random())}
    }

    //moving the snake
    for(let i =snakeArr.length-2 ; i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]}; //new object is created
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;





    //part2:display the snake and food
    let board = document.getElementById("board");
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0 ){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display food element
    let foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
   
}


//main logic starts here
let highscore = localStorage.getItem("highscore");
let highscoreval;
if(highscore === null){
    highscoreval=0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));

}
else{
    highscoreval = JSON.parse(highscore);
    document.getElementById("highscoreBox").innerHTML = "high score: "+highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1} //start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0 ;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x =0 ;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break; 
        default: break;    
    
    } 
});

//using controls
// Select the control buttons
let topBtn = document.getElementById("top");
let bottomBtn = document.getElementById("bottom");
let leftBtn = document.getElementById("left");
let rightBtn = document.getElementById("right");

// Add click event listeners that mimic arrow key behavior
topBtn.addEventListener("click", () => {
    inputDir.x = 0;
    inputDir.y = -1;
    moveSound.play();
});

bottomBtn.addEventListener("click", () => {
    inputDir.x = 0;
    inputDir.y = 1;
    moveSound.play();
});

leftBtn.addEventListener("click", () => {
    inputDir.x = -1;
    inputDir.y = 0;
    moveSound.play();
});

rightBtn.addEventListener("click", () => {
    inputDir.x = 1;
    inputDir.y = 0;
    moveSound.play();
});








