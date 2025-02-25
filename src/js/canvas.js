import Utils from './utils.js'

export default class Canvas {
  constructor(selector) {
    this.canvas = document.querySelector('canvas')

    this.canvas.width = innerWidth
    this.canvas.height = innerHeight

    this.mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    }

    this.colors = ['#ffffff', '#000000', '#FFF6E5', '#FF7F66']

    this._getWebGLContext = this.getWebGLContext()
    this.gl = this._getWebGLContext.gl
    this.ext = this._getWebGLContext.ext
    this.support_linear_float = this._getWebGLContext.support_linear_float

    this.setupResized()
    this.resize()
    this.setupMousemove()
    this.mousemove()

    //Add More For Create WebGL ANimation
    this.addSomething()
    this.update()
    this.init()
  }

  setupResized() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.canvas.width = innerWidth
    this.canvas.height = innerHeight
  }
  setupMousemove() {
    window.addEventListener('mousemove', this.mousemove.bind(this))
  }
  mousemove() {
    this.mouse.x = event.clientX
    this.mouse.y = event.clientY
  }

  getWebGLContext() {
    var params = {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
    }

    let gl = this.canvas.getContext('webgl2', params)
    let isWebGL2 = !!gl

    if (!isWebGL2) {
      gl =
        this.canvas.getContext('webgl', params) ||
        this.canvas.getContext('experimental-webgl', params)
    }

    if (!gl) {
      console.error('WebGL not supported')
      return null
    }

    let halfFloat = gl.getExtension('OES_texture_half_float')
    let support_linear_float = gl.getExtension('OES_texture_half_float_linear')

    if (isWebGL2) {
      gl.getExtension('EXT_color_buffer_float')
      support_linear_float = gl.getExtension('OES_texture_float_linear')
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    let internalFormat = isWebGL2 ? gl.RGBA16F : gl.RGBA
    let internalFormatRG = isWebGL2 ? gl.RG16F : gl.RGBA
    let formatRG = isWebGL2 ? gl.RG : gl.RGBA
    let texType = isWebGL2 ? gl.HALF_FLOAT : halfFloat?.HALF_FLOAT_OES

    return {
      gl: gl,
      ext: {
        internalFormat: internalFormat,
        internalFormatRG: internalFormatRG,
        formatRG: formatRG,
        texType: texType,
      },
      support_linear_float: support_linear_float,
    }
  }

  //For Create Animation with WebGL
  addSomething() {}
  update() {}
  init() {}
}
