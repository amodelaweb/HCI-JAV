function loadAssets() {
    assetsManager = new FruitNinja.AssetsManager();
    assetsManager.addEventListener("complete", init);
    assetsManager.start();
};

let scene = new THREE.Scene();
const gravity = -0.02;
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

let canvas_el = document.getElementById("gameCanvas");
let renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas_el
});
renderer.setClearColor('#e5e5e5');
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let mymouse = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

let objectIdentifier = 0;

let addObjectInScene = function () {

    let geometry = new THREE.SphereGeometry(1, 10, 10);
    let material = new THREE.MeshLambertMaterial({
        color: 0xFFCC00
    });
    let mesh = new THREE.Mesh(geometry, material);
    let min = -40;
    let max = 40;
    let x = Math.floor(Math.random() * (+max - +min)) + +min;
    mesh.position.x = x;
    mesh.position.y = initialPositionY - (Math.random() * 50);
    mesh.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
    mesh.isTouch = false;
    mesh.id = objectIdentifier++;
    objects.push(mesh);
    scene.add(mesh);
}
/** Multiple fruits */
let addBananaInScene = function (object) {
    //Move the banana in the scene
    let min = -40;
    let max = 40;
    let x = Math.floor(Math.random() * (+max - +min)) + +min;
    //Go through all children of the loaded object and search for a Mesh
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            // console.log("MESH")
            child.scale.set(0.05, 0.05, 0.05);
            child.material.color = new THREE.Color(0X00FF00);
            child.position.x = x;
            child.position.y = initialPositionY - (Math.random() * 50);
            child.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
            child.isTouch = false;
            child.id = objectIdentifier++;
            child.geometry.computeVertexNormals();
            // console.log(child);
            objects.push(child);
            scene.add(child);
        }
    });
};

let addPearInScene = function (object) {
    //Move the banana in the scene
    let min = -40;
    let max = 40;
    let x = Math.floor(Math.random() * (+max - +min)) + +min;
    //Go through all children of the loaded object and search for a Mesh
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            // console.log("MESH")
            child.scale.set(0.5, 0.5, 0.5);
            child.material.color = new THREE.Color(0X00FF00);
            child.position.x = x;
            child.position.y = initialPositionY - (Math.random() * 50);
            child.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
            child.isTouch = false;
            child.id = objectIdentifier++;
            child.geometry.computeVertexNormals();
            // console.log(child);
            objects.push(child);
            scene.add(child);
        }
    });
};

let addStrawberryInScene = function (object) {
    //Move the banana in the scene
    let min = -40;
    let max = 40;
    let x = Math.floor(Math.random() * (+max - +min)) + +min;
    //Go through all children of the loaded object and search for a Mesh
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            // console.log("MESH")
            child.scale.set(1.0, 1.0, 1.0);
            child.material.color = new THREE.Color(0X00FF00);
            child.position.x = x;
            child.position.y = initialPositionY - (Math.random() * 50);
            child.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
            child.isTouch = false;
            child.id = objectIdentifier++;
            child.geometry.computeVertexNormals();
            // console.log(child);
            objects.push(child);
            scene.add(child);
        }
    });
};

let addAppleInScene = function (object) {
    //Move the banana in the scene
    let min = -40;
    let max = 40;
    let x = Math.floor(Math.random() * (+max - +min)) + +min;
    //Go through all children of the loaded object and search for a Mesh
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            // console.log("MESH")
            child.scale.set(0.03, 0.03, 0.03);
            child.material.color = new THREE.Color(0X00FF00);
            child.position.x = x;
            child.position.y = initialPositionY - (Math.random() * 50);
            child.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
            child.isTouch = false;
            child.id = objectIdentifier++;
            child.geometry.computeVertexNormals();
            // console.log(child);
            objects.push(child);
            scene.add(child);
        }
    });
};



/** Mouse effect **/
function init() {
    particleSystem = new SPP.ParticleSystem();
    particleSystem.start();
    bladeSystem = new SPP.ParticleSystem();
    bladeSystem.start();


    topCanvas = document.getElementById("gameCanvasOver");
    topCanvas.style.display = "block";

    topCanvas.width = window.innerWidth;
    topCanvas.height = window.innerHeight;

    topContext = topCanvas.getContext("2d");
    topContext.globalCompositeOperation = "lighter";

    topCanvas.addEventListener('onMouseMove', onMouseMove, false);

    particleSystem = new SPP.ParticleSystem();
    particleSystem.start();
    bladeSystem = new SPP.ParticleSystem();
    bladeSystem.start();

}

loadAssets();
/** **/


let score = 0;
// mesh.position.x = -2;

// scene.add(mesh);

/**Delete this */

/** Test */
let geometry = new THREE.SphereGeometry(0.5, 32, 32);
let material = new THREE.MeshBasicMaterial({
    color: 0xffff00
});
let sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

sphere.position.x = -45;
sphere.position.y = 0;

/** */

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


let objects = [];

