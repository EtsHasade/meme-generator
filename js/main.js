'use strict';
console.log('main js ready');


function onInit() {
    gCanvas = document.querySelector('.edit-meme-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery()
    onSetCurrLine(1)

}



function renderGallery() {
    const imgs = getImgsForDisplay()
    var strHtml = imgs.reduce((acc, img) => {
        acc += `<img class="gallery-img img${img.id}" data-id="${img.id}" src="img/${img.id}.jpg" alt="" onclick="onSelectImg(this)">
        `
        return acc;
    }, '')

    document.querySelector('.grid-gallery').innerHTML = strHtml;
}


function onSelectImg(eLimg) {
    setCurrImg(eLimg.dataset.id);
    renderCanvas()
}


function onChangeLineText(text) { 
    getCurrLine().txt = text;
    renderCanvas();
}


function onSetCurrLine(numIdx) { 
    setCurrLine(numIdx-1)
    document.querySelector('#line-text').value = getCurrLine().txt;
    console.log("onSetCurrLine -> getCurrLine.txt", getCurrLine.txt)
}

function getElImgById(imgId) {
    const elImg = document.querySelector(`.gallery-img.img${imgId}`);
    console.log("onGetImgById -> elImg", elImg)
    return elImg
}


