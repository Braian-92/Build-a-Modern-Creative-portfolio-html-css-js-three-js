import * as THREE from 'three'
import images from './images'

const loader = new THREE.TextureLoader()
const texture1 = loader.load(images.me1)
const texture2 = loader.load(images.me2)
const texture3 = loader.load(images.bg1)
const texture4 = loader.load(images.bg2)

class shaded {
  constructor() {
    this.container = document.querySelector('.landing')
    this.links = [...document.querySelectorAll('#shadedimg')]
    this.scene = new THREE.Scene()
    this.perspective = 1000
    this.sizes = new THREE.Vector2(0, 0)
    this.offset = new THREE.Vector2(0, 0)
    this.uniforms = {
      uTexture: { value: texture4 },
      uAlpha: { alpha: 0 },
      uOffset: { value: new THREE.Vector2(0, 0) },
      trasparent: true
    }
    this.links.map((link, i) => {
      link.addEventListener('mouseenter', () => {
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
        this.uniforms.uAlpha.value = 0.0
      })
      this.setupCamera()
      this.createMesh()
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
    this.renderer = new THREE.WebGL1Renderer({
      antialias: true,
      alpha: true
    })

    this.renderer.setSize(this.viewport.width, this.viewport.height)
    this.renderer.setPixelRatio(this.viewport.pixelRatio)
    this.container.appendChild(this.renderer.domElement)
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 20, 20)
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: 
    })
  }

  onResize() {
    this.camera.aspect = this.viewport.aspectRatio
    this.camera.fov =
      (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) /
      Math.PI
    this.renderer.setSize(this.viewport.width, this.viewport.height)
    this.camera.updateMatrix()
  }
}
