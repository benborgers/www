import { useState, useEffect } from "react"

export default (key, initial) => {
  const fullKey = "benborgers:" + key

  const [state, setState] = useState(initial)

  useEffect(() => {
    const existingValue = localStorage.getItem(fullKey)
    
    if(existingValue) {
      setState(existingValue)
    } else if(initial) {
      localStorage.setItem(fullKey, initial)
    }
  }, [fullKey, initial])

  const setPersistentState = value => {
    setState(value)
    localStorage.setItem(fullKey, value)
  }

  return [state, setPersistentState]
}