function drawCanvas(canvasId) {
  canvas = document.createElement("canvas");
  canvas.id = "gameCanvas";
  canvas.width = 500;
  canvas.height = 600;
  context = canvas.getContext("2d");
  document.body.insertBefore(canvas, document.body.childNodes[0]);
  return context;
}

function randn_bm() {
  var u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-1.2 * Math.log(u)) * Math.cos(1.2 * Math.PI * v);
}

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
