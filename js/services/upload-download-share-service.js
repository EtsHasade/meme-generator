'use strict';

// download canvas as image
// us HTML : <a href="#" onclick="downloadImg(this)" download="my image.jpg">Download Image</a>
function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/png');
    elLink.href = imgContent
}



// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function importImgFromUser(ev) {
    loadImageFromInput(ev, renderBGImageToCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();
    
    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}




// The next 2 functions handle IMAGE SHARE to facebook from canvas tag by name 'gCanvas':
// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <ul class="pure-list">
            <li>
                <a class="btn share-link" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
                    Share in FaceBook 
                </a>
            </li>
         </ul>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(function (res) {
        return res.text()
    })
    .then(onSuccess)
    .catch(function (err) {
        console.error(err)
    })
}


