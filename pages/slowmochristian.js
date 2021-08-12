import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import CustomHead from 'components/CustomHead'

let timeout

export default function SlowMoChristian() {
    const [text, setText] = useState('slow-mo christian')
    const [speed, setSpeed] = useState(2000)

    useEffect(() => setText(`${speed > 4000 ? 'fast' : 'slow'}-mo christian`), [speed])

    const move = () => {
        for(const el of document.querySelectorAll('[data-move]')) {
            el.style.transitionDuration = (5100 - speed) + 'ms'

            const { width: elWidth, height: elHeight } = el.getBoundingClientRect()

            const windowHeight = window.innerHeight - elHeight - 100
            const windowWidth = window.innerWidth - elWidth - 10

            const top = Math.random() > 0.5 ? 10 : windowHeight
            const left = Math.floor(Math.random() * windowWidth)

            el.style.top = top + 'px'
            el.style.left = left + 'px'
        }

        if(timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => move(), 5100 - speed)
    }

    useEffect(() => move(), [speed])

    return (
        <>
            <CustomHead title="Slow-Mo Christian">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:ital,wght@1,700" rel="stylesheet" />
            </CustomHead>

            <div className="h-screen overflow-hidden">
                <img data-move src="/christian.jpg" className="absolute transition-all transform-gpu ease-linear top-0 left-0 w-1/6" />
                <p data-move className="absolute transition-all transform-gpu ease-linear top-0 left-0 font-bold text-gray-900 text-xl sm:text-5xl bg-white italic" style={{ fontFamily: 'Balsamiq Sans' }}>
                    {text}
                </p>

                <div className="fixed inset-x-4" style={{ bottom: 'calc(env(safe-area-inset-bottom) + 16px' }}>
                    <input type="range" min="0" max="5000" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full sm:w-1/2 mx-auto block" />
                    <p className="text-center italic mt-1 text-gray-400">
                        lovingly crafted by {' '}
                        <Link href="/"><a className="underline">ben borgers</a></Link>
                        <br className="sm:hidden" />
                        {' for '}
                        <a href="https://cbernier.com" className="underline">christian bernier</a>
                    </p>
                </div>
            </div>
        </>
    )
}
