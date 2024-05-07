import * as THREE from 'three';
import * as dat from 'dat.gui';
import { ScreenNode } from 'three/examples/jsm/nodes/display/BlendModeNode.js';

function getSphere(radius, color) {
  var geometry = new THREE.SphereGeometry(radius)
  var material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.2
  })

  var mesh = new THREE.Mesh(
    geometry,
    material
  )

  mesh.castShadow = true

  return mesh
}

function getPlane(size, color) {
  var geometry = new THREE.PlaneGeometry(size, size)
  var material = new THREE.MeshStandardMaterial({
    color: color,
    side: THREE.DoubleSide,
    roughness: 0.2
  })

  var mesh = new THREE.Mesh(
    geometry,
    material
  )

  mesh.receiveShadow = true

  return mesh
}

function getSpotLight(intensity, light_color) {
  var light = new THREE.SpotLight(light_color, intensity)
  light.castShadow = true
  light.shadow.bias = 0.01
  light.shadow.mapSize.height = 2048
  light.shadow.mapSize.width = 2048

  return light
}

function init() {
  const scene = new THREE.Scene();
  const gui = new dat.GUI();

  var red = "rgb(255, 255, 255)"
  var gray = 0x808080
  var white = 0xffffff

  var sphere = getSphere(1, red)
  var plane = getPlane(30, gray)
  var left_spotLight = getSpotLight(20, white)
  var right_spotLight = getSpotLight(20, white)
  
  // camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight, 
    1, 
    1000
  )

  // camera init position
  camera.position.x = 1
  camera.position.y = 4
  camera.position.z = 10

  // sphere init position
  sphere.position.x = 0
  sphere.position.y = 0.6

  // point light init position
  left_spotLight.position.x = -5
  left_spotLight.position.y = 2
  left_spotLight.position.z = -4

  right_spotLight.position.x = 5
  right_spotLight.position.y = 2
  right_spotLight.position.z = -4

  // plane texture map
  var loader = new THREE.TextureLoader()
  plane.material.map = loader.load("/assets/concrete.jpg")
  plane.material.bumpMap = loader.load("/assets/concrete.jpg")
  plane.material.bumpScale = 1

  var maps = ["map", "bumpMap"]
  maps.forEach((mapName) => {
    var plane_texture = plane.material[mapName]
    plane_texture.wrapS = THREE.RepeatWrapping
    plane_texture.wrapT = THREE.RepeatWrapping
    plane_texture.repeat.set(5, 5)
  })
  
  // GUI section
  // Camera section
  const camera_folder = gui.addFolder("Camera properties")

  const lookat_vec = {x: 0, y: 0, z: 0}
  const camera_lookat_folder = camera_folder.addFolder("LookAt")
  camera_lookat_folder.add(lookat_vec, 'x', -10, 10)
  camera_lookat_folder.add(lookat_vec, 'y', -10, 10)
  camera_lookat_folder.add(lookat_vec, 'z', -10, 10)
  
  const camera_vrp_folder = camera_folder.addFolder("VRP")
  camera_vrp_folder.add(camera.position, "x", -30, 30)
  camera_vrp_folder.add(camera.position, "y", -30, 30)
  camera_vrp_folder.add(camera.position, "z", -30, 30)

  // Light section
  const light_folder = gui.addFolder("Light properties")

  const left_light = light_folder.addFolder("Left light properties")
  left_light.add(left_spotLight, "intensity", 1, 50)
  left_light.add(left_spotLight, "penumbra", 0, 1)

  const left_light_position_folder = left_light.addFolder("Position")
  left_light_position_folder.add(left_spotLight.position, "x", -10, 10)
  left_light_position_folder.add(left_spotLight.position, "y", -10, 10)
  left_light_position_folder.add(left_spotLight.position, "z", -10, 10)

  const right_light = light_folder.addFolder("Right light properties")

  right_light.add(left_spotLight, "intensity", 1, 50)
  right_light.add(left_spotLight, "penumbra", 0, 1)

  const right_light_position_folder = right_light.addFolder("Position")
  right_light_position_folder.add(left_spotLight.position, "x", -10, 10)
  right_light_position_folder.add(left_spotLight.position, "y", -10, 10)
  right_light_position_folder.add(left_spotLight.position, "z", -10, 10)

  // Plane section
  const plane_folder = gui.addFolder("Plane properties")
  plane_folder.add(plane.material, "roughness", 0, 1)
  plane_folder.add(plane.material, "metalness", 0, 1)

  // Sphere section
  const sphere_folder = gui.addFolder("Sphere properties")
  sphere_folder.add(sphere.material, "roughness", 0, 1)
  sphere_folder.add(sphere.material, "metalness", 0, 1)


  scene.add(plane)
  scene.add(sphere)
  scene.add(left_spotLight)
  scene.add(right_spotLight)

  plane.rotation.x = Math.PI/2

  const renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true
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