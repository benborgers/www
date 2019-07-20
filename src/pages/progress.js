import React, { useState, useEffect } from "react"
import { css, keyframes } from "@emotion/core"

import Layout from "../components/Layout"
import Text from "../components/Text"

export default () => {
  const progressData = require("../data/progress.js")
  const exceptions = []
  for(const date in progressData.exceptions) {
    const datePieces = date.split("-")
    exceptions.push({
      year: Number(datePieces[0]),
      month: datePieces[1] - 1,
      day: Number(datePieces[2]),
      reason: progressData.exceptions[date]
    })
  }

  const bookends = {}
  const firstPieces = progressData.bookends.first.split("-")
  bookends.first = new Date(firstPieces[0], firstPieces[1] - 1, firstPieces[2])
  const lastPieces = progressData.bookends.last.split("-")
  bookends.last = new Date(lastPieces[0], lastPieces[1] - 1, lastPieces[2])

  const getWeekdaysInclusive = (startDate, endDate) => {
    let count = 0
    let currentDate = new Date(startDate.getTime())
    
    while(currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay()
      const matchingException = exceptions.find(date => date.year === currentDate.getFullYear() && date.month === currentDate.getMonth() && date.day === currentDate.getDate())
      if(!((dayOfWeek === 6) || (dayOfWeek === 0))) {
        if(!matchingException) {
          count = count + 1
        } else if(matchingException.reason === 1) {
          count = count + .5
        }
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return count
  }

  const [percentLeft, setPercentLeft] = useState()
  const [nextException, setNextException] = useState()
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    const rawNow = new Date()
    const endTimeToday = new Date((new Date((new Date((new Date()).setHours(14)).setMinutes(25)))).setSeconds(0))
    const isAfterEndTime = rawNow > endTimeToday
    
    const now = {
      year: rawNow.getFullYear(),
      month: rawNow.getMonth(),
      day: rawNow.getDate() - (!isAfterEndTime ? 1 : 0)
    }

    const nowAsDate = new Date(now.year, now.month, now.day)

    const daysPassed = getWeekdaysInclusive(bookends.first, nowAsDate)
    const totalDays = getWeekdaysInclusive(bookends.first, bookends.last)
    
    const percent = Math.round(daysPassed/totalDays * 10000) / 100
    if(percent > 100) {
      setPercentLeft(100)
    } else {
      setPercentLeft(percent)
    }


    const foundNextException = exceptions.filter(date => (new Date(date.year, date.month, date.day)) > nowAsDate)[0]
    setNextException(foundNextException)

    setCanRender(true)

  }, [])

  const enterAnimation = keyframes`
    from {
      opacity: .3;
      transform: translateY(.15rem);
    }

    to {
      opacity: 1;
      transform: translateY(0)
    }
  `

  return (
    <Layout
      title="Progress"
      description=""
      emoji="🎒"
      chip="progress"
      color="red"
    >
      {canRender ? 
        <div
          css={css`
            animation: ${enterAnimation} .4s;
          `}
        >
          <Text type="primary">
            We've made it through {percentLeft}
              <span
                css={css`
                  font-size: inherit;
                  display: inline-block;
                  margin-left: .1rem;
                `}
              >
                %
              </span>
            {" "}of the school year.
            {percentLeft === 100 ? " Yay!" : ""}
          </Text>

          {nextException ? 
          
          <Text type="secondary">
            Our next {nextException.reason === 0 ? "day with no school" : nextException.reason === 1 ? "half day" : "irregular day"} is{" "}
            {(new Date(nextException.year, nextException.month, nextException.day).toLocaleString("en-US", {
              timeZone: "America/New_York",
              weekday: "long",
              month: "long",
              day: "numeric"
            }))}.
          </Text>

          : ""}
        </div>
      : ""}
    </Layout>
  )
}