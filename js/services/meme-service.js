'use strict';
console.log('meme s is ready');



var gImgs = [{ id: 1, url: 'img/popo.jpg' }, { id: 2, url: 'img/popo.jpg' }];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            font: 'IMPACT',
            align: 'left',
            color: 'red'
        }
    ]
}

var gCurrImgId = 1;

function setCurrImg(strImgId) {
    gCurrImgId = +strImgId;
}

function getCurrImg() {
    return getImgById(gCurrImgId);
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId);
}


function renderGallery() {
    var strHtml = gImgs.reduce((acc, img) => {
        acc += `<img class="gallery-img img${img.id}" data-id="${img.id}" src="img/${img.id}.jpg" alt="" onclick="onSelectImg(this)">
        `
        return acc;
    }, '')

    document.querySelector('.grid-gallery').innerHTML = strHtml;
}

