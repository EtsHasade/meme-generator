'use strict';
console.log('canvas s ready');


var gCanvas;
var gCtx;


function renderCanvas() {
    renderBGImageToCanvasById(gCurrImgId);
    drawLines();
}

function renderBGImageToCanvasById(imgId) {
    const elImg = getElImgById(imgId);
    renderBGImageToCanvas(elImg);
}

function renderBGImageToCanvas(elImg) {
    gCanvas.width = elImg.naturalWidth;
    gCanvas.height = elImg.naturalHeight;
    gCtx.drawImage(elImg, 0, 0);
}

function renderCanvasUserImg(ev) {
    importImgFromUser(ev);
    drawLines();
}

function drawLines() {
    const meme = getCurrMeme();
    console.log("drawLines -> meme", meme)
    meme.lines.forEach(line => drawLine(line));    
}

function drawLine(line) {
    if (line.selected) markSelectLine(line);
    drawText(line.txt, line.x, line.y, line.size, line.font, line.align, line.srokeColor, line.fillColor);
    
}

