const devicePixelRatio = () => window.devicePixelRatio || 1

const backingStoreRatio = (ctx) => (
  ctx.webkitBackingStorePixelRatio ||
  ctx.mozBackingStorePixelRatio ||
  ctx.msBackingStorePixelRatio ||
  ctx.oBackingStorePixelRatio ||
  ctx.backingStorePixelRatio || 1
)

export const drawCircle = (ctx, { x, y, r, color }) => {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI, true)
  ctx.closePath()
  ctx.fill()
}

export const drawImage = (ctx, { src, width, height, x, y }) => {
  const image = new Image(width, height)
  image.onload = () => ctx.drawImage(image, x, y, width, height)
  image.src = src
}

export const resize = (canvas, { width, height }) => {
  const ctx = canvas.getContext("2d")
  const ratio = devicePixelRatio() / backingStoreRatio(ctx)

  canvas.width = width * ratio
  canvas.height = height * ratio

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  ctx.scale(ratio, ratio)
}
