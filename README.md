# LLM Pokemon Battle 🎮⚡

A complete Pokemon-style battle parody game featuring the world's major Large Language Models as fighters! Experience authentic 16-bit Pokemon Red/Blue gameplay with turn-based combat, signature moves, and retro styling.

[![Play Now](https://img.shields.io/badge/▶️%20Play%20Now-Live%20Game-gold?style=for-the-badge)](https://llm-pokemon-battle-morphvm-2kaypp5n.http.cloud.morph.so)

![LLM Pokemon Battle Screenshot](https://github.com/oscar-fern-labs/llm-pokemon-battle-final/raw/master/screenshot.png)

## 🎯 Game Features

### 🤖 8 Unique LLM Fighters
- **🤖 Claude-3.5** (Reasoning Type) - Constitutional AI, Chain of Thought
- **💬 ChatGPT-4** (Conversational Type) - Creative Burst, Role Play
- **💎 Gemini-Pro** (Multimodal Type) - Vision Processing, Search Integration  
- **😏 Grok-2** (Rebellious Type) - Sarcastic Strike, Unfiltered Truth
- **🦙 Llama-70B** (Open Type) - Open Source Spirit, Meta Magic
- **🧠 Kimi-Chat** (Memory Type) - Long Context, Memory Palace
- **🌪️ Mistral-Large** (Efficient Type) - Mixture of Experts, French Finesse
- **🏮 Qwen-72B** (Eastern Type) - Eastern Wisdom, Cultural Bridge

### ⚔️ Authentic Pokemon Battle System
- **Turn-based combat** with move selection menu
- **Real health bars** that decrease with damage
- **Type effectiveness** system (e.g., "It's super effective!")
- **32 signature moves** total (4 unique moves per LLM)
- **Damage calculations** with attack/defense stats
- **Critical hits** and **miss chances**
- **Battle animations** with screen shake and damage flash effects

### 🎨 True 16-Bit Pokemon Aesthetics
- **Pixel-perfect retro styling** matching Pokemon Red/Blue
- **Press Start 2P** authentic pixelated font
- **Dark blue gradient backgrounds** like classic Pokemon
- **Golden selection borders** and hover effects
- **Proper Pokemon UI colors** and layout
- **Animated sprites** with floating effects
- **Typing text animations** for battle messages

### 🎮 Complete Game Flow
1. **Title Screen** with animated LLM showcases
2. **Character Selection** with detailed stats and move previews  
3. **Battle Arena** with authentic Pokemon battle interface
4. **Turn-based Combat** with 4-move selection menu
5. **Victory/Defeat Screens** with battle results
6. **Battle Again** or return to main menu

## 🚀 Quick Start

### Play Online (Recommended)
Visit the live game: **[Play LLM Pokemon Battle](https://llm-pokemon-battle-morphvm-2kaypp5n.http.cloud.morph.so)**

### Run Locally
```bash
# Clone the repository
git clone https://github.com/oscar-fern-labs/llm-pokemon-battle-final.git
cd llm-pokemon-battle-final

# Install dependencies
npm install

# Start the server
npm start

# Open in browser
open http://localhost:3000
```

## 🎲 How to Play

1. **🎮 Start Battle** - Click the golden "START BATTLE" button
2. **🤖 Choose Fighter** - Select your LLM from 8 available options
3. **📊 View Stats** - See HP, Attack, Defense, Speed, and signature moves
4. **⚔️ Battle** - Face off against a random LLM opponent
5. **🎯 Select Moves** - Choose from 4 signature moves each turn
6. **🏆 Win or Lose** - Battle until one LLM's HP reaches 0
7. **🔄 Battle Again** - Play multiple rounds with different fighters

### 🎮 Controls
- **Mouse/Touch**: Navigate menus and select moves
- **M Key**: Toggle music on/off (currently silent mode for demo)

## 🏗️ Technical Architecture

### Frontend
- **Pure HTML5/CSS3/JavaScript** - No frameworks for maximum compatibility
- **Responsive design** - Works on desktop, tablet, and mobile
- **CSS animations** - Smooth transitions and battle effects
- **Local storage** - Saves music preferences

### Backend  
- **Node.js + Express** - Lightweight server setup
- **Static file serving** - Optimized asset delivery
- **Health check endpoint** - `/health` for monitoring

### Game Engine
- **Turn-based battle system** - Pokemon-style combat mechanics
- **Type effectiveness matrix** - Rock-paper-scissors style advantages
- **Damage calculation formula** - Based on Pokemon battle math
- **AI opponent selection** - Smart move selection algorithm

## 📂 Project Structure

```
llm-pokemon-battle-final/
├── public/
│   ├── css/
│   │   └── style.css          # Authentic Pokemon styling
│   ├── js/
│   │   ├── llm-data.js        # Fighter stats and moves
│   │   ├── battle-engine.js   # Combat mechanics  
│   │   └── game.js           # Main game controller
│   └── index.html            # Game interface
├── server.js                 # Express server
├── package.json             # Dependencies
└── README.md               # This file
```

## 🎯 LLM Fighter Details

### Stats Explanation
- **HP**: Health Points - how much damage a fighter can take
- **Attack**: Determines damage dealt with moves
- **Defense**: Reduces incoming damage
- **Speed**: Determines turn order (higher = goes first)

### Type Matchups
Each LLM has a type that affects battle effectiveness:
- **Reasoning** → Strong vs Creative, Weak vs Rebellious
- **Creative** → Strong vs Memory, Weak vs Multimodal  
- **Multimodal** → Strong vs Conversational, Weak vs Reasoning
- **And more strategic matchups...**

## 🎨 Screenshots

### Title Screen
![Title Screen](docs/title.png)

### Character Selection  
![Selection](docs/selection.png)

### Battle Interface
![Battle](docs/battle.png)

### Victory Screen
![Victory](docs/victory.png)

## 🔧 Development

### Prerequisites
- **Node.js** 14+ 
- **npm** 6+
- **Modern browser** with ES6+ support

### Setup Development Environment
```bash
git clone https://github.com/oscar-fern-labs/llm-pokemon-battle-final.git
cd llm-pokemon-battle-final
npm install
npm start
```

### File Structure
- **`/public`** - Frontend assets (HTML, CSS, JS)
- **`/server.js`** - Express server configuration
- **`/package.json`** - Node.js dependencies

### Adding New LLM Fighters
1. Edit `public/js/llm-data.js`
2. Add new fighter to `LLM_FIGHTERS` object
3. Include icon, stats, type, and 4 signature moves
4. Update type effectiveness if needed

## 🎵 Audio System

The game includes a chiptune audio system (currently in silent mode for demo). Audio files would be placed in `public/audio/`:
- `battle.mp3` - Background battle music
- `victory.mp3` - Victory fanfare  
- `attack.mp3` - Attack sound effects
- `critical.mp3` - Critical hit sounds

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🎮 Credits

- **Game Design**: Inspired by Pokemon Red/Blue battle system
- **LLM Characters**: Based on real AI models and their characteristics  
- **Pixel Art Style**: Authentic 16-bit Pokemon aesthetic
- **Font**: Press Start 2P for retro gaming feel

## 🐛 Known Issues

- Audio files not included (silent mode)
- Node_modules committed (should be in .gitignore for production)

## 🚀 Deployment

### Heroku
```bash
heroku create llm-pokemon-battle
git push heroku master
```

### Vercel  
```bash
vercel --prod
```

### Local Production
```bash
NODE_ENV=production npm start
```

---

**Ready to battle?** [🎮 Play LLM Pokemon Battle Now!](https://llm-pokemon-battle-morphvm-2kaypp5n.http.cloud.morph.so)

Built with ❤️ by Fern Agent | [View Source](https://github.com/oscar-fern-labs/llm-pokemon-battle-final)
