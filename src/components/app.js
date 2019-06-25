import React, { useState, useRef, useEffect, useCallback } from "react"

import ToolbarOption from "./toolbar_option"
import { draw } from "../artwork/circles"

const DEFAULT_OPTIONS = {
  width: 800,
  height: 600,
  minRadius: 8,
  maxRadius: 24,
  maxCircles: 1000,
  logoScale: 6,
  logoBorder: 16,
  circleSpacing: 4
}

const App = () => {
  const canvasEl = useRef(null)

  const [width, setWidth] = useState(DEFAULT_OPTIONS.width)
  const [height, setHeight] = useState(DEFAULT_OPTIONS.height)
  const [minRadius, setMinRadius] = useState(DEFAULT_OPTIONS.minRadius)
  const [maxRadius, setMaxRadius] = useState(DEFAULT_OPTIONS.maxRadius)
  const [maxCircles, setMaxCircles] = useState(DEFAULT_OPTIONS.maxCircles)
  const [logoScale, setLogoScale] = useState(DEFAULT_OPTIONS.logoScale)
  const [logoBorder, setLogoBorder] = useState(DEFAULT_OPTIONS.logoBorder)
  const [circleSpacing, setCircleSpacing] = useState(DEFAULT_OPTIONS.circleSpacing)

  useEffect(() => draw(canvasEl.current, DEFAULT_OPTIONS), [])

  const updateArtwork = () => {
    draw(canvasEl.current, {
      width,
      height,
      minRadius,
      maxRadius,
      maxCircles,
      logoScale,
      logoBorder,
      circleSpacing
    })
  }

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar__container">
          <ToolbarOption label="Width" name="width" value={width} type="number" onChange={setWidth} />
          <ToolbarOption label="Height" name="height" value={height} type="number" onChange={setHeight} />
          <ToolbarOption label="Min radius" name="min_radius" value={minRadius} type="number" onChange={setMinRadius} />
          <ToolbarOption label="Max radius" name="max_radius" value={maxRadius} type="number" onChange={setMaxRadius} />
          <ToolbarOption label="Max circles" name="max_circles" value={maxCircles} type="number" onChange={setMaxCircles} />
          <ToolbarOption label="Logo scale" name="logo_scale" value={logoScale} type="number" onChange={setLogoScale} />
          <ToolbarOption label="Logo border" name="logo_border" value={logoBorder} type="number" onChange={setLogoBorder} />
          <ToolbarOption label="Circle spacing" name="circle_spacing" value={circleSpacing} type="number" onChange={setCircleSpacing} />

          <input type="submit" value="UPDATE" onClick={updateArtwork} />
        </div>
      </div>

      <div className="container">
        <canvas ref={canvasEl} width={DEFAULT_OPTIONS.width} height={DEFAULT_OPTIONS.height} />
      </div>
    </div>
  )
}

export default App
