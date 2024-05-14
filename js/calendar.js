import appointments from './appointmentData.js';

document.addEventListener('DOMContentLoaded', function() {
   
    function createCalendar() {
        const currentDate = new Date();
        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
    
        const availableDates = [];
        for (let i = 0; i < 60; i++) {
            const date = new Date(currentYear, currentMonth, currentDayOfMonth + i);
            if (date.getDay() !== 0) {
                availableDates.push(date);
            }
        }
    
        let startIndex = 0;
    
        const calendar = document.getElementById('calendar');
        const datesContainer = document.createElement('div');
        datesContainer.classList.add('dates-container');
    
        for (let i = startIndex; i < startIndex + 5 && i < availableDates.length; i++) {
            const day = availableDates[i];
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = day.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
            dayElement.setAttribute('data-date', day.toLocaleDateString('fr-FR'));
            datesContainer.appendChild(dayElement);
        }
        calendar.appendChild(datesContainer);
    
        const numVisibleDates = 6;
    
        const carousel = new Carousel(calendar, availableDates, numVisibleDates, startIndex);
        carousel.init();

        const prevButton = document.getElementById('prev-week');
        const nextButton = document.getElementById('next-week');
        const dateSelected = document.querySelector('.dates-container');
        const timeSelected = document.querySelector('.time-selection');
 
        prevButton.addEventListener('click', function() {
             carousel.prev();
        });
 
        nextButton.addEventListener('click', function() {
             carousel.next();
        });
        dateSelected.addEventListener('click', function(event) {
            if (event.target.classList.contains('day')) {
                const dateString = event.target.getAttribute('data-date');
                const dateParts = dateString.split('/');
                const selectedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        
                carousel.selectDate(event.target);
        
                console.log('Selected date:', selectedDate);
            }
        });
        timeSelected.addEventListener('click', (event) => {
            if (event.target.classList.contains('time')) {
                selectTime(event.target);
            }
        });
    }      
    
    class Carousel {
        constructor(container, availableDates, numvisible, startindex) {
            this.container = container;
            this.availableDates = availableDates;
            this.currentIndex = 0;
            this.startIndex = startindex;
            this.slideWidth = this.container.offsetWidth;
            this.numVisibleDates = numvisible;
        }
    
        init() {
            this.container.style.overflow = 'hidden';
            this.container.style.display = 'flex';
            this.updateDates();
        }
    
        next() {        
            const nextIndex = this.startIndex + this.numVisibleDates;
            if (nextIndex + this.numVisibleDates <= this.availableDates.length) {
                this.startIndex = nextIndex;
                this.updateDates();
            }
        }
        
        prev() {
            if (this.startIndex - this.numVisibleDates >= 0) {
                this.startIndex -= this.numVisibleDates;
                this.updateDates();
            }
        }
        
        updateDates() {
            this.container.innerHTML = '';
            for (let i = 0; i < this.numVisibleDates; i++) {
                const index = this.startIndex + i;
                if (index < this.availableDates.length) {
                    const currentDate = this.availableDates[index];
                    const dayElement = document.createElement('div');
                    dayElement.classList.add('day');
                    dayElement.textContent = currentDate.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
                    dayElement.setAttribute('data-date', currentDate.toLocaleDateString('fr-FR'));
                    this.container.appendChild(dayElement);
                }
            }
            this.update();
        }

        update() {
            const offset = -this.currentIndex * this.slideWidth;
            this.container.style.transform = `translateX(${offset}px)`;
        }

        selectDate(target) {
            const dateString = target.getAttribute('data-date');
            const dateParts = dateString.split('/');
            const selectedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        
            if (!isNaN(selectedDate.getTime())) {
                const selectedDay = document.querySelector('.selected-day');
                if (selectedDay) {
                    selectedDay.classList.remove('selected-day');
                }
                target.classList.add('selected-day');
                this.populateTimeOptions(selectedDate);
            } else {
                console.error("Date invalide :", dateString);
            }
        }    

        selectTime(timeButton) {
            const selectedTime = document.querySelector('.selected-time');
            if (selectedTime) {
                selectedTime.classList.remove('selected-time');
            }
            timeButton.classList.add('selected-time');
        }

        populateTimeOptions(selectedDate) {
            console.log('Selected Date:', selectedDate);
            const timeContainer = document.getElementById('time');
            timeContainer.innerHTML = '';
        
            const availableTimes = this.getAvailableTimes(selectedDate);

            availableTimes.forEach(time => {
                const timeButton = document.createElement('button');
                timeButton.textContent = time;
                timeButton.dataset.date = selectedDate.toISOString();
                timeButton.dataset.time = time;
                timeButton.addEventListener('click', () => this.selectTime(timeButton));
                timeContainer.appendChild(timeButton);
            });
        }
    
        getAvailableTimes(selectedDate) {
            console.log('Selected Date:', selectedDate);
            const openingHours = [
                { startHour: 9, endHour: 13, endMinute: 30 },
                { startHour: 14, endHour: 18, startMinute: 30 } 
            ];
        
            const availableTimes = [];
            openingHours.forEach(({ startHour, startMinute = 0, endHour, endMinute = 0 }) => {
                for (let hour = startHour; hour < endHour; hour++) {
                    for (let minute = startMinute; minute < 60; minute += 30) {
                        availableTimes.push(`${hour < 10 ? '0' + hour : hour}:${minute === 0 ? '00' : minute}`);
                    }
                }
            });
        
            const selectedDateString = selectedDate.toISOString().split('T')[0];
            const appointmentsForDate = appointments[selectedDateString];
            if (appointmentsForDate) {
                appointmentsForDate.forEach(appointment => {
                    const takenTimeIndex = availableTimes.indexOf(appointment.time);
                    if (takenTimeIndex !== -1) {
                        availableTimes.splice(takenTimeIndex, 1);
                    }
                });
            }
        
            return availableTimes;
        }                 
    }

    document.getElementById('submit-appointment').addEventListener('click', function() {
        const consultationTypeSelect = document.getElementById('consultation-type');
        const selectedConsultationType = consultationTypeSelect.value;
        console.log('Consultation Type:', selectedConsultationType);
    });

    createCalendar();

    const cardLinks = document.querySelectorAll('.card-link');
    let selectedDoctor = "";

    cardLinks.forEach(cardLink => {
        cardLink.addEventListener('click', function(event) {
            event.preventDefault();

            const drName = this.getAttribute('data-name');
            selectedDoctor = drName;

            console.log('Nom du docteur sélectionné :', drName);

        });
    });
    const submitButton = document.getElementById('submit-appointment');
        submitButton.addEventListener('click', function() {
            const consultationType = document.getElementById('consultation-type').value;
            const selectedDate = document.querySelector('.selected-day').getAttribute('data-date');
            const selectedTime = document.querySelector('.selected-time').getAttribute('data-time');

            const confirmationMessage = `Vous avez pris rendez-vous pour une ${consultationType} le ${selectedDate} à ${selectedTime} avec ${selectedDoctor}.`;

            alert(confirmationMessage);
    });
    
});