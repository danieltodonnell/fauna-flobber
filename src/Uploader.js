import React, { useState, useEffect, useRef } from 'react'
import { useFileBrowser } from './utils/fileBrowser'
import faunadb from 'faunadb'

import ShowBlob from './ShowBlob'

function Uploader() {

  const { getFile } = useFileBrowser({ accept: '.gif, .png, .jpg' })
  const [imgData, setImgData] = useState(null)
  const [blobs, setBlobs] = useState()
  const canvasRef = useRef(null)
  const imageRef = useRef(null)

  const client = new faunadb.Client({ secret: 'fnADOERe0HACCch0bMp6aN0yIii3DsKox9Eb8TE3' })
  const q = faunadb.query

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

        writeBlob(imgData)
      }

    }, [imageRef, imgData]
  )

  function writeBlob(blob) {
    // DANGER - return client.query(q.Create(q.Class('flobber_blobs'), { data: { img: new Uint8Array(blob), mime: 'image/jpeg' } }))
  }

  useEffect(
    () => {
      readBlobs()
    },[]
  )

  function readBlobs() {
    const data = client.query(q.Paginate(q.Match(q.Index('flobber_blobs'))))
    data.then(
      res => { setBlobs(res.data || []) }
    )
  }

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
    <>
      <div className="uploader">
        <button onClick={readFile}>Upload File</button>
        <canvas ref={canvasRef} />
        <img ref={imageRef} alt="" />
      </div>
      <hr />
      { blobs && blobs.length &&
        <div className="blobList">
          { blobs.map(blob => 
            <ShowBlob blobData={blob[0]} mimeType={blob[1]} />
          )}
        </div>
      }
    </>

  )
}

export default Uploader