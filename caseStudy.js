var canvas = document.querySelector("canvas")
canvas.width = 600;
canvas.height = 600;
var audio = new Audio('ball.wav');
var audioOver = new Audio('gameover.mp3');
var audioBack = new Audio('backr2.mp3');
var c = canvas.getContext("2d");
let gameStart = false;
let count = 0;
let circle = new Circle(170, 150, 2, 2, 10);
let Xbar, Ybar;
Swal.fire({
    title: 'Do you want to play the game?',
    showDenyButton: true,

    confirmButtonText: `Play`,
    denyButtonText: `Chose Theme`,
}).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
        gameStart = true;
    } else if (result.isDenied) {
        ChangeTheme();
        gameStart = true;
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
        c.fillStyle = "red";
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.stroke();
        c.fill();
    }
    this.update = function () {
        if (this.x + this.radius > Xbar - 10 && this.x + this.radius < (-parseInt($("#Bar").css('right')) + 100) && (this.y + this.radius) == Ybar + 20) {
            audio.play();
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
            $("#Theme").hide();
            audioOver.play()
            audioBack.pause();
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
                audioBack.play()
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
                audioBack.play()
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

function ChangeTheme(){
    // let theme = document.getElementById("Theme")
    // if (theme.value == 1){
    //     $('canvas').css('background-image', 'url(' + 'backg.gif' + ')');
    //     $('canvas').css('background-size', '750px');
    //     audioBack = new Audio('backr.mp3');
    // }else if(theme.value == 2) {
    //     $('canvas').css('background-image', 'url(' + 'backg3.gif' + ')');
    //     $('canvas').css('background-size', '950px');
    //     audioBack = new Audio('backr2.mp3');
    // }

    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                'Theme 11': 'Theme 1',
                'Theme 22': 'Theme 2'

            })
        }, 1000)
    })

    const {value: color} = Swal.fire({

        title: 'Select color',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
            if (value == "Theme 11") {
                $('canvas').css('background-image', 'url(' + 'backg.gif' + ')');
                    $('canvas').css('background-size', '750px');
                    audioBack = new Audio('backr.mp3');
            }if (value == "Theme 22") {
                $('canvas').css('background-image', 'url(' + 'backg3.gif' + ')');
                    $('canvas').css('background-size', '950px');
                    audioBack = new Audio('backr2.mp3');
            }
        }
    })
}
