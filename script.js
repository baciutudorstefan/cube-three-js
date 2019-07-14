
cube
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );

var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
material.flatShading = true;
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 1.5;

var animate = function () {
requestAnimationFrame( animate );

cube.rotation.x += 0.01;
cube.rotation.y += 0.03;

renderer.render( scene, camera );
};

animate();
            
            
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const penColor = document.querySelector('input[name="penColor"]')
const penWidth = document.querySelector('input[name="penWidth"]')
const saver = document.querySelector('#saver');

ctx.stokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = "round";
ctx.lineWidth = 5;

let pen = {
    x:0,
    y:0,
    down:false
}

saver.addEventListener('click', saveFile);
canvas.addEventListener('mousedown', penDown);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', noDown);
canvas.addEventListener('mouseout', noDown);


function noDown(){
pen.down = false;
}

function draw(e){
    if(!pen.down) return;
    ctx.lineWidth = penWidth.value;
    ctx.strokeStyle = penColor.value;
    ctx.beginPath();
    ctx.moveTo(pen.x, pen.y);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    [pen.x,pen.y] = [e.offsetX,e.offsetY];
}

function penDown(e){
    pen.down = true;
    [pen.x,pen.y] = [e.offsetX,e.offsetY];
}

function saveFile(){
    let image = canvas.toDataURL();
    let a = document.createElement('a');
    a.setAttribute('download','image.png');
    a.setAttribute('href',canvas.toDataURL('image/png').replace('image/png','image/octet-stream'));
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    document.getElementById('myImage').src = image;
    
}

