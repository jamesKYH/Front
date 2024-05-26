document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendar-container');
    const eventListContainer = document.getElementById('event-list');
    const userEventListContainer = document.getElementById('user-event-list');
    const eventList = document.getElementById('event-list-ul');
    const userEventList = document.getElementById('user-event-list-ul');
    const addEventButton = document.getElementById('add-event-button');
    const addEventModal = document.getElementById('add-event-modal');
    const closeEventModalButton = addEventModal.querySelector('.close-button');
    const eventForm = document.getElementById('event-form');
    const eventDateInput = document.getElementById('event-date');
    const eventTimeInput = document.getElementById('event-time');
    const eventDescriptionInput = document.getElementById('event-description');
    const showUpcomingEventsCheckbox = document.getElementById('show-upcoming-events');
    const showUserEventsCheckbox = document.getElementById('show-user-events');
    const messageContainer = document.getElementById('message-container');

    // 기본 일정
    let defaultEvents = {
        '2024-06-06': { description: '현충일', type: 'default' },
        '2024-06-25': { description: '창립 기념일', type: 'default' }
    };

    // 로컬 스토리지에서 이벤트 불러오기
    function loadEvents() {
        const savedEvents = localStorage.getItem('events');
        if (savedEvents) {
            return JSON.parse(savedEvents);
        } else {
            return { ...defaultEvents };
        }
    }

    // 이벤트 저장하기
    function saveEvents(events) {
        localStorage.setItem('events', JSON.stringify(events));
    }

    let events = loadEvents();

    // 특정 날짜의 이벤트를 불러오는 함수
    function getEvent(dateTime) {
        return events[dateTime] ? events[dateTime].description : '';
    }

    // 일정을 표시하는 함수
    function displayEvents() {
        const upcomingEvents = Object.entries(events).filter(([dateTime, event]) => {
            const [date] = dateTime.split(' ');
            return new Date(date) >= new Date() && event.type === 'default';
        }).sort(([dateTimeA], [dateTimeB]) => new Date(dateTimeA) - new Date(dateTimeB));

        eventList.innerHTML = '';
        if (upcomingEvents.length > 0) {
            upcomingEvents.forEach(([dateTime, event]) => {
                const [date] = dateTime.split(' ');
                const li = document.createElement('li');
                li.textContent = `${date}: ${event.description}`;
                eventList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = '다가오는 일정이 없습니다.';
            eventList.appendChild(li);
        }

        const userEvents = Object.entries(events).filter(([dateTime, event]) => {
            return event.type === 'user';
        }).sort(([dateTimeA], [dateTimeB]) => new Date(dateTimeA) - new Date(dateTimeB));

        userEventList.innerHTML = '';
        if (userEvents.length > 0) {
            userEvents.forEach(([dateTime, event]) => {
                const [date, time] = dateTime.split(' ');
                const li = document.createElement('li');
                li.textContent = `${date} ${time}: ${event.description}`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '삭제';
                deleteButton.addEventListener('click', function () {
                    deleteEvent(dateTime);
                });
                li.appendChild(deleteButton);
                userEventList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = '사용자 추가 일정이 없습니다.';
            userEventList.appendChild(li);
        }

        if (!showUpcomingEventsCheckbox.checked && !showUserEventsCheckbox.checked) {
            messageContainer.style.display = 'block';
            eventListContainer.style.display = 'none';
            userEventListContainer.style.display = 'none';
        } else {
            messageContainer.style.display = 'none';
            eventListContainer.style.display = showUpcomingEventsCheckbox.checked ? 'block' : 'none';
            userEventListContainer.style.display = showUserEventsCheckbox.checked ? 'block' : 'none';
        }
    }

    // 이벤트 삭제 함수
    function deleteEvent(dateTime) {
        delete events[dateTime];
        saveEvents(events);
        displayCalendars();
        displayEvents();
    }

    function generateCalendar(year, month) {
        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월",
            "7월", "8월", "9월", "10월", "11월", "12월"];
        const daysInWeek = ["일", "월", "화", "수", "목", "금", "토"];

        let firstDay = new Date(year, month, 1).getDay();
        let lastDate = new Date(year, month + 1, 0).getDate();
        let today = new Date();

        let calendarHtml = `<div class="calendar-month"><h3>${monthNames[month]} ${year}</h3>`;
        calendarHtml += '<table><thead><tr>';
        for (let day of daysInWeek) {
            calendarHtml += `<th>${day}</th>`;
        }
        calendarHtml += '</tr></thead><tbody><tr>';

        for (let i = 0; i < firstDay; i++) {
            calendarHtml += '<td></td>';
        }

        for (let date = 1; date <= lastDate; date++) {
            if ((firstDay + date - 1) % 7 === 0) {
                calendarHtml += '</tr><tr>';
            }
            let className = '';
            let fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
            let isDefault = false;
            let isUser = false;
            for (let dateTime in events) {
                const [eventDate] = dateTime.split(' ');
                if (fullDate === eventDate) {
                    if (events[dateTime].type === 'default' && showUpcomingEventsCheckbox.checked) {
                        isDefault = true;
                    }
                    if (events[dateTime].type === 'user' && showUserEventsCheckbox.checked) {
                        isUser = true;
                    }
                }
            }
            if (isDefault && isUser) {
                className = 'half-highlight-day';
            } else if (isDefault) {
                className = 'highlight-day';
            } else if (isUser) {
                className = 'user-added-event';
            }
            if (year === today.getFullYear() && month === today.getMonth() && date === today.getDate()) {
                className += ' current-day';
            }
            calendarHtml += `<td class="${className}" data-date="${fullDate}">${date}</td>`;
        }

        calendarHtml += '</tr></tbody></table></div>';
        return calendarHtml;
    }

    function displayCalendars() {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        let calendarHtml = '';
        for (let i = -1; i <= 1; i++) {
            const monthDate = new Date(currentYear, currentMonth + i);
            const year = monthDate.getFullYear();
            const month = monthDate.getMonth();
            calendarHtml += generateCalendar(year, month);
        }

        calendarContainer.innerHTML = calendarHtml;

        // 날짜 클릭 이벤트 추가
        const dateCells = calendarContainer.querySelectorAll('td[data-date]');
        dateCells.forEach(cell => {
            cell.addEventListener('click', function () {
                const date = this.getAttribute('data-date');
                alert(getEvent(date));
            });
        });
    }

    addEventButton.addEventListener('click', function () {
        addEventModal.style.display = 'block';
    });

    closeEventModalButton.addEventListener('click', function () {
        addEventModal.style.display = 'none';
    });

    eventForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const date = eventDateInput.value;
        const time = eventTimeInput.value;
        const description = eventDescriptionInput.value;
        const dateTime = `${date} ${time}`;
        if (date && time && description) {
            events[dateTime] = { description: description, time: time, type: 'user' };
            saveEvents(events);
            displayCalendars();
            displayEvents();
            addEventModal.style.display = 'none';
            eventForm.reset();
        }
    });

    showUpcomingEventsCheckbox.addEventListener('change', function () {
        displayEvents();
        displayCalendars();
    });

    showUserEventsCheckbox.addEventListener('change', function () {
        displayEvents();
        displayCalendars();
    });

    displayCalendars();
    displayEvents();
});
