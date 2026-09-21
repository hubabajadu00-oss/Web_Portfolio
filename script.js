// Ожидаем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Элементы DOM для дашборда
    const budgetInput = document.getElementById('budget');
    const cpcInput = document.getElementById('cpc');
    const crInput = document.getElementById('cr');
    const ltvInput = document.getElementById('ltv');
    
    const budgetVal = document.getElementById('budget-val');
    const cpcVal = document.getElementById('cpc-val');
    const crVal = document.getElementById('cr-val');
    const ltvVal = document.getElementById('ltv-val');
    
    const roiResult = document.getElementById('roi-result');
    const profitResult = document.getElementById('profit-result');

    // Инициализация графика (Chart.js)
    const ctx = document.getElementById('roiChart').getContext('2d');
    
    // Градиенты для графика
    const revGradient = ctx.createLinearGradient(0, 0, 0, 400);
    revGradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)'); // green
    revGradient.addColorStop(1, 'rgba(16, 185, 129, 0.1)');
    
    const expGradient = ctx.createLinearGradient(0, 0, 0, 400);
    expGradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)'); // red
    expGradient.addColorStop(1, 'rgba(239, 68, 68, 0.1)');

    let chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Расходы (Бюджет)', 'Доходы (Выручка)'],
            datasets: [{
                label: 'Сумма ($)',
                data: [10000, 24000],
                backgroundColor: [expGradient, revGradient],
                borderWidth: 0,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '$' + context.raw.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });

    // Функция обновления расчетов
    function updateCalc() {
        const budget = parseFloat(budgetInput.value);
        const cpc = parseFloat(cpcInput.value);
        const cr = parseFloat(crInput.value) / 100;
        const ltv = parseFloat(ltvInput.value);

        // Обновляем отображение значений над ползунками
        budgetVal.textContent = budget.toLocaleString();
        cpcVal.textContent = cpc.toFixed(2);
        crVal.textContent = (cr * 100).toFixed(1);
        ltvVal.textContent = ltv.toLocaleString();

        // Математика Performance маркетинга
        const clicks = budget / cpc;
        const leads = clicks * cr;
        const revenue = leads * ltv;
        const profit = revenue - budget;
        
        let roi = 0;
        if (budget > 0) {
            roi = (profit / budget) * 100;
        }

        // Обновляем блок результатов
        roiResult.textContent = roi.toFixed(0) + '%';
        profitResult.textContent = '$' + profit.toLocaleString(undefined, {maximumFractionDigits: 0});
        
        // Цвет ROI (зеленый если > 0, красный если < 0)
        const highlightBox = document.querySelector('.highlight-box');
        if (roi >= 0) {
            roiResult.style.color = '#10b981';
            highlightBox.style.borderColor = '#10b981';
            highlightBox.style.background = 'rgba(16, 185, 129, 0.1)';
        } else {
            roiResult.style.color = '#ef4444';
            highlightBox.style.borderColor = '#ef4444';
            highlightBox.style.background = 'rgba(239, 68, 68, 0.1)';
        }

        // Обновляем график
        chart.data.datasets[0].data = [budget, revenue];
        chart.update();
    }

    // Слушатели событий на инпуты
    budgetInput.addEventListener('input', updateCalc);
    cpcInput.addEventListener('input', updateCalc);
    crInput.addEventListener('input', updateCalc);
    ltvInput.addEventListener('input', updateCalc);

    // Первичный расчет при загрузке
    updateCalc();
});
