import './style.css'

const targetDate = new Date('2026-10-26T16:00:00+08:00')

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Application root not found')
}

app.innerHTML = `
  <div class="page-shell">
    <div class="petals" aria-hidden="true"></div>

    <header class="hero-card reveal">
      <div class="hero-topline">
        <span>Wedding Invitation</span>
        <span>Save the Date</span>
      </div>

      <p class="eyebrow">You are warmly invited to celebrate</p>
      <h1>Gembert Walog <span>&</span> Princess Torreon</h1>
      <p class="tagline">Together with their families, they invite you to witness their vows and share in their joy.</p>

      <div class="date-panel" id="datePanel" role="button" tabindex="0" title="Add to calendar" aria-label="Add the wedding to your calendar">
        <div class="date-part">
          <span class="label">Monday</span>
          <strong>26</strong>
          <span class="month">October 2026</span>
        </div>

        <div class="details-part">
          <span class="time">4:00 PM onwards</span>
          <span class="venue">The Garden Villa, Makati</span>
        </div>
      </div>
    </header>

    <main class="content reveal">
      <section class="info-card">
        <p class="section-label">Our Story</p>
        <h2>Two hearts, one forever promise</h2>
        <p>
          Our love story began with a simple hello and a beautiful connection that grew into a deep bond.
          We are now ready to begin a new chapter filled with love, laughter, and a lifetime of togetherness.
          Your presence will make our celebration even more unforgettable.
        </p>
      </section>

      <section class="info-card timeline-card">
        <p class="section-label">Program</p>

        <div class="timeline-row">
          <span>Wedding Ceremony</span>
          <strong>3:30 PM</strong>
        </div>
        <div class="timeline-row">
          <span>Family Blessing</span>
          <strong>4:15 PM</strong>
        </div>
        <div class="timeline-row">
          <span>Reception</span>
          <strong>5:00 PM</strong>
        </div>
        <div class="timeline-row">
          <span>Dance & Celebration</span>
          <strong>6:30 PM</strong>
        </div>
      </section>

      <section class="info-card countdown-card">
        <p class="section-label">Countdown to Forever</p>
        <div class="countdown" data-countdown>
          <div class="unit-box">
            <span data-unit="days">00</span>
            <small>Days</small>
          </div>
          <div class="unit-box">
            <span data-unit="hours">00</span>
            <small>Hours</small>
          </div>
          <div class="unit-box">
            <span data-unit="minutes">00</span>
            <small>Minutes</small>
          </div>
          <div class="unit-box">
            <span data-unit="seconds">00</span>
            <small>Seconds</small>
          </div>
        </div>
      </section>

      <section class="info-card rsvp-card">
        <p class="section-label">RSVP</p>
        <p class="rsvp-copy">We would love to celebrate with you. Kindly confirm your presence by the 22nd of October.</p>
        <div class="cta-row">
          <button type="button" class="primary-btn" id="confirmAttendanceBtn">Confirm Attendance</button>
          <a class="secondary-btn" href="https://www.google.com/maps/place/Buyog,+Getafe,+Bohol/@10.1088182,124.1417948,15z/data=!3m1!4b1!4m6!3m5!1s0x33a9f4be14c4b511:0x4046993408ffe5fb!8m2!3d10.1104933!4d124.1559762!16s%2Fg%2F11f0wlp_gv?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Get Directions</a>
        </div>
      </section>
    </main>

    <footer class="signature reveal">
      <span>With love,</span>
      <strong>Gembert Walog & Princess Torreon</strong>
    </footer>
  </div>
`

const countdownRoot = document.querySelector<HTMLElement>('[data-countdown]')
const dayUnit = document.querySelector<HTMLElement>('[data-unit="days"]')
const hourUnit = document.querySelector<HTMLElement>('[data-unit="hours"]')
const minuteUnit = document.querySelector<HTMLElement>('[data-unit="minutes"]')
const secondUnit = document.querySelector<HTMLElement>('[data-unit="seconds"]')
const confirmAttendanceBtn = document.querySelector<HTMLButtonElement>('#confirmAttendanceBtn')

