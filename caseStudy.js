var canvas = document.querySelector("canvas")
canvas.width = 600;
canvas.height = 600;
var audio = new Audio('ball.wav');
var audioOver = new Audio('gameover.mp3');
var c = canvas.getContext("2d");
let gameStart = false;
let count = 0;
let circle = new Circle(170, 150, 2, 2, 10);
let Xbar, Ybar;
Swal.fire({
    title: 'Do you want to play the game?',
    showDenyButton: true,

    confirmButtonText: `Play`,
    denyButtonText: `Don't Play`,
}).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
        gameStart = true;
    } else if (result.isDenied) {
        Swal.fire('thank you', '', 'info')
    }
})


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.stroke();
        c.fill()
    }
    this.update = function () {
        if (this.x + this.radius > Xbar - 10 && this.x + this.radius < (-parseInt($("#Bar").css('right')) + 100) && (this.y + this.radius) == Ybar + 20) {
            audio.play()

            this.dy = -this.dy;
            count++;
            document.getElementById("score").innerHTML = "Score: " + count;


        }
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;

        }
        if (this.y - this.radius < 0) {
            this.dy = -this.dy;

        }
        if (this.y + this.radius > canvas.height) {

            document.getElementById("ScoreGameOver").innerHTML = "Score: " + count;
            $("#score").hide();
            $("#Bar").hide();
            $("#rePlay").show(1000);
            $("#ScoreGameOver").show(1000);
            $("#GameOver").show(2000);
            document.getElementById("score").innerHTML = "Score: " + count;
            audioOver.play()

        }


        this.x += this.dx;
        this.y += this.dy;

        this.draw()
    }
}

function playAgain() {
    location.reload();
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)
    Xbar = (parseInt($("#Bar").css('left')));
    Ybar = (parseInt($("#Bar").css('top')));
    // for(var i = 0; i < circleArray.length; i++){
    //     circleArray[i].update();
    // }
    circle.update()
}



function docReady() {
    window.addEventListener('keydown', moveSelection);
}

setTimeout(circle.update(), 1000);
let flag = true;

function leftArrowPressed() {
    if (parseInt($("#Bar").css('left')) == canvas.width - 580) {
    } else {
        if (gameStart) {
            $("#Bar").css('left', '-=20');
            if (flag) {
                animate()
                flag = false;
            }
        }


    }

}

function rightArrowPressed() {
    if (parseInt($("#Bar").css('left')) == canvas.width - 80) {

    } else {
        if (gameStart) {
            $("#Bar").css('left', '+=20');

            if (flag) {
                animate()
                flag = false;
            }
        }


    }
}

function moveSelection(evt) {
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
}
