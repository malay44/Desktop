import * as THREE from "https://unpkg.com/three@0.143.0/build/three.module.js";
// import {OrbitControls} from "https://unpkg.com/three@0.143.0/examples/jsm/controls/OrbitControls.js";
// import * as dat from "https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.9/dat.gui.js"
import * as dat from "/dat.gui/build/dat.gui.module.js"


//<------------------------------- gui starts ------------------------------->
const gui = new dat.GUI()
const world = {
    plane:{
        width: 10,
        height: 10,
        widthSegments: 10,
        heightSegments: 10
    }
}
gui.add(world.plane, "width", 1, 20).onChange(regeneratePlane)

gui.add(world.plane, "height", 1, 20).onChange(regeneratePlane)

gui.add(world.plane, "widthSegments", 1, 20).onChange(regeneratePlane)

gui.add(world.plane, "heightSegments", 1, 20).onChange(regeneratePlane)

function regeneratePlane() {
  planeMesh.geometry.dispose()
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
    )

  const {array} = planeMesh.geometry.attributes.position

  for (let i = 2; i < array.length; i+=3) {
    let yCoordinate = array[i]
    array[i] = yCoordinate + Math.random()
  }
}

//<------------------------------- gui ends ------------------------------->

// scene
var scene = new THREE.Scene();
// camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// renderer
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);

//plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);

const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading
});

let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

//plane distortion generator
const {array} = planeMesh.geometry.attributes.position

for (let i = 2; i < array.length; i+=3) {
  let yCoordinate = array[i]
  array[i] = yCoordinate + Math.random()
}

//light
let Light = new THREE.DirectionalLight(0xffffff,1);
Light.position.set(0,0,1)

//scene
scene.add(planeMesh, Light);

//camera
camera.position.z = 10;


//animation
function animate() {
  requestAnimationFrame(animate);

  //renderd
  renderer.render(scene, camera);
  //planeMesh.rotation.y += 0.01
}

//animation initialized
animate();

//render send to html
document.body.appendChild(renderer.domElement);
