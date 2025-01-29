# Team Lottery App 🎲

A stylish web application for conducting team lottery draws, featuring smooth animations and an Apple-inspired design aesthetic.

## 🌐 Live Demo

Visit the live application: [Team Lottery App](https://akipinnote.github.io/lottery-app-Roo/)

![Team Lottery App Screenshot](screenshot.png)

## ✨ Features

- **One-Click Lottery Draw**: Simple and intuitive interface
- **Elegant Animations**: 
  - Slot machine-style spinning effect
  - Smooth transitions
  - Visual feedback with flash effects
- **Modern Design**:
  - Apple-inspired minimalist UI
  - Responsive layout for all devices
  - Clean typography using SF Pro Display
- **Real-time Results**: Instant display of lottery results
- **Accessibility**: Optimized for keyboard and screen reader use

## 🛠 Technical Details

Built with modern web technologies:
- HTML5
- CSS3 with Grid and Flexbox
- Vanilla JavaScript (ES6+)
- Hardware-accelerated animations

### Performance Optimizations
- CSS Grid for precise layouts
- Transform3D for hardware acceleration
- Efficient DOM manipulation
- Optimized animation timing

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/akipinnote/lottery-app-Roo.git
```

2. Open in your browser:
```bash
cd lottery-app-Roo
open index.html
```

No build process or dependencies required! The app runs directly in the browser.

## 📱 Usage

1. Open the application in any modern web browser
2. Click the "Draw Lots" button
3. Watch the animated lottery draw
4. See results displayed for all team members
5. Click "Draw Again" for another round

## 💻 Development

### Project Structure
```
lottery-app/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Styles and animations
├── js/
│   └── main.js        # Core functionality
└── tests/             # Selenium tests
```

### Running Tests
```bash
# Setup Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run tests
python -m unittest tests/test_lottery.py
```

### Key Components

- **Slot Animation System**: 
  - CSS Grid-based layout
  - Transform-based animations
  - Precise timing controls

- **Result Generation**:
  - Fisher-Yates shuffle algorithm
  - Synchronized animations
  - Error handling

## 🔧 Customization

To modify the participant list, edit the array in `js/main.js`:
```javascript
const participants = ['Ueda', 'Ojima', 'Maruo', 'Mimura', 'Abe'];
```

## 📄 License

MIT License - feel free to use and modify for your needs.

## 👥 Contributors

- Initial development: Roo
- Design inspiration: Apple.com

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.