const THREE = require('three')

var scene = new THREE.Sc00ene();
const gravity = -0.02;
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor('#e5e5e5');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


var score = 0;
// mesh.position.x = -2;

// scene.add(mesh);

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var objects = [];

var initialPositionY = -40;

for (var i = 0; i < 20; ++i) {

    var fruitsPerLevel = Math.floor(Math.random() * (+5 - +1)) + +1;
    console.log(fruitsPerLevel);


    for (var j = 0; j < fruitsPerLevel; ++j) {
        var geometry = new THREE.SphereGeometry(1, 10, 10);
        var material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 });
        var mesh = new THREE.Mesh(geometry, material);
        var min = -40;
        var max = 40;
        var x = Math.floor(Math.random() * (+max - +min)) + +min;
        mesh.position.x = x;
        mesh.position.y = initialPositionY;
        mesh.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
        mesh.isTouch = false;
        objects.push(mesh);
        scene.add(mesh);
    }
    initialPositionY -= 250;


}



var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);


var render = function () {
    requestAnimationFrame(render);
    objects.forEach(element => {
        element.position.y += element.voY;
        if (element.position.y > -30) {
            element.voY += gravity;
        }
    });
    renderer.render(scene, camera);
}

function onMouseMove(event) {

    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    for (var i = 0; i < intersects.length; ++i) {
        intersects[i].object.material.color.set(0xFF0000);
        if (!intersects[i].isTouch) {
            intersects[i].isTouch = true;
            console.log(score);
            
        }
    }
    for (var i = 0; i < intersects.length; ++i) {
        if (intersects[i].isTouch) {
            score++;
            intersects[i].isTouch = false;
        }
    }
    document.getElementById('score').innerHTML = score;

}

render();

window.addEventListener('mousemove', onMouseMove);
