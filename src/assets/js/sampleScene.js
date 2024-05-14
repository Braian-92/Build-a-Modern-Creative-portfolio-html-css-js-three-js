import * as THREE from 'three'

class SimpleScene {
  constructor() {
    // Contenedor donde se renderizará la escena
    this.container = document.querySelector('.landing')

    // Tamaño de la ventana
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      pixelRatio: window.devicePixelRatio || 1
    }

    // Configuración de la cámara
    this.camera = new THREE.PerspectiveCamera(75, this.viewport.aspectRatio, 0.1, 1000)
    this.camera.position.z = 5

    // Escena
    this.scene = new THREE.Scene()

    // Renderizador
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.viewport.width, this.viewport.height)
    this.renderer.setPixelRatio(this.viewport.pixelRatio)

    // Agregar el canvas del renderizador al contenedor
    this.container.appendChild(this.renderer.domElement)

    // Crear una esfera roja
    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    this.sphere = new THREE.Mesh(geometry, material)
    this.scene.add(this.sphere)

    // Escuchar eventos de redimensionamiento de ventana
    window.addEventListener('resize', this.onResize.bind(this))

    // Renderizar la escena
    this.render()
  }

  // Función para ajustar la cámara y el renderizador cuando cambia el tamaño de la ventana
  onResize() {
    this.viewport.width = window.innerWidth
    this.viewport.height = window.innerHeight
    this.viewport.aspectRatio = window.innerWidth / window.innerHeight

    this.camera.aspect = this.viewport.aspectRatio
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.viewport.width, this.viewport.height)
  }

  // Función para renderizar la escena
  render() {
    requestAnimationFrame(this.render.bind(this))

    // Rotar la esfera en cada frame
    this.sphere.rotation.x += 0.01
    this.sphere.rotation.y += 0.01

    this.renderer.render(this.scene, this.camera)
  }
}

// Crear una nueva instancia de la clase SimpleScene
new SimpleScene()