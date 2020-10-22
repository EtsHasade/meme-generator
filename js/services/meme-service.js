'use strict';
console.log('meme s is ready');


var gImgs = [];
// var gImgs = [{ id: 1, url: 'img/1.jpg' }, { id: 2, url: 'img/2.jpg' }];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'It is funny?',
            size: 38,
            font: 'IMPACT',
            align: 'center',
            strokeColor: '#000000',
            fillColor: '#ffffff',
            x: 'default',
            y: 'default',
            selected: false
        },
        {
            txt: 'No!!',
            size: 38,
            font: 'IMPACT',
            align: 'center',
            strokeColor: '#000000',
            fillColor: '#ffffff',
            x: 'default',
            y: 'default',
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

function selectNextLine() {
    const currLineIdx = getCurrLineIdx()
    const selectLineIdx = (getCurrMeme().lines[currLineIdx + 1]) ? currLineIdx + 1 : 0;
    setCurrLine(selectLineIdx);
}

function getCurrLineIdx() {
    const memeLines = getCurrMeme().lines;
    const currLine = getCurrLine()
    return memeLines.findIndex(line => line === currLine);
}

function getCurrLine() {
    return gCurrLine;
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
        if (line.x === 'default' || line.y === 'default') {
            if (idx % 2 === 1) line.y = gCanvas.height - gCanvas.height / 10;
            else line.y = gCanvas.height / 10;
        }
    })
}

var gNextNewLineId = 2;
function addLine() {
    gMeme.lines.push({
        txt: 'Your bomb into the face-' + (gNextNewLineId++),
        size: 38,
        font: 'IMPACT',
        align: 'center',
        srokeColor: '#000000',
        fillColor: '#ffffff',
        x: gCanvas.width - gCanvas.width/2,
        y: gCanvas.height - gCanvas.height/2,
        selected: false
    })
    setCurrLine(gMeme.lines.length-1)
}

function deleteActiveLine() {
    const deleteLineIdx =  getCurrLineIdx();
    console.log("deleteActiveLine -> deleteLineIdx", deleteLineIdx)
    selectNextLine()
    getCurrMeme().lines.splice(deleteLineIdx,1);

}


function saveMeme() {
    saveToStorage('gMeme', gMeme)
    saveToStorage('gImgMemeId', gCurrImgId)
}

function loadMeme() {
    gMeme = loadFromStorage('gMeme');
    gCurrImgId = loadFromStorage('gImgMemeId');
    renderCanvas()
}