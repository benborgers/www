import Link from 'next/link'
import CustomHead from 'components/CustomHead'
import { ArrowRightIcon } from '@heroicons/react/solid'

const emojis = {
    '⛈️': ['thunderstorm'],
    '🌤': ['mostly sunny', 'mostly clear'],
    '⛅': ['partly sunny', 'partly cloudy'],
    '☁️': ['cloud'],
    '🌧️': ['rain'],
    '🌨️': [],
    '☀️': ['sun', 'clear'],
    '❄️': ['snow'],
    '🌩️': [],
    '🌫': ['fog', 'haze']
}

export async function getStaticProps() {
    // This grid point is for Tufts.
    const res = await fetch('https://api.weather.gov/gridpoints/BOX/68,78/forecast/hourly')
    const json = await res.json()

    const fullPhrase = json.properties.periods[0].shortForecast.toLowerCase()
    // For matching, we remove the forecast for later (e.g. "mostly sunny then scattered showers and thunderstorms").
    const phraseForMatching = fullPhrase.replace(/then .*/, '').trim()

    let selectedEmoji
    for(const emoji in emojis) {
        if(selectedEmoji) break

        const matchWords = emojis[emoji]
        matchWords.forEach(word => {
            if(phraseForMatching.includes(word)) {
                selectedEmoji = emoji
            }
        })
    }

    if(! selectedEmoji) {
        selectedEmoji = '🏙'
    }

    return {
        props: {
            selectedEmoji,
            fullPhrase,
            nowString: new Date().toLocaleString('en-US', { timeZone: 'America/New_York', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' })
        },
        revalidate: 60 * 60 // New weather every hour.
    }
}

const ProjectCard = ({ emoji, background, title, subtitle, link }) => {
    return (
        <a
            className="grid space-x-6 items-start group grid-cols-[max-content,1fr]"
            href={link}
            target="_blank"
            rel="noreferrer"
        >
            <div className={`${background} rounded-lg w-14 h-14 flex items-center justify-center`}>
                <img src={`https://emojicdn.elk.sh/${emoji}`} className="w-8" />
            </div>
            <div>
                <p className="font-medium text-gray-800 text-lg flex items-center">
                    <span className="mr-1">{title}</span>
                    <ArrowRightIcon className="h-4 w-4 transform -rotate-45 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </p>
                <p className="text-gray-500">{subtitle}</p>
            </div>
        </a>
    )
}

export default function Index({ selectedEmoji, fullPhrase, nowString }) {
    return (
        <>
            <CustomHead title="Ben Borgers" />

            <div className="p-4 sm:p-6 pb-36 sm:pb-36">
                <div className="flex justify-end">
                    <Link href="/posts"><a className="block text-gray-400 underline">Blog</a></Link>
                </div>

                <div className="max-w-screen-lg mx-auto">
                    <div className="mt-6 lg:mt-32">
                        <p className="text-indigo-400 text-sm font-bold">
                            <img src="https://emojicdn.elk.sh/🏝" className="inline-block mr-2 w-4 transform -translate-y-0.5" />
                            <span>welcome to my island on the internet</span>
                        </p>
                        <h1 className="text-2xl md:text-4xl leading-snug md:leading-snug text-gray-800 mt-1">
                            I’m Ben Borgers, an 18 year-old developer from{' '}
                            <img
                                src={`https://emojicdn.elk.sh/${selectedEmoji}`}
                                title={`Currently: ${fullPhrase} (as of ${nowString})`}
                                className="inline-block w-6 md:w-9 h-auto transform -translate-y-1 mx-0.5"
                            />
                            {' '}Boston, MA.
                            In the fall, I’m going to Tufts University to study computer science.
                        </h1>

                        <div className="mt-4 flex space-x-3">
                            {[
                                {
                                    label: 'email: ben@elk.sh',
                                    link: 'mailto:ben@elk.sh'
                                },
                                {
                                    label: 'twitter',
                                    link: 'https://twitter.com/benborgers'
                                },
                                {
                                    label: 'github',
                                    link: 'https://github.com/benborgers'
                                }
                            ].map(({ label, link }) => (
                                <a
                                    className="block bg-indigo-50 px-4 py-1 rounded-full text-indigo-500 font-semibold text-sm"
                                    href={link}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={label}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-24 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-8 space-y-6 md:space-y-0">
                        <h2 className="text-xl font-bold text-gray-900 col-span-2">Projects</h2>

                        <ProjectCard
                            emoji="🗝"
                            background="bg-gray-100"
                            title="Vault"
                            subtitle="Password manager for myself and friends."
                            link="https://vault.elk.sh"
                        />

                        <ProjectCard
                            emoji="🥣"
                            background="bg-blue-100"
                            title="Cornflakes"
                            subtitle="Simple and privacy-focused email newsletter tool."
                            link="https://cornflakes.app"
                        />

                        <ProjectCard
                            emoji="🎒"
                            background="bg-red-100"
                            title="Blocks"
                            subtitle="App for my high school’s schedule used by 2,000 students and teachers."
                            link="https://blocks.elk.sh"
                        />

                        <ProjectCard
                            emoji="🥯"
                            background="bg-orange-100"
                            title="Bagel Institute"
                            subtitle="Tools for more interactive college teaching."
                            link="https://bagel.institute"
                        />

                        <ProjectCard
                            emoji="🧪"
                            background="bg-green-100"
                            title="Potion"
                            subtitle="Open-source reverse-engineered API for the Notion note taking app."
                            link="https://potion-api.vercel.app"
                        />

                        <ProjectCard
                            emoji="🥳"
                            background="bg-yellow-100"
                            title="EMOJICDN"
                            subtitle="API for getting images of emojis that serves two million requests per month."
                            link="https://emojicdn.elk.sh"
                        />


                        <h2 className="text-xl font-bold text-gray-900 col-span-2 mt-8">Work</h2>

                        <ProjectCard
                            emoji="📨"
                            background="bg-blue-100"
                            title="Buttondown"
                            subtitle="Frontend development using Vue."
                            link="https://buttondown.email"
                        />

                        <ProjectCard
                            emoji="✏️"
                            background="bg-yellow-100"
                            title="Diyi"
                            subtitle="Payment and student management system for an online school in Boston."
                            link="https://diyiboston.com"
                        />

                        <ProjectCard
                            emoji="🐝"
                            background="bg-gray-100"
                            title="IBM Security"
                            subtitle="Software engineering internship in summer 2019 and 2020, working on a new security offering for enterprise."
                            link="https://www.ibm.com/products/guardium-insights"
                        />

                        <ProjectCard
                            emoji="💬"
                            background="bg-gray-200"
                            title="Rep.ly"
                            subtitle="Implemented new features using React."
                            link="https://rep.ly"
                        />

                        <ProjectCard
                            emoji="🧠"
                            background="bg-pink-100"
                            title="Sophrosyne"
                            subtitle="Built a PWA for a mental health awareness club."
                            link="https://sophrosyne.vercel.app"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