const weddingStart = new Date('2026-10-26T16:00:00+08:00')
const weddingEnd = new Date('2026-10-26T21:00:00+08:00')

const formatIcsDate = (date: Date) => {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z')
}

const buildIcsContent = () => {
  const eventTitle = 'Gembert Walog & Princess Torreon Wedding'
  const eventLocation = 'The Garden Villa, Makati'
  const eventDescription = 'A special day of love, celebration, and unforgettable memories.'

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gembert & Princess Wedding//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@wedding-invitation`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(weddingStart)}`,
    `DTEND:${formatIcsDate(weddingEnd)}`,
    `SUMMARY:${eventTitle}`,
    `DESCRIPTION:${eventDescription}`,
    `LOCATION:${eventLocation}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Wedding tomorrow',
    'TRIGGER:-P1D',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

const addToGoogleCalendar = () => {
  const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render')
  googleCalendarUrl.searchParams.set('action', 'TEMPLATE')
  googleCalendarUrl.searchParams.set('text', 'Gembert Walog & Princess Torreon Wedding')
  googleCalendarUrl.searchParams.set('details', 'A special day of love, celebration, and unforgettable memories.')
  googleCalendarUrl.searchParams.set('location', 'The Garden Villa, Makati')
  googleCalendarUrl.searchParams.set('dates', `${formatIcsDate(weddingStart)}/${formatIcsDate(weddingEnd)}`)

  window.open(googleCalendarUrl.toString(), '_blank', 'noopener,noreferrer')
}

const downloadCalendarFile = () => {
  const calendarContent = buildIcsContent()
  const blob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' })
  const fileUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = 'gembert-princess-wedding.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(fileUrl)
}

// Apple devices open .ics files straight in the Calendar app; everyone else gets Google Calendar
const isAppleDevice = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)

const addToCalendar = () => {
  if (isAppleDevice) {
    downloadCalendarFile()
  } else {
    addToGoogleCalendar()
  }

  if (confirmAttendanceBtn) {
    confirmAttendanceBtn.textContent = 'Added to Calendar ✓'
  }
}

confirmAttendanceBtn?.addEventListener('click', addToCalendar)

const datePanel = document.querySelector<HTMLDivElement>('#datePanel')
datePanel?.addEventListener('click', addToCalendar)
datePanel?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    addToCalendar()
  }
})

const updateCountdown = () => {
  const diff = targetDate.getTime() - Date.now()

  if (diff <= 0) {
    if (dayUnit && hourUnit && minuteUnit && secondUnit) {
      dayUnit.textContent = '00'
      hourUnit.textContent = '00'
      minuteUnit.textContent = '00'
      secondUnit.textContent = '00'
    }
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  if (dayUnit) dayUnit.textContent = String(days).padStart(2, '0')
  if (hourUnit) hourUnit.textContent = String(hours).padStart(2, '0')
  if (minuteUnit) minuteUnit.textContent = String(minutes).padStart(2, '0')
  if (secondUnit) secondUnit.textContent = String(seconds).padStart(2, '0')
}

updateCountdown()
setInterval(updateCountdown, 1000)

const petals = document.querySelector<HTMLDivElement>('.petals')

for (let index = 0; index < 18; index += 1) {
  const petal = document.createElement('span')
  petal.className = 'petal'
  petal.style.left = `${Math.random() * 100}%`
  petal.style.animationDelay = `${(index * 0.35).toFixed(2)}s`
  petal.style.animationDuration = `${(5 + Math.random() * 6).toFixed(2)}s`
  const size = 10 + Math.random() * 16
  petal.style.width = `${size}px`
  petal.style.height = `${size * 1.2}px`
  petal.style.opacity = `${(0.45 + Math.random() * 0.55).toFixed(2)}`
  petals?.appendChild(petal)
}

const reveals = document.querySelectorAll<HTMLElement>('.reveal')
revealElements()

function revealElements() {
  reveals.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`
    element.classList.add('visible')
  })
}

if (countdownRoot) {
  countdownRoot.setAttribute('aria-live', 'polite')
}
