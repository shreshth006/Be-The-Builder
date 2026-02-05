"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Personality gradient classes
const gradients = [
  "gradient-orange",
  "gradient-purple",
  "gradient-cyan",
  "gradient-pink",
  "gradient-lime",
  "gradient-gold",
  "gradient-teal",
  "gradient-red",
  "gradient-indigo",
  "gradient-amber",
  "gradient-emerald",
  "gradient-coral",
]

// Sample Data with gradient assignments
const membersData = [
  { name: "Arjun Kumar", role: "President", status: "online", gradient: "gradient-gold" },
  { name: "Priya Sharma", role: "Vice President", status: "online", gradient: "gradient-purple" },
  { name: "Rahul Menon", role: "Tech Lead", status: "online", gradient: "gradient-cyan" },
  { name: "Ananya Reddy", role: "Event Coordinator", status: "away", gradient: "gradient-pink" },
  { name: "Vikram Singh", role: "Design Head", status: "online", gradient: "gradient-orange" },
  { name: "Sneha Patel", role: "Content Lead", status: "online", gradient: "gradient-teal" },
  { name: "Karthik Iyer", role: "Web Developer", status: "online", gradient: "gradient-lime" },
  { name: "Meera Nair", role: "ML Lead", status: "away", gradient: "gradient-coral" },
  { name: "Aditya Rao", role: "App Developer", status: "online", gradient: "gradient-indigo" },
  { name: "Divya Krishna", role: "Cloud Lead", status: "online", gradient: "gradient-emerald" },
  { name: "Rohan Verma", role: "Security Head", status: "online", gradient: "gradient-red" },
  { name: "Ishita Gupta", role: "Member", status: "online", gradient: "gradient-amber" },
]

const initialMessages = [
  {
    sender: "Arjun Kumar",
    text: "Hey everyone! Welcome to the ACM-VIT chat room!",
    time: "10:30 AM",
    gradient: "gradient-gold",
    status: "online",
  },
  {
    sender: "Priya Sharma",
    text: "Excited for the upcoming hackathon next week!",
    time: "10:32 AM",
    gradient: "gradient-purple",
    status: "online",
  },
  {
    sender: "Rahul Menon",
    text: "The new workshop series on React is going to be amazing. Make sure to register!",
    time: "10:35 AM",
    gradient: "gradient-cyan",
    status: "online",
  },
  {
    sender: "Sneha Patel",
    text: "Just finished the poster designs for the tech talk. Will share them in the files section.",
    time: "10:40 AM",
    gradient: "gradient-teal",
    status: "online",
  },
  {
    sender: "Vikram Singh",
    text: "Looking great Sneha! The color scheme matches our brand perfectly.",
    time: "10:42 AM",
    gradient: "gradient-orange",
    status: "online",
  },
  {
    sender: "Karthik Iyer",
    text: "Anyone up for a coding session tonight? Working on the club website updates.",
    time: "10:45 AM",
    gradient: "gradient-lime",
    status: "online",
  },
  {
    sender: "You",
    text: "Count me in! What time were you thinking?",
    time: "10:47 AM",
    gradient: "gradient-emerald",
    own: true,
    status: "online",
  },
]

const eventsData = [
  {
    date: new Date(2026, 1, 7),
    title: "React Workshop",
    description: "Learn React hooks and state management",
    type: "workshop",
  },
  { date: new Date(2026, 1, 10), title: "Code Sprint", description: "24-hour coding challenge", type: "hackathon" },
  {
    date: new Date(2026, 1, 14),
    title: "Valentine's Tech Talk",
    description: "Love in the age of AI",
    type: "talk",
  },
  {
    date: new Date(2026, 1, 18),
    title: "Team Meeting",
    description: "Monthly planning and review",
    type: "meeting",
  },
  {
    date: new Date(2026, 1, 22),
    title: "Cloud Workshop",
    description: "AWS fundamentals and deployment",
    type: "workshop",
  },
  {
    date: new Date(2026, 1, 25),
    title: "Hackathon Prep",
    description: "Prepare for inter-college hackathon",
    type: "meeting",
  },
  {
    date: new Date(2026, 1, 28),
    title: "ML Study Group",
    description: "Neural networks deep dive",
    type: "workshop",
  },
  {
    date: new Date(2026, 2, 5),
    title: "Spring Hackathon",
    description: "48-hour innovation challenge",
    type: "hackathon",
  },
  { date: new Date(2026, 2, 12), title: "Industry Connect", description: "Guest speaker from Google", type: "talk" },
  {
    date: new Date(2026, 2, 20),
    title: "Open Source Day",
    description: "Contribute to open source projects",
    type: "workshop",
  },
]

interface Message {
  sender: string
  text: string
  time: string
  gradient: string
  status?: string
  own?: boolean
}

