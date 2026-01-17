// Game Configuration
const GAME_CONFIG = {
    game1: {
        name: 'Instant Win',
        price: 25,
        maxPrize: 100000,
        winRate: 0.5 // 50% win rate for demo
    },
    game2: {
        name: 'Mega Win',
        price: 49,
        maxPrize: 1000000,
        totalTickets: 49,
        winRate: 0.0 // Always fail for game 2
    },
    game3: {
        name: 'Quick Play',
        price: 10,
        maxPrize: 10000,
        winRate: 0.6 // 60% win rate
    },
    game4: {
        name: 'Big Win',
        price: 20,
        maxPrize: 50000,
        winRate: 0.4 // 40% win rate
    }
};

// Dummy Winners Data
const DUMMY_WINNERS = [
    { name: 'Raj K.', amount: 5000, game: 'Instant Win', location: 'Mumbai, MH', phone: '98****234' },
    { name: 'Priya M.', amount: 12000, game: 'Instant Win', location: 'Delhi, DL', phone: '97****567' },
    { name: 'Amit P.', amount: 8500, game: 'Instant Win', location: 'Bangalore, KA', phone: '99****123' },
    { name: 'Sneha S.', amount: 15000, game: 'Mega Win', location: 'Hyderabad, TL', phone: '98****456' },
    { name: 'Vikram R.', amount: 6200, game: 'Instant Win', location: 'Chennai, TN', phone: '96****789' },
    { name: 'Ananya D.', amount: 18000, game: 'Mega Win', location: 'Pune, MH', phone: '99****234' },
    { name: 'Rohan G.', amount: 9800, game: 'Instant Win', location: 'Kolkata, WB', phone: '97****890' },
    { name: 'Divya K.', amount: 11500, game: 'Instant Win', location: 'Jaipur, RJ', phone: '98****567' },
    { name: 'Nikhil V.', amount: 7300, game: 'Instant Win', location: 'Ahmedabad, GJ', phone: '96****234' },
    { name: 'Zara H.', amount: 22000, game: 'Mega Win', location: 'Lucknow, UP', phone: '99****456' },
    { name: 'Sanjay M.', amount: 5600, game: 'Instant Win', location: 'Indore, MP', phone: '97****789' },
    { name: 'Neha L.', amount: 13200, game: 'Instant Win', location: 'Surat, GJ', phone: '98****123' },
    { name: 'Arjun C.', amount: 9100, game: 'Instant Win', location: 'Vadodara, GJ', phone: '99****890' },
    { name: 'Tanya B.', amount: 16500, game: 'Mega Win', location: 'Noida, UP', phone: '96****567' },
    { name: 'Harsh N.', amount: 7900, game: 'Instant Win', location: 'Gurgaon, HR', phone: '97****234' }
];

// State Management
let gameState = {
    balance: 0,
    game1TicketsRemaining: 1, // Unlimited tickets for game 1
    game2TicketsRemaining: 49,
    recentWins: [],
    walletInitialized: false,
    displayedWinners: [],
    winnerIndex: 0
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if wallet has been initialized from localStorage
    const savedBalance = localStorage.getItem('walletBalance');
    const savedInit = localStorage.getItem('walletInitialized');
    
    if (savedBalance && savedInit === 'true') {
        gameState.balance = parseInt(savedBalance);
        gameState.walletInitialized = true;
        updateBalanceDisplay();
        console.log('vipmetro360 - Balance restored:', gameState.balance);
    }
    
    // Initialize winners display
    initializeWinners();
    
    // Add balance card click handler for withdrawal restriction message
    const balanceCard = document.getElementById('balanceCard');
    if (balanceCard) {
        balanceCard.addEventListener('click', showWithdrawalMessage);
    }
    
    console.log('vipmetro360 Gaming Platform Initialized');
}

/**
 * Initialize Winners Display
 */
function initializeWinners() {
    updateWinnersList();
    
    // Rotate winners every 5 seconds
    setInterval(() => {
        updateWinnersList();
    }, 5000);
}

/**
 * Update Winners List - Rotate and Display
 */
