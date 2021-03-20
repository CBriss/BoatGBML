function gaussianRandom(){ 
    let iterations = 4;
    let value = 0;
    for(var i = iterations; i > 0; i --){
      value += Math.random();
    }
    return value / iterations;
}

  
function randomXValue(canvas_width) {
  var newX = 0;
  if (Math.random() > 0.5) {
    newX = canvas_width - this.width;
  }
  return newX;
}

function randomWidth(canvas_width) {
  return (Math.random() * canvas_width + 100) / 2;
}


function randBetweenTwoValues(min, max) {
  return Math.random() * max + min;
}