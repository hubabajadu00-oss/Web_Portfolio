// Инициализация калькулятора окупаемости
document.addEventListener('DOMContentLoaded', () => {
    const budgetInput = document.getElementById('budget');
    const cpcInput = document.getElementById('cpc');
    const crInput = document.getElementById('cr');
    const checkInput = document.getElementById('check');

    const budgetVal = document.getElementById('budget-val');
    const cpcVal = document.getElementById('cpc-val');
    const crVal = document.getElementById('cr-val');
    const checkVal = document.getElementById('check-val');

    const resClicks = document.getElementById('res-clicks');
    const resLeads = document.getElementById('res-leads');
    const resRevenue = document.getElementById('res-revenue');
    const resProfit = document.getElementById('res-profit');
    const resRoi = document.getElementById('res-roi');

    let roiChart;

    function initChart() {
        const ctx = document.getElementById('roiChart').getContext('2d');
        roiChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Бюджет (Расход)', 'Выручка', 'Чистая прибыль'],
                datasets: [{
                    label: 'Финансовый результат (₽)',
                    data: [0, 0, 0],
                    backgroundColor: [
                        'rgba(255, 68, 68, 0.7)',
                        'rgba(0, 230, 118, 0.7)',
                        'rgba(0, 240, 255, 0.9)'
                    ],
                    borderColor: [
                        '#ff4444',
                        '#00e676',
                        '#00f0ff'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#888' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#eee' }
                    }
                }
            }
        });
    }

    function updateCalc() {
        const budget = parseFloat(budgetInput.value);
        const cpc = parseFloat(cpcInput.value);
        const cr = parseFloat(crInput.value);
        const avgCheck = parseFloat(checkInput.value);

        budgetVal.innerText = budget.toLocaleString('ru-RU') + ' ₽';
        cpcVal.innerText = cpc + ' ₽';
        crVal.innerText = cr + '%';
        checkVal.innerText = avgCheck.toLocaleString('ru-RU') + ' ₽';

        const clicks = Math.floor(budget / cpc);
        const leads = Math.floor(clicks * (cr / 100));
        const revenue = leads * avgCheck;
        const profit = revenue - budget;
        const roi = budget > 0 ? Math.round((profit / budget) * 100) : 0;

        resClicks.innerText = clicks.toLocaleString('ru-RU');
        resLeads.innerText = leads.toLocaleString('ru-RU');
        resRevenue.innerText = revenue.toLocaleString('ru-RU') + ' ₽';
        
        resProfit.innerText = profit.toLocaleString('ru-RU') + ' ₽';
        if (profit >= 0) {
            resProfit.style.color = '#00e676';
        } else {
            resProfit.style.color = '#ff4444';
        }

        resRoi.innerText = roi + '%';
        if (roi >= 0) {
            resRoi.style.color = '#00f0ff';
        } else {
            resRoi.style.color = '#ff4444';
        }

        if (roiChart) {
            roiChart.data.datasets[0].data = [budget, revenue, profit > 0 ? profit : 0];
            roiChart.update();
        }
    }

    if (document.getElementById('roiChart')) {
        initChart();
    }

    [budgetInput, cpcInput, crInput, checkInput].forEach(input => {
        if (input) {
            input.addEventListener('input', updateCalc);
        }
    });

    updateCalc();
});

// --- ЛОГИКА ЗАКРЫТОЙ БАЗЫ ДОКАЗАТЕЛЬСТВ (HR VAULT) ---
function unlockVault() {
    const input = document.getElementById('vault-pass');
    const error = document.getElementById('vault-error');
    const authBox = document.getElementById('vault-auth-box');
    const vaultContent = document.getElementById('vault-content');
    
    if (!input) return;
    const key = input.value.trim().toUpperCase();
    if (key === 'ALEX2026' || key === 'POPARTPOP' || key === 'HR2026' || key === 'VIP' || key === 'ДОБРО') {
        if (error) error.style.display = 'none';
        if (authBox) authBox.style.display = 'none';
        if (vaultContent) vaultContent.style.display = 'block';
    } else {
        if (error) error.style.display = 'block';
        input.style.borderColor = '#ff5555';
    }
}

function lockVault() {
    const authBox = document.getElementById('vault-auth-box');
    const vaultContent = document.getElementById('vault-content');
    const input = document.getElementById('vault-pass');
    const error = document.getElementById('vault-error');
    
    if (authBox) authBox.style.display = 'block';
    if (vaultContent) vaultContent.style.display = 'none';
    if (input) {
        input.value = '';
        input.style.borderColor = '#333';
    }
    if (error) error.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const passInput = document.getElementById('vault-pass');
    if (passInput) {
        passInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                unlockVault();
            }
        });
    }
});