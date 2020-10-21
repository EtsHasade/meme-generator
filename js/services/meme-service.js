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
            srokeColor: '#000000',
            fillColor: '#ffffff',
            x: 50,
            y: 50,
        },
        {
            txt: 'goodBy momo',
            size: 20,
            font: 'IMPACT',
            align: 'left',
            srokeColor: '#000000',
            fillColor: '#ffffff',
            x: 50,
            y: 200,
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

function getImgsForDisplay() {
    return gImgs;
}


function getLineById(lineIdx) {
    return gMeme.lines[lineIdx]
}

function getMeme() {
    return gMeme;
}