let initialPositionY = -40;
/*
for (let i = 0; i < 20; ++i) {

    let fruitsPerLevel = Math.floor(Math.random() * (+5 - +1)) + +1;
    console.log(fruitsPerLevel);


    for (let j = 0; j < fruitsPerLevel; ++j) {
        let geometry = new THREE.SphereGeometry(1, 10, 10);
        let material = new THREE.MeshLambertMaterial({
            color: 0xFFCC00
        });
        let mesh = new THREE.Mesh(geometry, material);
        let min = -40;
        let max = 40;
        let x = Math.floor(Math.random() * (+max - +min)) + +min;
        mesh.position.x = x;
        mesh.position.y = initialPositionY;
        mesh.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
        mesh.isTouch = false;
        objects.push(mesh);
        scene.add(mesh);
    }
    initialPositionY -= 250;


}
*/
/**Fruits */


let j = 0;

setInterval(function () {
    //console.log("intervalo");
    //console.log(j);
    //console.log("**");
    //for (let j = 0; j < 4; ++j) {

    //Manager from ThreeJs to track a loader and its status
    let manager = new THREE.LoadingManager();
    //Loader for Obj from Three.js
    let loader = new THREE.OBJLoader(manager);
    j = Math.floor(Math.random()*(5-1+1)+1);

    if (j == 1){
        addObjectInScene();
    }else if(j == 2){
        loader.load('fruits/banana2.obj', addBananaInScene);
    }else if (j == 3){
        loader.load('fruits/Pear2.obj', addPearInScene);
    }else if(j == 4){
        loader.load('fruits/strawberry.obj', addStrawberryInScene);
    }else{
        loader.load('fruits/apple.obj', addAppleInScene);
    }

    //console.log(j);
    //  }

}, 1500);


/**-- */
let light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);


let render = function () {
    requestAnimationFrame(render);
    topContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particleSystem.render();
    bladeSystem.render();
    buildColorBlade(bladeColor, bladeWidth);

    objects.forEach(element => {
        element.position.y += element.voY;
        if (element.position.y > -30) {
            element.voY += gravity;
        }
    });
    renderer.render(scene, camera);
}

function mousemove(e) {

    // Get the mouse position relative to the canvas element.
    if (e.layerX || e.layerX == 0) {
        // Firefox
        mouse.x = e.layerX;
        mouse.y = e.layerY;
    } else if (e.offsetX || e.offsetX == 0) { // Opera
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    };

    // console.log("Mouse Must be ", mouse.x, ", ", mouse.y);
    buildBladeParticle(mouse.x, mouse.y);
};

let cutedItems = new Set();

function onMouseMove(event) {

    event.preventDefault();
    //console.log("Mouse pos ", event.clientX, " , ",event.clientY );

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; ++i) {
        cutedItems.add(intersects[i].object.id);
        intersects[i].isTouch = true;
    }
    
    document.getElementById('score').innerHTML = cutedItems.size;
    mousemove(event);
}

/* Additional Functions */

function convertToRange(value, srcRange, dstRange) {
    // value is outside source range return
    if (value < srcRange[0] || value > srcRange[1]) {
        return NaN;
    }

    let srcMax = srcRange[1] - srcRange[0],
        dstMax = dstRange[1] - dstRange[0],
        adjValue = value - srcRange[0];

    return (adjValue * dstMax / srcMax) + dstRange[0];

}

function moveObject(x, y) {
    mousex = convertToRange(x, [0, document.body.clientWidth], )
    mousey = -(y / window.innerHeight) * 100 * 2 + 1;

    mymouse.set(mousex, mousey);
    sphere.position.x = mymouse.x;
    sphere.position.y = mymouse.y;
    console.log("MOUSE ", mymouse);
}

/** Hand Move events */

const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let imgindex = 1
let isVideo = false;
let model = null;
let videoInterval = 100;

const modelParams = {
    flipHorizontal: true, // flip e.g for video  
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.6, // confidence threshold for predictions.
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            updateNote.innerText = "Video started. Now tracking"
            isVideo = true
            runDetection()
        } else {
            updateNote.innerText = "Please enable video"
        }
    });
}

function toggleVideo() {
    if (!isVideo) {
        updateNote.innerText = "Empezando video"
        startVideo();
    } else {
        updateNote.innerText = "Parando video"
        handTrack.stopVideo(video)
        isVideo = false;
        updateNote.innerText = "Video Detenido"
    }
}

trackButton.addEventListener("click", function () {
    toggleVideo();
});

function runDetection() {

    model.detect(video).then(predictions => {
        //console.log("Predictions: ", predictions);
        // get the middle x value of the bounding box and map to paddle location
        model.renderPredictions(predictions, canvas, context, video);
        if (predictions[0]) {
            //console.log(predictions)
            let midvalx = (predictions[0].bbox[0] + predictions[0].bbox[2]) / 2;
            let midvaly = (predictions[0].bbox[1] + predictions[0].bbox[3]) / 2;
            //gamex = document.body.clientWidth * (midvalx / video.width);
            //gamey = document * (midvaly / video.height);
            gamex = Math.floor(midvalx * (video.width / document.body.clientWidth));
            gamey = Math.floor(midvaly * (video.height / document.body.clientHeight));
            console.log('Predictions Relative  mouse: x ', gamex, " y ", gamey);
            buildBladeParticle(gamex, gamey);
            //moveObject(gamex, gamey);
        }
        if (isVideo) {
            setTimeout(() => {
                runDetection(video)
            }, videoInterval);
        }
    });

}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    model = lmodel
    updateNote.innerText = "Modelo cargado!"
    trackButton.disabled = false
});


/**-- */
render();

window.addEventListener('mousemove', onMouseMove);