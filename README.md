# 🎰 LuckPlay - Mobile Gaming Platform

A modern, mobile-first gaming website featuring instant win games with Razorpay payment integration.

## 📋 Features

### 🎯 Core Features
- **Instant Win Game** - ₹10 ticket, up to ₹1 Lakh prize
- **Mega Win Game** - ₹100 ticket, up to ₹10 Lakh prize
- **Mobile-First Responsive Design** - Optimized for all devices
- **Real-Time Payment Integration** - Razorpay payment gateway
- **Unique Ticket Generation** - Auto-generated ticket numbers
- **Win/Loss Result Display** - Instant results with animations

### 🎨 Design Features
- **Neon Gaming UI** - Vibrant gradient colors (#00ff88, #ff006e, #00d4ff)
- **Bootstrap Components** - Responsive grid system
- **Smooth Animations** - Floating cards, pulse effects, smooth transitions
- **Dark Theme** - Eye-friendly dark background with neon accents
- **Bold Typography** - Large CTA buttons, clean typography
- **Card-Based Layout** - Modern game cards with hover effects

### 💰 Game Features
- Real-time balance display
- Ticket tracking system
- Payment ID logging
- Prize calculation
- Auto-deduction of ticket price
- Instant payout display

## 🚀 Quick Start

### Installation
1. Extract the files to your web server or local directory
2. No backend required - frontend demo version works standalone

### Files Included
- `index.html` - Main HTML structure with Bootstrap framework
- `app.js` - Game logic and JavaScript functionality
- `README.md` - This documentation file

### Running Locally
```bash
# Option 1: Using Python (Python 3)
python -m http.server 8000

# Option 2: Using Node.js (http-server)
npx http-server

# Option 3: Using Live Server in VS Code
# Install "Live Server" extension and right-click index.html > Open with Live Server
```

Then open: `http://localhost:8000/index.html`

## 🎮 How to Play

### Instant Win (Game 1)
1. Click **PAY & PLAY** button
2. Complete secure payment (₹10)
3. Get unique ticket number instantly
4. See WIN/LOSE result immediately
5. Prize credited to your wallet if you win

### Mega Win (Game 2)
1. Click **OPEN TICKET** button
2. Complete secure payment (₹100)
3. Get unique ticket number instantly
4. See result with prize amount
5. Limited to 49 tickets per draw

## 💳 Payment Integration

### Razorpay Setup (For Real Payments)

1. **Create Razorpay Account**
   - Visit: https://razorpay.com/
   - Sign up and verify your account
   - Get your API Key

2. **Update API Key in `app.js`**
   ```javascript
   // Find this line in simulatePayment function or initiateRazorpayPayment
   key: 'rzp_live_YOUR_API_KEY_HERE'
   ```

3. **Enable Real Payment Mode**
   - Comment out the `simulatePayment()` call
   - Uncomment the real Razorpay integration code

### Demo Mode (Current)
The application runs in **demo mode** by default:
- Simulates payment processing
- No actual charges
- Uses random prize calculation
- Perfect for testing UI/UX

## 🎨 Customization

### Colors & Branding
Modify CSS variables in `index.html`:
```css
:root {
    --primary-neon: #00ff88;      /* Green neon */
    --secondary-neon: #ff006e;    /* Pink neon */
    --tertiary-neon: #00d4ff;     /* Cyan neon */
    --dark-bg: #0a0e27;           /* Dark background */
    --card-bg: #1a1f3a;           /* Card background */
    --gold: #ffd700;              /* Gold accent */
}
```

### Game Configuration
Modify `app.js`:
```javascript
const GAME_CONFIG = {
    game1: {
        price: 10,              // Ticket price in ₹
        maxPrize: 100000,       // Maximum prize in ₹
        winRate: 0.5            // 50% win rate
    },
    game2: {
        price: 100,
        maxPrize: 1000000,
        totalTickets: 49,
        winRate: 0.2            // 20% win rate
    }
};
```

### Prize Pools
Modify prize calculations in `calculatePrize()` function:
```javascript
const prizes = [0, 50, 100, 500, 1000, 5000, 10000, 50000, 100000];
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px
- **Full Screen Modal**: < 576px

## 🔒 Security Notes

### Demo Version
- ✅ No actual payments processed
- ✅ No sensitive data stored
- ✅ Perfect for testing and demo

### Production Deployment
Before going live:
- [ ] Integrate real Razorpay API
- [ ] Add backend validation
- [ ] Implement database for transactions
- [ ] Add user authentication
- [ ] Add fraud detection
- [ ] Comply with gaming regulations
- [ ] Add SSL certificate (HTTPS)
- [ ] Implement responsible gaming features
- [ ] Add transaction logging
- [ ] Set up error tracking

## 📊 Game Logic

### Win Determination
```javascript
// Random win/loss based on configured win rate
const random = Math.random();
const isWin = random < config.winRate;
```

### Prize Calculation
- Game 1: Random selection from preset prize pool
- Game 2: Higher prize pool with lower win rate
- Prize = 0 if lost, calculated amount if won

### Ticket Generation
```javascript
// Format: LUCK-[TIMESTAMP]-[RANDOM]
// Example: LUCK-4FC5P1Z-A7K9
```

## 🎬 Animation Effects

- **Floating Cards** - Subtle up-down movement
- **Pulse Glow** - Neon glow pulse effect
- **Hover Effects** - Scale and shadow on card hover
- **Smooth Transitions** - 0.3s ease transitions
- **Loading Spinner** - Animated during payment

## 📦 Dependencies

- **Bootstrap 5.3.0** - CSS framework
- **Font Awesome 6.4.0** - Icons
- **Razorpay SDK** - Payment gateway (optional for demo)

All dependencies loaded via CDN - no npm installation required!

## 🖥️ Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Demo Workflow

1. Open `index.html` in browser
2. View balance (₹500 initial demo balance)
3. Click "PAY & PLAY" on Instant Win game
4. Simulate payment (2-3 second delay)
5. See generated ticket number
6. View WIN/LOSE result with prize
7. Balance updates automatically
8. Repeat for Mega Win game (49 limited tickets)

## 🚀 Deployment

### Hosting Options

**GitHub Pages** (Free)
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
# Enable GitHub Pages in repository settings
```

**Netlify** (Free)
- Drag and drop folder to netlify.com
- Deploy instantly

**Vercel** (Free)
```bash
npx vercel
```

**Traditional Hosting**
- Upload files via FTP to your hosting provider
- Access via your domain

## 📞 Support

### Common Issues

**Q: Payment not working?**
- A: You're in demo mode. Add real Razorpay API key to enable actual payments.

**Q: Responsive not working?**
- A: Clear browser cache (Ctrl+Shift+Del) and refresh.

**Q: Games not responding?**
- A: Check browser console for errors (F12 > Console).

## 📄 Legal Disclaimer

⚠️ **This is a demonstration/educational project.** 

For production use with real money:
- Must comply with local gaming laws and regulations
- Requires proper licensing and permits
- Must implement responsible gaming features
- Requires proper KYC/AML verification
- Must handle real payments securely
- Requires privacy policy and terms of service

## 🎓 Learning Resources

- Bootstrap Documentation: https://getbootstrap.com/
- Razorpay Documentation: https://razorpay.com/docs/
- Font Awesome Icons: https://fontawesome.com/
- CSS Gradients: https://www.w3schools.com/css/css3_gradients.asp

## ✨ Features Roadmap

- [ ] User authentication & login
- [ ] Transaction history
- [ ] Referral system
- [ ] Leaderboard
- [ ] Daily challenges
- [ ] Multiple payment methods
- [ ] Admin dashboard
- [ ] Real-time notifications
- [ ] Social sharing
- [ ] Loyalty rewards program

## 📄 License

Open source for educational and learning purposes.

---

**Built with ❤️ for modern gaming platforms**

*LuckPlay Gaming Platform v1.0*
# vipmetro360.info
