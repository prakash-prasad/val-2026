# Infinite Love - Interactive Valentine's Gift 💖

A lightweight, branching narrative gift application built for Valentine's Day 2026. This app guides users through a playful story that culminates in a celebratory "Yes" moment with hearts and confetti.

![Version](https://img.shields.io/badge/version-1.1-red)
![PRD Compliance](https://img.shields.io/badge/PRD%20Compliance-100%25-brightgreen)

---

## ✨ Features

- **🎭 Interactive Story:** Branching narrative paths based on Yes/No choices
- **🏃 Evasive "No" Button:** A playful mechanic where the No button runs away from your cursor (100px proximity detection!)
- **🎉 Celebration Mode:** Heart and star confetti explosion upon completion
- **📱 Fully Responsive:** Optimized for mobile and desktop screens
- **⚡ Lightning Fast:** <2 second load time, no backend required
- **♿ Accessible:** Keyboard navigation and reduced motion support
- **🛡️ Validated:** Built-in configuration validation prevents errors

---

## 🚀 Quick Start

### Option 1: Open Locally
1. Download this repository
2. Open `index.html` in any modern web browser
3. Enjoy the interactive experience!

### Option 2: Host Online (Recommended for Sharing)
See **Deployment** section below for free hosting options.

---

## 📦 What's Included

```
infinite-love-app/
├── index.html          # Main HTML structure
├── styles.css          # Custom styling and animations
├── story.js            # Story configuration and validation
├── engine.js           # Narrative engine and interaction logic
└── README.md           # This file
```

---

## 🌐 Deployment

This project requires **no backend or server**. You can host it for free on multiple platforms:

### **GitHub Pages** (Recommended for Permanence)

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to **Settings** → **Pages**
4. Under "Source", select **Deploy from branch** (main)
5. Your site will be live at: `https://username.github.io/repo-name/`

**Advantages:**
- Permanent hosting
- Version control
- Custom domain support
- Free SSL certificate

### **Claude Artifacts** (Fastest Deployment)

1. Open Claude.ai
2. Upload all files or paste the code
3. Ask: "Create an artifact with this Valentine's gift app"
4. Click **Publish** to get a shareable link

**Advantages:**
- Instant deployment (< 1 minute)
- No GitHub account needed
- Perfect for quick sharing

### **Other Free Hosts**
- **Netlify Drop:** Drag and drop folder at [drop.netlify.com](https://drop.netlify.com)
- **Vercel:** Connect GitHub repo or upload via CLI
- **Surge:** `npm install -g surge` then `surge` in project directory

---

## 🎨 Customization Guide

### Changing the Story

Edit `story.js` to customize images, text, and flow:

```javascript
"stage1": {
    "image": "YOUR_IMAGE_URL_HERE",           // Any GIF or image URL
    "wittyLine": "Your custom headline",       // Main text (large, bold)
    "question": "Your yes/no question?",       // Question text
    "yes_target": "next_node_id",              // Where "Yes" leads
    "no_target": "other_node_id",              // Where "No" leads
    "isTerminal": false                        // Is this the end?
}
```

### Adding More Stages

1. Add a new node object in `story.js`:

```javascript
"stage4": {
    "image": "https://media.giphy.com/media/YOUR_GIF/giphy.gif",
    "wittyLine": "Another romantic moment...",
    "question": "Keep going?",
    "yes_target": "stage5",
    "no_target": "ending_no",
    "isTerminal": false
}
```

2. Update previous stage's `yes_target` or `no_target` to point to `"stage4"`
3. The configuration will auto-validate on page load!

### Finding Good GIFs

**Recommended Sources:**
- [GIPHY](https://giphy.com) - Search "love", "heart", "valentine", "cute"
- [Tenor](https://tenor.com) - Popular reaction GIFs
- Use the "Copy Link" → "GIF Link" option for direct URLs

**Pro Tips:**
- Keep file size under 2MB for fast loading
- Test on mobile to ensure GIF is readable
- Use 500-600px width for best quality/size balance

### Changing Colors

Edit the Tailwind config in `index.html`:

```javascript
colors: {
    primary: '#YOUR_COLOR',   // Yes button, accents
    secondary: '#YOUR_COLOR', // No button, secondary elements
    accent: '#YOUR_COLOR',    // Confetti, highlights
}
```

Or edit CSS directly in `styles.css`:

```css
.btn-primary {
    background-color: #YOUR_COLOR;
    border: 2px solid #YOUR_COLOR;
}
```

---

## 🔧 Technical Details

### Browser Compatibility
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+ (iOS and macOS)
- ✅ Samsung Internet 14+

### Performance Specs
- **Bundle Size:** ~12KB (excluding images)
- **Load Time:** <2s on 4G
- **Transitions:** 300ms fade animations
- **Confetti Duration:** 3 seconds

### Dependencies
All loaded via CDN (no npm install needed):
- [Tailwind CSS](https://tailwindcss.com) - Utility-first styling
- [canvas-confetti](https://github.com/catdad/canvas-confetti) - Celebration effects
- [Google Fonts](https://fonts.google.com) - Pacifico & Inter

---

## 🐛 Troubleshooting

### Images Won't Load
- Check that image URLs are direct links (ending in .gif, .jpg, .png)
- Ensure URLs use HTTPS (not HTTP)
- Test URLs by pasting them directly into your browser

### Confetti Doesn't Appear
- Check browser console for errors (F12 → Console tab)
- Verify that `canvas-confetti` CDN loaded successfully
- Ensure terminal node has `"isTerminal": true`

### Button Jumps Outside Container
- This was fixed in v1.1 - make sure you're using the corrected `engine.js`
- Button repositioning now respects 20px margins

### Evasive Button Too Easy to Click
- Check that you're on the **final question** node
- The 100px proximity detection only activates when the Yes path leads to a terminal node

---

## 📝 Version History

**v1.1** (Current) - February 2026
- ✅ Fixed evasive button activation logic
- ✅ Added 100px proximity detection
- ✅ Corrected boundary calculations
- ✅ Added image error handling
- ✅ Fixed confetti timing
- ✅ Improved touch event handling
- ✅ Added configuration validation
- ✅ 100% PRD compliance achieved

**v1.0** - Initial Release
- Basic branching narrative
- Confetti celebration
- Responsive design

---

## 🤝 Contributing

This is a personal gift project, but you're welcome to:
- Fork and customize for your own use
- Submit bug reports via GitHub Issues
- Share improvements or creative story variations

---

## 📄 License

MIT License - Feel free to use, modify, and share!

---

## 💡 Tips for Maximum Impact

1. **Personalize the Story:** Use inside jokes, references to shared memories, or your partner's favorite GIFs
2. **Test on Their Device:** Make sure it works on whatever device they'll use (phone, tablet, laptop)
3. **Share at the Right Moment:** Send the link when you're together or during a special time
4. **Add a Custom Domain:** Use a service like Namecheap to get a personalized URL like `mylove.com`
5. **Screenshot the Final Page:** Save the "Yes" confetti moment as a keepsake

---

## ❤️ Made with Love

This app was built to help you create a memorable digital Valentine's gift. May it bring joy and smiles to someone special!

**Happy Valentine's Day! 💖**

---

## 📞 Support

Questions? Issues? Ideas?
- Check the troubleshooting section above
- Review `CODE_REVIEW.md` for technical details
- Open an issue on GitHub

---

*Last Updated: February 4, 2026*
