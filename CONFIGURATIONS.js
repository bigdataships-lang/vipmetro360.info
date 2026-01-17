/**
 * LuckPlay Configuration Examples
 * Copy and modify these configurations to customize your gaming platform
 */

// ============================================================================
// BASIC GAME CONFIGURATION
// ============================================================================

// Example 1: Increase Win Rates (More Beginner Friendly)
const BEGINNER_FRIENDLY = {
    game1: {
        name: 'Instant Win',
        price: 10,
        maxPrize: 100000,
        winRate: 0.8  // 80% - Very generous
    },
    game2: {
        name: 'Mega Win',
        price: 100,
        maxPrize: 1000000,
        totalTickets: 49,
        winRate: 0.5  // 50% - Even odds
    }
};

// Example 2: Realistic Casino Odds
const CASINO_ODDS = {
    game1: {
        name: 'Instant Win',
        price: 10,
        maxPrize: 100000,
        winRate: 0.35  // 35% - Realistic
    },
    game2: {
        name: 'Mega Win',
        price: 100,
        maxPrize: 1000000,
        totalTickets: 49,
        winRate: 0.15  // 15% - Harder to win
    }
};

// Example 3: High Roller Configuration
const HIGH_ROLLER = {
    game1: {
        name: 'Premium Spin',
        price: 500,
        maxPrize: 5000000,
        winRate: 0.3
    },
    game2: {
        name: 'VIP Jackpot',
        price: 1000,
        maxPrize: 50000000,
        totalTickets: 25,
        winRate: 0.25
    }
};

// ============================================================================
// PRIZE POOL CONFIGURATIONS
// ============================================================================

// Example 1: Small Prize Pool
const SMALL_PRIZES = {
    game1: [0, 10, 20, 50, 100, 500, 1000, 5000],
    game2: [0, 50, 100, 500, 1000, 5000, 10000, 50000]
};

// Example 2: Medium Prize Pool (Current Default)
const MEDIUM_PRIZES = {
    game1: [0, 50, 100, 500, 1000, 5000, 10000, 50000, 100000],
    game2: [0, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000]
};

// Example 3: Large Prize Pool
const LARGE_PRIZES = {
    game1: [0, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000],
    game2: [0, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000]
};

// Example 4: Progressive Jackpot
const PROGRESSIVE_PRIZES = {
    game1: [0, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 250000, 500000],
    game2: [0, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 10000000]
};

// ============================================================================
// COLOR THEMES
// ============================================================================

// Example 1: Default Neon (Current)
const NEON_THEME = {
    primaryNeon: '#00ff88',      // Green
    secondaryNeon: '#ff006e',    // Pink
    tertiaryNeon: '#00d4ff',     // Cyan
    darkBg: '#0a0e27',
    cardBg: '#1a1f3a',
    gold: '#ffd700'
};

// Example 2: Purple Haze
const PURPLE_THEME = {
    primaryNeon: '#b41dff',      // Purple
    secondaryNeon: '#ff1d8e',    // Magenta
    tertiaryNeon: '#00d4ff',     // Cyan
    darkBg: '#1a0033',
    cardBg: '#330066',
    gold: '#ffaa00'
};

// Example 3: Ocean Vibes
const OCEAN_THEME = {
    primaryNeon: '#00d4ff',      // Cyan
    secondaryNeon: '#0099ff',    // Blue
    tertiaryNeon: '#00ff88',     // Green
    darkBg: '#001122',
    cardBg: '#0a2847',
    gold: '#ffdd00'
};

// Example 4: Fire & Gold
const FIRE_THEME = {
    primaryNeon: '#ff6600',      // Orange
    secondaryNeon: '#ff0000',    // Red
    tertiaryNeon: '#ffaa00',     // Gold
    darkBg: '#1a0000',
    cardBg: '#330000',
    gold: '#ffdd00'
};

// Example 5: Matrix Green
const MATRIX_THEME = {
    primaryNeon: '#00ff00',      // Bright Green
    secondaryNeon: '#00dd00',    // Dark Green
    tertiaryNeon: '#00ff88',     // Light Green
    darkBg: '#000000',
    cardBg: '#001100',
    gold: '#00ff00'
};

