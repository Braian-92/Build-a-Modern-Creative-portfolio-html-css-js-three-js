import * as THREE from 'three'
import images from './images'
import vertex from '../shaders/vertex.glsl'
import fragment from '../shaders/fragment.glsl'

const loader = new THREE.TextureLoader()
const texture1 = loader.load(images.me1)
const texture2 = loader.load(images.me2)
const texture3 = loader.load(images.bg1)
const texture4 = loader.load(images.bg2)

function lerp(start, end, t) {
  return start * (1 - t) + end * t
}

class Shaded {
  constructor() {
    this.container = document.querySelector('.landing')
    console.log('🚀 ~ Shaded ~ constructor ~ container:', [this.container])
    this.inner = document.querySelector('.intro')
    console.log('🚀 ~ Shaded ~ constructor ~ inner:', [this.inner])
    this.links = [...document.querySelectorAll('#shadedimg')]
    console.log('🚀 ~ Shaded ~ constructor ~ links:', this.links)
    this.targetX = 0
    this.targetY = 0
    this.scene = new THREE.Scene()
    this.perspective = 1000
    this.sizes = new THREE.Vector2(0, 0)
    this.offset = new THREE.Vector2(0, 0)
    this.uniforms = {
      uTexture: { value: texture4 },
      uAlpha: { alpha: 0.0 },
      uOffset: { value: new THREE.Vector2(0.0, 0.0) },
      trasparent: true
    }
    this.links.map((link, i) => {
      link.addEventListener('mouseenter', () => {
        console.log('mouse enter')
        switch (i) {
          case 0:
            this.uniforms.uTexture.value = texture1
            break
          case 1:
            this.uniforms.uTexture.value = texture2
            break
          case 2:
            this.uniforms.uTexture.value = texture3
            break
          case 3:
            this.uniforms.uTexture.value = texture4
            break
        }
      })

      link.addEventListener('mouseleave', () => {
        console.log('mouse leave')
        this.uniforms.uAlpha.value = lerp(this.uniforms.uAlpha.value, 0.0, 0.1)
      })
      this.checkHovered()
      this.setupCamera()
      this.followMouseMove()
      this.createMesh()
      this.createSphere()
      this.render()
    })
  }

  get viewport() {
    let width = window.innerWidth
    let height = window.innerHeight
    let aspectRatio = width / height
    let pixelRatio = window.devicePixelRatio
    return {
      width,
      height,
      aspectRatio,
      pixelRatio
    }
  }

  checkHovered() {
    this.inner.addEventListener('mouseenter', () => {
      this.hovered = true
    })
    this.inner.addEventListener('mouseleave', () => {
      this.hovered = false
      this.uniforms.uTexture = { value: texture1 }
    })
  }

  setupCamera() {
    window.addEventListener('resize', this.onResize.bind(this))
    let fov =
      (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) /
      Math.PI
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.viewport.aspectRatio,
      0.1,
      1000
    )

    this.camera.position.set(0, 0, this.perspective)

    //! renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })

    this.renderer.setSize(this.viewport.width, this.viewport.height)
    this.renderer.setPixelRatio(this.viewport.pixelRatio)

    // // Elimina todos los elementos hijos del contenedor
    // while (this.container.firstChild) {
    //   this.container.removeChild(this.container.firstChild)
    // }

    this.container.appendChild(this.renderer.domElement)
    console.log('se agrego el elemento')
  }

  followMouseMove() {
    window.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX
      this.targetY = e.clientY
    })
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 20, 20)
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.sizes.set(370, 470, 1)
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
    this.mesh.position.set(this.offset.x, this.offset.y, 0)
    this.scene.add(this.mesh)
  }

  createSphere() {
    // Define la geometría de la esfera
    this.geometry = new THREE.SphereGeometry(1, 32, 32) // Radio, segmentos de anillos, segmentos radiales

    // Define el material de la esfera (puedes ajustar los parámetros según tus necesidades)
    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000, // Color de la esfera
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(0, 0, -2) // Posición de la esfera

    // Agrega la esfera a la escena
    this.scene.add(this.mesh)
  }

  onResize() {
    this.camera.aspect = this.viewport.aspectRatio
    this.camera.fov =
      (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) /
      Math.PI
    this.renderer.setSize(this.viewport.width, this.viewport.height)
    this.camera.updateMatrix()
  }

  render() {
    this.offset.x = lerp(this.offset.x, this.targetX, 0.1)
    this.offset.x = lerp(this.offset.y, this.targetY, 0.1)
    this.uniforms.uOffset.value.set(
      (this.targetX - this.offset.x) * 0.003,
      -(this.targetY - this.offset.y) * 0.003
    )
    this.mesh.position.set(
      this.offset.x - window.innerWidth / 2,
      -this.offset.y + window.innerHeight / 2
    )
    this.hovered
      ? (this.uniforms.uAlpha.value = lerp(
          this.uniforms.uAlpha.value,
          1.0,
          0.1
        ))
      : (this.uniforms.uAlpha.value = lerp(
          this.uniforms.uAlpha.value,
          0.0,
          0.1
        ))
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.render.bind(this))
  }
}
new Shaded()
