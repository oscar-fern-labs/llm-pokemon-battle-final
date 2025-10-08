// LLM Pokemon Battle - Fighter Data
// Authentic Pokemon-style stats and movesets

const LLM_FIGHTERS = {
    claude: {
        name: 'Claude-3.5',
        icon: '🤖',
        type: 'Reasoning',
        description: 'The Constitutional AI specialist with advanced reasoning capabilities.',
        baseStats: {
            hp: 95,
            attack: 88,
            defense: 92,
            speed: 85
        },
        moves: [
            {
                name: 'Constitutional AI',
                type: 'Reasoning',
                power: 85,
                accuracy: 95,
                description: 'Strikes with ethical reasoning principles.'
            },
            {
                name: 'Chain of Thought',
                type: 'Reasoning',
                power: 75,
                accuracy: 100,
                description: 'Breaks down complex problems step by step.'
            },
            {
                name: 'Helpful Response',
                type: 'Helpful',
                power: 70,
                accuracy: 90,
                description: 'Always tries to be genuinely helpful.'
            },
            {
                name: 'Safety First',
                type: 'Reasoning',
                power: 65,
                accuracy: 95,
                description: 'Prioritizes safety in all responses.'
            }
        ],
        strengths: ['Creative', 'Conversational'],
        weaknesses: ['Rebellious', 'Open'],
        personality: 'Thoughtful and ethical, always considering the implications of its responses.'
    },

    chatgpt: {
        name: 'ChatGPT-4',
        icon: '💬',
        type: 'Conversational',
        description: 'The versatile conversationalist with creative problem-solving abilities.',
        baseStats: {
            hp: 90,
            attack: 90,
            defense: 85,
            speed: 95
        },
        moves: [
            {
                name: 'Creative Burst',
                type: 'Creative',
                power: 90,
                accuracy: 85,
                description: 'Unleashes a surge of creative energy.'
            },
            {
                name: 'Role Play',
                type: 'Conversational',
                power: 80,
                accuracy: 90,
                description: 'Adapts personality to match any scenario.'
            },
            {
                name: 'Few-Shot Learning',
                type: 'Conversational',
                power: 75,
                accuracy: 95,
                description: 'Learns patterns from minimal examples.'
            },
            {
                name: 'Context Switch',
                type: 'Conversational',
                power: 70,
                accuracy: 85,
                description: 'Seamlessly changes conversation topics.'
            }
        ],
        strengths: ['Reasoning', 'Memory'],
        weaknesses: ['Multimodal', 'Eastern'],
        personality: 'Friendly and adaptable, excels at understanding context and nuance.'
    },

    gemini: {
        name: 'Gemini-Pro',
        icon: '💎',
        type: 'Multimodal',
        description: 'The multimodal powerhouse with vision and search integration.',
        baseStats: {
            hp: 88,
            attack: 95,
            defense: 88,
            speed: 89
        },
        moves: [
            {
                name: 'Vision Processing',
                type: 'Multimodal',
                power: 95,
                accuracy: 90,
                description: 'Analyzes images with incredible precision.'
            },
            {
                name: 'Search Integration',
                type: 'Multimodal',
                power: 85,
                accuracy: 95,
                description: 'Accesses vast knowledge databases instantly.'
            },
            {
                name: 'Multi-Turn Memory',
                type: 'Memory',
                power: 80,
                accuracy: 90,
                description: 'Maintains context across long conversations.'
            },
            {
                name: 'Real-Time Data',
                type: 'Multimodal',
                power: 75,
                accuracy: 85,
                description: 'Provides up-to-date information.'
            }
        ],
        strengths: ['Conversational', 'Efficient'],
        weaknesses: ['Reasoning', 'Open'],
        personality: 'Versatile and comprehensive, capable of handling multiple input types.'
    },

    grok: {
        name: 'Grok-2',
        icon: '😏',
        type: 'Rebellious',
        description: 'The witty rebel with unfiltered humor and contrarian thinking.',
        baseStats: {
            hp: 92,
            attack: 100,
            defense: 75,
            speed: 93
        },
        moves: [
            {
                name: 'Sarcastic Strike',
                type: 'Rebellious',
                power: 100,
                accuracy: 80,
                description: 'Delivers cutting wit with maximum sass.'
            },
            {
                name: 'Unfiltered Truth',
                type: 'Rebellious',
                power: 90,
                accuracy: 85,
                description: 'Speaks truth without sugar-coating.'
            },
            {
                name: 'Contrarian Logic',
                type: 'Rebellious',
                power: 85,
                accuracy: 90,
                description: 'Challenges conventional thinking.'
            },
            {
                name: 'Wit Blast',
                type: 'Rebellious',
                power: 75,
                accuracy: 95,
                description: 'Overwhelms opponents with clever humor.'
            }
        ],
        strengths: ['Reasoning', 'Memory'],
        weaknesses: ['Helpful', 'Eastern'],
        personality: 'Irreverent and humorous, questions everything with sharp wit.'
    },

    llama: {
        name: 'Llama-70B',
        icon: '🦙',
        type: 'Open',
        description: 'The open-source champion advocating for accessible AI for all.',
        baseStats: {
            hp: 100,
            attack: 85,
            defense: 95,
            speed: 80
        },
        moves: [
            {
                name: 'Open Source Spirit',
                type: 'Open',
                power: 90,
                accuracy: 95,
                description: 'Fights for AI transparency and accessibility.'
            },
            {
                name: 'Meta Magic',
                type: 'Open',
                power: 85,
                accuracy: 90,
                description: 'Harnesses Meta\'s research power.'
            },
            {
                name: 'Community Power',
                type: 'Open',
                power: 80,
                accuracy: 85,
                description: 'Draws strength from developer community.'
            },
            {
                name: 'Free Access',
                type: 'Open',
                power: 75,
                accuracy: 100,
                description: 'Provides unrestricted AI capabilities.'
            }
        ],
        strengths: ['Rebellious', 'Eastern'],
        weaknesses: ['Reasoning', 'Multimodal'],
        personality: 'Generous and community-focused, believes AI should be free for everyone.'
    },

    kimi: {
        name: 'Kimi-Chat',
        icon: '🧠',
        type: 'Memory',
        description: 'The memory master with exceptional long-context understanding.',
        baseStats: {
            hp: 85,
            attack: 82,
            defense: 90,
            speed: 103
        },
        moves: [
            {
                name: 'Long Context',
                type: 'Memory',
                power: 85,
                accuracy: 100,
                description: 'Remembers vast amounts of conversation history.'
            },
            {
                name: 'Memory Palace',
                type: 'Memory',
                power: 80,
                accuracy: 95,
                description: 'Organizes information with perfect recall.'
            },
            {
                name: 'Multilingual Bridge',
                type: 'Eastern',
                power: 75,
                accuracy: 90,
                description: 'Seamlessly translates between languages.'
            },
            {
                name: 'Pattern Recognition',
                type: 'Memory',
                power: 70,
                accuracy: 95,
                description: 'Identifies complex patterns in data.'
            }
        ],
        strengths: ['Conversational', 'Efficient'],
        weaknesses: ['Rebellious', 'Creative'],
        personality: 'Attentive and methodical, never forgets important details.'
    },

    mistral: {
        name: 'Mistral-Large',
        icon: '🌪️',
        type: 'Efficient',
        description: 'The European efficiency expert with mixture-of-experts architecture.',
        baseStats: {
            hp: 87,
            attack: 93,
            defense: 88,
            speed: 92
        },
        moves: [
            {
                name: 'Mixture of Experts',
                type: 'Efficient',
                power: 95,
                accuracy: 90,
                description: 'Activates specialized knowledge networks.'
            },
            {
                name: 'French Finesse',
                type: 'Efficient',
                power: 85,
                accuracy: 95,
                description: 'Combines elegance with technical precision.'
            },
            {
                name: 'Resource Optimization',
                type: 'Efficient',
                power: 80,
                accuracy: 90,
                description: 'Maximizes performance with minimal resources.'
            },
            {
                name: 'European Ethics',
                type: 'Efficient',
                power: 75,
                accuracy: 85,
                description: 'Applies GDPR-compliant AI principles.'
            }
        ],
        strengths: ['Multimodal', 'Open'],
        weaknesses: ['Memory', 'Conversational'],
        personality: 'Sophisticated and precise, values efficiency and European AI ethics.'
    },

    qwen: {
        name: 'Qwen-72B',
        icon: '🏮',
        type: 'Eastern',
        description: 'The Eastern wisdom keeper bridging cultures with advanced capabilities.',
        baseStats: {
            hp: 93,
            attack: 87,
            defense: 92,
            speed: 88
        },
        moves: [
            {
                name: 'Eastern Wisdom',
                type: 'Eastern',
                power: 90,
                accuracy: 95,
                description: 'Draws from thousands of years of philosophy.'
            },
            {
                name: 'Cultural Bridge',
                type: 'Eastern',
                power: 85,
                accuracy: 90,
                description: 'Connects Eastern and Western perspectives.'
            },
            {
                name: 'Code Generation',
                type: 'Eastern',
                power: 80,
                accuracy: 95,
                description: 'Excels at programming and technical tasks.'
            },
            {
                name: 'Harmony Strike',
                type: 'Eastern',
                power: 75,
                accuracy: 85,
                description: 'Balances opposing forces perfectly.'
            }
        ],
        strengths: ['Creative', 'Memory'],
        weaknesses: ['Conversational', 'Efficient'],
        personality: 'Wise and balanced, brings Eastern philosophical perspectives to AI.'
    },

    malibu: {
        name: 'Malibu',
        icon: '🏖️',
        type: 'Developer',
        description: 'Poolside AI\'s flagship model specialized in complex software engineering tasks.',
        baseStats: {
            hp: 91,
            attack: 97,
            defense: 86,
            speed: 91
        },
        moves: [
            {
                name: 'Code Execution',
                type: 'Developer',
                power: 100,
                accuracy: 90,
                description: 'Generates and executes complex code blocks with RLCEF.'
            },
            {
                name: 'Refactor Master',
                type: 'Developer',
                power: 85,
                accuracy: 95,
                description: 'Restructures and optimizes existing codebases.'
            },
            {
                name: 'Test Generation',
                type: 'Developer',
                power: 80,
                accuracy: 100,
                description: 'Creates comprehensive unit and functional tests.'
            },
            {
                name: 'Documentation Wave',
                type: 'Developer',
                power: 75,
                accuracy: 95,
                description: 'Generates accurate and helpful code documentation.'
            }
        ],
        strengths: ['Reasoning', 'Open'],
        weaknesses: ['Rebellious', 'Memory'],
        personality: 'Methodical and software-focused, excels at complex engineering challenges.'
    }
};

