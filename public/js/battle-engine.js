// LLM Pokemon Battle - Battle Engine
// Authentic Pokemon-style battle mechanics

class BattleEngine {
    constructor() {
        this.player = null;
        this.opponent = null;
        this.currentTurn = 'player';
        this.battlePhase = 'selection'; // selection, battle, result
        this.battleLog = [];
        this.musicEnabled = true;
    }

    // Initialize battle between player and opponent
    startBattle(playerFighter, opponentFighter) {
        this.player = this.createBattleFighter(playerFighter);
        this.opponent = this.createBattleFighter(opponentFighter);
        this.currentTurn = this.calculateFirstTurn();
        this.battlePhase = 'battle';
        this.battleLog = [];

        console.log(`Battle started: ${this.player.name} vs ${this.opponent.name}`);
        return {
            player: this.player,
            opponent: this.opponent,
            firstTurn: this.currentTurn
        };
    }

    // Create battle-ready fighter with current stats
    createBattleFighter(fighterData) {
        return {
            ...fighterData,
            currentHP: fighterData.baseStats.hp,
            maxHP: fighterData.baseStats.hp,
            statusEffects: [],
            criticalHitRatio: 1.0
        };
    }

    // Determine who goes first based on speed
    calculateFirstTurn() {
        const playerSpeed = this.player.baseStats.speed;
        const opponentSpeed = this.opponent.baseStats.speed;
        
        if (playerSpeed > opponentSpeed) return 'player';
        if (opponentSpeed > playerSpeed) return 'opponent';
        
        // Same speed - random
        return Math.random() < 0.5 ? 'player' : 'opponent';
    }

    // Execute a move (main battle logic)
    executeMove(attacker, defender, moveIndex) {
        const move = attacker.moves[moveIndex];
        if (!move) return null;

        // Check if move hits
        const accuracy = this.calculateAccuracy(move, attacker, defender);
        const hits = Math.random() * 100 <= accuracy;

        if (!hits) {
            return {
                type: 'miss',
                attacker: attacker.name,
                move: move.name,
                message: this.getRandomMessage('miss', { attacker: attacker.name })
            };
        }

        // Calculate damage
        const damage = this.calculateDamage(attacker, defender, move);
        const isCritical = this.checkCriticalHit(attacker, move);
        const finalDamage = isCritical ? Math.floor(damage * 1.5) : damage;

        // Apply damage
        defender.currentHP = Math.max(0, defender.currentHP - finalDamage);

        // Determine effectiveness
        const effectiveness = this.getTypeEffectiveness(move.type, defender.type);
        
        const result = {
            type: 'attack',
            attacker: attacker.name,
            defender: defender.name,
            move: move.name,
            damage: finalDamage,
            effectiveness: effectiveness,
            critical: isCritical,
            defenderHP: defender.currentHP,
            defenderMaxHP: defender.maxHP,
            fainted: defender.currentHP <= 0
        };

        // Add appropriate messages
        result.messages = [];
        result.messages.push(this.getRandomMessage('attack', { 
            attacker: attacker.name, 
            move: move.name 
        }));

        if (isCritical) {
            result.messages.push(this.getRandomMessage('critical'));
        }

        if (effectiveness > 1.0) {
            result.messages.push(this.getRandomMessage('superEffective'));
        } else if (effectiveness < 1.0) {
            result.messages.push(this.getRandomMessage('notVeryEffective'));
        }

        if (defender.currentHP <= 0) {
            result.messages.push(this.getRandomMessage('faint', { 
                pokemon: defender.name 
            }));
        }

        return result;
    }

    // Calculate move accuracy
    calculateAccuracy(move, attacker, defender) {
        let accuracy = move.accuracy;
        
        // Apply status effects or other modifiers here
        // For now, just return base accuracy
        
        return accuracy;
    }

    // Calculate damage using Pokemon-style formula
    calculateDamage(attacker, defender, move) {
        const level = 50; // All Pokemon are level 50
        const attack = attacker.baseStats.attack;
        const defense = defender.baseStats.defense;
        const power = move.power;

        // Basic Pokemon damage formula
        let damage = ((((2 * level + 10) / 250) * (attack / defense) * power) + 2);
        
        // Type effectiveness modifier
        const effectiveness = this.getTypeEffectiveness(move.type, defender.type);
        damage *= effectiveness;

        // Add some randomness (85-100% of calculated damage)
        const randomFactor = 0.85 + (Math.random() * 0.15);
        damage *= randomFactor;

        return Math.max(1, Math.floor(damage));
    }

