import React, { useState, useRef, useEffect, useCallback } from "react"
import { format } from "date-fns"

import ToolbarOption from "./toolbar_option"
import { draw } from "../artwork/circles"
import { toImage } from "../lib/canvas"

const DEFAULT_OPTIONS = {
  width: 800,
  height: 600,
  minRadius: 8,
  maxRadius: 24,
  maxCircles: 1000,
  logoScale: 6,
  logoBorder: 16,
  circleSpacing: 4,
  overlapChance: 0,
  logoStyle: "icon",
  circleOpacity: 0.7,
  layerStyle: "source-over"
}

const LOGO_STYLE_OPTIONS = [
  { label: "None", value: "" },
  { label: "Icon", value: "icon" },
  { label: "Logo", value: "logo" }
]

const LAYER_STYLE_OPTIONS = [
  { label: "Normal", value: "source-over" },
  { label: "Lighter", value: "lighter" },
  { label: "Multiply", value: "multiply" },
  { label: "Screen", value: "screen" },
  { label: "Overlay", value: "overlay" },
  { label: "Darken", value: "darken" },
  { label: "Lighten", value: "lighten" },
  { label: "Dodge", value: "color-dodge" },
  { label: "Burn", value: "color-burn" },
  { label: "Hard light", value: "hard-light" },
  { label: "Soft light", value: "soft-light" },
  { label: "Difference", value: "difference" },
  { label: "Exclusion", value: "exclusion" },
  { label: "Hue", value: "hue" },
  { label: "Saturation", value: "saturation" },
  { label: "Color", value: "color" },
  { label: "Luminosity", value: "luminosity" }
]

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
  const [overlapChance, setOverlapChance] = useState(DEFAULT_OPTIONS.overlapChance)
  const [logoStyle, setLogoStyle] = useState(DEFAULT_OPTIONS.logoStyle)
  const [circleOpacity, setCircleOpacity] = useState(DEFAULT_OPTIONS.circleOpacity)
  const [layerStyle, setLayerStyle] = useState(DEFAULT_OPTIONS.layerStyle)

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
      circleSpacing,
      overlapChance,
      logoStyle,
      circleOpacity,
      layerStyle
    })
  }

  // Code adapted from https://codepen.io/joseluisq/pen/mnkLu
  const downloadImage = () => {
    const now = format(new Date(), "yyyy-MM-dd-HHmmss")
    const link = document.createElement("a")

    link.download = `${now}-paintpad-artwork.png`
    link.href = toImage(canvasEl.current, { backgroundColor: "white" })

    event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window,
                         0, 0, 0, 0, 0, false, false, false,
                         false, 0, null)

    link.dispatchEvent(event)
  }

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar__container">
          <ToolbarOption label="Width" name="width" value={width} type="number" onChange={setWidth} />
          <ToolbarOption label="Height" name="height" value={height} type="number" onChange={setHeight} />
          <ToolbarOption label="Layer style" name="layer_style" value={layerStyle} type="select" onChange={setLayerStyle} options={LAYER_STYLE_OPTIONS} />
          <ToolbarOption label="Min radius" name="min_radius" value={minRadius} type="number" onChange={setMinRadius} />
          <ToolbarOption label="Max radius" name="max_radius" value={maxRadius} type="number" onChange={setMaxRadius} />
          <ToolbarOption label="Max circles" name="max_circles" value={maxCircles} type="number" onChange={setMaxCircles} />
          <ToolbarOption label="Circle spacing" name="circle_spacing" value={circleSpacing} type="number" onChange={setCircleSpacing} />
          <ToolbarOption label="Circle opacity" name="circle_opacity" value={circleOpacity} type="float" onChange={setCircleOpacity} />
          <ToolbarOption label="Overlap chance" name="overlap_chance" value={overlapChance} type="number" onChange={setOverlapChance} />
          <ToolbarOption label="Logo style" name="logo_style" value={logoStyle} type="select" onChange={setLogoStyle} options={LOGO_STYLE_OPTIONS} />
          <ToolbarOption label="Logo scale" name="logo_scale" value={logoScale} type="number" onChange={setLogoScale} />
          <ToolbarOption label="Logo border" name="logo_border" value={logoBorder} type="number" onChange={setLogoBorder} />

          <input type="submit" value="Update" onClick={updateArtwork} />
          <button onClick={downloadImage}>Download</button>
        </div>
      </div>

      <div className="container">
        <canvas ref={canvasEl} width={DEFAULT_OPTIONS.width} height={DEFAULT_OPTIONS.height} />
      </div>
    </div>
  )
}

export default App
