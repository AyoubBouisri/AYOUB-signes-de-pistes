
function Btn(x, y, w, h, button_img) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.txt = null;
    this.img = button_img;
    this.img.resize(this.w, this.h);
    this.is_hovered = false;
    this.hovered_img = this.img.get();
    this.hovered_img.resize(w + 10, h + 10);
    
    this.first_draw = true;
    
    this.show = function() {
        fill(255);
        if (this.first_draw){
            this.first_draw = false;
            
        }
        if (this.is_hovered) {
            var x = this.x - 5;
            var y = this.y - 5;
            image(this.hovered_img, x, y);
            this.w = w + 10;
            this.h = h + 10;
            textSize(34);
            if (this.txt != null) {
                rect
                text(this.txt, x, y, this.w, this.h);
            }
        } else {
            this.w = w;
            this.h = h;
            image(this.img, this.x-10, this.y-15);
            textSize(30);
            if (this.txt != null) {
                rect
                text(this.txt, this.x, this.y, this.w, this.h);
            }
        }
    }
    this.click = function(mouseX, mouseY) {
        if (this.contains(mouseX, mouseY)){
            this.indice = true;
        } else{
            this.indice = false;
        }
    }

    this.contains = function(x, y) {
        if (x >= this.x && x <= (this.x + this.w) && y >= this.y && y <= this.y + this.h)
            return true;
        return false;
    }

}