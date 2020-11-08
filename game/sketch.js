HEIGHT = 700;
WIDTH = 1400;

var currentScreen = null;
var menu = null;

// ADD HERE THE NAME OF THE NEW LEVEL
var puzzles = {
    'Signes de pistes': null,
    'Signes de pistes 2': null,
    'Signes de pistes 3':null,
}
function preload(){
    // Function to preload all the assets before launching the game
    menu_background = loadImage("assets/Signes de pistes/level_background.png");
    baton_img = loadImage("assets/baton.png");
    grille_img = loadImage("assets/grille.png");
    indice_btn_img = loadImage("assets/button_indice.png");

    // For each puzzle load its images !! The name of the images need to follow a certain format !! 
    for (let puzzle_name in puzzles){
        var level_bkg_img = loadImage("assets/"+puzzle_name+"/level_background.png");
        var puzzle_bkg = loadImage("assets/"+puzzle_name+"/puzzle_background.png");
        var puzzle_win_img = loadImage("assets/"+puzzle_name+"/win.png");
        var puzzle_level = new Puzzle(puzzle_name, level_bkg_img, puzzle_bkg, puzzle_win_img);
        for (i = 1; i<=16;i++){
            // Load the image for each puzzle piece
            var img = loadImage("assets/"+puzzle_name+"/"+i+".png");
            puzzle_level.puzzle_pieces_img.push(img);

        }
        puzzle_level.setup_puzzle_pieces();

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
    currentScreen.mouseMoved(mouseX, mouseY);
}

function mouseDragged(){
    currentScreen.mouseDragged(mouseX, mouseY);
}

function mousePressed(){
    // Function that is called when the mouse is clicked
    currentScreen.mousePressed(mouseX, mouseY)
}

function mouseReleased(){
    currentScreen.mouseReleased(mouseX, mouseY)
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}