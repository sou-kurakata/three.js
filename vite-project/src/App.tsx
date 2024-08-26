import { useEffect } from 'react';
import './App.css';
import * as THREE from "three";
// import { render } from 'react-dom';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

function App() {

  let canvas: HTMLCanvasElement;
  let model: THREE.Group;

  useEffect(() => {

    canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };

    const scene: THREE.Scene = new THREE.Scene();

    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      110,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.lookAt(new THREE.Vector3(0, -3, -2.5));
    camera.position.set(0, 3, 2.5)

    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // 3dモデル
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("./models/scene.gltf", (gltf) => {
      model = gltf.scene;
      model.scale.set(0.18, 0.18, 0.18);
      scene.add(model);
    })

    const tick = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick()
  }, [])
  return (
    <>
    <canvas id="canvas"></canvas>
      <div className="mainContents">
        <h3>THREE.js</h3>
        <p>Web Developer</p>
      </div>
    </>
  )
}

export default App
