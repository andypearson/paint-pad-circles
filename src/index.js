import { sample } from "lodash"

import colors from "./data/colors"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const width = canvas.width
const height = canvas.height

const logoScale = 6
const logoWidth = 35 * logoScale
const logoHeight = 20 * logoScale

const randomLower = () => Math.abs(Math.random() - Math.random())
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const randomLowerInt = (min, max) => Math.floor(randomLower() * (1 + max - min) + min)

const hexToRbg = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const rgbaHex = (hex, a) => {
  const { r, g, b } = hexToRbg(hex)

  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const drawCircle = (ctx, { x, y, r, color }) => {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI, true)
  ctx.closePath()
  ctx.fill()
}

const distanceBetweenCircles = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => (
  Math.hypot(x1 - x2, y1 - y2)
)

const collides = (circle, circles, spacing = 0) => (
  circles.find(c => distanceBetweenCircles(c, circle) < c.r + circle.r + spacing)
)

const maxCircles = (width + height) * 10 * 2

const circles = [
  { x: (width/2) - ((logoWidth - logoHeight) / 2), y: height/2, r: (logoHeight / 2) + 16, color: "white" },
  { x: (width/2) + ((logoWidth - logoHeight) / 2), y: height/2, r: (logoHeight / 2) + 16, color: "white" }
]

for (var i = 1; i <= maxCircles; i++) {
  const r = randomLowerInt(8, 24)
  const x = randomInt(0 - r, width + r)
  const y = randomInt(0 - r, height + r)

  const circle = { x, y, r, color: rgbaHex(sample(colors), 0.7) }

  if (!collides(circle, circles, 4)) {
    circles.push(circle)
  }
}

circles.forEach(circle => {
  drawCircle(ctx, circle)
})

function drawLogo() {
  const x = (width - this.width) / 2
  const y = (height - this.height) / 2

  ctx.drawImage(this, x, y, this.width, this.height)
}

const image = new Image(logoWidth, logoHeight)
image.onload = drawLogo
image.src = "./assets/pp.svg"
