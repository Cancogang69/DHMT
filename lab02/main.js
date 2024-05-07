import * as THREE from 'three';

function init() {
  const scene = new THREE.Scene();

  var box = getBox(1, 1, 1)
  var sphere = getSphere(1)
  var cylinder = getCylinder(1, 2)
  var plane = getPlane(10)

  scene.add(plane)
  scene.add(box)
  scene.add(sphere)
  scene.add(cylinder)

  // box position
  box.position.x = -2
  box.position.y = 0.5

  // sphere position
  sphere.position.x = 0
  sphere.position.y = 0.8

  // cylinder position
  cylinder.position.x = 2.5
  cylinder.position.y = 1

  plane.rotation.x = Math.PI/2


  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight, 
    1, 
    1000
  )

  camera.position.z = 7
  camera.position.x = 1
  camera.position.y = 4

  camera.lookAt(new THREE.Vector3(0, 0, 0))
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("webgl").appendChild(renderer.domElement)
  renderer.render(
    scene,
    camera
  )
}

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

function getSphere(radius) {
  var geometry = new THREE.SphereGeometry(radius)
  var material = new THREE.MeshBasicMaterial({
    color: 0xff0000
  })

  var mesh = new THREE.Mesh(
    geometry,
    material
  )

  return mesh
}

function getCylinder(radius, height) {
  var geometry = new THREE.CylinderGeometry(radius, radius, height)
  var material = new THREE.MeshBasicMaterial({
    color: 0xff00ff
  })

  var mesh = new THREE.Mesh(
    geometry,
    material
  )

  return mesh
}

init()