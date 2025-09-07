document.addEventListener("DOMContentLoaded", () => {
    const calendar1 = {
        monthName: "septembre",
        yearName: "2025",
        startDay: 0, // 0 = monday
        totalDays: 30,
        events: {
          15: { color: "theme1", items: ["Session Libre @ La Cité Bleue"] },
          22: { color: "theme1", items: ["Session Libre @ La Cité Bleue"] },
          26: { color: "theme2", items: ["Assemblée générale"] },
          29: { color: "theme1", items: ["Session Libre @ La Cité Bleue"] }
        }
      };
      // 26: { color: "red", items: ["Session Libre", "Balade"] },
  
    const calendarEl = document.getElementById('calendar');
    const monthTitleEl = document.getElementById('month-title');
    const eventsSummaryEl = document.getElementById('events-summary');
  
    function renderCalendar(calendar1) {
      const { monthName, yearName, startDay, totalDays, events } = calendar1;
  
      monthTitleEl.textContent = monthName + " " + yearName;
      calendarEl.innerHTML = "";
      eventsSummaryEl.innerHTML = "";
  
      const daysOfWeek = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
  
      // Render headers
      daysOfWeek.forEach(day => {
        const header = document.createElement('div');
        header.className = 'day-header';
        header.textContent = day;
        calendarEl.appendChild(header);
      });
  
      // Empty cells before first day
      for (let i = 0; i < startDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'day';
        calendarEl.appendChild(empty);
      }
  
      // Render days
      for (let day = 1; day <= totalDays; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'day';
  
        const numberEl = document.createElement('div');
        numberEl.className = 'day-number';
        numberEl.textContent = String(day).padStart(2, '0');
        dayEl.appendChild(numberEl);
  
        if (events[day]) {
          const eventData = events[day];
          dayEl.classList.add("event-day", eventData.color);
  
          // Render inside calendar (desktop only)
          const insideEvents = document.createElement('div');
          insideEvents.className = 'desktop-events';
          eventData.items.forEach(item => {
            const e = document.createElement('div');
            e.className = 'event';
            e.textContent = item;
            insideEvents.appendChild(e);
          });
          dayEl.appendChild(insideEvents);
        }
  
        calendarEl.appendChild(dayEl);
      }
  
      // Render below-calendar event list (mobile only)
      for (const [day, eventData] of Object.entries(events)) {
        const dayNum = parseInt(day);
        const container = document.createElement('div');
        container.className = 'event-item';
  
        const label = document.createElement('span');
        label.className = 'event-day-label';
        label.textContent = `${dayNum} ${monthName}:`;
  
        const eventText = document.createElement('span');
        eventText.textContent = eventData.items.join(', ');
  
        container.appendChild(label);
        container.appendChild(eventText);
        eventsSummaryEl.appendChild(container);
      }
    }
  
    renderCalendar(calendar1);
  });
  