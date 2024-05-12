import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const geometry = new THREE.PlaneGeometry(10, 5)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000
})

const mesh = new THREE.Mesh(geometry, material)

camera.position.z = 5

scene.add(mesh)

function animate() {
  requestAnimationFrame(animate)
  // mesh.rotation.x += 0.01
  // mesh.rotation.z += 0.01
  renderer.render(scene, camera)
}
animate()
