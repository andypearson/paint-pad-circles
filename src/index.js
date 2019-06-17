import { sample } from "lodash"

import colors from "./data/colors"

import { randomLower, randomInt, randomLowerInt } from "./lib/random"
import { rgbaHex } from "./lib/color"
import { drawCircle, drawImage } from "./lib/canvas"
import { distanceBetweenCircles, circlesOverlap } from "./lib/shape"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const width = canvas.width
const height = canvas.height

const logoScale = 6
const logoWidth = 35 * logoScale
const logoHeight = 20 * logoScale

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

  if (!circlesOverlap(circle, circles, 4)) {
    circles.push(circle)
  }
}

drawImage(ctx, {
  src: "./assets/pp.svg",
  width: logoWidth,
  height: logoHeight,
  x: (width - logoWidth) / 2,
  y: (height - logoHeight) / 2
})

circles.forEach(circle => {
  drawCircle(ctx, circle)
})
