//@flow

import { useRef, useEffect } from 'react'

type UseFileBrowserOptions = {
  accept: string
}

export function useFileBrowser({ accept }: UseFileBrowserOptions = {}) {
  const fileInput = useRef(null)

  useEffect(
    () => {
      fileInput.current = document.createElement('input')
      fileInput.current.type = 'file'
      fileInput.current.accept = accept
    },
    [accept]
  )

  const getFile = () => {
    return new Promise<File>((resolve, reject) => {
      const currentFileInput = fileInput.current

      if (!currentFileInput) return

      currentFileInput.click()
      currentFileInput.onchange = () => {
        const file = currentFileInput.files[0]

        if (file) {
          currentFileInput.value = ''
          resolve(file)
        }
      }
    })
  }

  return {
    getFile
  }
}
