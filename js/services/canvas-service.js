'use strict';
console.log('canvas s ready');


var gCanvas;
var gCtx;


function renderBGImageToCanvas(imgId) {
    const elImg = getElImgById(imgId);
    console.log("renderBGImageToCanvas -> ElImg", elImg)
    gCanvas.width = elImg.width;
    gCanvas.height = elImg.height;
    gCtx.drawImage(elImg, 0, 0);
}




















////////////////

// function downloadImg(elLink) {
//     var imgContent = gCanvas.toDataURL('image/jpeg');
//     elLink.href = imgContent
// }

// // The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
// function onImgInput(ev) {
//     loadImageFromInput(ev, renderCanvas)
// }
// function loadImageFromInput(ev, onImageReady) {
//     document.querySelector('.share-container').innerHTML = ''
//     var reader = new FileReader();
    
//     reader.onload = function (event) {
//         var img = new Image();
//         img.onload = onImageReady.bind(null, img)
//         img.src = event.target.result;
//     }
//     reader.readAsDataURL(ev.target.files[0]);
// }