function updateWinnersList() {
    const track = document.getElementById('winnersTicker');
    if (!track) return;

    // Build a list of random winners for the ticker
    const items = [];
    const count = 10; // number of unique items to show then duplicated for seamless scroll
    for (let i = 0; i < count; i++) {
        const w = DUMMY_WINNERS[Math.floor(Math.random() * DUMMY_WINNERS.length)];
        const gameLabel = w.game === 'Mega Win' ? '💰' : '⚡';
        const itemHtml = `
            <div class="ticker-item">
                <div style="display:flex;flex-direction:column;">
                    <span class="name">${w.name}</span>
                    <span class="meta">${gameLabel} ${w.location} • ${w.phone}</span>
                </div>
                <div style="margin-left:auto; text-align:right;">
                    <div class="amount">₹ ${w.amount.toLocaleString()}</div>
                    <div class="meta">won just now</div>
                </div>
            </div>
        `;
        items.push(itemHtml);
    }

    // Populate track and duplicate content to make seamless scrolling
    track.innerHTML = items.join('') + items.join('');

    // Adjust animation duration based on items
    const durationSec = Math.max(20, items.length * 4); // seconds
    track.style.animationDuration = durationSec + 's';
}

/**
 * Generate random prize amount (₹49-₹1000)
 */
function generateRandomPrize() {
    const minPrize = 49;
    const maxPrize = 1000;
    return Math.floor(Math.random() * (maxPrize - minPrize + 1)) + minPrize;
}

/**
 * Show withdrawal restriction message
 */
function showWithdrawalMessage() {
    const minWithdrawal = 3000;
    if (gameState.balance >= minWithdrawal) {
        showAlert('✅ Withdrawal Eligible', `Your balance: ₹ ${gameState.balance} You can withdraw your balance now!`);
    } else {
        const needed = minWithdrawal - gameState.balance;
        showAlert('💳 Withdrawal Restricted', `Your balance: ₹ ${gameState.balance} Minimum withdrawal limit: ₹ ${minWithdrawal} You need ₹ ${needed} more to withdraw!`);
    }
}

/**
 * Show wallet add balance popup
 */
function showWalletPopup() {
    if (gameState.walletInitialized) return;
    
    const walletModal = new bootstrap.Modal(document.getElementById('walletModal'), {
        backdrop: 'static',
        keyboard: false
    });
    walletModal.show();
}

/**
 * Add balance to wallet
 */
function addBalanceToWallet(amount = 100) {
    gameState.balance += amount;
    gameState.walletInitialized = true;
    
    // Save to localStorage
    localStorage.setItem('walletBalance', gameState.balance);
    localStorage.setItem('walletInitialized', 'true');
    
    updateBalanceDisplay();
    
    const walletModal = bootstrap.Modal.getInstance(document.getElementById('walletModal'));
    if (walletModal) {
        walletModal.hide();
    }
    
    showAlert('Success!', `₹ ${amount} added to your wallet. Total balance: ₹ ${gameState.balance}`);
}

/**
 * Handle Razorpay Payment Success
 */
function handlePaymentSuccess(paymentData) {
    if (!paymentData || !paymentData.amount) {
        console.error('Invalid payment data');
        return;
    }
    
    // Amount is in paise, convert to rupees
    const amountInRupees = Math.round(paymentData.amount / 100);
    const paymentId = paymentData.id || 'N/A';
    
    // Check if Game 1 modal is open
    const game1Modal = document.getElementById('game1Modal');
    if (game1Modal && game1Modal.classList.contains('show')) {
        // Handle Game 1 ticket payment success
        handleGame1TicketPaymentSuccess(amountInRupees, paymentId);
        return;
    }
    
    // Check if Game 2 modal is open
    const game2Modal = document.getElementById('game2Modal');
    if (game2Modal && game2Modal.classList.contains('show')) {
        // Handle Game 2 ticket payment success
        handleGame2TicketPaymentSuccess(amountInRupees, paymentId);
        return;
    }
    
    // Handle wallet balance addition (if wallet modal exists)
    const walletModal = document.getElementById('walletModal');
    if (walletModal) {
        gameState.balance += amountInRupees;
        gameState.walletInitialized = true;
        
        // Save to localStorage
        localStorage.setItem('walletBalance', gameState.balance);
        localStorage.setItem('walletInitialized', 'true');
        
        updateBalanceDisplay();
        
        // Hide wallet modal
        const modal = bootstrap.Modal.getInstance(walletModal);
        if (modal) {
            modal.hide();
        }
        
        // Show success page
        showPaymentSuccessPage(amountInRupees, paymentId);
    }
}

/**
 * Handle Game 1 Ticket Payment Success
 */
