import { sample } from "lodash"

import colors from "../data/colors"

import { randomLower, randomInt, randomLowerInt, oneIn } from "../lib/random"
import { rgbaHex } from "../lib/color"
import { drawCircle, drawImage, resize } from "../lib/canvas"
import { distanceBetweenCircles, circlesOverlap } from "../lib/shape"

const LOGOS = {
  icon: {
    width: 35,
    height: 20,
    circles: 2,
    path: "./assets/icon.svg"
  },
  logo: {
    width: 125,
    height: 20,
    circles: 8,
    path: "./assets/logo.svg"
  }
}

export const draw = (canvas, {
  width,
  height,
  minRadius,
  maxRadius,
  maxCircles,
  logoScale,
  logoBorder,
  circleSpacing,
  overlapChance,
  logoStyle
}) => {
  resize(canvas, { width, height })

  const ctx = canvas.getContext("2d")
  const circles = []

  const logo = LOGOS[logoStyle]
  let logoWidth
  let logoHeight

  if (logo) {
    logoWidth = logo.width * logoScale
    logoHeight = logo.height * logoScale

    const offset = logoHeight - ((logoHeight * logo.circles) - logoWidth) / (logo.circles - 1)
    const radius = logoHeight / 2
    const paddedRadius = radius + logoBorder
    const y = height / 2
    const x = (width / 2) - (logoWidth / 2) + radius

    for (var i = 0; i < logo.circles; i++) {
      circles.push({
        y,
        r: paddedRadius,
        x: x + (offset * i),
        color: "white"
      })
    }
  }

  for (var i = 1; i <= maxCircles; i++) {
    const r = randomLowerInt(minRadius, maxRadius)
    const x = randomInt(0 - r, width + r)
    const y = randomInt(0 - r, height + r)

    const circle = { x, y, r, color: rgbaHex(sample(colors), 0.7) }

    if (oneIn(overlapChance) || !circlesOverlap(circle, circles, circleSpacing)) {
      circles.push(circle)
    }
  }

  if (logo) {
    drawImage(ctx, {
      src: logo.path,
      width: logoWidth,
      height: logoHeight,
      x: (width - logoWidth) / 2,
      y: (height - logoHeight) / 2
    })
  }

  circles.forEach(circle => {
    drawCircle(ctx, circle)
  })
}
