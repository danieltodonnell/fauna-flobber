import React, { useState, useEffect, useRef } from 'react'
import { useFileBrowser } from './utils/fileBrowser'

function Uploader() {

  const { getFile } = useFileBrowser({ accept: '.gif, .png, .jpg' })
  const [imgData, setImgData] = useState(null)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(
    () => {
      if (imageRef.current && imgData) {
        // blob it
        var blob = new Blob( [ imgData ], { type: "image/jpeg" } )
        var urlCreator = window.URL || window.webkitURL
        var imageUrl = urlCreator.createObjectURL( blob )
        imageRef.current.src = imageUrl
        // free memory
        urlCreator.revokeObjectURL( blob )
      }

    }, [imageRef, imgData]
  )

  function readFile(event) {
    getFile().then(file => {
      const reader = new FileReader()
      reader.onload = function(e) { 
	      const result = e.target.result
        // Obtain a blob: URL for the image data.
        var arrayBufferView = new Uint8Array( result )
        // write to state
        setImgData(arrayBufferView)
      }
      reader.readAsArrayBuffer(file)
    })
  }

  return (
    <div className="uploader">
      <button onClick={readFile}>Upload File</button>
      <canvas ref={canvasRef} />
      <img ref={imageRef} alt="" />
    </div>
  )
}

export default Uploader