function handleGame1TicketPaymentSuccess(amount, paymentId) {
    const ticketNumber = generateTicketNumber();
    const isWin = determineResult('game1');
    const prize = isWin ? generateRandomPrize() : 0; // Generate random prize instead of calculated
    const price = GAME_CONFIG.game1.price;
    
    // Deduct ticket price from balance
    gameState.balance -= price;
    
    // Add prize to balance if won
    if (isWin) {
        gameState.balance += prize;
        gameState.recentWins.push({
            game: 'Instant Win',
            amount: prize,
            time: new Date().toLocaleTimeString()
        });
    }
    
    // Save balance to localStorage
    localStorage.setItem('walletBalance', gameState.balance);
    
    updateBalanceDisplay();
    
    // Display the ticket result
    displayGame1Result(ticketNumber, isWin, prize, paymentId);
}

/**
 * Handle Game 2 Ticket Payment Success
 */
function handleGame2TicketPaymentSuccess(amount, paymentId) {
    const ticketNumber = generateTicketNumber();
    const isWin = determineResult('game2'); // Always false per requirement
    const prize = isWin ? generateRandomPrize() : 0; // Generate random prize instead of calculated
    
    // Deduct ticket price from balance (if balance was previously added)
    const price = GAME_CONFIG.game2.price;
    gameState.balance -= price;
    gameState.game2TicketsRemaining--;
    
    // Add prize to balance if won
    if (isWin) {
        gameState.balance += prize;
        gameState.recentWins.push({
            game: 'Mega Win',
            amount: prize,
            time: new Date().toLocaleTimeString()
        });
    }
    
    // Save balance to localStorage
    localStorage.setItem('walletBalance', gameState.balance);
    
    updateBalanceDisplay();
    updateTicketsDisplay();
    
    // Display the ticket result
    displayGame2Result(ticketNumber, isWin, prize, paymentId);
}

/**
 * Generate unique ticket number
 */
function generateTicketNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `LUCK-${timestamp}-${random}`;
}

/**
 * Determine game result (Always FAILED)
 */
function determineResult(gameType) {
    // Always return false (FAILED) as per requirement
    return false;
}

/**
 * Calculate prize amount
 */
function calculatePrize(gameType) {
    const config = GAME_CONFIG[gameType];
    if (gameType === 'game1') {
        // Game 1: Instant Win - various prize amounts up to max
        const prizes = [0, 50, 100, 500, 1000, 5000, 10000, 50000, 100000];
        return prizes[Math.floor(Math.random() * prizes.length)];
    } else {
        // Game 2: Mega Win - higher stakes
        const prizes = [0, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000];
        return prizes[Math.floor(Math.random() * prizes.length)];
    }
}

/**
 * Update balance display
 */
function updateBalanceDisplay() {
    const balanceElement = document.getElementById('balanceAmount');
    if (balanceElement) {
        balanceElement.textContent = `₹ ${gameState.balance}`;
    }
}

/**
 * Initiate Game 1 Payment
 */
function initiateGame1Payment() {
    const price = GAME_CONFIG.game1.price;
    
    // Check if wallet is initialized
    if (!gameState.walletInitialized) {
        showAlert('Add Balance First', 'Please add balance to your wallet before playing.');
        showWalletPopup();
        return;
    }
    
    // Check balance
    if (gameState.balance < price) {
        showAlert('Insufficient Balance', `You need ₹ ${price} to play. Current balance: ₹ ${gameState.balance}`);
        return;
    }
    
    // Razorpay Options
    const options = {
        key: 'rzp_live_ILuGWxBNZYwzYt', // Replace with your Razorpay Key
        amount: price * 100, // Amount in paise
        currency: 'INR',
        name: 'vipmetro360 Gaming',
        description: 'Quick Win - ₹1 Lakh Prize',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" text-anchor="middle" dy=".3em" font-size="60" fill="%2300ff88">🎰</text></svg>',
        handler: function(response) {
            handleGame1Success(response.razorpay_payment_id);
        },
        prefill: {
            name: 'Player',
            email: 'player@luckplay.com',
            contact: '9876543210'
        },
        theme: {
            color: '#00ff88'
        },
        modal: {
            ondismiss: function() {
                console.log('Payment cancelled');
            }
        }
    };
    
    // For demo: Simulate payment without actual Razorpay
    simulatePayment('game1', options);
}

/**
 * Initiate Game 2 Payment
 */
