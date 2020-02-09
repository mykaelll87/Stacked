import * as THREE from 'three';
import Game from './game';
import { PerspectiveCamera, WebGLRenderer } from 'three';

function makeCamera() {
  const c: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
  c.position.z = 10;
  c.position.y = 10;
  c.position.x = 10;
  c.lookAt(0,0,0);
  return c
}

function makeRenderer() {
  const r = new WebGLRenderer({alpha: true, antialias: true});
  r.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(r.domElement);
  r.setClearColor(0x000000, 0.0);
  return r;
}

const scene = new THREE.Scene();
const camera = makeCamera();
const renderer = makeRenderer();

const g = new Game(scene)

function animate() {
  requestAnimationFrame( animate );
  g.update();

	renderer.render( scene, camera );
}

function startGame(){
  startBtn.removeEventListener("click", startGame)

  document.getElementById("start").classList.toggle("hidden");
  document.getElementById("score").classList.toggle("hidden");

  g.startGame();
}

let startBtn = document.getElementById("start")
startBtn.addEventListener("click", startGame)

animate();