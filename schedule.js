document.addEventListener("DOMContentLoaded", () => {
    const calendars = [
      {
        monthName: "septembre",
        yearName: "2025",
        startDay: 0,
        totalDays: 30,
        events: {
          15: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] },
          22: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] },
          26: { color: "theme3", items: ["Assemblée générale @ Caserne B, 18h30"] },
          29: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] }
        }
      },
      {
        monthName: "octobre",
        yearName: "2025",
        startDay: 2,
        totalDays: 31,
        events: {
            3: { color: "theme2", items: ["Skatepark @ L'Estacade, 18h30"] },
            6: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] },
            10: { color: "theme2", items: ["Skatepark @ L'Estacade, 18h30"] },
            13: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] },
            17: { color: "theme2", items: ["Skatepark @ L'Estacade, 18h30"] },
            31: { color: "theme31", items: ["Rollerween @ La Garage Moderne, 18h"] }
        }
      },
      {
        monthName: "novembre",
        yearName: "2025",
        startDay: 5,
        totalDays: 30,
        events: {
            3: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] },
            7: { color: "theme2", items: ["Skatepark @ L'Estacade, 18h30"] },
            10: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] },
            14: { color: "theme2", items: ["Skatepark @ L'Estacade, 18h30"] },
            16: { color: "theme3", items: ["Initiation Rollerdance @ TBD"] },
            17: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] },
            21: { color: "theme2", items: ["Skatepark @ L'Estacade, 18h30"] },
            24: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] },
            28: { color: "theme2", items: ["Skatepark @ L'Estacade, 18h30"] },
        }
      },
      {
        monthName: "decembre",
        yearName: "2025",
        startDay: 0,
        totalDays: 31,
        events: {
            1: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] },
            5: { color: "theme2", items: ["Skatepark @ L'Estacade, 18h30"] },
            8: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] },
            12: { color: "theme2", items: ["Skatepark @ L'Estacade, 18h30"] },
            15: { color: "theme1", items: ["Session Libre @ La Cité Bleue, 19h30"] },
            19: { color: "theme2", items: ["Skatepark @ L'Estacade, 18h30"] },
        }
      }
    ];
  
    let currentMonthIndex = 0;
  
    const calendarEl = document.getElementById('calendar');
    const monthTitleEl = document.getElementById('month-title');
    const eventsSummaryEl = document.getElementById('events-summary');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
  
    function renderCalendar(calendar) {
      const { monthName, yearName, startDay, totalDays, events } = calendar;
  
      monthTitleEl.textContent = monthName + " " + yearName;
      calendarEl.innerHTML = "";
      eventsSummaryEl.innerHTML = "";
  
      const daysOfWeek = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
  
      // Headers
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
  
      // Days
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
  
      // Event summary below calendar
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
  
      // Hide/show navigation buttons
      if (currentMonthIndex === 0) {
        prevBtn.classList.add("hidden");
      } else {
        prevBtn.classList.remove("hidden");
      }
  
      if (currentMonthIndex === calendars.length - 1) {
        nextBtn.classList.add("hidden");
      } else {
        nextBtn.classList.remove("hidden");
      }
    }
  
    prevBtn.addEventListener("click", () => {
      if (currentMonthIndex > 0) {
        currentMonthIndex--;
        renderCalendar(calendars[currentMonthIndex]);
      }
    });
  
    nextBtn.addEventListener("click", () => {
      if (currentMonthIndex < calendars.length - 1) {
        currentMonthIndex++;
        renderCalendar(calendars[currentMonthIndex]);
      }
    });
  
    // Initial render
    renderCalendar(calendars[currentMonthIndex]);
  });