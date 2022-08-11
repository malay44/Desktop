// document.querySelector(".hi-class").innerText='hello'

import * as THREE from "https://unpkg.com/three@0.143.0/build/three.module.js";

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
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);

const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
});

let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

let Light = new THREE.DirectionalLight(0xffffff,1);
Light.position.set(0,0,1)

scene.add(planeMesh, Light);

camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
//   planeMesh.rotation.y += 0.01
}

animate();

// renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);
