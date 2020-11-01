
function PuzzlePiece(starting_coord, target_coord, width, img){
    this.currentCoord = starting_coord.copy();
    this.target_coord = target_coord;
    this.w = width;
    this.offset = 10;
    
    this.first_draw = true;
    this.img = img;

    this.hovered = false;
    this.dragging = false;


    this.show = function(){
        // resize all images
        if (this.first_draw){
            this.img.resize(this.w, this.w);
            this.hovered_img = this.img.get();
            this.hovered_img.resize(this.w + this.offset, this.w + this.offset);
        }

        if (this.hovered)
            image(this.hovered_img, this.currentCoord.x - this.offset/2, this.currentCoord.y-this.offset/2);
        else
            image(this.img, this.currentCoord.x, this.currentCoord.y);    
    }


    this.mouseMoved = function(mouseX, mouseY){
        if (this.contains(mouseX, mouseY)){
            this.hovered = true;
        }
        else{
            this.hovered = false;
        }
        return this.hovered
    }

    this.mouseDragged = function(x, y){
        if (this.dragging){
            this.currentCoord.x = mouseX - this.mouseOffset.x;
            this.currentCoord.y = mouseY - this.mouseOffset.y;
        }
    }

    this.mousePressed = function(mouseX, mouseY){
        if (this.contains(mouseX, mouseY)){
            this.dragging = true;
            this.mouseOffset = new Coordinate(mouseX - this.currentCoord.x, mouseY - this.currentCoord.y);
        }else{
            this.dragging = false;
        }    
        return this.dragging
    }   

    this.mouseReleased = function(target_coord){
        this.dragging=false;
        if (target_coord ==  null){
            // go back to initial spot
            this.currentCoord = starting_coord.copy();
        }else{
            this.currentCoord = target_coord;
        }
     
    }
    
    this.contains = function(x, y) {
        if (x >= this.currentCoord.x && x <= (this.currentCoord.x + this.w) && y >= this.currentCoord.y && y <= this.currentCoord.y + this.w)
            return true;
        return false;
    }
}
