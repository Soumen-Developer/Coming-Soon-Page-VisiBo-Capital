# 🚀 Visibo Capital - Coming Soon Page

<div align="center">

![Visibo Capital](https://img.shields.io/badge/Visibo-Capital-F37916?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJMMiAyMmgyMEwxMiAyeiIvPjwvc3ZnPg==)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite)
![PageSpeed](https://img.shields.io/badge/PageSpeed-86%2F100-4CAF50?style=for-the-badge)

**A stunning, animated coming soon page for Visibo Capital - an investment advisory platform.**

[Live Demo](https://visibocapital.com) • [Report Bug](https://github.com/Soumen-Developer/Coming-Soon-Page-VisiBo-Capital/issues) • [Request Feature](https://github.com/Soumen-Developer/Coming-Soon-Page-VisiBo-Capital/issues)

</div>

---

## ✨ Features

### 🎬 Stunning Animations
- **Intro Animation** - Smooth logo reveal with text slide-in effect
- **Coming Soon Splash** - Animated typography with particle effects
- **Rotating Text** - Dynamic word cycling (CLARITY → CONFIDENCE → CONTROL)
- **CountUp Stats** - Animated number counters in the footer

### 📱 Fully Responsive
- Optimized for desktop, tablet, and mobile devices
- Flexbox-based centering for consistent layouts
- Adaptive typography using CSS clamp()

### 📧 Contact Form with Email & Google Sheets
- **PHPMailer Integration** - Professional HTML email templates
- **Google Sheets Sync** - Auto-save leads to spreadsheet
- **Real-time Validation** - Name, email, and phone validation
- **Beautiful Modal** - Glassmorphism design with animations

### 🔍 SEO Optimized
- **PageSpeed Score**: 86 (Desktop) / 70 (Mobile)
- GZIP compression
- Browser caching headers
- Security headers (XSS, Clickjacking protection)
- robots.txt with crawl directives

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | CSS3, Framer Motion |
| **Backend** | PHP (PHPMailer) |
| **Email** | Gmail SMTP |
| **Database** | Google Sheets (via Apps Script) |
| **Hosting** | Hostinger |

---

## 📦 Project Structure

```
coming-soon-visibo/
├── public/
│   ├── .htaccess          # Apache config (SEO, caching, security)
│   ├── robots.txt         # Search engine directives
│   ├── submit_contact.php # Form submission handler
│   └── PHPMailer/         # Email library
├── src/
│   ├── components/
│   │   ├── IntroAnimation.tsx    # Logo intro sequence
│   │   ├── ComingSoonContent.tsx # Main content & stats
│   │   ├── HeroBackground.tsx    # Animated background
│   │   ├── Form.tsx              # Waitlist modal
│   │   ├── StockTicker.tsx       # Bottom ticker
│   │   └── MouseGradient.tsx     # Cursor effects
│   ├── App.tsx
│   └── main.tsx
├── hostinger_deploy_bundle/  # Production build
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PHP 8.2+ (for local form testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/Soumen-Developer/Coming-Soon-Page-VisiBo-Capital.git

# Navigate to project
cd Coming-Soon-Page-VisiBo-Capital

# Install dependencies
npm install

# Start development server
npm run dev
```

### Local Testing with PHP

```bash
# Run PHP server for form testing
php -S localhost:8080 -t public

# Run Vite dev server with network access
npx vite --host
```

---

## 🔧 Configuration

### Email Setup (submit_contact.php)
```php
$mail->Username = 'your-email@gmail.com';
$mail->Password = 'your-app-password';  // Gmail App Password
```

### Google Sheets Integration
1. Create a Google Sheet with columns: Timestamp | Name | Email | Phone | Message
2. Go to Extensions → Apps Script
3. Deploy as Web App
4. Update the URL in `submit_contact.php`

---

## 📤 Deployment

### Build for Production
```bash
npm run build
```

### Hostinger Deployment
1. Upload contents of `hostinger_deploy_bundle/` to `public_html`
2. Enable SSL and uncomment HTTPS redirect in `.htaccess`
3. Test form submission and email delivery

---

## 📊 Performance

| Metric | Desktop | Mobile |
|--------|---------|--------|
| **PageSpeed Score** | 86 | 70 |
| **First Contentful Paint** | ~1.2s | ~2.1s |
| **Largest Contentful Paint** | ~2.5s | ~4.2s |

### Optimization Tips
- Convert hero images to WebP format
- Enable lazy loading for background images
- Use image preloading for critical assets

---

## 🎨 Design Features

- **Color Palette**: Dark teal (#0f3949) with orange accent (#F37916)
- **Typography**: Cinzel (headings) + Urbanist (body)
- **Effects**: Glassmorphism, gradient overlays, particle animations
- **Micro-interactions**: Hover effects, smooth transitions

---

## 📄 License

This project is proprietary software owned by **Visibo Capital**.

---

## 👨‍💻 Author

**Soumen Developer**

- GitHub: [@Soumen-Developer](https://github.com/Soumen-Developer)

---

<div align="center">

Made with Code for Visibo Capital**

</div>
