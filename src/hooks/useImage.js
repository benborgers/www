import { useState, useEffect } from "react"

import images from "../../images"

export default () => {
  const getImage = () => {
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const code = month + "-" + day
  
    const keys = Object.keys(images)
  
    return images[code] || images[keys[keys.length -1]]
  }

  useEffect(() => setImage(getImage()), [])

  const [image, setImage] = useState(getImage())

  return image
}