function initiateGame2Payment() {
    const price = GAME_CONFIG.game2.price;
    
    // Check if wallet is initialized
    if (!gameState.walletInitialized) {
        showAlert('Add Balance First', 'Please add balance to your wallet before playing.');
        showWalletPopup();
        return;
    }
    
    // Check balance
    if (gameState.balance < price) {
        showAlert('Insufficient Balance', `You need ₹ ${price} to play. Current balance: ₹ ${gameState.balance}`);
        return;
    }
    
    // Check if tickets available
    if (gameState.game2TicketsRemaining <= 0) {
        showAlert('No Tickets Available', 'Sorry, all tickets are sold out for this game. Please try later!');
        return;
    }
    
    // Razorpay Options
    const options = {
        key: 'rzp_live_ILuGWxBNZYwzYt', // Replace with your Razorpay Key
        amount: price * 100, // Amount in paise
        currency: 'INR',
        name: 'vipmetro360 Gaming',
        description: 'Mega Win - ₹10 Lakh Prize',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" text-anchor="middle" dy=".3em" font-size="60" fill="%23ff006e">💰</text></svg>',
        handler: function(response) {
            handleGame2Success(response.razorpay_payment_id);
        },
        prefill: {
            name: 'Player',
            email: 'player@luckplay.com',
            contact: '9876543210'
        },
        theme: {
            color: '#ff006e'
        },
        modal: {
            ondismiss: function() {
                console.log('Payment cancelled');
            }
        }
    };
    
    // For demo: Simulate payment without actual Razorpay
    simulatePayment('game2', options);
}

/**
 * Simulate payment (Demo Mode)
 */
function simulatePayment(gameType, options) {
    const amount = options.amount / 100;
    
    // Show loading
    const gameModal = gameType === 'game1' ? 'game1Modal' : 'game2Modal';
    const modal = bootstrap.Modal.getInstance(document.getElementById(gameModal));
    
    // Simulate payment processing
    showPaymentLoading(gameType);
    
    // Simulate 2-3 second processing time
    setTimeout(() => {
        const paymentId = 'pay_' + Math.random().toString(36).substring(2, 11).toUpperCase();
        
        if (gameType === 'game1') {
            handleGame1Success(paymentId);
        } else {
            handleGame2Success(paymentId);
        }
    }, 2500);
}

/**
 * Show payment loading state
 */
