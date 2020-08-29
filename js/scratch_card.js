
var doc = document,
    cvs = doc.getElementById('j-cvs'), ctx,
config = {
    w: 400, h: 360
},
mouseDown = false;

var debug = function(msg){
    var obj = doc.getElementById('debug');
    obj.innerHTML += msg + '<br>';
}

function getLocalCoords(elem, ev) {
    var ox = 0, oy = 0;
    var first;
    var pageX, pageY;
   
    while (elem != null) {
        ox += elem.offsetLeft;
        oy += elem.offsetTop;
        elem = elem.offsetParent;
    }
   
    if ("changedTouches" in ev) {
        first = ev.changedTouches[0];
        pageX = first.pageX;
        pageY = first.pageY;
    } else {
        pageX = ev.pageX;
        pageY = ev.pageY;
    }
    return { 'x': pageX - ox, 'y': pageY - oy };
}
function diffTransSize(cxt, threshold, callback){
    if (!'getImageData' in ctx) return; 
    threshold = threshold || 0.5;
    if (threshold >1 || threshold < 0) threshold = 1;
    var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height),
        pix = imageData.data,
        pixLength = pix.length,
        pixelSize = pixLength*0.25;
    var i = 1, k, l=0;
    for (; i <= pixelSize; i++) { 
        if (0 === pix[4*i-1]) l++;
    };
    if (l>pixelSize * threshold) {
        callback.apply(ctx, [l]);
    };
}
function scratchLine(cvs, x, y, fresh) {
    ctx = cvs.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out'; 

    ctx.lineWidth = 45;
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(0,0,0,1)'; 
    if (fresh) {
        ctx.beginPath();
        ctx.moveTo(x+0.1, y);
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    var style = cvs.style; 
    style.lineHeight = style.lineHeight == '1' ? '1.1' : '1';

    diffTransSize(ctx, 0.5, function() {
        document.getElementById('title').innerHTML ='50% complete';
    });
}
function setupCanvases() {
    cvs.width = config.w;
    cvs.height = config.h;
    var ctx = cvs.getContext("2d");
    //fill style gradient 
    /*var gradient3 = ctx.createLinearGradient(275, 80, 255, 0);
    gradient3.addColorStop(0, 'red');
    gradient3.addColorStop(0.9, 'orange');
    gradient3.addColorStop(1, 'rgba(0, 0, 255, 0.99)');
    ctx.fillStyle = gradient3;*/

    var gradient = ctx.createLinearGradient(10, 0, 500, 0);
    gradient.addColorStop(0, 'red');
   
    gradient.addColorStop(1, 'violet');
    ctx.fillStyle = gradient;


    ctx.fillRect(0, 0, cvs.width, cvs.height);
    var mousedown_handler = function(e) {
        var local = getLocalCoords(cvs, e);
        mouseDown = true;
        scratchLine(cvs, local.x, local.y, true);
        if (e.cancelable) { e.preventDefault(); }
        return false;
    };
    var mousemove_handler = function(e) {
        if (!mouseDown) { return true; }
        var local = getLocalCoords(cvs, e);
        scratchLine(cvs, local.x, local.y, false);

        if (e.cancelable) { e.preventDefault(); }
        return false;
    };
    var mouseup_handler = function(e) {
        if (mouseDown) {
            mouseDown = false;
            if (e.cancelable) { e.preventDefault(); }
            return false;
        }
        return true;
    };
    on(cvs, 'mousedown', mousedown_handler);
    on(cvs, 'touchstart', mousedown_handler);
    on(window, 'mousemove', mousemove_handler);
    on(window, 'touchmove', mousemove_handler);
    on(window, 'mouseup', mouseup_handler);
    on(window, 'touchend', mouseup_handler);
}
function on(E, N, FN){
    E.addEventListener ? E.addEventListener(N, FN, !1) : E.attachEvent('on' + N, FN);
}
setupCanvases();