export default function ACMMessenger() {
  const [leftPanelMinimized, setLeftPanelMinimized] = useState(false)
  const [currentView, setCurrentView] = useState<"chat" | "dashboard">("chat")
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [messageInput, setMessageInput] = useState("")
  const [memberSearch, setMemberSearch] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1))
  const chatMessagesRef = useRef<HTMLDivElement>(null)

  const onlineCount = membersData.filter((m) => m.status === "online").length

  const filteredMembers = membersData.filter(
    (member) =>
      member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.role.toLowerCase().includes(memberSearch.toLowerCase())
  )

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    const text = messageInput.trim()
    if (text) {
      const now = new Date()
      const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })

      const newMessage: Message = {
        sender: "You",
        text: text,
        time: time,
        gradient: "gradient-emerald",
        own: true,
        status: "online",
      }

      setMessages((prev) => [...prev, newMessage])
      setMessageInput("")

      // Simulate response
      setTimeout(() => {
        const responses = [
          {
            sender: "Arjun Kumar",
            text: "That sounds great! Looking forward to it!",
            gradient: "gradient-gold",
            status: "online",
          },
          {
            sender: "Priya Sharma",
            text: "Awesome! Let's make it happen!",
            gradient: "gradient-purple",
            status: "online",
          },
          {
            sender: "Rahul Menon",
            text: "Perfect! I'll prepare the dev environment.",
            gradient: "gradient-cyan",
            status: "online",
          },
        ]
        const response = responses[Math.floor(Math.random() * responses.length)]
        const responseTime = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })

        setMessages((prev) => [...prev, { ...response, time: responseTime }])
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const renderCalendar = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
    const startPadding = firstDay.getDay()
    const totalDays = lastDay.getDate()
    const today = new Date(2026, 1, 4)

    const days = []

    // Previous month padding
    const prevMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate()
    for (let i = startPadding - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="cal-day other-month">
          {prevMonthLastDay - i}
        </div>
      )
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const isToday = currentDate.toDateString() === today.toDateString()
      const hasEvent = eventsData.some((e) => e.date.toDateString() === currentDate.toDateString())

      let classes = "cal-day"
      if (isToday) classes += " today"
      if (hasEvent) classes += " has-event"

      days.push(
        <div key={`day-${day}`} className={classes} onClick={() => selectDate(day)}>
          {day}
        </div>
      )
    }

    // Next month padding
    const endPadding = 42 - (startPadding + totalDays)
    for (let i = 1; i <= endPadding; i++) {
      days.push(
        <div key={`next-${i}`} className="cal-day other-month">
          {i}
        </div>
      )
    }

    return days
  }

  const selectDate = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dayEvents = eventsData.filter((e) => e.date.toDateString() === selectedDate.toDateString())

    if (dayEvents.length > 0) {
      alert(
        `Events on ${selectedDate.toLocaleDateString()}:\n\n${dayEvents.map((e) => `• ${e.title}: ${e.description}`).join("\n")}`
      )
    }
  }

  const changeMonth = (delta: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1))
  }

  const getMonthEvents = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
    return eventsData
      .filter((e) => e.date >= monthStart && e.date <= monthEnd)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  return (
    <div className="app-wrapper">
      {/* Y2K Decorative bubbles */}
      <div className="aero-bubbles">
        <div className="bubble b1"></div>
        <div className="bubble b2"></div>
        <div className="bubble b3"></div>
      </div>

      <div className="app-container">
        {/* Left Panel */}
        <div className={`panel left-panel ${leftPanelMinimized ? "minimized" : ""}`}>
          <div className="panel-header">
            <div className="window-controls">
              <button
                className="window-btn minimize-btn"
                onClick={() => setLeftPanelMinimized(true)}
                title="Minimize"
              >
                <Image src="/icons/minimize_window.png" alt="-" width={16} height={16} style={{ width: "auto", height: "auto" }} />
              </button>
              <button className="window-btn maximize-btn" title="Maximize">
                <Image src="/icons/windows_maximized.png" alt="[]" width={16} height={16} style={{ width: "auto", height: "auto" }} />
              </button>
              <button className="window-btn close-btn" title="Close">
                <Image src="/icons/Close_window.png" alt="x" width={16} height={16} style={{ width: "auto", height: "auto" }} />
              </button>
            </div>
            <Image src="/icons/window.png" alt="" className="title-icon" width={16} height={16} />
            <span className="panel-title">ACM-VIT Messenger</span>
          </div>
          <div className="panel-content">
            <div className="user-profile">
              <div className="avatar-container">
                <div className="avatar online">
                  <Image src="/icons/user.png" alt="Profile" width={44} height={44} />
                </div>
                <span className="status-indicator"></span>
              </div>
              <div className="user-info">
                <span className="username">ACM Member</span>
                <div className="status-dropdown">
                  <span className="status-dot-small online"></span>
                  <span className="status-text">Online</span>
                  <span className="dropdown-arrow">{"▼"}</span>
                </div>
              </div>
            </div>

            <nav className="menu-nav">
              <a
                href="#"
                className={`nav-item ${currentView === "chat" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentView("chat")
                }}
              >
                <span className="nav-icon">{"💬"}</span>
                <span>Conversations</span>
              </a>
              <a
                href="#"
                className={`nav-item ${currentView === "dashboard" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentView("dashboard")
                }}
              >
                <span className="nav-icon">{"📅"}</span>
                <span>Dashboard</span>
              </a>
              <a href="#" className="nav-item">
                <span className="nav-icon">{"👥"}</span>
                <span>Contacts</span>
              </a>
              <a href="#" className="nav-item">
                <span className="nav-icon">{"🕐"}</span>
                <span>Recent</span>
              </a>
            </nav>

            <div className="quick-contacts">
              <h3>Quick Contacts</h3>
              <div className="contact-item">
                <div className="contact-avatar gradient-gold online">
                  <Image src="/icons/user.png" alt="" width={24} height={24} />
                </div>
                <span>Arjun K.</span>
              </div>
              <div className="contact-item">
                <div className="contact-avatar gradient-pink away">
                  <Image src="/icons/user.png" alt="" width={24} height={24} />
                </div>
                <span>Ananya R.</span>
              </div>
              <div className="contact-item">
                <div className="contact-avatar gradient-cyan online">
                  <Image src="/icons/user.png" alt="" width={24} height={24} />
                </div>
                <span>Rahul M.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimized Left Panel Toggle */}
        {leftPanelMinimized && (
          <button className="panel-toggle left-toggle" onClick={() => setLeftPanelMinimized(false)}>
            <span>{"☰"}</span>
          </button>
        )}

        {/* Main Content Area */}
        <div className="main-content">
          {/* Chat View */}
          {currentView === "chat" && (
            <div className="chat-view">
              <div className="chat-header">
                <div className="chat-room-info">
                  <h2>{"🚀"} ACM-VIT General Chat</h2>
                  <span className="room-description">Welcome to the official ACM-VIT chat room!</span>
                </div>
              </div>
              <div className="chat-messages" ref={chatMessagesRef}>
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.own ? "own" : ""}`}>
                    <div className={`message-avatar ${msg.gradient}`}>
                      <Image
                        src="/icons/user.png"
                        alt={msg.sender}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="message-content">
                      <span className="message-sender">{msg.sender}</span>
                      <p className="message-text">{msg.text}</p>
                      <span className="message-time">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="chat-input-area">
                <div className="input-toolbar">
                  <button className="toolbar-btn emoticon-btn" title="Emoticons">
                    {"😊"}
                  </button>
                  <button className="toolbar-btn" title="Send File">
                    {"📎"}
                  </button>
                  <button className="toolbar-btn" title="Send Video Message">
                    {"🎥"}
                  </button>
                  <button className="toolbar-btn" title="Voice Message">
                    {"🎤"}
                  </button>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                  />
                  <button className="send-btn" onClick={sendMessage}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard View */}
          {currentView === "dashboard" && (
            <div className="dashboard-view">
              <div className="dashboard-header">
                <h2>{"📅"} ACM-VIT Dashboard</h2>
                <span className="dashboard-subtitle">Events & Activities Calendar</span>
              </div>
              <div className="dashboard-content">
                <div className="calendar-container">
                  <div className="calendar-header-nav">
                    <button className="cal-nav-btn" onClick={() => changeMonth(-1)}>
                      {"◀"}
                    </button>
                    <h3>
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button className="cal-nav-btn" onClick={() => changeMonth(1)}>
                      {"▶"}
                    </button>
                  </div>
                  <div className="calendar-grid">
                    <div className="cal-day-header">Sun</div>
                    <div className="cal-day-header">Mon</div>
                    <div className="cal-day-header">Tue</div>
                    <div className="cal-day-header">Wed</div>
                    <div className="cal-day-header">Thu</div>
                    <div className="cal-day-header">Fri</div>
                    <div className="cal-day-header">Sat</div>
                    {renderCalendar()}
                  </div>
                </div>
                <div className="events-panel">
                  <h3>{"📌"} Upcoming Events</h3>
                  <div className="events-list">
                    {getMonthEvents().length === 0 ? (
                      <p style={{ color: "#888", textAlign: "center", padding: "20px" }}>No events this month</p>
                    ) : (
                      getMonthEvents().map((event, index) => (
                        <div key={index} className={`event-item ${event.type}`}>
                          <span className="event-date">
                            {event.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                          </span>
                          <h4 className="event-title">{event.title}</h4>
                          <p className="event-description">{event.description}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Participants */}
        <div className="panel right-panel">
          <div className="panel-header">
            <span className="panel-title">Online Members</span>
            <span className="member-count">{onlineCount} Online</span>
          </div>
          <div className="panel-content">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search members..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
              />
            </div>
            <div className="members-list">
              {filteredMembers.map((member, index) => (
                <div key={index} className="member-item">
                  <div className={`member-avatar ${member.gradient} ${member.status === "away" ? "away" : ""}`}>
                    <Image
                      src="/icons/user.png"
                      alt={member.name}
                      width={28}
                      height={28}
                    />
                    <span className="status-dot"></span>
                  </div>
                  <div className="member-info">
                    <span className="member-name">{member.name}</span>
                    <span className="member-role">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
