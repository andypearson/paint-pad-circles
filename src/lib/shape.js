export const distanceBetweenCircles = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.hypot(x1 - x2, y1 - y2)

export const circlesOverlap = (circle, circles, spacing = 0) =>
  circles.find(c => distanceBetweenCircles(c, circle) < c.r + circle.r + spacing)
