HEIGHT = 900;
WIDTH = 1600;

var currentScreen = null;
var menu = null;

// ADD HERE THE NAME OF THE NEW LEVEL
var puzzles = {
    'SignesDePistes' : null
}
function preload(){
    // Function to preload all the assets before launching the game
    menu_background = loadImage("assets/SignesDePistes/background.png");
    baton_img = loadImage("assets/baton.png");

    // For each puzzle load its images !! The name of the images need to follow a certain format !! 
    for (let puzzle_name in puzzles){
        var puzzle_bkg_img = loadImage("assets/"+puzzle_name+"/background.png");
        var puzzle_level = new Puzzle(puzzle_name, puzzle_bkg_img);
        for (i = 1; i<=16;i++){
            // Load the image for each puzzle piece
            var img = loadImage("assets/"+puzzle_name+"/1.png");
            puzzle_level.puzzle_pieces.push(img);

        }
        puzzles[puzzle_name] = puzzle_level;
    }
}

function setup(){
    // Function that is called at the beginning of the app, here we setup our initial objects
    createCanvas(WIDTH, HEIGHT);

    menu = new Menu();

    currentScreen = menu;
}

function draw(){
    // Function that is called many times per second to drawy every pixel on the screen
    currentScreen.show();
}

function mouseMoved(){
    // Function that is  called whenever the mouse is moved
}

function mouseClicked(){
    // Function that is called when the mouse is clicked
}