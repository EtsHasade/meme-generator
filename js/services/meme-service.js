'use strict';
console.log('meme s is ready');


var gImgs = [];
// var gImgs = [{ id: 1, url: 'img/1.jpg' }, { id: 2, url: 'img/2.jpg' }];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 38,
            font: 'IMPACT',
            align: 'center',
            srokeColor: '#000000',
            fillColor: '#ffffff',
            x: 250,
            y: 50,
            selected: false
        },
        {
            txt: 'goodBy momo',
            size: 38,
            font: 'IMPACT',
            align: 'center',
            srokeColor: '#000000',
            fillColor: '#ffffff',
            x: 50,
            y: 200,
            selected: false
        }
    ]
}

var gCurrLine = null;

function createImgs(amunt) {
    for (let i = 1; i <= amunt; i++) {
        const img = { id: i, url: `img/${i}.jpg` };
        gImgs.push(img);
    }
}




function setCurrLine(lineIdx) {
    gCurrLine = getLineByIdx(lineIdx)
    getCurrMeme().lines.forEach(line => {
        if (line === gCurrLine) line.selected = true;
        else line.selected = false;
    })

}

function getCurrLine() {
    return gCurrLine;
}

function selectNextLine() {
    const memeLines = getCurrMeme().lines;
    const currLine = getCurrLine()
    const currLineIdx = memeLines.findIndex(line => line === currLine);
    const selectLineIdx = (memeLines[currLineIdx + 1]) ? currLineIdx + 1 : 0;
    setCurrLine(selectLineIdx);
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


function getLineByIdx(lineIdx) {
    return gMeme.lines[lineIdx]
}

function getCurrMeme() {
    return gMeme;
}


function setDefaulteLinesLoc() {
    getCurrMeme().lines.forEach((line,idx) => {
        line.x = gCanvas.width / 2;
        if (idx % 2 === 0) line.y = gCanvas.height - gCanvas.height / 10;
        else line.y = gCanvas.height / 10;
    })
}