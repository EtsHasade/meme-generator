'use strict';

var gStrokeCurrColor = '#ffffff';
var gFillCurrColor = '#5500ff';
var gCurrShape = 'rect';


var gBrashSpeed = 1; // in miliSecond
var gBrashSize = 1.6; // in px

var gDrowState = 'notDraw';
var gBrashResetPos = {
    firstPos: { X: 0, Y: 0 },
    borderPos: { X: 0, Y: 0 },
    endPos: { X: 0, Y: 0 }
}
var gBrashPos = gBrashResetPos;

function setDefaultStyle() {
    gCtx.srokeStyle = gStrokeCurrColor;
    gCtx.fillStyle = gFillCurrColor;
}

function drowBrash(ev) {
    const { offsetX, offsetY } = ev;

    if (ev.buttons === 1) {

        console.log("drowBrash -> offsetX, offsetY", offsetX, offsetY)

        if (gDrowState === 'notDraw') {
            console.log('event x,y', ev.offsetX + ',' + ev.offsetY);

            gBrashPos.firstPos.X = offsetX;
            gBrashPos.firstPos.Y = offsetY;

            gDrowState = 'drawDuration';
            console.log("drowBrash -> gDrowState", gDrowState)

            setTimeout(() => {
                gDrowState = 'drow'
            }, gBrashSpeed);
        }
        else if (gDrowState === 'drow') {
            console.log('off x', offsetX);

            const diffX = (gBrashPos.firstPos.X - offsetX);
            const diffY = (gBrashPos.firstPos.Y - offsetY);

            calcDraw(gBrashPos.firstPos.X, gBrashPos.firstPos.Y, diffX, diffY);

            gDrowState = 'notDraw';
        }

    } else {
        gDrowState = 'notDraw';
        gBrashPos = gBrashResetPos;
    }
}


function markSelectLine(line) {
    // gCtx.save()
    gCtx.fillStyle = '#bebebe70';
    gCtx.strokeStyle = '#ffffff';
    drawRect(line.x-line.txt.length*line.size/2, line.y-line.size, line.txt.length*line.size, line.size+5)
    // gCtx.restore()
}

function drawLine(x, y, xEnd, yEnd) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(x + xEnd, y + yEnd)
    gCtx.stroke()
}


function drawRect(x, y, lenX, lenY) {
    gCtx.beginPath();
    gCtx.rect(x, y, lenX, lenY);
    gCtx.stroke();
    gCtx.fill();
}

function calcDrawCircle(x, y, lenX, lenY) {
    console.log("calcDrawCircle -> lenX, lenY", lenX, lenY)
    const radiuse = Math.max(Math.abs(lenX), Math.abs(lenY))
    console.log("calcDrawCircle -> radiuse", radiuse)
    
    drawArc(x, y, radiuse)
}

function drawArc(x, y, radiuse) {
    gCtx.beginPath()
    gCtx.arc(x, y, radiuse, 0, 2 * Math.PI);
    gCtx.stroke();
    gCtx.fill()

}

function calcDrawText(text, x, y, lenX, lenY) {
    const size = Math.max(Math.abs(lenX),Math.abs(lenY))
    drawText(text, x, y, size)
}

function drawText(text, x, y, size, font, align, strokeColor, fillColor) {
    console.log("drawText -> (text, x, y, size, font, align, strokeColor, fillColor)", text, x, y, size, font, align, strokeColor, fillColor);
    gCtx.font = `${size}px ${font}, sans-serif`;
    gCtx.textAlign = align;
    gCtx.save()
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = fillColor;
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    gCtx.restore()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function setShape(shape) {
    gCurrShape = shape
    if (shape === 'your text') {
        document.querySelector('#brash-text').hidden = false;
    }
    else {
        document.querySelector('#brash-text').hidden = true;
    }
}

function calcDraw(x, y, lenX, lenY) {
    switch (gCurrShape) {
        case 'circle':
            calcDrawCircle(x, y, lenX, lenY)
            break;
        case 'rect':
            calcDrawRect(x, y, lenX, lenY)
            break;
        case 'line':
            drawLine(x, y, lenX, lenY)
            break;
        default:
            calcDrawText(gCurrShape, x, y, lenX, lenY)
    }
}


function calcDrawRect(startX, startY, diffX, diffY) {
    const maxDiff = Math.max(Math.abs(diffX), Math.abs(diffY));
    drawRect(startX - (maxDiff / 2), startY - (maxDiff / 2), maxDiff, maxDiff)
}


function setStrokeCurrColor(color) {
    gStrokeCurrColor = color;
    gCtx.strokeStyle = gStrokeCurrColor;

}

function getStrokeCurrColor() {
    return gStrokeCurrColor;
}


function setFillCurrColor(color) {
    gFillCurrColor = color;
    gCtx.fillStyle = gFillCurrColor;

}

function getFillCurrColor() {
    return gFillCurrColor;
}


function setBrashSize(size) {
    gBrashSize = size;
    gCtx.lineWidth = gBrashSize;

}

function getBrashSize() {
    return gBrashSize;
}

function setBrashSpeed(speed) {
    gBrashSpeed = speed;
}

function getBrashSpeed() {
    return gBrashSpeed;
}


function setBrashText(text) {
    gCurrShape = text;
    
}

function getBrashText() {
    return gCurrShape;
}




