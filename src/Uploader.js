import React, { useState, useEffect, useRef } from 'react'
import { useFileBrowser } from './utils/fileBrowser'

function Uploader() {

  const { getFile } = useFileBrowser({ accept: '.gif, .png, .jpg' })
  const [imgData, setImgData] = useState(null)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(
    () => {
      if (canvasRef.current && imgData) {
        //var ctx = canvasRef.current.getContext('2d')
        //var buffer = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data.buffer
        //var array = new Uint8ClampedArray(imgData)
        //debugger
        //var image = new ImageData(array, 720, 720)//ctx.canvas.width, ctx.canvas.height)

        /*var width = 720, height = 720;
        var data = new ImageData(
          new Uint8ClampedArray(4 * width * height),
          720,
          720
        )*/

        //ctx.putImageData(image, 0, 0)
      }
    }, [canvasRef, imgData]
  )

  function readFile(event) {
    getFile().then(file => {
      const reader = new FileReader()
      reader.onload = function(e) { 
	      /*const result = e.target.result
        const u8 = new Uint8ClampedArray(result)
        const blob = new Blob(u8, { type: 'image/jpg'})
        const url = URL.createObjectURL(blob)
        //setImgData(result)
        debugger
        imageRef.current.src = url*/
        imageRef.current.src = e.target.result
      }
      reader.readAsDataURL(file)//readAsArrayBuffer(file)
    })
  }

  return (
    <div className="uploader">
      <button onClick={readFile}>Upload File</button>
      <canvas ref={canvasRef} />
      <img ref={imageRef} />
    </div>
  )
}

export default Uploader
