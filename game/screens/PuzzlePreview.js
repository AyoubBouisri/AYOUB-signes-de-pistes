function PuzzlePreview(title, background, play_function){
    this.title = title;
    this.background = background.get();
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.play_function = play_function;
    this.is_hovered = false;
    this.first_draw = true;
    
    this.show = function(){
        if (this.first_draw){
            this.background = background.get();
            this.background.resize(this.w, this.w)
            this.first_draw = false;
        }
        noStroke();
        fill(color(255,153,0));
       
        square(this.x, this.y, this.w);
        if (this.is_hovered){
            image(this.background, this.x, this.y-10);
        }else{
            image(this.background, this.x, this.y);
        }

        // Draw the title
        var titleW = this.w - 30;
        var xTitle = this.x + this.w/2 - titleW/2;
        if (this.is_hovered){
            var yTitle = this.y + this.w/2 - 40;
        }else
            var yTitle = this.y + this.w/2 -  30;

        
        noStroke();
        fill(255);
        textSize(20);
        textStyle(BOLD)
        textAlign(CENTER)
        text(this.title, xTitle, yTitle, titleW, this.w);
        textAlign(LEFT)
    }
    
    this.setParameters = function(x,y,w){
        this.x = x;
        this.y = y;
        this.w = w;
    }

    this.contains = function(x, y) {
        if (x >= this.x && x <= (this.x + this.w) && y >= this.y && y <= this.y + this.w)
            return true;
        return false;
    }
}