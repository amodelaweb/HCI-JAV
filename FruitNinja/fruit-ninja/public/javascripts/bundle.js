function loadAssets() {
    assetsManager = new FruitNinja.AssetsManager();
    assetsManager.addEventListener("complete", init);
    assetsManager.start();

};

let texture = new THREE.TextureLoader().load("images/bg.jpg");
let scene = new THREE.Scene();
scene.background = texture;
const gravity = -0.02;
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

let lastPointCamera = {
    x: null,
    y: null
};

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

/* Create Basic Objects */
function createBasicLemon() {
    let geometry = new THREE.SphereGeometry(1, 10, 10);
    let texture = new THREE.TextureLoader().load('../textures/lemon.jpg');
    let material = new THREE.MeshBasicMaterial({
        color: 0xFFCC00,
        map: texture
    });
    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

let manager = new THREE.LoadingManager();
let loader = new THREE.OBJLoader(manager);
let mybomb;
let myBanana;
let myApple;
let myPear;
let mystrawberry;
/**
 * Funciones para hallas la pendiente 
 */

function slope(a, b) {
    if (a.x == b.x) {
        return null;
    }
    return (b.y - a.y) / (b.x - a.x);
}

function intercept(point, slope) {
    if (slope === null) {
        return point.x;
    }
    return point.y - slope * point.x;
}

function draw_Line(pointa, pointb){
    if (pointa.x > pointb.x){
        let temp = pointa;
        pointa = pointb;
        pointb = temp;
    }
    let m = slope(pointa, pointb);
    let b = intercept(pointa, m);
    
    for (let x = pointa.x; x <= pointb.x; x+= 200) {
        let y = m * x + b;
        buildBladeParticle(x,y);
    }
}
/*
 */
function createABomb() {

    loader.load('fruits/Bomb.obj', function (object) {
        let texture = new THREE.TextureLoader().load('../textures/Albedo.png');

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                // console.log("MESH")
                child.scale.set(10, 10, 10);
                child.material = new THREE.MeshBasicMaterial();
                child.material.map = texture;
                child.isTouch = false;
                child.geometry.computeVertexNormals();
                child.name = "bomb";
                mybomb = child;
            }
        });
    });
}


function createAnApple() {

    loader.load('fruits/apple.obj', function (object) {
        let texture = new THREE.TextureLoader().load('../textures/apple.jpg');

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.scale.set(0.03, 0.03, 0.03);
                child.material = new THREE.MeshBasicMaterial();
                child.material.color = new THREE.Color(0XFFE135);
                child.material.map = texture;
                child.isTouch = false;
                child.geometry.computeVertexNormals();
                myApple = child;
            }
        });
    });
}

function createBanana() {

    loader.load('fruits/banana2.obj', function (object) {
        let texture = new THREE.TextureLoader().load('../textures/banana.jpg');

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.scale.set(0.05, 0.05, 0.05);
                child.material = new THREE.MeshBasicMaterial();
                child.material.color = new THREE.Color(0XFFE135);
                child.material.map = texture;
                child.isTouch = false;
                child.geometry.computeVertexNormals();
                myBanana = child;
            }
        });
    });
}

function createStrawberry() {

    loader.load('fruits/strawberry.obj', function (object) {
        let texture = new THREE.TextureLoader().load('../textures/strawberry.jpg');

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.scale.set(1.0, 1.0, 1.0);
                child.material = new THREE.MeshBasicMaterial();
                child.material.color = new THREE.Color(0XFFE135);
                child.material.map = texture;
                child.isTouch = false;
                child.geometry.computeVertexNormals();
                mystrawberry = child;
            }
        });
    });
}

function createPear() {

    loader.load('fruits/Pear2.obj', function (object) {
        let texture = new THREE.TextureLoader().load('../textures/Pear.jpg');

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.scale.set(0.5, 0.5, 0.5);
                child.material = new THREE.MeshBasicMaterial();
                child.material.color = new THREE.Color(0XFFE135);
                child.material.map = texture;
                child.isTouch = false;
                child.geometry.computeVertexNormals();
                myPear = child;
            }
        });
    });
}
let lemon = createBasicLemon();


/** */

