import React, { useEffect, useState } from 'react';

import './CountDown.scss';

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState({}); // { days, hours, minutes, seconds }
  const [year] = useState(new Date().getFullYear());
  const [month] = useState(new Date().getMonth());
  const [day] = useState(new Date().getDate());
  const [hour] = useState(new Date().getHours());
  const [minute] = useState(new Date().getMinutes());
  const [second] = useState(new Date().getSeconds());
  const [eventDate] = useState(new Date(year, month, day + 10, hour, minute, second));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      const seconds = Math.floor(distance % (1000 * 60) / 1000);

      if (distance < 0) {
        // Stop Timer
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      } else {
        // Update Timer
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds
        });
      }
    }, 1000);
  });
  
  return (
    <div>
      <div className="count-down">
        <div className="count-down-item">
          {timeLeft.days}
          <span>days</span>
        </div>
        <div className="count-down-item">
          {timeLeft.hours}
          <span>hours</span>
        </div>
        <div className="count-down-item">
          {timeLeft.minutes}
          <span>minutes</span>
        </div>
        <div className="count-down-item">
          {timeLeft.seconds}
          <span>seconds</span>
        </div>
      </div>

      <div className="count-down-text">
        <p>Countdown to the event</p>
      </div>
    </div>
  )
}

export default CountDown;