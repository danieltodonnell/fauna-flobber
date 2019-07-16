import React, { useEffect, useRef } from 'react'

function ShowBlob({blobData, mimeType}) {

  const imageRef = useRef(null)

  useEffect(
    () => {
      if (blobData && mimeType) {
        // blob it
        var blob = new Blob( [ blobData.value ], { type: mimeType } )
        var urlCreator = window.URL || window.webkitURL
        var imageUrl = urlCreator.createObjectURL( blob )
        debugger
        imageRef.current.src = imageUrl
        // free memory
        urlCreator.revokeObjectURL( blob )
      }
    }, [blobData, mimeType]
  )

  return (
    <div className="blobImage">
      <h2>Blob</h2>
      <img ref={imageRef} alt="" />
    </div>
  )
}

export default ShowBlob