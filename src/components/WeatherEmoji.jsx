import React, { useState, useEffect } from 'react'

export default function WeatherEmoji({ className }) {
    const [emoji, setEmoji] = useState()
    const [phrase, setPhrase] = useState()

    const emojis = {
        '🌤': ['mostly sunny'],
        '⛅': ['partly sunny', 'partly cloudy'],
        '☁️': ['cloud'],
        '🌧️': ['rain'],
        '🌨️': [],
        '⛈️': ['thunderstorms'],
        '☀️': ['sun'],
        '❄️': ['snow'],
        '🌩️': []
    }

    useEffect(() => {
        // As Mr. Mixer said, you should always use weather.gov
        // because your tax dollars are paying for it.
        fetch('https://api.weather.gov/gridpoints/BOX/64,79/forecast')
            .then(res => res.json())
            .then(json => {
                const phrase = json.properties.periods[0].shortForecast.toLowerCase()
                setPhrase(phrase)
                let foundEmoji = false
                for(const emoji in emojis) {
                    if(foundEmoji) return

                    const matchWords = emojis[emoji]
                    matchWords.forEach(word => {
                        if(phrase.includes(word)) {
                            setEmoji(emoji)
                            foundEmoji = true
                        }
                    })
                }
            })
    }, [])

    return (
        emoji
        ? <img src={`https://emojicdn.elk.sh/${emoji}`} className={className} title={`Currently: ${phrase}`} alt={emoji} />
        : <span className={className} />
    )
}
