// ACM-VIT Chat Room Application

// Personality gradient classes
const gradients = [
    'gradient-orange', 'gradient-purple', 'gradient-cyan', 'gradient-pink',
    'gradient-lime', 'gradient-gold', 'gradient-teal', 'gradient-red',
    'gradient-indigo', 'gradient-amber', 'gradient-emerald', 'gradient-coral'
];

// Sample Data with gradient assignments
const members = [
    { name: 'Arjun Kumar', role: 'President', status: 'online', gradient: 'gradient-gold' },
    { name: 'Priya Sharma', role: 'Vice President', status: 'online', gradient: 'gradient-purple' },
    { name: 'Rahul Menon', role: 'Tech Lead', status: 'online', gradient: 'gradient-cyan' },
    { name: 'Ananya Reddy', role: 'Event Coordinator', status: 'away', gradient: 'gradient-pink' },
    { name: 'Vikram Singh', role: 'Design Head', status: 'online', gradient: 'gradient-orange' },
    { name: 'Sneha Patel', role: 'Content Lead', status: 'online', gradient: 'gradient-teal' },
    { name: 'Karthik Iyer', role: 'Web Developer', status: 'online', gradient: 'gradient-lime' },
    { name: 'Meera Nair', role: 'ML Lead', status: 'away', gradient: 'gradient-coral' },
    { name: 'Aditya Rao', role: 'App Developer', status: 'online', gradient: 'gradient-indigo' },
    { name: 'Divya Krishna', role: 'Cloud Lead', status: 'online', gradient: 'gradient-emerald' },
    { name: 'Rohan Verma', role: 'Security Head', status: 'online', gradient: 'gradient-red' },
    { name: 'Ishita Gupta', role: 'Member', status: 'online', gradient: 'gradient-amber' }
];

const sampleMessages = [
    { sender: 'Arjun Kumar', text: 'Hey everyone! Welcome to the ACM-VIT chat room! 🎉', time: '10:30 AM', gradient: 'gradient-gold', status: 'online' },
    { sender: 'Priya Sharma', text: 'Excited for the upcoming hackathon next week!', time: '10:32 AM', gradient: 'gradient-purple', status: 'online' },
    { sender: 'Rahul Menon', text: 'The new workshop series on React is going to be amazing. Make sure to register!', time: '10:35 AM', gradient: 'gradient-cyan', status: 'online' },
    { sender: 'Sneha Patel', text: 'Just finished the poster designs for the tech talk. Will share them in the files section.', time: '10:40 AM', gradient: 'gradient-teal', status: 'online' },
    { sender: 'Vikram Singh', text: 'Looking great Sneha! 👏 The color scheme matches our brand perfectly.', time: '10:42 AM', gradient: 'gradient-orange', status: 'online' },
    { sender: 'Karthik Iyer', text: 'Anyone up for a coding session tonight? Working on the club website updates.', time: '10:45 AM', gradient: 'gradient-lime', status: 'online' },
    { sender: 'You', text: 'Count me in! What time were you thinking?', time: '10:47 AM', gradient: 'gradient-emerald', own: true, status: 'online' }
];

const events = [
    { date: new Date(2026, 1, 7), title: 'React Workshop', description: 'Learn React hooks and state management', type: 'workshop' },
    { date: new Date(2026, 1, 10), title: 'Code Sprint', description: '24-hour coding challenge', type: 'hackathon' },
    { date: new Date(2026, 1, 14), title: 'Valentine\'s Tech Talk', description: 'Love in the age of AI', type: 'talk' },
    { date: new Date(2026, 1, 18), title: 'Team Meeting', description: 'Monthly planning and review', type: 'meeting' },
    { date: new Date(2026, 1, 22), title: 'Cloud Workshop', description: 'AWS fundamentals and deployment', type: 'workshop' },
    { date: new Date(2026, 1, 25), title: 'Hackathon Prep', description: 'Prepare for inter-college hackathon', type: 'meeting' },
    { date: new Date(2026, 1, 28), title: 'ML Study Group', description: 'Neural networks deep dive', type: 'workshop' },
    { date: new Date(2026, 2, 5), title: 'Spring Hackathon', description: '48-hour innovation challenge', type: 'hackathon' },
    { date: new Date(2026, 2, 12), title: 'Industry Connect', description: 'Guest speaker from Google', type: 'talk' },
    { date: new Date(2026, 2, 20), title: 'Open Source Day', description: 'Contribute to open source projects', type: 'workshop' }
];

let currentMonth = new Date(2026, 1, 1); // February 2026

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    renderMembers();
    renderMessages();
    renderCalendar();
    renderEvents();
});