// ============================================================================
// RAZORPAY CONFIGURATIONS
// ============================================================================

// Example 1: Development Setup
const RAZORPAY_DEV = {
    key: 'rzp_test_YOUR_TEST_KEY_HERE',
    theme: '#00ff88',
    currency: 'INR',
    description: 'LuckPlay Gaming - Test Mode'
};

// Example 2: Production Setup
const RAZORPAY_PROD = {
    key: 'rzp_live_YOUR_LIVE_KEY_HERE',
    theme: '#00ff88',
    currency: 'INR',
    description: 'LuckPlay Gaming - Live'
};

// Example 3: International Setup (Multiple Currencies)
const RAZORPAY_INTERNATIONAL = {
    IN: { key: 'rzp_live_IN_KEY', currency: 'INR' },
    US: { key: 'rzp_live_US_KEY', currency: 'USD' },
    UK: { key: 'rzp_live_UK_KEY', currency: 'GBP' }
};

// ============================================================================
// GAME SCENARIOS
// ============================================================================

// Scenario 1: Demo Mode (User Testing)
const DEMO_MODE = {
    // High win rate for testing
    game1: { price: 10, winRate: 0.7, maxPrize: 100000 },
    game2: { price: 100, winRate: 0.5, maxPrize: 1000000 },
    // Realistic prizes
    prizes1: [0, 100, 500, 1000, 5000, 10000],
    prizes2: [0, 500, 1000, 5000, 10000, 50000]
};

// Scenario 2: Marketing Launch (Attract Players)
const MARKETING_LAUNCH = {
    // Generous odds initially
    game1: { price: 5, winRate: 0.6, maxPrize: 100000 },
    game2: { price: 50, winRate: 0.4, maxPrize: 1000000 },
    // Attractive prizes
    prizes1: [0, 50, 200, 500, 5000, 50000, 100000],
    prizes2: [0, 100, 500, 2000, 10000, 50000, 1000000]
};

// Scenario 3: Mature Platform (Balanced)
const BALANCED_PLATFORM = {
    game1: { price: 10, winRate: 0.35, maxPrize: 100000 },
    game2: { price: 100, winRate: 0.20, maxPrize: 1000000 },
    prizes1: [0, 50, 100, 500, 1000, 5000, 10000, 50000, 100000],
    prizes2: [0, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000]
};

// Scenario 4: Revenue Optimized (House Friendly)
const REVENUE_OPTIMIZED = {
    game1: { price: 20, winRate: 0.25, maxPrize: 100000 },
    game2: { price: 200, winRate: 0.10, maxPrize: 1000000 },
    prizes1: [0, 20, 50, 100, 500, 1000, 5000, 20000],
    prizes2: [0, 50, 200, 500, 2000, 5000, 20000, 100000, 500000]
};

// ============================================================================
// BUTTON & CTA CONFIGURATIONS
// ============================================================================

// Example CTA Button Styles
const CTA_STYLES = {
    primary: {
        background: 'linear-gradient(90deg, var(--primary-neon), var(--tertiary-neon))',
        color: 'var(--dark-bg)',
        boxShadow: '0 8px 25px rgba(0, 255, 136, 0.4)'
    },
    secondary: {
        background: 'linear-gradient(90deg, var(--secondary-neon), var(--gold))',
        color: 'var(--dark-bg)',
        boxShadow: '0 8px 25px rgba(255, 0, 110, 0.4)'
    },
    special: {
        background: 'linear-gradient(90deg, var(--gold), var(--tertiary-neon))',
        color: 'var(--dark-bg)',
        boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)'
    }
};

// ============================================================================
// ANIMATION CONFIGURATIONS
// ============================================================================

// Example Animation Timings
const ANIMATIONS = {
    default: {
        duration: '0.3s',
        easing: 'ease',
        delay: '0s'
    },
    slow: {
        duration: '0.6s',
        easing: 'ease-in-out',
        delay: '0.1s'
    },
    fast: {
        duration: '0.15s',
        easing: 'ease-out',
        delay: '0s'
    },
    floating: {
        duration: '3s',
        easing: 'ease-in-out',
        delay: '0s'
    },
    pulse: {
        duration: '2s',
        easing: 'linear',
        delay: '0s'
    }
};

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

