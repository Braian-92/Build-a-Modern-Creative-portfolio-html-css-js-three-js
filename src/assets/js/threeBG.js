import * as THREE from 'three'
import images from './images'
const container = document.querySelector('.three_bg')
const loader = new THREE.TextureLoader()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

container.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const geometry = new THREE.PlaneGeometry(18, 10, 30, 9)
const material = new THREE.MeshBasicMaterial({
  // color: 0xff0000,
  map: loader.load(images.bg2),
  // wireframe: true
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

camera.position.z = 5

const count = geometry.attributes.position.count
const clock = new THREE.Clock()

function animate() {
  const time = clock.getElapsedTime()
  requestAnimationFrame(animate)
  for (let i = 0; i < count; i++) {
    const x = geometry.attributes.position.getX(i)
    const y = geometry.attributes.position.getY(i)

    geometry.attributes.position.setZ(i, 0.9 * Math.sin( x * time * 0.3) )
    geometry.computeVertexNormals()
    geometry.attributes.position.needsUpdate = true
  }

  // mesh.rotation.x += 0.01
  // mesh.rotation.z += 0.01
  renderer.render(scene, camera)
}
animate()
