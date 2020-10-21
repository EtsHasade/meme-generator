'use strict';
console.log('main js ready');

function onInit() {
    gCanvas = document.querySelector('.edit-meme-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery()
}



function onSelectImg(eLimg) {
    setCurrImg(eLimg.dataset.id)
    renderBGImageToCanvas(gCurrImgId)
}


function getElImgById(imgId) {
    const elImg = document.querySelector(`.gallery-img.img${imgId}`);
    console.log("onGetImgById -> elImg", elImg)
    return elImg
}