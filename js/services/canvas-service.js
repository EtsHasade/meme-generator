'use strict';
console.log('canvas s ready');


var gCanvas;
var gCtx;


function renderCanvas(...[isClean]) {
    renderBGImageToCanvasById(gMeme.selectedImgId);
    console.log("renderCanvas -> isClean", isClean);
    drawLines(isClean);
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

function drawLines(isClean) {
    const meme = getCurrMeme();
    meme.lines.forEach(line => drawLine(line, isClean));    
}

function drawLine(line, isClean) {
    if (!isClean && line.selected) markSelectLine(line);
    drawText(line.txt, line.x, line.y, line.size, line.font, line.align, line.strokeColor, line.fillColor);
    
}

function getCanvasDataUrl() {
    return gCanvas.toDataURL('image/png');
}