let addObjectInScene = function () {

    let min = -40;
    let max = 40;
    let x = Math.floor(Math.random() * (+max - +min)) + +min;
    let mymesh = lemon.clone();
    mymesh.position.x = x;
    mymesh.position.y = initialPositionY - (Math.random() * 50);
    mymesh.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
    mymesh.isTouch = false;
    mymesh.id = objectIdentifier++;
    objects.push(mymesh);
    scene.add(mymesh);
}
/** Multiple fruits */

let addBombInScene = function () {
    //Move the banana in the scene
    let min = -40;
    let max = 40;
    let x = Math.floor(Math.random() * (+max - +min)) + +min;

    let mymesh = mybomb.clone();

    mymesh.position.x = x;
    mymesh.position.y = initialPositionY - (Math.random() * 50);
    mymesh.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
    mymesh.id = objectIdentifier++;
    mymesh.rotation.z += 100;
    objects.push(mymesh);
    scene.add(mymesh);
};



let addBananaInScene = function (object) {
    let min = -40;
    let max = 40;
    let x = Math.floor(Math.random() * (+max - +min)) + +min;

    let mymesh = myBanana.clone();

    mymesh.position.x = x;
    mymesh.position.y = initialPositionY - (Math.random() * 50);
    mymesh.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
    mymesh.id = objectIdentifier++;
    objects.push(mymesh);
    scene.add(mymesh);
};

let addPearInScene = function (object) {
    let min = -40;
    let max = 40;
    let x = Math.floor(Math.random() * (+max - +min)) + +min;

    let mymesh = myPear.clone();

    mymesh.position.x = x;
    mymesh.position.y = initialPositionY - (Math.random() * 50);
    mymesh.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
    mymesh.id = objectIdentifier++;
    objects.push(mymesh);
    scene.add(mymesh);
};

let addStrawberryInScene = function (object) {
    let min = -40;
    let max = 40;
    let x = Math.floor(Math.random() * (+max - +min)) + +min;

    let mymesh = mystrawberry.clone();

    mymesh.position.x = x;
    mymesh.position.y = initialPositionY - (Math.random() * 50);
    mymesh.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
    mymesh.id = objectIdentifier++;
    objects.push(mymesh);
    scene.add(mymesh);
};

let addAppleInScene = function (object) {
    let min = -40;
    let max = 40;
    let x = Math.floor(Math.random() * (+max - +min)) + +min;

    let mymesh = myApple.clone();

    mymesh.position.x = x;
    mymesh.position.y = initialPositionY - (Math.random() * 50);
    mymesh.voY = (Math.random() * (+1.4 - +1.0)) + 1.0;
    mymesh.id = objectIdentifier++;
    objects.push(mymesh);
    scene.add(mymesh);
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


/**
 *  Explotions
 * 
 */
function createCanvasMaterial(color, size) {
    let matCanvas = document.createElement('canvas');
    matCanvas.width = matCanvas.height = size;
    let matContext = matCanvas.getContext('2d');
    // create exture object from canvas.
    let texture = new THREE.Texture(matCanvas);
    // Draw a circle
    let center = size / 2;
    matContext.beginPath();
    matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
    matContext.closePath();
    matContext.fillStyle = color;
    matContext.fill();
    // need to set needsUpdate
    texture.needsUpdate = true;
    // return a texture made from the canvas
    return texture;
}

//////////////settings/////////
let movementSpeed = 80;
let totalObjects = 500;
let objectSize = 3;
let sizeRandomness = 4000;

/////////////////////////////////
let dirs = [];
let parts = [];

function ExplodeAnimation(x, y, color) {
    let geometry = new THREE.Geometry();

    for (i = 0; i < totalObjects; i++) {
        let vertex = new THREE.Vector3();
        vertex.x = x;
        vertex.y = y;
        vertex.z = 0;

        geometry.vertices.push(vertex);
        dirs.push({
            x: (Math.random() * movementSpeed) - (movementSpeed / 2),
            y: (Math.random() * movementSpeed) - (movementSpeed / 2),
            z: (Math.random() * movementSpeed) - (movementSpeed / 2)
        });
    }
    let material = new THREE.PointsMaterial({
        size: objectSize,
        map: createCanvasMaterial(color, 256),
        transparent: true,
        depthWrite: false
    });
    let particles = new THREE.Points(geometry, material);

    this.object = particles;
    this.status = true;

    this.xDir = (Math.random() * movementSpeed) - (movementSpeed / 2);
    this.yDir = (Math.random() * movementSpeed) - (movementSpeed / 2);
    this.zDir = (Math.random() * movementSpeed) - (movementSpeed / 2);

    scene.add(this.object);

    this.update = function () {
        if (this.status == true) {
            let pCount = totalObjects;
            while (pCount--) {
                let particle = this.object.geometry.vertices[pCount]
                particle.y += dirs[pCount].y;
                particle.x += dirs[pCount].x;
                particle.z += dirs[pCount].z;
            }
            this.object.geometry.verticesNeedUpdate = true;
        }
    }

}



/**
 * 
 * 
 */
/**Fruits */


let j = 0;

setInterval(function () {
    j = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    if (j == 1) {
        addObjectInScene();
    } else if (j == 2) {
        addBananaInScene();
    } else if (j == 3) {
        addPearInScene();
    } else if (j == 4) {
        addStrawberryInScene();
    } else if (j == 5) {
        addAppleInScene();
    } else {
        addBombInScene();
    }
}, 1500);


/**-- */
let light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);