const BREAKPOINTS = {
    mobile: 480,        // < 480px
    tablet: 768,        // 480px - 768px
    desktop: 1024,      // 768px - 1024px
    wide: 1440,         // > 1024px
    ultra: 1920         // Ultra-wide displays
};

// ============================================================================
// LOCALIZATION / MULTI-LANGUAGE
// ============================================================================

const TRANSLATIONS = {
    en: {
        gameTitle1: 'Instant Win',
        gameTitle2: 'Mega Win',
        payButton: 'PAY & PLAY',
        openButton: 'OPEN TICKET',
        ticketPrice: 'Ticket Price',
        won: 'YOU WON!',
        lost: 'TOUGH LUCK',
        copyTicket: 'Copy Ticket Number'
    },
    hi: {
        gameTitle1: 'तुरंत जीतें',
        gameTitle2: 'मेगा जीतें',
        payButton: 'भुगतान करें और खेलें',
        openButton: 'टिकट खोलें',
        ticketPrice: 'टिकट की कीमत',
        won: 'आप जीत गए!',
        lost: 'बहुत बुरी किस्मत',
        copyTicket: 'टिकट नंबर कॉपी करें'
    }
};

// ============================================================================
// SECURITY & COMPLIANCE
// ============================================================================

const SECURITY_CONFIG = {
    minAge: 18,
    maxBetPerDay: 100000,
    maxBetPerGame: 10000,
    sessionTimeout: 30,  // minutes
    requiresVerification: true,
    enableKYC: true,
    enableAML: true
};

const COMPLIANCE = {
    termsUrl: '/terms',
    privacyUrl: '/privacy',
    disclaimerText: 'Play responsibly. 18+ only.',
    responsibleGamingUrl: '/responsible-gaming',
    selfExclusionUrl: '/self-exclude'
};

// ============================================================================
// ANALYTICS EVENTS
// ============================================================================

const ANALYTICS_EVENTS = {
    PAGE_LOAD: 'page_load',
    GAME_STARTED: 'game_started',
    PAYMENT_INITIATED: 'payment_initiated',
    PAYMENT_COMPLETED: 'payment_completed',
    PAYMENT_FAILED: 'payment_failed',
    GAME_WON: 'game_won',
    GAME_LOST: 'game_lost',
    PRIZE_CLAIMED: 'prize_claimed',
    USER_LOGOUT: 'user_logout'
};

// ============================================================================
// FEATURE FLAGS
// ============================================================================

const FEATURE_FLAGS = {
    RAZORPAY_ENABLED: true,
    DEMO_MODE: true,
    ANIMATIONS_ENABLED: true,
    SOUND_EFFECTS_ENABLED: false,
    NOTIFICATIONS_ENABLED: true,
    LEADERBOARD_ENABLED: false,
    REFERRAL_SYSTEM_ENABLED: false,
    LOYALTY_REWARDS_ENABLED: false
};

// ============================================================================
// HOW TO USE THESE CONFIGURATIONS
// ============================================================================

/*
1. GAME CONFIGURATION:
   - Choose a config (BEGINNER_FRIENDLY, CASINO_ODDS, etc.)
   - In app.js, replace GAME_CONFIG with chosen config
   - Restart the application

2. COLORS:
   - Choose a theme (NEON_THEME, PURPLE_THEME, etc.)
   - Update CSS variables in index.html <style>
   - All colors will automatically update

3. PRIZES:
   - Choose prize pool (SMALL_PRIZES, LARGE_PRIZES, etc.)
   - Update calculatePrize() function in app.js
   - Replace arrays in each case statement

4. SCENARIOS:
   - Select scenario for your use case
   - Apply recommended configurations
   - Test thoroughly before deployment

Example Integration:
    
    // In app.js, replace GAME_CONFIG with:
    const GAME_CONFIG = DEMO_MODE;
    
    // Or for production:
    const GAME_CONFIG = BALANCED_PLATFORM;
*/

// ============================================================================
// EXPORT FOR USE
// ============================================================================

// Uncomment to use as module:
// export { BEGINNER_FRIENDLY, CASINO_ODDS, HIGH_ROLLER, ... };
