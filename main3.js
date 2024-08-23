// Defina a data e hora de início no formato 'YYYY-MM-DDTHH:MM:SS'
const startDateTime = new Date('2024-07-23T00:00:00');

function updateTimer() {
    const currentTime = new Date();
    
    function calculateTimeDifference(start, end) {
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();
        let hours = end.getHours() - start.getHours();
        let minutes = end.getMinutes() - start.getMinutes();
        let seconds = end.getSeconds() - start.getSeconds();
        
        // Ajusta os segundos, minutos e horas
        if (seconds < 0) {
            minutes--;
            seconds += 60;
        }
        if (minutes < 0) {
            hours--;
            minutes += 60;
        }
        if (hours < 0) {
            days--;
            hours += 24;
        }

        // Ajusta os dias e meses
        if (days < 0) {
            const lastMonthDate = new Date(end.getFullYear(), end.getMonth(), 0);
            days += lastMonthDate.getDate(); // Obtém o número de dias do mês anterior
            months--;
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        return {
            years,
            months,
            days,
            hours,
            minutes,
            seconds
        };
    }

    const endDate = new Date(currentTime);
    const timeDiff = calculateTimeDifference(startDateTime, endDate);

    function formatUnit(value, unit) {
        if (unit === 'Mês') {
            return value > 1 ? `${value} Meses` : `${value} Mês`;
        }
        return value > 1 ? `${value} ${unit}s` : `${value} ${unit}`;
    }

    let timeString = '';
    if (timeDiff.years > 0) timeString += formatUnit(timeDiff.years, 'Ano') + ' ';
    if (timeDiff.months > 0) timeString += formatUnit(timeDiff.months, 'Mês') + ' ';
    if (timeDiff.days > 0) timeString += formatUnit(timeDiff.days, 'Dia') + ' ';
    if (timeDiff.hours > 0) timeString += formatUnit(timeDiff.hours, 'Hora') + ' ';
    if (timeDiff.minutes > 0) timeString += formatUnit(timeDiff.minutes, 'Minuto') + ' ';
    if (timeDiff.seconds > 0) timeString += formatUnit(timeDiff.seconds, 'Segundo');

    document.getElementById('timer').textContent = timeString.trim();
}

// Atualize o timer a cada segundo
setInterval(updateTimer, 1000);