// Render Members List with custom icons
function renderMembers() {
    const membersList = document.getElementById('membersList');
    const onlineCount = members.filter(m => m.status === 'online').length;
    document.getElementById('memberCount').textContent = `${onlineCount} Online`;
    
    membersList.innerHTML = members.map(member => {
        // Use user.png for online, user_sleep.png for away/offline
        const iconSrc = member.status === 'online' ? 'icons/user.png' : 'icons/user_sleep.png';
        const statusClass = member.status === 'away' ? 'away' : '';
        
        return `
            <div class="member-item">
                <div class="member-avatar ${member.gradient} ${statusClass}">
                    <img src="${iconSrc}" alt="${member.name}">
                    <span class="status-dot"></span>
                </div>
                <div class="member-info">
                    <span class="member-name">${member.name}</span>
                    <span class="member-role">${member.role}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Filter Members
function filterMembers() {
    const searchTerm = document.getElementById('memberSearch').value.toLowerCase();
    const items = document.querySelectorAll('.member-item');
    
    items.forEach(item => {
        const name = item.querySelector('.member-name').textContent.toLowerCase();
        const role = item.querySelector('.member-role').textContent.toLowerCase();
        if (name.includes(searchTerm) || role.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Render Messages with custom icons
function renderMessages() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = sampleMessages.map(msg => {
        const iconSrc = msg.status === 'online' ? 'icons/user.png' : 'icons/user_sleep.png';
        return `
            <div class="message ${msg.own ? 'own' : ''}">
                <div class="message-avatar ${msg.gradient}">
                    <img src="${iconSrc}" alt="${msg.sender}">
                </div>
                <div class="message-content">
                    <span class="message-sender">${msg.sender}</span>
                    <p class="message-text">${msg.text}</p>
                    <span class="message-time">${msg.time}</span>
                </div>
            </div>
        `;
    }).join('');
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send Message
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (text) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        
        sampleMessages.push({
            sender: 'You',
            text: text,
            time: time,
            seed: 'acm',
            own: true
        });
        
        renderMessages();
        input.value = '';
        
        // Simulate response after a short delay
        setTimeout(() => {
            const responses = [
                { sender: 'Arjun Kumar', text: 'That sounds great! Looking forward to it! 🚀', gradient: 'gradient-gold', status: 'online' },
                { sender: 'Priya Sharma', text: 'Awesome! Let\'s make it happen! 💪', gradient: 'gradient-purple', status: 'online' },
                { sender: 'Rahul Menon', text: 'Perfect! I\'ll prepare the dev environment.', gradient: 'gradient-cyan', status: 'online' }
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            const responseTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
            
            sampleMessages.push({
                ...response,
                time: responseTime
            });
            
            renderMessages();
        }, 1500);
    }
}

// Handle Enter Key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Toggle Left Panel
function toggleLeftPanel() {
    const leftPanel = document.getElementById('leftPanel');
    const leftToggle = document.getElementById('leftToggle');
    
    leftPanel.classList.toggle('minimized');
    leftToggle.classList.toggle('hidden');
}

// Show Chat View
function showChat() {
    document.getElementById('chatView').classList.remove('hidden');
    document.getElementById('dashboardView').classList.add('hidden');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.target.closest('.nav-item').classList.add('active');
}

// Show Dashboard View
function showDashboard() {
    document.getElementById('chatView').classList.add('hidden');
    document.getElementById('dashboardView').classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.target.closest('.nav-item').classList.add('active');
}

// Render Calendar
function renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    document.getElementById('calendarMonth').textContent = 
        `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
    
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startPadding = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    const today = new Date(2026, 1, 4); // Current date: Feb 4, 2026
    
    let daysHtml = '';
    
    // Previous month padding
    const prevMonthLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
    for (let i = startPadding - 1; i >= 0; i--) {
        daysHtml += `<div class="cal-day other-month">${prevMonthLastDay - i}</div>`;
    }
    
    // Current month days
    for (let day = 1; day <= totalDays; day++) {
        const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isToday = currentDate.toDateString() === today.toDateString();
        const hasEvent = events.some(e => e.date.toDateString() === currentDate.toDateString());
        
        let classes = 'cal-day';
        if (isToday) classes += ' today';
        if (hasEvent) classes += ' has-event';
        
        daysHtml += `<div class="${classes}" onclick="selectDate(${day})">${day}</div>`;
    }
    
    // Next month padding
    const endPadding = 42 - (startPadding + totalDays);
    for (let i = 1; i <= endPadding; i++) {
        daysHtml += `<div class="cal-day other-month">${i}</div>`;
    }
    
    document.getElementById('calendarDays').innerHTML = daysHtml;
    
    // Fix grid layout
    const calendarGrid = document.querySelector('.calendar-grid');
    const daysContainer = document.getElementById('calendarDays');
    daysContainer.style.display = 'contents';
}

// Change Month
function changeMonth(delta) {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1);
    renderCalendar();
    renderEvents();
}

// Select Date
function selectDate(day) {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dayEvents = events.filter(e => e.date.toDateString() === selectedDate.toDateString());
    
    if (dayEvents.length > 0) {
        alert(`Events on ${selectedDate.toLocaleDateString()}:\n\n${dayEvents.map(e => `• ${e.title}: ${e.description}`).join('\n')}`);
    }
}

// Render Events
function renderEvents() {
    const eventsList = document.getElementById('eventsList');
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    const monthEvents = events.filter(e => e.date >= monthStart && e.date <= monthEnd)
                              .sort((a, b) => a.date - b.date);
    
    if (monthEvents.length === 0) {
        eventsList.innerHTML = '<p style="color: #888; text-align: center; padding: 20px;">No events this month</p>';
        return;
    }
    
    eventsList.innerHTML = monthEvents.map(event => `
        <div class="event-item ${event.type}">
            <span class="event-date">${event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            <h4 class="event-title">${event.title}</h4>
            <p class="event-description">${event.description}</p>
        </div>
    `).join('');
}

// Add some interactivity to the marble panels
document.querySelectorAll('.panel').forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
        const rect = panel.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        panel.style.backgroundPosition = `${x}% ${y}%`;
    });
});
