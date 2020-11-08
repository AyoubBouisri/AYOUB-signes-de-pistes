
function Menu(){
    this.background = menu_background;
    this.background.resize(WIDTH, HEIGHT);
    this.baton = baton_img;
    
    this.title = 'KA-YOUB';
    this.gameDescription = `Associe les pièces du contour avec la bonne case de la grille.
\nÀ la fin, si tu as toutes les bonnes réponses, découvre le dessin qui s’y cache. \n\nBonne chasse !`;

    this.previews = []

    this.show = function(){
        image(this.background, 0, 0);
        // Draw the title 
        this.showTitle();
        this.showDescription();
    }

    
    this.showPuzzlePreviews = function(){
        
    }

    this.setupPuzzlePreviews = function(){
        var previewsW = 150;
        var spaceBetweenPreviews = 30;
        var nbPreviews = Object.keys(puzzles).length;
        console.log(nbPreviews);
        var middleScreen = WIDTH / 2;
        
        var totatLen = nbPreviews * previewsW + (nbPreviews - 1) * spaceBetweenPreviews
        var currentX = middleScreen - totatLen/2
        var previewsY = HEIGHT/2 - previewsW/ 2 + 70;
        for (puzzle_name in puzzles){
            puzzle_preview = puzzles[puzzle_name].preview;
            puzzle_preview.setParameters(currentX, previewsY, previewsW);
            currentX += previewsW + spaceBetweenPreviews;

            this.previews.push(puzzle_preview);
        }

    }
    this.setupPuzzlePreviews();
    
    this.showTitle = function(){
        // Draw the title text
        var charSize = 120;
        textSize(charSize);
        var titleLen = textWidth(this.title);
        var titleX = WIDTH / 2 - titleLen / 2;
        var y = 150;
        this.addText(this.title, titleX, y, WIDTH, HEIGHT, charSize, color(255,153,0));
        
        // Draw the separator between the tile and the previews
        var offset = 100;
        var batonw = textWidth(this.title) + offset;
        var batonX = titleX - offset / 2;
        var batonY = y + charSize;
        this.baton.resize(batonw, 100);
        
        image(this.baton, batonX, batonY);

        // show previews
        for (preview of this.previews){
            preview.show();
        }
    }
    
    this.showDescription = function(){
        var charSize = 20;
        var textWidth = WIDTH / 2;
        var textHeight = 175;
        var x = WIDTH / 2 - textWidth / 2;
        var y = HEIGHT - textHeight;

        this.addText(this.gameDescription, x , y, textWidth, textHeight, charSize, 255);

    }
    
    this.addText = function(message, x, y, width, height, size, color) {
        noStroke();
        fill(color);
        textSize(size);
        textStyle(BOLD)
        text(message, x, y, width, height);
    }
    
    this.mouseMoved = function(mouseX, mouseY){
        var hovering = false;
        for (preview of this.previews){
            if (preview.contains(mouseX, mouseY)){
                preview.is_hovered = true;
                hovering = true;
            }else{
                preview.is_hovered = false;
            }
        }
        if (hovering)
            cursor(HAND)
        else    
            cursor(ARROW)
    }
    
    this.mousePressed = function(){
        
    }
    this.mouseReleased = function(){
        for (preview of this.previews){
            if (preview.contains(mouseX, mouseY)){
                currentScreen = puzzles[preview.title]
            }
        }
    }
    this.mouseDragged = function(){

    }
}