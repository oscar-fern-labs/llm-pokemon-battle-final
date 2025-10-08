// LLM Pokemon Battle - Main Game Controller
// Authentic Pokemon-style game flow

class GameController {
    constructor() {
        this.battleEngine = new BattleEngine();
        this.currentScreen = 'title';
        this.selectedFighter = null;
        this.musicEnabled = true;
        this.isProcessingTurn = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showScreen('title');
        this.generateChiptuneMusic();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Title screen
        document.getElementById('start-button').addEventListener('click', () => {
            this.showScreen('selection');
        });

        document.getElementById('music-toggle').addEventListener('click', () => {
            this.toggleMusic();
        });

        // Selection screen
        document.getElementById('confirm-selection').addEventListener('click', () => {
            if (this.selectedFighter) {
                this.startBattle();
            }
        });

        document.getElementById('back-to-title').addEventListener('click', () => {
            this.showScreen('title');
        });

        // Battle screen - move buttons
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`move${i}`).addEventListener('click', () => {
                if (!this.isProcessingTurn) {
                    this.playerMove(i - 1);
                }
            });
        }

        document.getElementById('back-button').addEventListener('click', () => {
            // Could show battle menu options
            console.log('Back button clicked - showing move menu');
        });

        // Result screen
        document.getElementById('play-again').addEventListener('click', () => {
            this.showScreen('selection');
        });

        document.getElementById('main-menu').addEventListener('click', () => {
            this.showScreen('title');
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.key === 'm' || e.key === 'M') {
                this.toggleMusic();
            }
        });
    }

    // Show specific screen
    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;

        // Screen-specific initialization
        switch (screenName) {
            case 'title':
                this.initTitleScreen();
                break;
            case 'selection':
                this.initSelectionScreen();
                break;
            case 'battle':
                this.initBattleScreen();
                break;
            case 'result':
                this.initResultScreen();
                break;
        }
    }

    // Initialize title screen
    initTitleScreen() {
        this.selectedFighter = null;
        this.battleEngine.reset();
        
        // Play title music if enabled
        if (this.musicEnabled) {
            this.playSound('battle', true); // Using battle theme for now
        }
    }

    // Initialize selection screen
    initSelectionScreen() {
        this.populateFighterGrid();
        this.hideSelectionDetails();
    }

    // Initialize battle screen
    initBattleScreen() {
        if (this.musicEnabled) {
            this.playSound('battle', true);
        }
    }

    // Initialize result screen
    initResultScreen() {
        // Music handled by battle result logic
    }

    // Populate fighter selection grid
    populateFighterGrid() {
        const grid = document.getElementById('fighters-grid');
        grid.innerHTML = '';

        Object.keys(LLM_FIGHTERS).forEach(key => {
            const fighter = LLM_FIGHTERS[key];
            const card = this.createFighterCard(key, fighter);
            grid.appendChild(card);
        });
    }

    // Create fighter selection card
    createFighterCard(key, fighter) {
        const card = document.createElement('div');
        card.className = 'fighter-card';
        card.dataset.fighter = key;

        card.innerHTML = `
            <div class="fighter-icon">${fighter.icon}</div>
            <div class="fighter-name">${fighter.name}</div>
            <div class="fighter-type-mini type-${fighter.type.toLowerCase()}">${fighter.type}</div>
            <div class="fighter-hp">HP: ${fighter.baseStats.hp}</div>
        `;

        card.addEventListener('click', () => {
            this.selectFighter(key, fighter);
        });

        return card;
    }

    // Select a fighter
    selectFighter(key, fighter) {
        // Remove previous selection
        document.querySelectorAll('.fighter-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Select new fighter
        document.querySelector(`[data-fighter="${key}"]`).classList.add('selected');
        this.selectedFighter = { key, ...fighter };

        // Show fighter details
        this.showSelectionDetails(fighter);
        
        // Enable confirm button
        document.getElementById('confirm-selection').classList.remove('disabled');
    }

    // Show fighter details in selection screen
    showSelectionDetails(fighter) {
        const detailsPanel = document.getElementById('fighter-details');
        detailsPanel.classList.remove('hidden');

        // Fighter name and type
        document.getElementById('fighter-name').textContent = fighter.name;
        document.getElementById('fighter-type').textContent = fighter.type;
        document.getElementById('fighter-type').className = `type-badge type-${fighter.type.toLowerCase()}`;

        // Stats
        this.updateStatBar('hp', fighter.baseStats.hp);
        this.updateStatBar('atk', fighter.baseStats.attack);
        this.updateStatBar('def', fighter.baseStats.defense);
        this.updateStatBar('spd', fighter.baseStats.speed);

        // Moves
        const movesList = document.getElementById('moves-list');
        movesList.innerHTML = '';
        fighter.moves.forEach(move => {
            const moveDiv = document.createElement('div');
            moveDiv.className = 'move-preview';
            moveDiv.innerHTML = `
                <strong>${move.name}</strong> (${move.type}) - 
                Power: ${move.power}, Accuracy: ${move.accuracy}%
            `;
            movesList.appendChild(moveDiv);
        });
    }

    // Update stat bar
    updateStatBar(statName, value) {
        const maxStat = 120; // For scaling purposes
        const percentage = (value / maxStat) * 100;
        
        document.getElementById(`${statName}-stat`).style.width = `${percentage}%`;
        document.getElementById(`${statName}-value`).textContent = value;
    }

    // Hide selection details
    hideSelectionDetails() {
        document.getElementById('fighter-details').classList.add('hidden');
        document.getElementById('confirm-selection').classList.add('disabled');
    }

    // Start battle
    startBattle() {
        if (!this.selectedFighter) return;

        // Select random opponent
        const fighterKeys = Object.keys(LLM_FIGHTERS);
        const availableOpponents = fighterKeys.filter(key => key !== this.selectedFighter.key);
        const opponentKey = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
        const opponent = LLM_FIGHTERS[opponentKey];

        // Initialize battle
        const battleData = this.battleEngine.startBattle(this.selectedFighter, opponent);
        
        // Setup battle UI
        this.setupBattleUI(battleData);
        
        // Show battle screen
        this.showScreen('battle');

        // Start with battle intro message
        this.displayBattleMessage(`Wild ${opponent.name} appeared!`).then(() => {
            return this.displayBattleMessage(`Go! ${this.selectedFighter.name}!`);
        }).then(() => {
            // Add a small delay then show move menu
            setTimeout(() => {
                this.showMoveMenu();
            }, 1000);
        });
    }

    // Setup battle UI with fighter data
    setupBattleUI(battleData) {
        const { player, opponent } = battleData;

        // Player setup
        document.getElementById('player-name').textContent = player.name;
        document.getElementById('player-icon').textContent = player.icon;
        document.getElementById('player-hp-current').textContent = player.currentHP;
        document.getElementById('player-hp-max').textContent = player.maxHP;
        
        // Opponent setup
        document.getElementById('opponent-name').textContent = opponent.name;
        document.getElementById('opponent-icon').textContent = opponent.icon;
        document.getElementById('opponent-hp-current').textContent = opponent.currentHP;
        document.getElementById('opponent-hp-max').textContent = opponent.maxHP;

        // Setup health bars
        document.getElementById('player-health').style.width = '100%';
        document.getElementById('opponent-health').style.width = '100%';

        // Setup move buttons
        player.moves.forEach((move, index) => {
            const moveButton = document.getElementById(`move${index + 1}`);
            moveButton.querySelector('.move-name').textContent = move.name;
            moveButton.querySelector('.move-type').textContent = move.type;
            moveButton.querySelector('.move-power').textContent = `PWR: ${move.power}`;
        });
    }

    // Display battle message with typing effect
    async displayBattleMessage(message) {
        const messageElement = document.getElementById('battle-message');
        this.hideMoveMenu();
        
        return BattleAnimations.typeText(messageElement, message);
    }

    // Show move selection menu
    showMoveMenu() {
        if (this.battleEngine.currentTurn !== 'player' || this.isProcessingTurn) return;
        
        console.log('Showing move menu for', this.battleEngine.player.name);
        document.getElementById('move-menu').style.display = 'block';
        document.getElementById('battle-message').innerHTML = `What will <span id="current-pokemon">${this.battleEngine.player.name}</span> do?`;
    }

    // Hide move selection menu
    hideMoveMenu() {
        document.getElementById('move-menu').style.display = 'none';
    }

    // Handle player move selection
    async playerMove(moveIndex) {
        if (this.isProcessingTurn) return;
        
        this.isProcessingTurn = true;
        this.hideMoveMenu();

        // Execute player move
        const result = this.battleEngine.executeMove(
            this.battleEngine.player,
            this.battleEngine.opponent,
            moveIndex
        );

        await this.processAttackResult(result);

        // Check if battle is over
        if (this.battleEngine.isBattleOver()) {
            this.endBattle();
            return;
        }

        // Switch to opponent turn
        this.battleEngine.switchTurn();
        await this.opponentMove();
    }

    // Handle opponent move (AI)
    async opponentMove() {
        // Brief delay for realism
        await new Promise(resolve => setTimeout(resolve, 1000));

        const moveIndex = this.battleEngine.selectOpponentMove(
            this.battleEngine.opponent,
            this.battleEngine.player
        );

        const result = this.battleEngine.executeMove(
            this.battleEngine.opponent,
            this.battleEngine.player,
            moveIndex
        );

        await this.processAttackResult(result);

        // Check if battle is over
        if (this.battleEngine.isBattleOver()) {
            this.endBattle();
            return;
        }

        // Switch back to player
        this.battleEngine.switchTurn();
        this.isProcessingTurn = false;
        this.showMoveMenu();
    }

    // Process attack result with animations
    async processAttackResult(result) {
        if (!result) return;

        if (result.type === 'miss') {
            await this.displayBattleMessage(result.message);
            return;
        }

        // Show attack messages
        for (const message of result.messages) {
            await this.displayBattleMessage(message);
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Damage animations
        if (result.damage > 0) {
            const targetSprite = result.defender === this.battleEngine.player.name
                ? document.getElementById('player-sprite')
                : document.getElementById('opponent-sprite');

            BattleAnimations.damageFlash(targetSprite);
            BattleAnimations.screenShake(document.getElementById('battle-screen'));

            // Update health bar
            const healthElement = result.defender === this.battleEngine.player.name
                ? document.getElementById('player-health')
                : document.getElementById('opponent-health');

            const percentage = this.battleEngine.getHealthPercentage(
                result.defender === this.battleEngine.player.name 
                    ? this.battleEngine.player 
                    : this.battleEngine.opponent
            );

            BattleAnimations.updateHealthBar(
                healthElement,
                percentage,
                result.defenderMaxHP,
                result.defenderHP
            );

            // Play attack sound
            this.playSound('attack');
        }

        // Critical hit sound
        if (result.critical) {
            this.playSound('critical');
        }
    }

    // End battle and show results
    endBattle() {
        const result = this.battleEngine.getBattleResult();
        
        if (result.result === 'victory') {
            this.showVictoryScreen();
        } else {
            this.showDefeatScreen();
        }
    }

    // Show victory screen
    showVictoryScreen() {
        this.showScreen('result');
        
        document.getElementById('result-icon').textContent = '🏆';
        document.getElementById('result-title').textContent = 'VICTORY!';
        document.getElementById('result-title').className = 'result-title victory';
        document.getElementById('result-message').textContent = 
            `${this.battleEngine.player.name} defeated ${this.battleEngine.opponent.name}!`;
        
        document.getElementById('final-player-name').textContent = this.battleEngine.player.name;
        document.getElementById('final-player-hp').textContent = this.battleEngine.player.currentHP;

        if (this.musicEnabled) {
            this.playSound('victory');
        }
    }

    // Show defeat screen
    showDefeatScreen() {
        this.showScreen('result');
        
        document.getElementById('result-icon').textContent = '💔';
        document.getElementById('result-title').textContent = 'DEFEAT';
        document.getElementById('result-title').className = 'result-title defeat';
        document.getElementById('result-message').textContent = 
            `${this.battleEngine.opponent.name} defeated ${this.battleEngine.player.name}!`;
        
        document.getElementById('final-player-name').textContent = this.battleEngine.player.name;
        document.getElementById('final-player-hp').textContent = this.battleEngine.player.currentHP;

        if (this.musicEnabled) {
            this.playSound('defeat');
        }
    }

    // Toggle music on/off
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        const button = document.getElementById('music-toggle');
        
        if (this.musicEnabled) {
            button.textContent = '🎵 MUSIC: ON';
            // Resume current music
            this.playSound('battle', true);
        } else {
            button.textContent = '🎵 MUSIC: OFF';
            // Stop all audio
            document.querySelectorAll('audio').forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        }
    }

    // Play sound effect
    playSound(soundType, loop = false) {
        if (!this.musicEnabled) return;

        const audio = document.getElementById(`${soundType}-sound`) || 
                     document.getElementById(`${soundType}-music`);
        
        if (audio) {
            audio.currentTime = 0;
            audio.loop = loop;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }

    // Generate chiptune music (placeholder for now)
    generateChiptuneMusic() {
        // For now, we'll create empty audio elements
        // In a real implementation, you'd generate or load 8-bit audio files
        
        const audioContainer = document.createElement('div');
        audioContainer.style.display = 'none';
        
        const audioTypes = ['battle', 'victory', 'defeat', 'attack', 'critical', 'faint'];
        
        audioTypes.forEach(type => {
            const audio = document.createElement('audio');
            audio.id = `${type}-${type === 'battle' ? 'music' : 'sound'}`;
            if (type === 'battle') audio.loop = true;
            audioContainer.appendChild(audio);
        });
        
        document.body.appendChild(audioContainer);
        
        console.log('🎵 Chiptune audio system initialized (silent mode for demo)');
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 LLM Pokemon Battle - Initializing...');
    window.game = new GameController();
    console.log('🎮 Game ready! Press START BATTLE to begin!');
});
