export const randomLower = () =>
  Math.abs(Math.random() - Math.random())

export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const randomLowerInt = (min, max) =>
  Math.floor(randomLower() * (1 + max - min) + min)

export const oneIn = (n) =>
  randomInt(0, n) === 1
