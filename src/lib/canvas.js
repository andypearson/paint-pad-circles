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

// Adapted from: http://www.mikechambers.com/blog/2011/01/31/setting-the-background-color-when-generating-images-from-canvas-todataurl/
export const toImage = (canvas, { backgroundColor }) => {
  const ctx = canvas.getContext("2d")
  const width = canvas.width
  const height = canvas.height
  const compositeOperation = ctx.globalCompositeOperation

  let data;

  if (backgroundColor) {
    data = ctx.getImageData(0, 0, width, height);

    ctx.globalCompositeOperation = "destination-over"

    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)
  }

  const imageData = canvas.toDataURL("image/png;base64");

  if (backgroundColor) {
    ctx.clearRect(0, 0, width, height)
    ctx.putImageData(data, 0, 0)
    ctx.globalCompositeOperation = compositeOperation
  }

  return imageData
}
