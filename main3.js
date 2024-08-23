// Defina a data e hora de início no formato 'YYYY-MM-DDTHH:MM:SS'
const startDateTime = new Date('2024-07-23T00:00:00');

function updateTimer() {
    const currentTime = new Date();
    const elapsed = currentTime - startDateTime;

    // Função para calcular a diferença em anos, meses, dias, horas, minutos e segundos
    function calculateTimeDifference(start, end) {
        const years = end.getFullYear() - start.getFullYear();
        const months = end.getMonth() - start.getMonth() + years * 12;
        const days = Math.floor((end - new Date(end.getFullYear(), end.getMonth(), 0)) / (1000 * 60 * 60 * 24));
        const hours = end.getHours() - start.getHours();
        const minutes = end.getMinutes() - start.getMinutes();
        const seconds = end.getSeconds() - start.getSeconds();

        return {
            years,
            months: months % 12,
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