let render = function () {
    requestAnimationFrame(render);

    objects.forEach(element => {
        element.position.y += element.voY;
        element.rotation.z += 0.01;
        element.rotation.x -= 0.01;
        if (element.position.y > -30) {
            element.voY += gravity;
        }
    });

    particleSystem.render();
    bladeSystem.render();
    buildColorBlade(bladeColor, bladeWidth);


    let pCount = parts.length;
    while (pCount--) {
        parts[pCount].update();
    }


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

function cutFruit(){
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; ++i) {
        let myobj = intersects[i].object;
        if (myobj.name != "bomb") {
            cutedItems.add(myobj.id);
            intersects[i].isTouch = true;
            SplatterSound.play();
            sleep(200);
            parts.push(new ExplodeAnimation(myobj.position.x, myobj.position.y, colors[Math.round(Math.random() * colors.length)]));
        } else {
            BombSound.play();
            sleep(200);
            parts.push(new ExplodeAnimation(myobj.position.x, myobj.position.y, "#000000"));
        }
        scene.remove(myobj);
        myobj.geometry.dispose();
        myobj.material.dispose();
        myobj = undefined;
    }
    document.getElementById('score').innerHTML = cutedItems.size;
}

function onMouseMove(event) {

    event.preventDefault();
    //console.log("Mouse pos ", event.clientX, " , ",event.clientY );

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    cutFruit();
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
//    console.log("MOUSE ", mymouse);
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
    /*
    for (let i = 0; i < 1000; i += 500) {
        buildBladeParticle(i, i);
    }
    */
    //buildBladeParticle(500, 500);
});



function runDetection() {

    model.detect(video).then(predictions => {
        //console.log("Predictions: ", predictions);
        // get the middle x value of the bounding box and map to paddle location
        model.renderPredictions(predictions, canvas, context, video);
        if (predictions[0]) {
            topContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
            //console.log(predictions)
            let midvalx = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2);
            let midvaly = predictions[0].bbox[1] + (predictions[0].bbox[3] / 2);
            //console.log("Mid x ", midvalx, "midY", midvaly)
            //gamex = document.body.clientWidth * (midvalx / video.width);
            //gamey = document * (midvaly / video.height);
            //console.log("W; ", video.width, "H: ", video.height, "DW", window.innerWidth, "DH : ", window.innerHeight)
            gamex = Math.floor(midvalx * (window.innerWidth / video.width));
            gamey = Math.floor(midvaly * (window.innerHeight / video.height));
            //console.log('Predictions Relative  mouse: x ', gamex, " |y ", gamey);
            //topContext.fillRect(gamex,gamey,10,10);
            if (lastPointCamera.x != null) {
                buildBladeParticle(lastPointCamera.x, lastPointCamera.y);
                draw_Line(lastPointCamera, {x: gamex,y:gamey});
                buildBladeParticle(gamex, gamey);
            }
            mouse.x = gamex;
            mouse.y = gamey;
            cutFruit();
            lastPointCamera.x = gamex;
            lastPointCamera.y = gamey;

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

createABomb();
createAnApple();
createBanana();
createStrawberry();
createPear();

/**-- */
render();

window.addEventListener('mousemove', onMouseMove);