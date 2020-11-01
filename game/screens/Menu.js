
function Menu(){
    this.background = menu_background;
    this.background.resize(WIDTH, HEIGHT);
    this.baton = baton_img;
    
    this.title = 'KAYOUB';
    this.gameDescription = `Associe les pièces du contour avec la bonne case de la grille.
\nÀ la fin, si tu as toutes les bonnes réponses, découvre le dessin qui s’y cache. \n\nBonne chasse !`;


    this.show = function(){
        image(this.background, 0, 0);
        // Draw the title 
        this.showTitle();
        this.showDescription();
    }

    
    this.showPuzzlePreviews = function(){
        
    }
    
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
    }
    
    this.showDescription = function(){
        var charSize = 24;
        var textWidth = WIDTH / 2;
        var textHeight = 300;
        var x = WIDTH / 2 - textWidth / 2;
        var y = HEIGHT - textHeight;

        this.addText(this.gameDescription, x , y, textWidth, textHeight, charSize, 255);

    }
    
    this.addText = function(message, x, y, width, height, size, color) {
        fill(color);
        textSize(size);
        textStyle(BOLD)
        text(message, x, y, width, height);
    }
    
    this.mouseOver = function(){
        
    }
    
    this.mouseClicked = function(){
        
    }
}