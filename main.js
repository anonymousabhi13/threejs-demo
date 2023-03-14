import "./style.css";

// Option 1: Import the entire three.js core library.
import * as THREE from "three";
import * as dat from "dat.gui";
console.log(dat);
const gui = new dat.GUI();
const parameters = {
  plane: {
    width: 10,
    height: 10,
    widthsegments: 10,
    heightsegments: 10,
  },
};
gui.add(parameters.plane, "width", 1, 40).onChange(geometrychange);
gui.add(parameters.plane, "height", 1, 40).onChange(geometrychange);
gui.add(parameters.plane, "widthsegments", 1, 40).onChange(geometrychange);
gui.add(parameters.plane, "heightsegments", 1, 40).onChange(geometrychange);

function geometrychange() {
  planemesh.geometry.dispose();
  planemesh.geometry = new THREE.PlaneGeometry(
    parameters.plane.width,
    parameters.plane.height,
    parameters.plane.widthsegments,
    parameters.plane.heightsegments
  );
  console.log(parameters.plane.width);

  const { array } = planemesh.geometry.attributes.position;
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    array[i + 2] = z + Math.random();
  }
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

const boxgeometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const mesh = new THREE.Mesh(boxgeometry, material);

// scene.add(mesh);
camera.position.z = 5;

const planegeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
console.log(planegeometry);
const planematerial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: true,
});
const planemesh = new THREE.Mesh(planegeometry, planematerial);
scene.add(planemesh);

const { array } = planemesh.geometry.attributes.position;
for (let i = 0; i < array.length; i += 3) {
  const x = array[i];
  const y = array[i + 1];
  const z = array[i + 2];
  array[i + 2] = z + Math.random();
}
// planemesh.geometry.attributes.position.needsUpdate = true;
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1);
scene.add(light);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // planemesh.rotation.x += 0.1;
}
animate();
