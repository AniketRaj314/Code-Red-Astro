let width, height, rocket, asteroid, rocketImg, asteroidImg, shift;
let score, speed;

// p5 function to load images
function preload() {
    rocketImg = loadImage('../assets/rocket.png');
    asteroidImg = loadImage('../assets/asteroid.png');
}

// p5 function which runs only once
function setup() {
    // Setting up game canvas
    width = innerWidth;
    height = innerHeight - 4;
    createCanvas(width, height);

    
    shift = 100;    // Number of pixels to be shifted when rocket goes left or right
    score = 0;
    speed = 5;
    asteroid = [];  // Array to store asteroid properties
    rocket = new Rocket(); // Initialising rocket

    asteroid.push(new Asteroid()); // Adding an asteroid to the array
}

// p5 function which runs as long as browser page is open
function draw() {
    background(0);
    rocket.show();

    // Score update
    fill(255);
    textSize(32);
    text(score, width / 2, 32);
    
    // Asteroid Operations
    for(let i = 0; i < asteroid.length; i++) {
        asteroid[i].update();

        // Check for death
        if(asteroid[i].x == rocket.x && asteroid[i].y + shift - 10 > rocket.y) {
            alert('YOU LOSE');
            noLoop();
        }

        // Delete asteroid, and add more once asteroid leaves the screem
        if(asteroid[i].y - shift / 2 >= height) {
            asteroid.splice(i, 1);
            score++;

            // Increase the speed of incoming asteroids for every multiple of 5
            if(score % 5 == 0) {
                speed += 1;
            }
            asteroid.push(new Asteroid());
            asteroid.push(new Asteroid());
            continue;
        }
        asteroid[i].show();
    }
    deleteExtra();
}

function deleteExtra() {
    // Limiting number of asteroids to 2 at a time
    while(asteroid.length > 2) {
        asteroid.splice(0, 1);
    }
}

// p5 function for Key Press events
function keyPressed() {
    if(keyCode == LEFT_ARROW && rocket.x != width / 2 - shift) {
        rocket.x -= shift;
    }
    if(keyCode == RIGHT_ARROW && rocket.x != width / 2 + shift) {
        rocket.x += shift;
    }
}

// Class for Rocket
class Rocket {
    constructor() {
        this.x = width / 2;
        this.y = height - 70;
    }

    show() {
        imageMode(CENTER);
        image(rocketImg, this.x, this.y, shift, shift);
    }
}

// Class for Asteroid
class Asteroid {
    constructor() {
        this.x = width / 2 + floor(random(-1, 2)) * shift;  // xCoordinate of asteroid to be set either to left, center or right
        this.y = shift / 2;
    }

    update() {
        this.y += speed;
    }

    show() {
        imageMode(CENTER);
        image(asteroidImg, this.x, this.y, shift, shift);
    }
}