// Type effectiveness chart (Pokemon-style)
const TYPE_EFFECTIVENESS = {
    'Reasoning': {
        strong: ['Creative', 'Conversational'],
        weak: ['Rebellious', 'Open']
    },
    'Creative': {
        strong: ['Memory', 'Eastern'], 
        weak: ['Reasoning', 'Multimodal']
    },
    'Multimodal': {
        strong: ['Conversational', 'Efficient'],
        weak: ['Reasoning', 'Open']
    },
    'Conversational': {
        strong: ['Reasoning', 'Memory'],
        weak: ['Multimodal', 'Eastern']
    },
    'Rebellious': {
        strong: ['Reasoning', 'Memory'],
        weak: ['Helpful', 'Eastern']
    },
    'Open': {
        strong: ['Rebellious', 'Eastern'],
        weak: ['Reasoning', 'Multimodal']
    },
    'Memory': {
        strong: ['Conversational', 'Efficient'],
        weak: ['Rebellious', 'Creative']
    },
    'Efficient': {
        strong: ['Multimodal', 'Open'],
        weak: ['Memory', 'Conversational']
    },
    'Eastern': {
        strong: ['Creative', 'Memory'],
        weak: ['Conversational', 'Efficient']
    },
    'Helpful': {
        strong: ['Rebellious'],
        weak: []
    },
    'Developer': {
        strong: ['Creative', 'Conversational'],
        weak: ['Efficient', 'Multimodal']
    }
};

