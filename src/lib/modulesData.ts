import { Module } from "../types";

export const modulesData: Module[] = [
  {
    id: 1,
    title: "Order at a cafe",
    unlocked: true,
    completed: false,
    vocab: [
      { word: "Un café", phonetics: "[un kah-fay]", meaning: "A coffee", grammar: "Masculine noun", semantics: "In France, 'un café' usually means a small espresso." },
      { word: "S'il vous plaît", phonetics: "[seel voo play]", meaning: "Please", semantics: "Formal version, essential for politeness!" },
      { word: "Merci", phonetics: "[mair-see]", meaning: "Thank you" },
      { word: "Un croissant", phonetics: "[un krwah-sohn]", meaning: "A croissant", grammar: "Masculine noun" },
      { word: "Je voudrais", phonetics: "[zhuh voo-dray]", meaning: "I would like", grammar: "Conditional form of 'vouloir' (to want)" }
    ],
    grammarRule: "Politeness in French often uses the conditional 'Je voudrais' instead of the direct 'Je veux'.",
    sentences: [
      { french: "Un café, s'il vous plaît.", phonetics: "[un kah-fay, seel voo play]", english: "A coffee, please." },
      { french: "Je voudrais un croissant.", phonetics: "[zhuh voo-dray un krwah-sohn]", english: "I would like a croissant." },
      { french: "Merci beaucoup !", phonetics: "[mair-see boh-koo]", english: "Thank you very much!" }
    ],
    quiz: [
      { question: "How do you say 'Please' (formal)?", options: ["Merci", "S'il vous plaît", "Bonjour"], answer: "S'il vous plaît", explanation: "'S'il vous plaît' is the formal way to say please." },
      { question: "Translate: 'I would like a coffee.'", options: ["Je veux un café", "Je voudrais un café", "Un café merci"], answer: "Je voudrais un café", explanation: "'Je voudrais' is the polite 'I would like'." },
      { question: "Is 'Un croissant' masculine or feminine?", options: ["Masculine", "Feminine"], answer: "Masculine", explanation: "Nouns starting with 'un' are masculine." }
    ]
  },
  {
    id: 2,
    title: "Greet new people",
    unlocked: false,
    completed: false,
    vocab: [
      { word: "Bonjour", phonetics: "[bohn-zhoor]", meaning: "Hello / Good day" },
      { word: "Enchanté", phonetics: "[on-shon-tay]", meaning: "Nice to meet you", semantics: "Literally means 'enchanted'." },
      { word: "Comment allez-vous ?", phonetics: "[ko-mon tah-lay voo]", meaning: "How are you? (formal)" },
      { word: "Je m'appelle", phonetics: "[zhuh mah-pel]", meaning: "My name is", grammar: "Reflexive verb 's'appeler'" },
      { word: "Au revoir", phonetics: "[oh ruh-vwahr]", meaning: "Goodbye" }
    ],
    grammarRule: "French has formal (vous) and informal (tu) ways to address people. Use 'vous' for strangers.",
    sentences: [
      { french: "Bonjour, je m'appelle Pierre.", phonetics: "[bohn-zhoor, zhuh mah-pel pyair]", english: "Hello, my name is Pierre." },
      { french: "Enchanté de vous rencontrer.", phonetics: "[on-shon-tay duh voo ron-kon-tray]", english: "Nice to meet you." },
      { french: "Au revoir, à bientôt !", phonetics: "[oh ruh-vwahr, ah byan-toh]", english: "Goodbye, see you soon!" }
    ],
    quiz: [
      { question: "What does 'Enchanté' literally mean?", options: ["Hello", "Enchanted", "Goodbye"], answer: "Enchanted", explanation: "It's a poetic way to say you're pleased to meet someone." },
      { question: "How do you say 'My name is'?", options: ["Je suis", "Je m'appelle", "Moi est"], answer: "Je m'appelle", explanation: "'Je m'appelle' literally means 'I call myself'." },
      { question: "Which is formal: 'Tu' or 'Vous'?", options: ["Tu", "Vous"], answer: "Vous", explanation: "'Vous' is used for formal situations or groups." }
    ]
  },
  {
    id: 3,
    title: "Talk about family",
    unlocked: false,
    completed: false,
    vocab: [
      { word: "La famille", phonetics: "[lah fah-mee]", meaning: "The family" },
      { word: "Le père", phonetics: "[luh pair]", meaning: "The father" },
      { word: "La mère", phonetics: "[lah mair]", meaning: "The mother" },
      { word: "Le frère", phonetics: "[luh frair]", meaning: "The brother" },
      { word: "La sœur", phonetics: "[lah sur]", meaning: "The sister" }
    ],
    grammarRule: "Possessive adjectives change based on the gender of the object: 'mon' (masc), 'ma' (fem).",
    sentences: [
      { french: "Voici mon père.", phonetics: "[vwah-see mohn pair]", english: "Here is my father." },
      { french: "J'ai une sœur.", phonetics: "[zhay oon sur]", english: "I have a sister." },
      { french: "Ma mère est française.", phonetics: "[mah mair ay fron-sez]", english: "My mother is French." }
    ],
    quiz: [
      { question: "How do you say 'My mother'?", options: ["Mon mère", "Ma mère", "Le mère"], answer: "Ma mère", explanation: "'Mère' is feminine, so we use 'ma'." },
      { question: "What is 'Brother' in French?", options: ["Sœur", "Frère", "Père"], answer: "Frère", explanation: "'Frère' is brother." },
      { question: "Translate: 'I have a sister.'", options: ["J'ai un frère", "J'ai une sœur", "Voici ma sœur"], answer: "J'ai une sœur", explanation: "'J'ai' means 'I have'." }
    ]
  },
  {
    id: 4,
    title: "Discuss people's traits",
    unlocked: false,
    completed: false,
    vocab: [
      { word: "Grand", phonetics: "[gron]", meaning: "Tall / Big" },
      { word: "Petit", phonetics: "[puh-tee]", meaning: "Small / Short" },
      { word: "Intelligent", phonetics: "[an-tel-ee-zhon]", meaning: "Intelligent" },
      { word: "Sympa", phonetics: "[sam-pah]", meaning: "Nice / Friendly" },
      { word: "Heureux", phonetics: "[uh-ruh]", meaning: "Happy" }
    ],
    grammarRule: "Adjectives must agree in gender with the noun. Add 'e' for feminine (e.g., grande, petite).",
    sentences: [
      { french: "Il est très grand.", phonetics: "[eel ay tray gron]", english: "He is very tall." },
      { french: "Elle est intelligente.", phonetics: "[el ay on-tel-ee-zhont]", english: "She is intelligent." },
      { french: "Ils sont sympas.", phonetics: "[eel sohn sam-pah]", english: "They are nice." }
    ],
    quiz: [
      { question: "How do you make 'Grand' feminine?", options: ["Grander", "Grande", "Grands"], answer: "Grande", explanation: "Most adjectives add an 'e' in the feminine form." },
      { question: "What does 'Sympa' mean?", options: ["Simple", "Nice", "Sympathy"], answer: "Nice", explanation: "It's short for 'sympathique'." },
      { question: "Translate: 'She is small.'", options: ["Il est petit", "Elle est petite", "Elle est grand"], answer: "Elle est petite", explanation: "'Elle' is she, and 'petite' is the feminine form of small." }
    ]
  },
  {
    id: 5,
    title: "Describe what you want to buy",
    unlocked: false,
    completed: false,
    vocab: [
      { word: "Acheter", phonetics: "[ah-shuh-tay]", meaning: "To buy" },
      { word: "Combien ça coûte ?", phonetics: "[kom-byan sah koot]", meaning: "How much does it cost?" },
      { word: "C'est cher", phonetics: "[say shair]", meaning: "It's expensive" },
      { word: "Le magasin", phonetics: "[luh mah-gah-zan]", meaning: "The store" },
      { word: "Un vêtement", phonetics: "[un vay-tuh-mon]", meaning: "A piece of clothing" }
    ],
    grammarRule: "The verb 'acheter' has a stem change in some conjugations: 'j'achète'.",
    sentences: [
      { french: "Je veux acheter ce livre.", phonetics: "[zhuh vuh ah-shuh-tay suh lee-vruh]", english: "I want to buy this book." },
      { french: "Combien ça coûte, s'il vous plaît ?", phonetics: "[kom-byan sah koot, seel voo play]", english: "How much does it cost, please?" },
      { french: "C'est trop cher pour moi.", phonetics: "[say troh shair poor mwah]", english: "It's too expensive for me." }
    ],
    quiz: [
      { question: "How do you ask for the price?", options: ["Où est le magasin ?", "Combien ça coûte ?", "C'est cher ?"], answer: "Combien ça coûte ?", explanation: "This is the standard way to ask 'How much?'" },
      { question: "What is 'The store'?", options: ["Le magasin", "Le vêtement", "Le livre"], answer: "Le magasin", explanation: "Magasin means store." },
      { question: "Translate: 'It's expensive.'", options: ["C'est bon", "C'est cher", "C'est petit"], answer: "C'est cher", explanation: "Cher means expensive." }
    ]
  }
];
