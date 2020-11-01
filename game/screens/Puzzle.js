function Puzzle(name, background, puzzle_background, win_image){
    this.name = name;
    this.background = background;
    this.puzzle_background = puzzle_background;
    this.win_image = win_image;
    this.won = false;
    this.puzzle_width = HEIGHT - 250;
    this.puzzle_piece_width = this.puzzle_width / 4;
    this.puzzle_pieces_img = []
    this.puzzle_pieces = []
    this.grille = grille_img;
    
    this.dragged_piece = null;

    this.button_w = 230;
    this.bouton_indice = new Button(WIDTH/2 - this.button_w/2, HEIGHT - 90, this.button_w, 50, indice_btn_img);

    this.first_draw = true;
    this.show = function(){
        //  Draw the level background 
        var grilleOffSet = 130;
        if(this.first_draw){
            this.puzzle_background.resize(this.puzzle_width, this.puzzle_width);
            this.grille.resize(this.puzzle_width + grilleOffSet, this.puzzle_width+ grilleOffSet);
            this.background.resize(WIDTH,HEIGHT);
            this.win_image.resize(WIDTH, HEIGHT-200);
        }

        image(this.background, 0, 0);

        if (!this.won){
            // Draw the background of the puzzle
            var puzzleX = WIDTH / 2 - this.puzzle_width / 2;
            var y = HEIGHT / 2 - this.puzzle_width / 2;
            image(this.puzzle_background, puzzleX, y);
            image(this.grille, (puzzleX - grilleOffSet / 2) - 5, (y - grilleOffSet / 2));
    
            this.bouton_indice.show();
            // Draw the title   
            var charSize = 50;
            textSize(charSize);
            var titleLen = textWidth(this.name);
            var titleX = WIDTH / 2 - titleLen / 2;
            var titleY = 30;
            this.addText(this.name, titleX, titleY, WIDTH, HEIGHT, charSize, 255);
          
            //Show every puzzle 
            correct_pieces = 0;
            for (puzzle_piece of this.puzzle_pieces){
                puzzle_piece.show();
    
                if (puzzle_piece.currentCoord.x == puzzle_piece.target_coord.x && puzzle_piece.currentCoord.y == puzzle_piece.target_coord.y){
                    correct_pieces++;
                }
                if(this.bouton_indice.indice){
                    if (puzzle_piece.currentCoord.x == puzzle_piece.target_coord.x && puzzle_piece.currentCoord.y == puzzle_piece.target_coord.y){
                        let c = color(57, 253, 0,100);
                        noStroke();
                        fill(c)
                        square(puzzle_piece.currentCoord.x, puzzle_piece.currentCoord.y, this.puzzle_piece_width);  
                    }else if (puzzle_piece.currentCoord.x >= puzzleX && puzzle_piece.currentCoord.x <= puzzleX + this.puzzle_width && !puzzle_piece.dragging){
                        let c = color(255,0,0,100);
                        noStroke();
                        fill(c)
                        square(puzzle_piece.currentCoord.x, puzzle_piece.currentCoord.y, this.puzzle_piece_width);
                    }
                }
            }
            if(this.dragged_piece != null){
                this.dragged_piece.show();
            }

            if (correct_pieces==16)
                this.won = true;
        }else{
            image(this.win_image,0,HEIGHT/2 - (HEIGHT-200)/2)
        }
    }

    this.mouseMoved = function(mouseX, mouseY, dragging){
        if(!this.won){
            var onAPiece = false;
            for (puzzle_piece of this.puzzle_pieces){
                onAPiece = onAPiece || puzzle_piece.mouseMoved(mouseX, mouseY);
            }
    
            if (this.bouton_indice.contains(mouseX, mouseY)){
                onAPiece = true;
            }else{
                this.bouton_indice.is_hovered = false;
            }
    
            if (onAPiece)
                cursor(HAND)
            else
                cursor(ARROW)
        }else{
            cursor(ARROW)
        }
    }
    
    this.mouseDragged = function(mouseX, mouseY){
        if(!this.won){
            for (puzzle_piece of this.puzzle_pieces){
                if (puzzle_piece.mouseDragged(mouseX, mouseY)){
                }
            }
        }
    }
    
    this.mousePressed = function(mouseX, mouseY){
        if(!this.won){
            this.bouton_indice.indice = false;
            for (puzzle_piece of this.puzzle_pieces){
                if (puzzle_piece.mousePressed(mouseX, mouseY)){
                    this.dragged_piece = puzzle_piece;
                    break;
                }
            }
        }
        
    }

    this.mouseReleased = function(mouseX, mouseY){
        if(!this.won){
            if (this.dragged_piece != null){
                // Check if it was released on
                for(puzzle_piece of this.puzzle_pieces){
                    if (mouseX >= puzzle_piece.target_coord.x && mouseX <= puzzle_piece.target_coord.x + this.puzzle_piece_width){
                        if (mouseY >= puzzle_piece.target_coord.y && mouseY < puzzle_piece.target_coord.y + this.puzzle_piece_width){
                            if (!this.puzzle_piece_at(puzzle_piece.target_coord.x, puzzle_piece.target_coord.y)){
                                this.dragged_piece.mouseReleased(puzzle_piece.target_coord.copy())
                                this.dragged_piece = null;
                                return;
                            }else{
                                this.dragged_piece.mouseReleased();
                                this.dragged_piece = null;
                                return;
                            }
                        }
                    }
                }
                this.dragged_piece.mouseReleased();
                this.dragged_piece = null;
            }
    
            this.bouton_indice.click(mouseX, mouseY);
        }
       
    }

    this.puzzle_piece_at = function(x, y){
        for (piece of this.puzzle_pieces){
            if (piece.currentCoord.x == x && piece.currentCoord.y == y)
                return true;
        }
        return false;
    }
    this.addText = function(message, x, y, width, height, size, color) {
        fill(color);
        textSize(size);
        textStyle(BOLD)
        text(message, x, y, width, height);
    }

    this.setup_starting_pos = function(){
        starting_positions = []
        
        var offSetX = 40;
        var offSetY = 100;
        var coordleft = new Coordinate(offSetX, offSetY);
        var coordRight = new Coordinate(WIDTH - 2 * this.puzzle_piece_width - 2 * offSetX, offSetY);
        currentCoord = coordleft;
        for (i = 0;i < 2;i++){
            for(j = 0;j < 4;j++){
                starting_positions.push(new Coordinate(currentCoord.x, currentCoord.y + j * (offSetX / 2 + this.puzzle_piece_width) ))
                starting_positions.push(new Coordinate(currentCoord.x + this.puzzle_piece_width + offSetX,currentCoord.y - 20 + j * (offSetX / 2 + this.puzzle_piece_width) ))
            }
            currentCoord = coordRight;
        }
        return starting_positions;
    }

    this.setup_puzzle_pieces = function(){
        starting_positions = this.setup_starting_pos()
        shuffleArray(starting_positions);
        // Randomly assign a starting postions to a puzzle piece
        var startX = WIDTH / 2 - this.puzzle_width / 2;
        var startY = HEIGHT / 2 - this.puzzle_width / 2;
        for (i=0;i<this.puzzle_pieces_img.length;i++){
            let puzzle_piece_img = this.puzzle_pieces_img[i];
            var targetX = i % 4;
            var targetY = int(i / 4);
            let puzzle_piece = new PuzzlePiece(
                starting_positions.pop(), 
                new Coordinate(startX + targetX * this.puzzle_piece_width, startY + + targetY * this.puzzle_piece_width),
                this.puzzle_piece_width,
                puzzle_piece_img
            )
            this.puzzle_pieces.push(puzzle_piece)
        }
    }
}


function Coordinate(x, y){
    this.x = x;
    this.y = y;

    this.copy = function(){
        return new Coordinate(x,y)
    }
}