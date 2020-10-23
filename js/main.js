'use strict';
console.log('main js ready');


function onInit() {
    gCanvas = document.querySelector('.edit-meme-canvas');
    gCtx = gCanvas.getContext('2d');
    createImgs(17)
    renderGallery()
    onSetCurrLine(1)
    // setDefaultStyle()

}



function renderGallery() {
    const imgs = getImgsForDisplay()
    var strHtml = imgs.reduce((acc, img) => {
        acc += `<img class="gallery-img img${img.id}" data-id="${img.id}" src="${img.url}" alt="" onclick="onSelectImg(this)">
        `
        return acc;
    }, '')

    document.querySelector('.grid-gallery').innerHTML = strHtml;
}


function onSelectImg(eLimg) {
    setCurrImg(eLimg.dataset.id);
    renderCanvas()
    setDefaulteLinesLoc()
    renderCanvas()
    toggleSections()
    document.documentElement.scrollTop = 0;

}


function onChangeLineText(text) {
    getCurrLine().txt = text;
    renderCanvas();
}


function onSwithLines() {
    selectNextLine();
    renderCanvas()
    document.querySelector('#line-text').value = getCurrLine().txt;
    console.log("onSetCurrLine -> getCurrLine.txt", getCurrLine().txt)
}


function onSetCurrLine(numIdx) {
    setCurrLine(numIdx - 1)
    document.querySelector('#line-text').value = getCurrLine().txt;
    console.log("onSetCurrLine -> getCurrLine.txt", getCurrLine().txt)
}


function onIncreaseLine() {
    getCurrLine().size++;
    renderCanvas()
}


function onDecreaseLine() {
    getCurrLine().size--;
    renderCanvas()
}

function onLineUp() {
    getCurrLine().y -= 5;
    renderCanvas();
}

function onLineDown() {
    getCurrLine().y += 5;
    renderCanvas();
}
function getElImgById(imgId) {
    const elImg = document.querySelector(`.gallery-img.img${imgId}`);
    console.log("onGetImgById -> elImg", elImg)
    return elImg
}

function onAlignText(alignStr) {
    getCurrLine().align = alignStr;
    renderCanvas();
}

function onSetLineStrokeColor(color) {
    getCurrLine().strokeColor = color;
    console.log("onSetLineStrokeColor -> getCurrLine().strokeColor", getCurrLine().strokeColor)
    
    renderCanvas();
}

function onSetLineFillColor(color) {
    getCurrLine().fillColor = color;
    renderCanvas();
}

function onImgInput(ev) {
    renderCanvasUserImg(ev);
}

const IS_CLEAN = true;
function onDownloadMeme(elDownloadLink) {
    renderCanvas(IS_CLEAN);
    downloadImg(elDownloadLink);
}


function onAddLine() {
    addLine();
    renderCanvas();
}


function onDeleteLine() {
    deleteActiveLine();
    renderCanvas()
}

function toggleSections() {
    document.querySelector('.edit-section').classList.toggle('display-none');
    document.querySelector('.gallery-section').classList.toggle('display-none');
    document.querySelector('.user-details').classList.toggle('display-none');
    document.querySelector('.nav-gallery').classList.toggle('activated');
}