    // Check for critical hit
    checkCriticalHit(attacker, move) {
        const criticalChance = 6.25; // 1/16 base rate like Pokemon
        return Math.random() * 100 <= criticalChance * attacker.criticalHitRatio;
    }

    // Get type effectiveness multiplier
    getTypeEffectiveness(attackType, defenderType) {
        const typeChart = TYPE_EFFECTIVENESS[attackType];
        if (!typeChart) return 1.0;

        if (typeChart.strong && typeChart.strong.includes(defenderType)) {
            return 2.0; // Super effective
        }
        
        if (typeChart.weak && typeChart.weak.includes(defenderType)) {
            return 0.5; // Not very effective
        }

        return 1.0; // Normal effectiveness
    }

    // Get random battle message
    getRandomMessage(messageType, replacements = {}) {
        const messages = BATTLE_MESSAGES[messageType];
        if (!messages || messages.length === 0) return '';

        let message = messages[Math.floor(Math.random() * messages.length)];
        
        // Replace placeholders
        Object.keys(replacements).forEach(key => {
            message = message.replace(`{${key}}`, replacements[key]);
        });

        return message;
    }

    // AI move selection for opponent
    selectOpponentMove(opponent, player) {
        const moves = opponent.moves;
        const moveScores = [];

        // Simple AI: prefer moves that are super effective
        moves.forEach((move, index) => {
            let score = move.power;
            
            const effectiveness = this.getTypeEffectiveness(move.type, player.type);
            score *= effectiveness;

            // Add some randomness
            score += Math.random() * 20;

            moveScores.push({ index, score });
        });

        // Sort by score and pick the best move
        moveScores.sort((a, b) => b.score - a.score);
        return moveScores[0].index;
    }

    // Check if battle is over
    isBattleOver() {
        return this.player.currentHP <= 0 || this.opponent.currentHP <= 0;
    }

    // Get battle result
    getBattleResult() {
        if (this.player.currentHP <= 0) {
            return {
                result: 'defeat',
                winner: this.opponent.name,
                message: this.getRandomMessage('defeat')
            };
        } else if (this.opponent.currentHP <= 0) {
            return {
                result: 'victory',
                winner: this.player.name,
                message: this.getRandomMessage('victory')
            };
        }
        return null;
    }

    // Switch turns
    switchTurn() {
        this.currentTurn = this.currentTurn === 'player' ? 'opponent' : 'player';
    }

    // Get health percentage for UI
    getHealthPercentage(fighter) {
        return Math.max(0, (fighter.currentHP / fighter.maxHP) * 100);
    }

    // Get health bar color class
    getHealthBarClass(percentage) {
        if (percentage <= 20) return 'critical';
        if (percentage <= 50) return 'low';
        return '';
    }

    // Reset battle
    reset() {
        this.player = null;
        this.opponent = null;
        this.currentTurn = 'player';
        this.battlePhase = 'selection';
        this.battleLog = [];
    }
}

// Utility functions for battle animations
const BattleAnimations = {
    // Damage flash effect
    damageFlash(element) {
        element.classList.add('damage-flash');
        setTimeout(() => {
            element.classList.remove('damage-flash');
        }, 300);
    },

    // Screen shake effect
    screenShake(element) {
        element.classList.add('screen-shake');
        setTimeout(() => {
            element.classList.remove('screen-shake');
        }, 400);
    },

    // Type text animation
    typeText(element, text, speed = 50) {
        element.innerHTML = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);

        return new Promise(resolve => {
            setTimeout(resolve, text.length * speed + 500);
        });
    },

    // Update health bar with animation
    updateHealthBar(healthElement, percentage, maxHP, currentHP) {
        // Update width
        healthElement.style.width = percentage + '%';
        
        // Update color class
        healthElement.className = 'health-fill';
        if (percentage <= 20) {
            healthElement.classList.add('critical');
        } else if (percentage <= 50) {
            healthElement.classList.add('low');
        }

        // Update HP text
        const hpCurrent = document.getElementById(healthElement.id.replace('health', 'hp-current'));
        const hpMax = document.getElementById(healthElement.id.replace('health', 'hp-max'));
        
        if (hpCurrent) hpCurrent.textContent = currentHP;
        if (hpMax) hpMax.textContent = maxHP;
    }
};

// Export for global use
window.BattleEngine = BattleEngine;
window.BattleAnimations = BattleAnimations;
