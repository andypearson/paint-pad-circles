import { sample } from "lodash"

import colors from "../data/colors"

import { randomLower, randomInt, randomLowerInt, oneIn } from "../lib/random"
import { rgbaHex } from "../lib/color"
import { drawCircle, drawImage, resize } from "../lib/canvas"
import { distanceBetweenCircles, circlesOverlap } from "../lib/shape"

export const draw = (canvas, {
  width,
  height,
  minRadius,
  maxRadius,
  maxCircles,
  logoScale,
  logoBorder,
  circleSpacing,
  overlapChance
}) => {
  resize(canvas, { width, height })

  const ctx = canvas.getContext("2d")

  const logoWidth = 35 * logoScale
  const logoHeight = 20 * logoScale

  const circles = [
    { x: (width/2) - ((logoWidth - logoHeight) / 2), y: height/2, r: (logoHeight / 2) + logoBorder, color: "white" },
    { x: (width/2) + ((logoWidth - logoHeight) / 2), y: height/2, r: (logoHeight / 2) + logoBorder, color: "white" }
  ]

  for (var i = 1; i <= maxCircles; i++) {
    const r = randomLowerInt(minRadius, maxRadius)
    const x = randomInt(0 - r, width + r)
    const y = randomInt(0 - r, height + r)

    const circle = { x, y, r, color: rgbaHex(sample(colors), 0.7) }

    if (oneIn(overlapChance) || !circlesOverlap(circle, circles, circleSpacing)) {
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
}
