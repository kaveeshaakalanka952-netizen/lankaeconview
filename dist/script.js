// Lanka Econo View - Main JavaScript Application

// Economic indicators data
const economicIndicators = [
    {
        title: "GDP Growth Rate",
        value: "8.2%",
        change: "+1.5%",
        trend: 'up',
        icon: 'trending-up',
        description: "Year-over-year economic growth"
    },
    {
        title: "Inflation Rate",
        value: "2.1%",
        change: "-0.3%",
        trend: 'down',
        icon: 'dollar-sign',
        description: "Consumer price index change"
    },
    {
        title: "Exchange Rate",
        value: "320 LKR",
        change: "+2.1%",
        trend: 'up',
        icon: 'building',
        description: "LKR per USD exchange rate"
    },
    {
        title: "Unemployment",
        value: "5.5%",
        change: "-0.8%",
        trend: 'down',
        icon: 'users',
        description: "Current unemployment rate"
    },
    {
        title: "Export Value",
        value: "$1.2B",
        change: "+12.3%",
        trend: 'up',
        icon: 'shopping-cart',
        description: "Monthly export earnings"
    },
    {
        title: "Foreign Reserves",
        value: "$3.8B",
        change: "+5.7%",
        trend: 'up',
        icon: 'dollar-sign',
        description: "Central bank reserves"
    }
];

// Chart data
const chartData = {
    gdp: [
        { year: '2019', value: 84.5 },
        { year: '2020', value: 80.7 },
        { year: '2021', value: 88.9 },
        { year: '2022', value: 75.3 },
        { year: '2023', value: 82.1 },
        { year: '2024', value: 88.8 }
    ],
    inflation: [
        { month: 'Jan', value: 25.2 },
        { month: 'Feb', value: 21.5 },
        { month: 'Mar', value: 18.7 },
        { month: 'Apr', value: 14.2 },
        { month: 'May', value: 8.8 },
        { month: 'Jun', value: 4.3 },
        { month: 'Jul', value: 2.1 }
    ],
    sectors: [
        { name: 'Services', value: 56.4, color: '#3b82f6' },
        { name: 'Industry', value: 27.8, color: '#10b981' },
        { name: 'Agriculture', value: 15.8, color: '#f59e0b' }
    ],
    trade: [
        { month: 'Jan', exports: 1180, imports: 1520 },
        { month: 'Feb', exports: 1250, imports: 1480 },
        { month: 'Mar', exports: 1320, imports: 1650 },
        { month: 'Apr', exports: 1280, imports: 1580 },
        { month: 'May', exports: 1350, imports: 1720 },
        { month: 'Jun', exports: 1420, imports: 1680 }
    ]
};

// Personal goals data
let personalGoals = [
    {
        id: '1',
        title: 'Emergency Fund',
        target: 500000,
        current: 320000,
        category: 'savings',
        deadline: '2024-12-31'
    },
    {
        id: '2',
        title: 'Monthly Income Goal',
        target: 75000,
        current: 68000,
        category: 'income',
        deadline: '2024-08-31'
    },
    {
        id: '3',
        title: 'Investment Portfolio',
        target: 1000000,
        current: 450000,
        category: 'investment',
        deadline: '2025-06-30'
    }
];

// Chart instances
let charts = {};

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0
    }).format(amount);
}

function getProgressPercentage(current, target) {
    return Math.min((current / target) * 100, 100);
}

function getCategoryIcon(category) {
    const icons = {
        savings: 'wallet',
        income: 'trending-up',
        investment: 'target'
    };
    return icons[category] || 'target';
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Render components
    renderEconomicIndicators();
    renderPersonalGoals();
    renderFinancialStats();
    
    // Initialize charts
    initializeCharts();
    
    // Setup event listeners
    setupEventListeners();
});

// Render economic indicators
function renderEconomicIndicators() {
    const grid = document.getElementById('indicators-grid');
    
    grid.innerHTML = economicIndicators.map(indicator => {
        const trendClass = indicator.trend === 'up' ? 'trend-up' : 'trend-down';
        const trendIcon = indicator.trend === 'up' ? 'trending-up' : 'trending-down';
        
        return `
            <div class="indicator-card fade-in">
                <div class="indicator-header">
                    <div class="indicator-icon">
                        <i data-lucide="${indicator.icon}"></i>
                    </div>
                    <div class="trend-badge ${trendClass}">
                        <i data-lucide="${trendIcon}"></i>
                        <span>${indicator.change}</span>
                    </div>
                </div>
                
                <h3 class="indicator-title">${indicator.title}</h3>
                <p class="indicator-value">${indicator.value}</p>
                <p class="indicator-description">${indicator.description}</p>
            </div>
        `;
    }).join('');
    
    // Re-render icons
    lucide.createIcons();
}

