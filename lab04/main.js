import * as THREE from 'three';
import * as dat from 'dat.gui';

function getBox(w, h, d) {
  var geometry = new THREE.BoxGeometry(w, h, d)
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  })

  var mesh = new THREE.Mesh(
    geometry,
    material
  )

  return mesh
}

function getPlane(size) {
  var geometry = new THREE.PlaneGeometry(size, size)
  var material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide
  })

  var mesh = new THREE.Mesh(
    geometry,
    material
  )

  return mesh
}

function init() {
  const scene = new THREE.Scene();
  const gui = new dat.GUI({name: "Scene roperties"});

  var box = getBox(1, 1, 1)
  var plane = getPlane(30)
  
  // camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight, 
    1, 
    1000
  )

  camera.position.z = 7
  camera.position.x = 1
  camera.position.y = 4

  // box position
  box.position.x = 0
  box.position.y = 0.5
  
  // GUI section
  
  // Box section
  const box_folder = gui.addFolder("Box Geometry")
  box_folder.open()
  
  const box_position_folder = box_folder.addFolder("Position") 
  box_position_folder.add(box.position, 'x', -10, 10)
  box_position_folder.add(box.position, 'y', -10, 10)
  box_position_folder.add(box.position, 'z', -10, 10)

  const box_rotation_folder = box_folder.addFolder("Rotation") 
  box_rotation_folder.add(box.rotation, 'x', -2, 2)
  box_rotation_folder.add(box.rotation, 'y', -2, 2)
  box_rotation_folder.add(box.rotation, 'z', -2, 2)

  const box_scale_folder = box_folder.addFolder("Scale") 
  box_scale_folder.add(box.scale, 'x', 0, 10)
  box_scale_folder.add(box.scale, 'y', 0, 10)
  box_scale_folder.add(box.scale, 'z', 0, 10)

  // Camera section
  const camera_folder = gui.addFolder("Camera properties")
  camera_folder.open()

  const lookat_vec = {x: 0, y: 0, z: 0}
  const camera_lookat_folder = camera_folder.addFolder("LookAt")
  camera_lookat_folder.add(lookat_vec, 'x', 0, 10)
  camera_lookat_folder.add(lookat_vec, 'y', 0, 10)
  camera_lookat_folder.add(lookat_vec, 'z', 0, 10)
  
  const camera_vrp_folder = camera_folder.addFolder("VRP")
  camera_vrp_folder.add(camera.position, "x", -10, 10)
  camera_vrp_folder.add(camera.position, "y", -10, 10)
  camera_vrp_folder.add(camera.position, "z", -10, 10)


  // scene section
  scene.add(plane)
  scene.add(box)

  plane.rotation.x = Math.PI/2

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("webgl").appendChild(renderer.domElement)
  
  update(renderer, scene, camera, lookat_vec)
  
  return scene
}

function update(renderer, scene, camera, lookat_vec) {
  camera.lookAt(new THREE.Vector3(lookat_vec.x, lookat_vec.y, lookat_vec.z))

  renderer.render(
    scene,
    camera
  )

  requestAnimationFrame(() => {
    update(renderer, scene, camera, lookat_vec)
  })
}

init()