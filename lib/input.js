class Input {

    keys = new Array(100);
    key_mappings = {
        'up': 38,
        'down': 40,
        'left': 37,
        'right': 39,
        'exit': 27,
        'pause': 80
    }

    constructor(){
        this.setUpKeyTracking();
    }


    setUpKeyTracking() {
        window.addEventListener("keydown", e => {
          this.keys[e.keyCode] = true;
        });
        window.addEventListener("keyup", e => {
          this.keys[e.keyCode] = false;
        });
    
        // Pause needs to be tracked outside of game loop
        // if(this.keys[80]) this.handlePausing();
    }

    pressKey(key_name){
        this.keys[this.key_mappings[key_name]] = 1;
    }

    isPressed(key_name){
        return this.keys[this.key_mappings[key_name]] || 0;
    }
}
