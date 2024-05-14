const fs = require('fs');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateAppointments(numDays, numAppointmentsPerDay) {
    const appointments = {};
    const startDate = new Date(); // Date de début
    const validDays = [];
    
    // Exclure les dimanches et ajouter les jours valides à la liste
    for (let i = 0; validDays.length < numDays; i++) {
        const currentDate = new Date(startDate); // Utilisation de la date de début
        currentDate.setDate(startDate.getDate() + i);
        if (currentDate.getDay() !== 0) { // Si ce n'est pas un dimanche
            validDays.push(currentDate);
        }
    }

    for (let i = 0; i < validDays.length; i++) {
        const currentDate = validDays[i];
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        appointments[dateString] = createAppointmentsForDay(dateString, numAppointmentsPerDay);
    }
    return appointments;
}

// Crée un tableau de rendez-vous pris pour une journée donnée
function createAppointmentsForDay(dateString, numAppointments) {
    const appointmentsForDay = [];
    const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00','14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']; // Plages horaires disponibles
    const takenTimes = new Set();
    for (let i = 0; i < numAppointments; i++) {
        let randomTime;
        do {
            randomTime = times[getRandomInt(0, times.length)];
        } while (takenTimes.has(randomTime));
        takenTimes.add(randomTime);
        appointmentsForDay.push({ date: dateString, time: randomTime, taken: true });
    }
    return appointmentsForDay;
}

// Enregistre les rendez-vous dans un fichier appointmentData.js
function saveAppointmentsToFile(numDays, numAppointmentsPerDay) {
    const appointments = generateAppointments(numDays, numAppointmentsPerDay);
    const jsCode = `const appointments = ${JSON.stringify(appointments, null, 4)};\n\nexport default appointments;`;
    fs.writeFileSync('appointmentData.js', jsCode);
    console.log('Les rendez-vous ont été enregistrés dans le fichier appointmentData.js.');
}

// Paramètres pour le nombre de jours et le nombre de rendez-vous par jour
const numDays = 10;
const numAppointmentsPerDay = 13;

saveAppointmentsToFile(numDays, numAppointmentsPerDay);