// Render personal goals
function renderPersonalGoals() {
    const goalsList = document.getElementById('goals-list');
    
    goalsList.innerHTML = personalGoals.map(goal => {
        const progress = getProgressPercentage(goal.current, goal.target);
        const categoryIcon = getCategoryIcon(goal.category);
        const deadline = new Date(goal.deadline).toLocaleDateString();
        
        return `
            <div class="goal-card slide-up">
                <div class="goal-header">
                    <div class="goal-info">
                        <i data-lucide="${categoryIcon}" class="category-${goal.category}"></i>
                        <div>
                            <div class="goal-title">${goal.title}</div>
                            <div class="goal-deadline">
                                <i data-lucide="calendar"></i>
                                <span>Due: ${deadline}</span>
                            </div>
                        </div>
                    </div>
                    <span class="category-badge">${goal.category}</span>
                </div>

                <div class="progress-section">
                    <div class="progress-header">
                        <span>Progress</span>
                        <span>${progress.toFixed(1)}%</span>
                    </div>
                    
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    
                    <div class="progress-values">
                        <span class="progress-current">${formatCurrency(goal.current)}</span>
                        <span class="progress-target">of ${formatCurrency(goal.target)}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Re-render icons
    lucide.createIcons();
}

// Render financial statistics
function renderFinancialStats() {
    const statsContainer = document.getElementById('financial-stats');
    
    const totalGoals = personalGoals.length;
    const avgProgress = personalGoals.reduce((acc, goal) => 
        acc + getProgressPercentage(goal.current, goal.target), 0) / totalGoals;
    const totalSaved = personalGoals.reduce((acc, goal) => acc + goal.current, 0);
    
    statsContainer.innerHTML = `
        <div class="stat-row">
            <span class="label">Total Goals</span>
            <span class="value">${totalGoals}</span>
        </div>
        <div class="stat-row">
            <span class="label">Avg. Progress</span>
            <span class="value">${avgProgress.toFixed(1)}%</span>
        </div>
        <div class="stat-row">
            <span class="label">Total Saved</span>
            <span class="value">${formatCurrency(totalSaved)}</span>
        </div>
    `;
}

// Initialize charts
function initializeCharts() {
    // GDP Chart
    const gdpCtx = document.getElementById('gdpChart').getContext('2d');
    charts.gdp = new Chart(gdpCtx, {
        type: 'line',
        data: {
            labels: chartData.gdp.map(d => d.year),
            datasets: [{
                label: 'GDP (USD Billion)',
                data: chartData.gdp.map(d => d.value),
                borderColor: 'hsl(217, 91%, 60%)',
                backgroundColor: 'hsla(217, 91%, 60%, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    // Inflation Chart
    const inflationCtx = document.getElementById('inflationChart').getContext('2d');
    charts.inflation = new Chart(inflationCtx, {
        type: 'line',
        data: {
            labels: chartData.inflation.map(d => d.month),
            datasets: [{
                label: 'Inflation Rate (%)',
                data: chartData.inflation.map(d => d.value),
                borderColor: 'hsl(142, 76%, 36%)',
                backgroundColor: 'hsl(142, 76%, 36%)',
                borderWidth: 3,
                pointBackgroundColor: 'hsl(142, 76%, 36%)',
                pointBorderColor: 'hsl(142, 76%, 36%)',
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Sectors Chart
    const sectorsCtx = document.getElementById('sectorsChart').getContext('2d');
    charts.sectors = new Chart(sectorsCtx, {
        type: 'pie',
        data: {
            labels: chartData.sectors.map(d => d.name),
            datasets: [{
                data: chartData.sectors.map(d => d.value),
                backgroundColor: chartData.sectors.map(d => d.color),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Trade Chart
    const tradeCtx = document.getElementById('tradeChart').getContext('2d');
    charts.trade = new Chart(tradeCtx, {
        type: 'bar',
        data: {
            labels: chartData.trade.map(d => d.month),
            datasets: [
                {
                    label: 'Exports',
                    data: chartData.trade.map(d => d.exports),
                    backgroundColor: 'hsl(142, 76%, 36%)'
                },
                {
                    label: 'Imports',
                    data: chartData.trade.map(d => d.imports),
                    backgroundColor: 'hsl(38, 92%, 50%)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Tab switching
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const tabId = trigger.dataset.tab;
            
            // Remove active class from all triggers and contents
            tabTriggers.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked trigger and corresponding content
            trigger.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Goal form submission
    const goalForm = document.getElementById('goal-form');
    goalForm.addEventListener('submit', handleGoalSubmission);
    
    // Button click handlers
    const startTrackingBtn = document.querySelector('.hero-buttons .btn-primary');
    const viewDashboardBtn = document.querySelector('.hero-buttons .btn-outline');
    
    startTrackingBtn.addEventListener('click', () => {
        document.querySelector('.tracker-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    viewDashboardBtn.addEventListener('click', () => {
        document.querySelector('.indicators-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
}

// Handle goal form submission
function handleGoalSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = document.getElementById('goal-title').value;
    const target = parseFloat(document.getElementById('goal-target').value);
    const category = document.getElementById('goal-category').value;
    const deadline = document.getElementById('goal-deadline').value;
    
    if (title && target && deadline) {
        const newGoal = {
            id: Date.now().toString(),
            title,
            target,
            current: 0,
            category,
            deadline
        };
        
        personalGoals.push(newGoal);
        
        // Re-render components
        renderPersonalGoals();
        renderFinancialStats();
        
        // Reset form
        e.target.reset();
        
        // Show success message (simple alert for now)
        alert('Goal added successfully!');
    }
}

// Update goal progress (for future enhancement)
function updateGoalProgress(goalId, newAmount) {
    const goal = personalGoals.find(g => g.id === goalId);
    if (goal) {
        goal.current = newAmount;
        renderPersonalGoals();
        renderFinancialStats();
    }
}

// Delete goal (for future enhancement)
function deleteGoal(goalId) {
    personalGoals = personalGoals.filter(g => g.id !== goalId);
    renderPersonalGoals();
    renderFinancialStats();
}

// Export functions for potential future use
window.LankaEconoView = {
    updateGoalProgress,
    deleteGoal,
    personalGoals,
    economicIndicators,
    chartData
};

// Wait until everything is loaded
window.addEventListener("load", () => {
  // Show splash for 2 seconds
  setTimeout(() => {
    const splash = document.getElementById("splash");
    const mainContent = document.getElementById("main-content");

    // Start fade-out transition
    splash.classList.add("fade-out");

    // Wait for fade animation to finish before hiding completely
    setTimeout(() => {
      splash.style.display = "none";
      mainContent.style.display = "block";
    }, 800); // same duration as CSS transition
  }, 2000);
});