function showPaymentLoading(gameType) {
    const contentDiv = document.getElementById(gameType === 'game1' ? 'game1Content' : 'game2Content');
    const resultDiv = document.getElementById(gameType === 'game1' ? 'game1Result' : 'game2Result');
    
    contentDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="result-container">
            <div style="margin: 40px 0;">
                <div class="spinner"></div>
                <p style="color: var(--tertiary-neon); margin-top: 20px; font-weight: 600;">
                    Processing your payment...
                </p>
                <p style="color: rgba(0, 212, 255, 0.6); font-size: 12px; margin-top: 10px;">
                    Please wait while we secure your transaction
                </p>
            </div>
        </div>
    `;
}

/**
 * Handle Game 1 Success
 */
function handleGame1Success(paymentId) {
    const ticketNumber = generateTicketNumber();
    const isWin = determineResult('game1');
    const prize = isWin ? calculatePrize('game1') : 0;
    const price = GAME_CONFIG.game1.price;
    
    // Deduct ticket price from balance
    // gameState.balance -= price;
    
    // Add prize to balance if won
    if (isWin) {
        gameState.balance += prize;
        gameState.recentWins.push({
            game: 'Quick Win',
            amount: prize,
            time: new Date().toLocaleTimeString()
        });
    }
    
    // Save balance to localStorage
    localStorage.setItem('walletBalance', gameState.balance);
    
    updateBalanceDisplay();
    displayGame1Result(ticketNumber, isWin, prize, paymentId);
}

/**
 * Handle Game 2 Success
 */
function handleGame2Success(paymentId) {
    const ticketNumber = generateTicketNumber();
    const isWin = determineResult('game2');
    const prize = isWin ? calculatePrize('game2') : 0;
    const price = GAME_CONFIG.game2.price;
    
    // Deduct ticket price from balance
    gameState.balance -= price;
    gameState.game2TicketsRemaining--;
    
    // Add prize to balance if won
    if (isWin) {
        gameState.balance += prize;
        gameState.recentWins.push({
            game: 'Mega Win',
            amount: prize,
            time: new Date().toLocaleTimeString()
        });
    }
    
    // Save balance to localStorage
    localStorage.setItem('walletBalance', gameState.balance);
    
    updateBalanceDisplay();
    updateTicketsDisplay();
    displayGame2Result(ticketNumber, isWin, prize, paymentId);
}

/**
 * Display Game 1 Result
 */
function displayGame1Result(ticketNumber, isWin, prize, paymentId) {
    const resultDiv = document.getElementById('game1Result');
    const contentDiv = document.getElementById('game1Content');
    
    const resultHTML = `
        <div class="result-container">
            <div class="result-header">
                <div class="result-status result-lose">
                    ❌ FAILED
                </div>
                <div style="font-size: 14px; color: var(--tertiary-neon); margin-top: 10px;">
                    Better luck next time!
                </div>
                <div class="result-amount" style="color: var(--secondary-neon);">₹0</div>
            </div>
            
            <div class="ticket-number">
                <div style="font-size: 11px; color: rgba(0, 212, 255, 0.8); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Ticket Number</div>
                ${ticketNumber}
            </div>
            
            <div style="background: rgba(0, 255, 136, 0.05); padding: 15px; border-radius: 10px; margin-bottom: 20px; font-size: 12px; text-align: left;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Game Type</div>
                        <div style="color: white; font-weight: 600;">Quick Win</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Payment ID</div>
                        <div style="color: white; font-weight: 600; font-size: 11px; word-break: break-all;">${paymentId}</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Ticket Price</div>
                        <div style="color: var(--gold); font-weight: 600;">₹ ${GAME_CONFIG.game1.price}</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Time</div>
                        <div style="color: white; font-weight: 600;">${new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
            </div>
            
            <button class="btn-cta btn-primary-neon" style="margin-bottom: 10px;" onclick="copyToClipboard('${ticketNumber}')">
                <i class="fas fa-copy"></i> Copy Ticket Number
            </button>
            
            <button class="btn-cta" style="background: linear-gradient(90deg, rgba(0, 255, 136, 0.3), rgba(0, 212, 255, 0.3)); color: var(--primary-neon); border: 2px solid var(--primary-neon);" data-bs-dismiss="modal">
                <i class="fas fa-arrow-left"></i> Back to Games
            </button>
        </div>
    `;
    
    resultDiv.innerHTML = resultHTML;
    contentDiv.style.display = 'none';
    resultDiv.style.display = 'block';
}

/**
 * Display Game 2 Result
 */
function displayGame2Result(ticketNumber, isWin, prize, paymentId) {
    const resultDiv = document.getElementById('game2Result');
    const contentDiv = document.getElementById('game2Content');
    
    const resultHTML = `
        <div class="result-container">
            <div class="result-header">
                <div class="result-status result-lose">
                    ❌ TICKET FAILED
                </div>
                <div style="font-size: 14px; color: var(--tertiary-neon); margin-top: 10px;">
                    Try Again Soon!
                </div>
                <div class="result-amount" style="color: var(--secondary-neon);">₹0</div>
            </div>
            
            <div class="ticket-number">
                <div style="font-size: 11px; color: rgba(0, 212, 255, 0.8); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Ticket Number</div>
                ${ticketNumber}
            </div>
            
            <div style="background: rgba(255, 0, 110, 0.05); padding: 15px; border-radius: 10px; margin-bottom: 20px; font-size: 12px; text-align: left;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Game Type</div>
                        <div style="color: white; font-weight: 600;">Mega Win</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Payment ID</div>
                        <div style="color: white; font-weight: 600; font-size: 11px; word-break: break-all;">${paymentId}</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Ticket Price</div>
                        <div style="color: var(--gold); font-weight: 600;">₹ ${GAME_CONFIG.game2.price}</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Time</div>
                        <div style="color: white; font-weight: 600;">${new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
            </div>
            
            <button class="btn-cta btn-secondary-neon" style="margin-bottom: 10px;" onclick="copyToClipboard('${ticketNumber}')">
                <i class="fas fa-copy"></i> Copy Ticket Number
            </button>
            
            <button class="btn-cta" style="background: linear-gradient(90deg, rgba(255, 0, 110, 0.3), rgba(255, 215, 0, 0.3)); color: var(--secondary-neon); border: 2px solid var(--secondary-neon);" data-bs-dismiss="modal">
                <i class="fas fa-arrow-left"></i> Back to Games
            </button>
        </div>
    `;
    
    resultDiv.innerHTML = resultHTML;
    contentDiv.style.display = 'none';
    resultDiv.style.display = 'block';
}

/**
 * Copy to Clipboard
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showAlert('Success', 'Ticket number copied to clipboard!');
    }).catch(() => {
        showAlert('Error', 'Failed to copy. Please try again.');
    });
}

/**
 * Update Tickets Display
 */
function updateTicketsDisplay() {
    document.getElementById('ticketsRemaining').textContent = gameState.game2TicketsRemaining;
}

/**
 * Handle Game 3 Ticket Payment Success
 */
function handleGame3TicketPaymentSuccess(amount, paymentId) {
    const ticketNumber = generateTicketNumber();
    const isWin = Math.random() < GAME_CONFIG.game3.winRate;
    const prize = isWin ? generateRandomPrize() : 0;
    const price = GAME_CONFIG.game3.price;
    
    gameState.balance -= price;
    
    if (isWin) {
        gameState.balance += prize;
        gameState.recentWins.push({
            game: 'Quick Play',
            amount: prize,
            time: new Date().toLocaleTimeString()
        });
    }
    
    localStorage.setItem('walletBalance', gameState.balance);
    updateBalanceDisplay();
    displayGame3Result(ticketNumber, isWin, prize, paymentId);
}

/**
 * Handle Game 4 Ticket Payment Success
 */
function handleGame4TicketPaymentSuccess(amount, paymentId) {
    const ticketNumber = generateTicketNumber();
    const isWin = Math.random() < GAME_CONFIG.game4.winRate;
    const prize = isWin ? generateRandomPrize() : 0;
    const price = GAME_CONFIG.game4.price;
    
    gameState.balance -= price;
    
    if (isWin) {
        gameState.balance += prize;
        gameState.recentWins.push({
            game: 'Big Win',
            amount: prize,
            time: new Date().toLocaleTimeString()
        });
    }
    
    localStorage.setItem('walletBalance', gameState.balance);
    updateBalanceDisplay();
    displayGame4Result(ticketNumber, isWin, prize, paymentId);
}

/**
 * Display Game 3 Result
 */
function displayGame3Result(ticketNumber, isWin, prize, paymentId) {
    const resultDiv = document.getElementById('game3Result');
    const contentDiv = document.getElementById('game3Content');
    
    const resultHTML = `
        <div class="result-container">
            <div class="result-header">
                <div class="result-status ${isWin ? 'result-win' : 'result-lose'}">
                    ${isWin ? '✅ YOU WON!' : '❌ BETTER LUCK NEXT TIME'}
                </div>
                ${isWin ? `<div style="font-size: 14px; color: var(--primary-neon); margin-top: 10px;">Congrats!</div>` : `<div style="font-size: 14px; color: var(--secondary-neon); margin-top: 10px;">Try Again!</div>`}
                <div class="result-amount" style="${isWin ? 'color: var(--gold);' : 'color: var(--secondary-neon);'}">₹ ${prize}</div>
            </div>
            
            <div class="ticket-number">
                <div style="font-size: 11px; color: rgba(0, 212, 255, 0.8); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Ticket Number</div>
                ${ticketNumber}
            </div>
            
            <div style="background: rgba(0, 255, 136, 0.05); padding: 15px; border-radius: 10px; margin-bottom: 20px; font-size: 12px; text-align: left;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Game Type</div>
                        <div style="color: white; font-weight: 600;">Quick Play</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Payment ID</div>
                        <div style="color: white; font-weight: 600; font-size: 11px; word-break: break-all;">${paymentId}</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Ticket Price</div>
                        <div style="color: var(--gold); font-weight: 600;">₹ ${GAME_CONFIG.game3.price}</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Time</div>
                        <div style="color: white; font-weight: 600;">${new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
            </div>
            
            <button class="btn-cta btn-primary-neon" style="margin-bottom: 10px;" onclick="copyToClipboard('${ticketNumber}')">
                <i class="fas fa-copy"></i> Copy Ticket Number
            </button>
            
            <button class="btn-cta" style="background: linear-gradient(90deg, rgba(0, 255, 136, 0.3), rgba(0, 212, 255, 0.3)); color: var(--primary-neon); border: 2px solid var(--primary-neon);" data-bs-dismiss="modal">
                <i class="fas fa-arrow-left"></i> Back to Games
            </button>
        </div>
    `;
    
    resultDiv.innerHTML = resultHTML;
    contentDiv.style.display = 'none';
    resultDiv.style.display = 'block';
}

/**
 * Display Game 4 Result
 */
function displayGame4Result(ticketNumber, isWin, prize, paymentId) {
    const resultDiv = document.getElementById('game4Result');
    const contentDiv = document.getElementById('game4Content');
    
    const resultHTML = `
        <div class="result-container">
            <div class="result-header">
                <div class="result-status ${isWin ? 'result-win' : 'result-lose'}">
                    ${isWin ? '✅ YOU WON!' : '❌ BETTER LUCK NEXT TIME'}
                </div>
                ${isWin ? `<div style="font-size: 14px; color: var(--primary-neon); margin-top: 10px;">Congrats!</div>` : `<div style="font-size: 14px; color: var(--secondary-neon); margin-top: 10px;">Try Again!</div>`}
                <div class="result-amount" style="${isWin ? 'color: var(--gold);' : 'color: var(--secondary-neon);'}">₹ ${prize}</div>
            </div>
            
            <div class="ticket-number">
                <div style="font-size: 11px; color: rgba(0, 212, 255, 0.8); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Ticket Number</div>
                ${ticketNumber}
            </div>
            
            <div style="background: rgba(255, 0, 110, 0.05); padding: 15px; border-radius: 10px; margin-bottom: 20px; font-size: 12px; text-align: left;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Game Type</div>
                        <div style="color: white; font-weight: 600;">Big Win</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Payment ID</div>
                        <div style="color: white; font-weight: 600; font-size: 11px; word-break: break-all;">${paymentId}</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Ticket Price</div>
                        <div style="color: var(--gold); font-weight: 600;">₹ ${GAME_CONFIG.game4.price}</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Time</div>
                        <div style="color: white; font-weight: 600;">${new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
            </div>
            
            <button class="btn-cta btn-secondary-neon" style="margin-bottom: 10px;" onclick="copyToClipboard('${ticketNumber}')">
                <i class="fas fa-copy"></i> Copy Ticket Number
            </button>
            
            <button class="btn-cta" style="background: linear-gradient(90deg, rgba(255, 0, 110, 0.3), rgba(255, 215, 0, 0.3)); color: var(--secondary-neon); border: 2px solid var(--secondary-neon);" data-bs-dismiss="modal">
                <i class="fas fa-arrow-left"></i> Back to Games
            </button>
        </div>
    `;
    
    resultDiv.innerHTML = resultHTML;
    contentDiv.style.display = 'none';
    resultDiv.style.display = 'block';
}

/**
 * Show Payment Success Page
 */
function showPaymentSuccessPage(amount, paymentId) {
    const successModal = new bootstrap.Modal(document.getElementById('paymentSuccessModal'), {
        backdrop: 'static',
        keyboard: false
    });
    
    // Update success modal content
    document.getElementById('successAmount').textContent = amount.toFixed(2);
    document.getElementById('successPaymentId').textContent = paymentId;
    
    successModal.show();
}

/**
 * Close Payment Success and Navigate
 */
function closePaymentSuccess() {
    const successModal = bootstrap.Modal.getInstance(document.getElementById('paymentSuccessModal'));
    if (successModal) {
        successModal.hide();
    }
    
    showAlert('Wallet Updated', `Your wallet has been credited with ₹ ${gameState.balance}. You can now play the games!`);
}

/**
 * Show Alert
 */
function showAlert(title, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-dark alert-dismissible text-light fade show';
    alertDiv.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 500px;
        background: linear-gradient(135deg, rgba(40, 40, 40, 0.99), rgba(0, 65, 85, 1));
        border: 2px solid var(--tertiary-neon);
        color: var(--tertiary-neon);
        z-index: 9999;
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
    `;
    alertDiv.innerHTML = `
        <strong>${title}</strong> ${message}
        <button type="button" class="btn-close" style="filter: brightness(2);" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

/**
 * Real Razorpay Integration (Uncomment to use with real payments)
 * 
 * function initiateRazorpayPayment(gameType) {
 *     const rzp = new Razorpay(options);
 *     rzp.on('payment.failed', function(response) {
 *         showAlert('Payment Failed', 'Your payment could not be processed. Please try again.');
 *     });
 *     rzp.open();
 * }
 */

/**
 * Listen for Razorpay Payment Button Success
 */
window.addEventListener('load', function() {
    // Listen for payment success events from Razorpay payment button
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Check if success modal is shown in the page
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.classList && node.classList.contains('Status-content')) {
                        // Extract amount from the status page
                        const amountElement = node.querySelector('.Status-title');
                        const paymentIdElement = node.querySelector('.Status-footer b');
                        
                        if (amountElement && paymentIdElement) {
                            // Parse amount from format like "₹ 10.00"
                            const amountText = amountElement.textContent.trim();
                            const amountMatch = amountText.match(/[\d.]+/);
                            const amount = amountMatch ? parseFloat(amountMatch[0]) : 0;
                            const paymentId = paymentIdElement.textContent.trim();
                            
                            // Call handler after a delay to ensure payment is fully processed
                            setTimeout(() => {
                                handlePaymentSuccess({
                                    amount: amount * 100, // Convert to paise
                                    id: paymentId
                                });
                            }, 2000);
                        }
                    }
                });
            }
        });
    });
    
    // Observe document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false
    });
    
    // Listen for payment button clicks
    document.addEventListener('click', function(event) {
        const paymentButton = event.target.closest('.PaymentButton, .PaymentButton--dark');
        if (paymentButton) {
            console.log('Payment button clicked');
            showPaymentProcessingModal();
        }
    }, true);
});

/**
 * Show Payment Processing Modal with Loading State
 */
function showPaymentProcessingModal() {
    const game1Modal = document.getElementById('game1Modal');
    const game2Modal = document.getElementById('game2Modal');
    const game3Modal = document.getElementById('game3Modal');
    const game4Modal = document.getElementById('game4Modal');
    
    // Generate ticket number for display
    const ticketNumber = generateTicketNumber();
    let gameType = '';
    let price = '';
    let gameNumber = 0;
    
    if (game1Modal && game1Modal.classList.contains('show')) {
        gameType = 'Instant Win';
        price = GAME_CONFIG.game1.price;
        gameNumber = 1;
    } else if (game2Modal && game2Modal.classList.contains('show')) {
        gameType = 'Mega Win';
        price = GAME_CONFIG.game2.price;
        gameNumber = 2;
    } else if (game3Modal && game3Modal.classList.contains('show')) {
        gameType = 'Quick Play';
        price = GAME_CONFIG.game3.price;
        gameNumber = 3;
    } else if (game4Modal && game4Modal.classList.contains('show')) {
        gameType = 'Big Win';
        price = GAME_CONFIG.game4.price;
        gameNumber = 4;
    }
    
    if (!gameType) return;
    
    // Show processing modal
    const processingHTML = `
        <div class="result-container">
            <div style="margin-bottom: 20px;">
                <div class="spinner" style="margin: 0 auto;"></div>
            </div>
            
            <h3 style="color: var(--primary-neon); font-weight: 900; margin-bottom: 20px;">
                Processing Payment...
            </h3>
            
            <div style="background: rgba(0, 255, 136, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid rgba(0, 255, 136, 0.2);">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 12px;">
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Game Type</div>
                        <div style="color: white; font-weight: 600;">${gameType}</div>
                    </div>
                    <div>
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px;">Ticket Price</div>
                        <div style="color: var(--gold); font-weight: 600;">₹ ${price}</div>
                    </div>
                    <div style="grid-column: 1 / -1;">
                        <div style="color: var(--tertiary-neon); margin-bottom: 4px; text-transform: uppercase;">Ticket Number</div>
                        <div style="color: var(--primary-neon); font-weight: 600; font-family: monospace; word-break: break-all;">${ticketNumber}</div>
                    </div>
                </div>
            </div>
            
            <p style="color: rgba(255, 255, 255, 0.6); font-size: 12px; text-align: center;">
                <i class="fas fa-lock"></i> Please wait while we process your payment...
            </p>
        </div>
    `;
    
    // Insert into the result div
    const game1Result = document.getElementById('game1Result');
    const game2Result = document.getElementById('game2Result');
    const game3Result = document.getElementById('game3Result');
    const game4Result = document.getElementById('game4Result');
    
    let resultDiv;
    if (gameNumber === 1) resultDiv = game1Result;
    else if (gameNumber === 2) resultDiv = game2Result;
    else if (gameNumber === 3) resultDiv = game3Result;
    else if (gameNumber === 4) resultDiv = game4Result;
    
    if (resultDiv) {
        resultDiv.innerHTML = processingHTML;
        resultDiv.style.display = 'block';
        
        // Hide content
        const contentDivId = gameNumber === 1 ? 'game1Content' : 
                              gameNumber === 2 ? 'game2Content' :
                              gameNumber === 3 ? 'game3Content' : 'game4Content';
        const contentDiv = document.getElementById(contentDivId);
        if (contentDiv) {
            contentDiv.style.display = 'none';
        }
        
        // Auto-complete payment after 1 minute (60 seconds)
        setTimeout(() => {
            const paymentId = 'pay_' + Math.random().toString(36).substring(2, 11).toUpperCase();
            
            if (gameNumber === 1) {
                handleGame1TicketPaymentSuccess(GAME_CONFIG.game1.price / 100, paymentId);
            } else if (gameNumber === 2) {
                handleGame2TicketPaymentSuccess(GAME_CONFIG.game2.price / 100, paymentId);
            } else if (gameNumber === 3) {
                handleGame3TicketPaymentSuccess(GAME_CONFIG.game3.price / 100, paymentId);
            } else if (gameNumber === 4) {
                handleGame4TicketPaymentSuccess(GAME_CONFIG.game4.price / 100, paymentId);
            }
        }, 60000); // 1 minute in milliseconds
    }
}

// Add some demo data
console.log('Game Configuration:', GAME_CONFIG);
console.log('Initial Balance:', gameState.balance);




