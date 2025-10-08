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

        // Create small sprite for selection
        const spriteContainer = document.createElement('div');
        spriteContainer.className = 'fighter-icon';
        spriteContainer.innerHTML = this.createSpriteHtml(key, 'selection');

        card.innerHTML = `
            <div class="fighter-name">${fighter.name}</div>
            <div class="fighter-type-mini type-${fighter.type.toLowerCase()}">${fighter.type}</div>
            <div class="fighter-hp">HP: ${fighter.baseStats.hp}</div>
        `;
        
        // Insert sprite at the beginning
        card.insertBefore(spriteContainer, card.firstChild);

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
            // Always start with player's turn for move selection
            // The actual turn order is handled during move execution
            this.battleEngine.currentTurn = 'player';
            
            // Shorter delay for better UX - show move menu faster
            setTimeout(() => {
                this.showMoveMenu();
            }, 500);
        });
    }

    // Setup battle UI with fighter data
    setupBattleUI(battleData) {
        const { player, opponent } = battleData;

        // Player setup
        document.getElementById('player-name').textContent = player.name;
        this.setupAnimatedSprite('player-icon', player.key, 'player');
        document.getElementById('player-hp-current').textContent = player.currentHP;
        document.getElementById('player-hp-max').textContent = player.maxHP;
        
        // Opponent setup
        document.getElementById('opponent-name').textContent = opponent.name;
        this.setupAnimatedSprite('opponent-icon', opponent.key, 'opponent');
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
        const moveMenu = document.getElementById('move-menu');
        moveMenu.style.display = 'block';
        
        // Add a subtle animation to draw attention
        moveMenu.style.opacity = '0';
        setTimeout(() => {
            moveMenu.style.opacity = '1';
            moveMenu.style.transition = 'opacity 0.3s ease-in';
        }, 100);
        
        document.getElementById('battle-message').innerHTML = `What will <span id="current-pokemon">${this.battleEngine.player.name}</span> do?`;
    }

    // Setup animated sprite for battle
    setupAnimatedSprite(elementId, fighterKey, position) {
        const element = document.getElementById(elementId);
        
        // Clear element
        element.innerHTML = '';
        
        // Create sprite directly based on fighter key
        const spriteHtml = this.createSpriteHtml(fighterKey, position);
        element.innerHTML = spriteHtml;
        
        // Add position-specific classes to the sprite
        const sprite = element.querySelector('.animated-sprite');
        if (sprite) {
            if (position === 'opponent') {
                sprite.classList.add('opponent-sprite');
            } else {
                sprite.classList.add('player-sprite');
            }
        }
        
        return sprite;
    }
    
    // Create sprite HTML based on LLM logos
    createSpriteHtml(fighterKey, position) {
        const size = position === 'selection' ? '40' : (position === 'player' ? '96' : '80');
        
        const sprites = {
            claude: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" class="animated-sprite claude-sprite">
                <circle cx="16" cy="16" r="12" fill="#ff6b35" stroke="#cc4400" stroke-width="2"/>
                <circle cx="16" cy="16" r="9" fill="#ff8c42" stroke="#ff6b35" stroke-width="1"/>
                <path d="M12,10 A6,6 0 0,0 12,22" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                <circle cx="13" cy="13" r="1.5" fill="#ffffff"/>
                <circle cx="19" cy="13" r="1.5" fill="#ffffff"/>
                <circle cx="13" cy="13" r="0.5" fill="#333333"/>
                <circle cx="19" cy="13" r="0.5" fill="#333333"/>
                <path d="M14,19 Q16,21 18,19" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
            </svg>`,
            
            chatgpt: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" class="animated-sprite chatgpt-sprite">
                <circle cx="16" cy="16" r="12" fill="#10a37f" stroke="#0a8870" stroke-width="2"/>
                <circle cx="16" cy="16" r="9" fill="#19c47f" stroke="#10a37f" stroke-width="1"/>
                <path d="M10,10 L22,10 L19,16 L13,16 Z" fill="#ffffff" opacity="0.8"/>
                <path d="M10,22 L22,22 L19,16 L13,16 Z" fill="#ffffff" opacity="0.6"/>
                <circle cx="13" cy="16" r="1.5" fill="#ffffff" class="chat-dot1"/>
                <circle cx="16" cy="16" r="1.5" fill="#ffffff" class="chat-dot2"/>
                <circle cx="19" cy="16" r="1.5" fill="#ffffff" class="chat-dot3"/>
            </svg>`,
            
            gemini: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" class="animated-sprite gemini-sprite">
                <polygon points="16,4 24,12 16,20 8,12" fill="#4285f4" stroke="#3367d6" stroke-width="2"/>
                <polygon points="16,6 22,12 16,18 10,12" fill="#34a853" stroke="#137333" stroke-width="1"/>
                <polygon points="16,8 20,12 16,16 12,12" fill="#fbbc05" stroke="#f9ab00" stroke-width="1"/>
                <circle cx="16" cy="12" r="2" fill="#ea4335" stroke="#d33b01" stroke-width="1"/>
                <circle cx="12" cy="8" r="1" fill="#4285f4" class="sparkle1"/>
                <circle cx="20" cy="8" r="1" fill="#34a853" class="sparkle2"/>
                <circle cx="12" cy="16" r="1" fill="#fbbc05" class="sparkle3"/>
                <circle cx="20" cy="16" r="1" fill="#ea4335" class="sparkle4"/>
            </svg>`,
            
            grok: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" class="animated-sprite grok-sprite">
                <circle cx="16" cy="16" r="12" fill="#000000" stroke="#333333" stroke-width="2"/>
                <circle cx="16" cy="16" r="9" fill="#1d9bf0" stroke="#000000" stroke-width="1"/>
                <path d="M10,10 L22,22 M22,10 L10,22" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                <ellipse cx="13" cy="12" rx="3" ry="2" fill="#000000" stroke="#333333" stroke-width="1"/>
                <ellipse cx="19" cy="12" rx="3" ry="2" fill="#000000" stroke="#333333" stroke-width="1"/>
                <path d="M14,20 Q16,18 18,20" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
            </svg>`,
            
            llama: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" class="animated-sprite llama-sprite">
                <circle cx="16" cy="16" r="12" fill="#1877f2" stroke="#166fe5" stroke-width="2"/>
                <circle cx="16" cy="16" r="9" fill="#42a5f5" stroke="#1877f2" stroke-width="1"/>
                <ellipse cx="16" cy="14" rx="6" ry="4" fill="#ffffff" stroke="#e3f2fd" stroke-width="1"/>
                <ellipse cx="16" cy="10" rx="3" ry="4" fill="#ffffff" stroke="#e3f2fd" stroke-width="1"/>
                <ellipse cx="16" cy="8" rx="2" ry="2" fill="#ffffff" stroke="#e3f2fd" stroke-width="1"/>
                <circle cx="14" cy="8" r="0.8" fill="#1877f2"/>
                <circle cx="18" cy="8" r="0.8" fill="#1877f2"/>
                <ellipse cx="13" cy="6" rx="1" ry="2" fill="#ffffff" stroke="#e3f2fd" stroke-width="1"/>
                <ellipse cx="19" cy="6" rx="1" ry="2" fill="#ffffff" stroke="#e3f2fd" stroke-width="1"/>
                <path d="M12,20 L14,16 L16,20 L18,16 L20,20" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
            </svg>`,
            
            kimi: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" class="animated-sprite kimi-sprite">
                <circle cx="16" cy="16" r="12" fill="#2d3748" stroke="#1a202c" stroke-width="2"/>
                <circle cx="16" cy="16" r="9" fill="#4a5568" stroke="#2d3748" stroke-width="1"/>
                <path d="M12,8 A8,8 0 0,0 12,24 A6,6 0 0,1 12,8" fill="#e2e8f0" stroke="#cbd5e0" stroke-width="1"/>
                <polygon points="20,10 21,12 23,12 21.5,13.5 22,16 20,14.5 18,16 18.5,13.5 17,12 19,12" fill="#ffd700" class="neural-pulse1"/>
                <circle cx="22" cy="20" r="1" fill="#ffffff" class="neural-pulse2"/>
                <circle cx="10" cy="20" r="0.8" fill="#e2e8f0" class="neural-pulse3"/>
                <circle cx="14" cy="14" r="1.5" fill="#ffd700"/>
                <circle cx="18" cy="14" r="1.5" fill="#ffd700"/>
            </svg>`,
            
            mistral: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" class="animated-sprite mistral-sprite">
                <circle cx="16" cy="16" r="12" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
                <circle cx="16" cy="16" r="9" fill="#334155" stroke="#0f172a" stroke-width="1"/>
                <path d="M10,12 L12,8 L14,12 L16,8 L18,12 L20,8 L22,12" fill="none" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/>
                <path d="M8,16 Q12,14 16,16 Q20,18 24,16" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" class="wind-swirl"/>
                <path d="M8,20 Q12,18 16,20 Q20,22 24,20" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" class="wind-swirl"/>
                <circle cx="13" cy="14" r="1" fill="#f8fafc"/>
                <circle cx="19" cy="14" r="1" fill="#f8fafc"/>
            </svg>`,
            
            qwen: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" class="animated-sprite qwen-sprite">
                <circle cx="16" cy="16" r="12" fill="#ff6900" stroke="#e55a00" stroke-width="2"/>
                <circle cx="16" cy="16" r="9" fill="#ff8533" stroke="#ff6900" stroke-width="1"/>
                <rect x="12" y="8" width="8" height="2" fill="#ffffff" stroke="#ffffff" stroke-width="1"/>
                <rect x="12" y="12" width="8" height="2" fill="#ffffff" stroke="#ffffff" stroke-width="1"/>
                <rect x="12" y="16" width="8" height="2" fill="#ffffff" stroke="#ffffff" stroke-width="1"/>
                <rect x="14" y="6" width="2" height="16" fill="#ffffff" stroke="#ffffff" stroke-width="1"/>
                <circle cx="10" cy="10" r="1" fill="#ffd700" class="pattern-glow"/>
                <circle cx="22" cy="10" r="1" fill="#ffd700" class="pattern-glow"/>
                <circle cx="10" cy="22" r="1" fill="#ffd700" class="pattern-glow"/>
                <circle cx="22" cy="22" r="1" fill="#ffd700" class="pattern-glow"/>
                <circle cx="13" cy="13" r="1" fill="#ffffff"/>
                <circle cx="19" cy="13" r="1" fill="#ffffff"/>
            </svg>`,
            
            malibu: `<svg width="${size}" height="${size}" viewBox="0 0 32 32" class="animated-sprite malibu-sprite">
                <circle cx="16" cy="16" r="12" fill="#6366f1" stroke="#4f46e5" stroke-width="2"/>
                <circle cx="16" cy="16" r="9" fill="#8b5cf6" stroke="#6366f1" stroke-width="1"/>
                <rect x="10" y="10" width="12" height="8" rx="2" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
                <rect x="12" y="12" width="8" height="4" rx="1" fill="#1f2937" stroke="#111827" stroke-width="1"/>
                <path d="M12,13 L14,15 L16,13 L18,15 L20,13" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="11" cy="8" r="1" fill="#fbbf24" class="code-sparkle1"/>
                <circle cx="21" cy="8" r="1" fill="#3b82f6" class="code-sparkle2"/>
                <circle cx="11" cy="24" r="1" fill="#06b6d4" class="code-sparkle3"/>
                <circle cx="21" cy="24" r="1" fill="#10b981" class="code-sparkle4"/>
                <path d="M6,16 Q10,14 14,16 Q18,18 22,16 Q26,14 30,16" fill="none" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round" class="code-wave"/>
            </svg>`
        };
        
        return sprites[fighterKey] || sprites.claude;
    }

    // Trigger sprite animation
    triggerSpriteAnimation(position, animationType) {
        const iconId = position === 'player' ? 'player-icon' : 'opponent-icon';
        const sprite = document.querySelector(`#${iconId} .animated-sprite`);
        
        if (sprite) {
            // Remove existing animation classes
            sprite.classList.remove('sprite-attacking', 'sprite-damaged', 'sprite-victory', 'sprite-fainted');
            
            // Add new animation class
            sprite.classList.add(`sprite-${animationType}`);
            
            // Remove animation class after completion
            setTimeout(() => {
                sprite.classList.remove(`sprite-${animationType}`);
            }, animationType === 'victory' ? 2000 : 1000);
        }
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

        // Trigger attack animation
        this.triggerSpriteAnimation('player', 'attacking');
        
        // Brief delay for attack animation
        await new Promise(resolve => setTimeout(resolve, 400));
        
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

        // Trigger opponent attack animation
        this.triggerSpriteAnimation('opponent', 'attacking');
        
        // Brief delay for attack animation
        await new Promise(resolve => setTimeout(resolve, 400));
        
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
            const targetPosition = result.defender === this.battleEngine.player.name ? 'player' : 'opponent';
            
            // Trigger damage animation
            this.triggerSpriteAnimation(targetPosition, 'damaged');
            
            // Add type effectiveness visual effects
            if (result.effectiveness > 1) {
                const sprite = document.querySelector(`#${targetPosition}-icon .animated-sprite`);
                if (sprite) {
                    sprite.classList.add('super-effective-flash');
                    setTimeout(() => sprite.classList.remove('super-effective-flash'), 500);
                }
            } else if (result.effectiveness < 1) {
                const sprite = document.querySelector(`#${targetPosition}-icon .animated-sprite`);
                if (sprite) {
                    sprite.classList.add('not-very-effective-dim');
                    setTimeout(() => sprite.classList.remove('not-very-effective-dim'), 500);
                }
            }

            const targetSprite = result.defender === this.battleEngine.player.name
                ? document.getElementById('player-sprite')
                : document.getElementById('opponent-sprite');

            if (targetSprite) {
                BattleAnimations.damageFlash(targetSprite);
            }
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
            // Trigger victory animation for player, faint animation for opponent
            this.triggerSpriteAnimation('player', 'victory');
            this.triggerSpriteAnimation('opponent', 'fainted');
            
            // Wait for animations then show victory screen
            setTimeout(() => {
                this.showVictoryScreen();
            }, 1500);
        } else {
            // Trigger defeat animations
            this.triggerSpriteAnimation('player', 'fainted');
            this.triggerSpriteAnimation('opponent', 'victory');
            
            // Wait for animations then show defeat screen
            setTimeout(() => {
                this.showDefeatScreen();
            }, 1500);
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