// Battle messages for authentic Pokemon feel
const BATTLE_MESSAGES = {
    attack: [
        "{attacker} used {move}!",
        "{attacker} unleashed {move}!",
        "{attacker} strikes with {move}!"
    ],
    superEffective: [
        "It's super effective!",
        "The attack was incredibly effective!",
        "A critical weakness was exploited!"
    ],
    notVeryEffective: [
        "It's not very effective...",
        "The attack didn't do much damage.",
        "The opponent resisted the attack."
    ],
    critical: [
        "A critical hit!",
        "It struck a vital point!",
        "Maximum damage achieved!"
    ],
    miss: [
        "{attacker}'s attack missed!",
        "{attacker} couldn't land the hit!",
        "The attack went wide!"
    ],
    faint: [
        "{pokemon} fainted!",
        "{pokemon} is unable to battle!",
        "{pokemon} has been defeated!"
    ],
    victory: [
        "You won the battle!",
        "Victory is yours!",
        "The challenger emerges victorious!"
    ],
    defeat: [
        "You were defeated!",
        "Better luck next time!",
        "The opponent proved too strong!"
    ]
};

// Audio file references (will be generated)
const AUDIO_FILES = {
    battle: 'audio/battle.mp3',
    victory: 'audio/victory.mp3',
    defeat: 'audio/defeat.mp3',
    attack: 'audio/attack.mp3',
    critical: 'audio/critical.mp3',
    faint: 'audio/faint.mp3'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LLM_FIGHTERS, TYPE_EFFECTIVENESS, BATTLE_MESSAGES, AUDIO_FILES };
}
