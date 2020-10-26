'use strict';
console.log('main js ready');


function onInit() {
    gCanvas = document.querySelector('.edit-meme-canvas');
    gCtx = gCanvas.getContext('2d');
    createImgs(19)
    renderGallery()
    setDefaultMeme()
    onSetCurrLine(1)
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
    setDefaultMeme()
    setDefaulteLinesLoc()
    onSetCurrLine(1)
    renderCanvas()
    showEditSections()
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
    document.querySelector('.font-line').value = getCurrLine().font;
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


function onChangFont() {
    getCurrLine().font = document.querySelector('.font-line').value;
    renderCanvas();
}


function getElImgById(imgId) {
    const elImg = new Image();
    elImg.src = `img/${imgId}.jpg`
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

function onPublish(elForm, ev) {
    uploadImg(elForm, ev);
}


function onSaveMeme() {
    saveMeme();
}


function onReloadMeme() {
    loadLastMeme();
    setCurrLine(0)
    renderCanvas();
    document.querySelector('.line-text input').value = getCurrLine().txt;
    document.querySelector('.line-text input').focus();
    console.log("onSetCurrLine -> getCurrLine.txt", getCurrLine().txt)
}

function onAddLine() {
    addLine();
    renderCanvas();
    document.querySelector('.line-text input').value = getCurrLine().txt;
    document.querySelector('.line-text input').focus();
    console.log("onSetCurrLine -> getCurrLine.txt", getCurrLine().txt)
}


function onDeleteLine() {
    deleteActiveLine();
    renderCanvas()
}

function onSizeUp(el) {
    const elTxtSize = el.style.fontSize;
    console.log("onSizeUp -> elTxtSize", elTxtSize)

    let nextSize = (elTxtSize)? elTxtSize.substring(0, 3) : '100';
    console.log("onSizeUp -> nextSize", nextSize)
    nextSize = (+nextSize < 150)?  +nextSize + 5 + '%': nextSize + '%';
    console.log("onSizeUp -> nextSize", nextSize)
    el.style.fontSize = nextSize;
}


function showSections(targtClasName, elNav) {
    document.querySelectorAll('section').forEach(section => {
        if (section.classList.contains(targtClasName)) {
             section.classList.remove('display-none')
        } else {
            section.classList.add('display-none')
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link === elNav.parentElement) {
             link.classList.add('activated')
        } else {
            link.classList.remove('activated')
        }
    });
}


function showEditSections() {
    document.querySelector('.edit-section').classList.remove('display-none');
    document.querySelector('.gallery-section').classList.add('display-none');
    document.querySelector('.my-memes-section').classList.add('display-none');
    document.querySelector('.user-details').classList.add('display-none');
    document.querySelector('.nav-gallery').classList.remove('activated');
    document.querySelector('.nav-my-memes').classList.remove('activated');
}



function onRenderMyMemes() {
    const memes =  (loadSavedMemes() || []);
    let memesImgs = [];
    memes.forEach((meme, idx )=> {
        memesImgs.push(`
        <img class="meme-img gallery-img" data-id="${meme.selectedImgId}" src="${meme.imgDataUrl}" onclick=" setMemefromSaved(${idx}) ; onSelectImg(this)">
        `)
    });
      
    document.querySelector('.saved-memes-gallery').innerHTML = (memesImgs.length)? memesImgs.join('') : '<h2>there is no saved memes</h2>';
    // showMyMemesSections()
}
