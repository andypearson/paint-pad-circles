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
