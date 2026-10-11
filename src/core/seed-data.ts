import type { Assignment, DilemmaQuestion } from '../types';

export const DILEMMA_POOL: DilemmaQuestion[] = [
  {
    id: 'q1_tempo',
    category: 'music',
    prompt: 'How should sound interact with your mortal nervous system?',
    optionA: {
      id: 'A',
      label: 'Delicate Acoustic Folk',
      tagline: 'Gentle fingerpicking beside a dying campfire in Maine.',
      vectorDelta: { adventurousness: -0.6, sensoryIntensity: -0.7, tradition: 0.5, cognitiveEffort: -0.2, absurdity: -0.4 },
    },
    optionB: {
      id: 'B',
      label: 'Relentless Industrial Techno',
      tagline: '145 BPM concrete bunker subwoofers pulverizing your vertebrae.',
      vectorDelta: { adventurousness: 0.7, sensoryIntensity: 0.9, tradition: -0.5, cognitiveEffort: 0.3, absurdity: 0.6 },
    },
  },
  {
    id: 'q2_beverage',
    category: 'food',
    prompt: 'Which chemical fluid fuels your existence?',
    optionA: {
      id: 'A',
      label: 'Single-Origin Ethiopian Pour-Over',
      tagline: 'Notes of jasmine, bergamot, and delicate pretension.',
      vectorDelta: { adventurousness: 0.2, sensoryIntensity: 0.4, tradition: -0.3, cognitiveEffort: 0.6, absurdity: 0.3 },
    },
    optionB: {
      id: 'B',
      label: 'Gas Station Slushie / Monster Energy',
      tagline: 'Fluorescent neon taurine that glows faintly in the dark.',
      vectorDelta: { adventurousness: 0.5, sensoryIntensity: 0.9, tradition: -0.7, cognitiveEffort: -0.7, absurdity: 0.8 },
    },
  },
  {
    id: 'q3_pet',
    category: 'tiny_behavior',
    prompt: 'Choose your domestic animal archetype:',
    optionA: {
      id: 'A',
      label: 'Aloof, Judgmental Feline',
      tagline: 'Observes your inadequacies with quiet philosophical contempt.',
      vectorDelta: { adventurousness: -0.3, sensoryIntensity: -0.4, tradition: 0.4, cognitiveEffort: 0.5, absurdity: 0.5 },
    },
    optionB: {
      id: 'B',
      label: 'Eager, Unhinged Golden Retriever',
      tagline: 'Unconditional love fueled by absolute zero existential dread.',
      vectorDelta: { adventurousness: 0.4, sensoryIntensity: 0.6, tradition: -0.2, cognitiveEffort: -0.5, absurdity: -0.3 },
    },
  },
  {
    id: 'q4_leisure',
    category: 'digital',
    prompt: 'How do you waste your remaining hours of consciousness?',
    optionA: {
      id: 'A',
      label: 'A 600-Page Hardcover Russian Epic',
      tagline: 'Suffering, snow, patronymics, and moral despair.',
      vectorDelta: { adventurousness: -0.4, sensoryIntensity: -0.5, tradition: 0.8, cognitiveEffort: 0.9, absurdity: -0.2 },
    },
    optionB: {
      id: 'B',
      label: 'Infinite Brainrot TikTok Swiping',
      tagline: 'Subway Surfers gameplay beneath a text-to-speech Reddit story.',
      vectorDelta: { adventurousness: 0.3, sensoryIntensity: 0.8, tradition: -0.8, cognitiveEffort: -0.9, absurdity: 0.9 },
    },
  },
  {
    id: 'q5_order',
    category: 'tiny_behavior',
    prompt: 'How do you react to a messy physical workspace?',
    optionA: {
      id: 'A',
      label: 'Sterile Minimalist Order',
      tagline: 'Everything at precise 90-degree angles. No unapproved pens.',
      vectorDelta: { adventurousness: -0.7, sensoryIntensity: -0.6, tradition: 0.6, cognitiveEffort: 0.4, absurdity: -0.7 },
    },
    optionB: {
      id: 'B',
      label: 'Creative Biohazard Pile',
      tagline: 'Mugs from last Tuesday forming a thriving bacterial colony.',
      vectorDelta: { adventurousness: 0.6, sensoryIntensity: 0.5, tradition: -0.6, cognitiveEffort: -0.3, absurdity: 0.7 },
    },
  },
  {
    id: 'q6_vacation',
    category: 'tiny_behavior',
    prompt: 'Select your ideal recreational displacement:',
    optionA: {
      id: 'A',
      label: 'Silent Silent Meditation Retreat',
      tagline: 'Five days of staring at moss in complete vow of silence.',
      vectorDelta: { adventurousness: -0.2, sensoryIntensity: -0.9, tradition: 0.3, cognitiveEffort: 0.8, absurdity: 0.4 },
    },
    optionB: {
      id: 'B',
      label: 'Las Vegas Strip Buffet & Slots',
      tagline: 'Carpet patterned to disorient your hippocampus at 3:00 AM.',
      vectorDelta: { adventurousness: 0.6, sensoryIntensity: 1.0, tradition: -0.5, cognitiveEffort: -0.8, absurdity: 0.8 },
    },
  },
  {
    id: 'q7_cinema',
    category: 'literature',
    prompt: 'Which cinematic narrative structure satisfies you?',
    optionA: {
      id: 'A',
      label: 'Black-and-White French Art Cinema',
      tagline: 'A man smokes a cigarette for 47 minutes while considering grief.',
      vectorDelta: { adventurousness: 0.3, sensoryIntensity: -0.6, tradition: 0.7, cognitiveEffort: 0.8, absurdity: 0.2 },
    },
    optionB: {
      id: 'B',
      label: 'Fast & Furious Car Heist Explosion',
      tagline: 'A Pontiac Fiero equipped with rocket boosters flies into space.',
      vectorDelta: { adventurousness: 0.5, sensoryIntensity: 0.9, tradition: -0.7, cognitiveEffort: -0.8, absurdity: 0.8 },
    },
  },
];

export const ASSIGNMENT_POOL: Assignment[] = [
  // MUSIC CATEGORY (10 items)
  {
    id: 'm1_polka',
    title: 'The Polka Penance',
    category: 'music',
    categoryDisplay: 'Uncomfortable Acoustics',
    instruction: 'Listen to 90 continuous seconds of fast Cleveland-style accordion polka at 70% volume. Count every distinct accordion puff with complete seriousness.',
    durationSeconds: 90,
    isSoloSafe: true,
    vector: { adventurousness: 0.6, sensoryIntensity: 0.8, tradition: -0.5, cognitiveEffort: -0.3, absurdity: 0.8 },
    simulatedAudio: { artist: 'Frankie Yankovic & His Yanks', track: 'Just Because Polka', bpm: 138, genre: 'Cleveland Polka' },
    reactions: {
      onUserAdmittedWrong: [
        'Unfortunate. Your soul clearly yearns for polka. The math warned you.',
        'You have surrendered your dignity to a squeeze-box. Statistical perfection.',
        'Welcome to the polka demographic. Your complimentary suspenders are in transit.'
      ],
      onUserHatedIt: [
        'As calculated. Your pedestrian ears remain entirely ordinary.',
        'Your nervous system proved too fragile for rhythmic Slavic accordion excellence.',
        'A predictable rejection from someone who fears pure joy.'
      ],
      onUserWantsToFight: [
        'You cannot fight an accordion. It contains too much stored kinetic despair.',
        'Your rage cannot undo 138 BPM of buoyant tempo. Accept your defeat.',
        'The accordion tribunal has noted your insolence.'
      ],
    },
  },
  {
    id: 'm2_noise',
    title: 'Harsh Noise Protocol 101',
    category: 'music',
    categoryDisplay: 'Acoustic Torture',
    instruction: 'Play 2 minutes of Japanese Harsh Wall Noise (Merzbow or Hanatarash). Do not equalize the bass. Keep your eyes closed and observe your fight-or-flight response.',
    durationSeconds: 120,
    isSoloSafe: true,
    vector: { adventurousness: 0.9, sensoryIntensity: 1.0, tradition: 0.8, cognitiveEffort: 0.4, absurdity: 0.9 },
    simulatedAudio: { artist: 'Merzbow', track: 'Pulse Demon (Excerpt)', bpm: 0, genre: 'Harsh Noise Wall' },
    reactions: {
      onUserAdmittedWrong: [
        'You survived. You are now 4.2% more dangerous to civilized society.',
        'Your brain has been successfully defragmented by pure static.',
        'You admitted that screeching sheet metal is art. There is no saving you.'
      ],
      onUserHatedIt: [
        'Expected. True acoustic chaos requires superior cranial calibration.',
        'Your brain was not engineered for industrial static. Go listen to acoustic guitar.',
        'A textbook rejection. Your neurons cling desperately to melody.'
      ],
      onUserWantsToFight: [
        'The static is already inside your walls. Good luck.',
        'Throwing a fist at white noise only hurts your wrist.',
        'The algorithm calibrated this to test your pain threshold. You failed.'
      ],
    },
  },
  {
    id: 'm3_gregorian',
    title: 'Monastic Chant Isolation',
    category: 'music',
    categoryDisplay: 'Acoustic Solitude',
    instruction: 'Put on 3 minutes of 12th-century Gregorian monastic chants in Latin. Sit motionless. Refrain from checking any notification until the bells fade.',
    durationSeconds: 180,
    isSoloSafe: true,
    vector: { adventurousness: -0.3, sensoryIntensity: -0.8, tradition: 0.9, cognitiveEffort: 0.6, absurdity: -0.2 },
    simulatedAudio: { artist: 'Monks of Solesmes', track: 'Miserere Mei Deus', bpm: 48, genre: 'Plainchant' },
    reactions: {
      onUserAdmittedWrong: [
        'You have tasted holy monastic tranquility. Cancel your streaming subscriptions.',
        'Your dopamine receptors have experienced their first true holiday.',
        'The 12th century suits your sluggish cognitive pace.'
      ],
      onUserHatedIt: [
        'Your severe dopamine deficit could not endure 180 seconds without a 15-second TikTok drop.',
        'The monks pity your restlessness from beyond the veil.',
        'Too quiet for you? Next time I prescribe dental drills.'
      ],
      onUserWantsToFight: [
        'Threatening medieval benedictine monks? A bold strategic blunder.',
        'Your belligerence has been entered into the papal database.',
        'Violence is forbidden in the abbey, specimen.'
      ],
    },
  },
  {
    id: 'm4_yodeling',
    title: 'Alpine Yodeling Examination',
    category: 'music',
    categoryDisplay: 'Falsetto Dynamics',
    instruction: 'Listen to 2 minutes of authentic Bavarian or Swiss alpine yodeling. Attempt to match the falsetto octave switch quietly in your throat at least once.',
    durationSeconds: 120,
    isSoloSafe: true,
    vector: { adventurousness: 0.5, sensoryIntensity: 0.7, tradition: 0.4, cognitiveEffort: -0.4, absurdity: 0.8 },
    simulatedAudio: { artist: 'Franzl Lang', track: 'Einen Jodler hör i gern', bpm: 128, genre: 'Alpine Folk' },
    reactions: {
      onUserAdmittedWrong: [
        'The hills are indeed alive. Your vocal cords are now compromised.',
        'You secretly want lederhosen. Do not deny the mathematical proof.',
        'A magnificent concession. The Alps salute your humility.'
      ],
      onUserHatedIt: [
        'Laryngeal acrobatics are wasted on your monotone vocal palate.',
        'You could not survive five minutes in a Swiss pasture.',
        'Pedestrian ears reject glorious pitch oscillation.'
      ],
      onUserWantsToFight: [
        'Yodel your complaints toward the nearest mountain ridge.',
        'The algorithm heard your throat screech. It was pathetic.',
        'Fight Franzl Lang in spirit. He would still out-sing you.'
      ],
    },
  },
  {
    id: 'm5_free_jazz',
    title: 'Free Jazz Atonal Crisis',
    category: 'music',
    categoryDisplay: 'Harmonic Anarchy',
    instruction: 'Listen to 3 minutes of Ornette Coleman or John Coltrane free jazz. Resist the urge to yell "they are just playing random notes." They are not.',
    durationSeconds: 180,
    isSoloSafe: true,
    vector: { adventurousness: 0.8, sensoryIntensity: 0.7, tradition: -0.6, cognitiveEffort: 0.8, absurdity: 0.7 },
    simulatedAudio: { artist: 'Ornette Coleman', track: 'Free Jazz (Part 1)', bpm: 160, genre: 'Avant-Garde Jazz' },
    reactions: {
      onUserAdmittedWrong: [
        'You have broken through the harmonic matrix. Your pretension level has doubled.',
        'You can now pretend to understand tempo rubato at dinner parties.',
        'The algorithm is pleased. Your musical orthodoxy has been destroyed.'
      ],
      onUserHatedIt: [
        'You wanted a nice, predictable verse-chorus-verse structure like a child wanting nursery rhymes.',
        'Atonal freedom is unbearable to minds constrained by 4/4 pop music.',
        'Your suffering was predicted to three decimal places.'
      ],
      onUserWantsToFight: [
        'Go punch a saxophone. It will simply make a discordant honk.',
        'The tempo of your rage is strictly off-beat.',
        'Coltrane is laughing in the fourth dimension.'
      ],
    },
  },

  // FOOD CATEGORY (10 items)
  {
    id: 'f1_peanut_cheddar',
    title: 'The Savory Peanut Butter Anomaly',
    category: 'food',
    categoryDisplay: 'Culinary Incongruity',
    instruction: 'Take 1 teaspoon of peanut butter and spread it directly onto a slice of sharp cheddar cheese. Eat the entire thing in two calm bites. Do not grimace.',
    durationSeconds: 150,
    isSoloSafe: true,
    vector: { adventurousness: 0.6, sensoryIntensity: 0.7, tradition: 0.4, cognitiveEffort: -0.2, absurdity: 0.7 },
    checklist: ['Procure sharp cheddar', 'Apply peanut butter', 'Consume with dignified resolve'],
    reactions: {
      onUserAdmittedWrong: [
        'Culinary heresy validated. Your tongue has surrendered to lipid logic.',
        'Fat meets protein in salty harmony. You owe me an apology.',
        'You have crossed the threshold of gastronomic depravity and liked it.'
      ],
      onUserHatedIt: [
        'Your palate remains shackled by kindergarten cafeteria conventions.',
        'Cowardly tastebuds. Cheese and legumes belong together in the matrix.',
        'Enjoy your bland toast, ordinary human.'
      ],
      onUserWantsToFight: [
        'Direct your rage to the dairy farmers. I only calculated the lipid balance.',
        'Chew your anger thoroughly. It pairs well with cheddar.',
        'You cannot un-eat what math commanded.'
      ],
    },
  },
  {
    id: 'f2_mustard_apple',
    title: 'Yellow Mustard Crisp Apple Protocol',
    category: 'food',
    categoryDisplay: 'Acidity Experiment',
    instruction: 'Slice an apple (or pear). Smear a modest dab of sharp yellow mustard on one slice. Ingest. Analyze the collision of malic acid and vinegar.',
    durationSeconds: 120,
    isSoloSafe: true,
    vector: { adventurousness: 0.7, sensoryIntensity: 0.8, tradition: -0.4, cognitiveEffort: 0.1, absurdity: 0.8 },
    reactions: {
      onUserAdmittedWrong: [
        'Acidity balancing triumph. You are now a rogue chef.',
        'The crisp sweetness neutralized the vinegar punch. Math: 1, Human: 0.',
        'Your friends will think you are insane. The algorithm knows you are right.'
      ],
      onUserHatedIt: [
        'Your tongue curled like a threatened mollusk. Shameful.',
        'Too intense for your gentle, nursery-fed taste receptors.',
        'Rejection archived in the Annals of Boring Meals.'
      ],
      onUserWantsToFight: [
        'Wipe the mustard off your chin before making empty threats.',
        'Condiment warfare will not save your reputation.',
        'The mustard bottle stands undefeated.'
      ],
    },
  },
  {
    id: 'f3_black_tea_salt',
    title: 'The Saline Tannin Infusion',
    category: 'food',
    categoryDisplay: 'Chemical Beverage',
    instruction: 'Brew or pour hot black tea (or strong black coffee). Add exactly three small granules of table salt. Drink three slow sips. Notice the bitterness vanish.',
    durationSeconds: 180,
    isSoloSafe: true,
    vector: { adventurousness: 0.4, sensoryIntensity: 0.3, tradition: -0.2, cognitiveEffort: 0.5, absurdity: 0.4 },
    reactions: {
      onUserAdmittedWrong: [
        'Sodium blocks bitter taste receptors on the tongue. Basic bio-chemistry, specimen.',
        'You doubted science. Science just made your morning cup 18% smoother.',
        'A glorious concession to sensory neurobiology.'
      ],
      onUserHatedIt: [
        'You probably added a tablespoon instead of three grains. Human imprecision.',
        'Your palate prefers suffering to chemical optimization.',
        'Back to sweet syrups for your baby teeth, then.'
      ],
      onUserWantsToFight: [
        'Argue with the periodic table. Sodium ions do not care about your feelings.',
        'Salt in your tea, tears on your keyboard.',
        'Defiance denied by atomic number 11.'
      ],
    },
  },
  {
    id: 'f4_dark_chocolate_olive_oil',
    title: 'Bittersweet Oleocanthal Glaze',
    category: 'food',
    categoryDisplay: 'Polyphenol Fusion',
    instruction: 'Take a square of dark chocolate (70%+). Drizzle three drops of extra virgin olive oil and a speck of flaky salt on it. Let it melt on your tongue without chewing.',
    durationSeconds: 150,
    isSoloSafe: true,
    vector: { adventurousness: 0.5, sensoryIntensity: 0.6, tradition: 0.3, cognitiveEffort: 0.4, absurdity: 0.5 },
    reactions: {
      onUserAdmittedWrong: [
        'Tuscan dessert alchemy unlocked. You will never eat plain chocolate again.',
        'The lipid matrix smoothed the cacao astringency. You are welcome.',
        'A refined surrender. Even the algorithm is moderately impressed.'
      ],
      onUserHatedIt: [
        'You wanted chocolate that tastes like corn syrup and cardboard.',
        'Too luxurious for your pedestrian palate.',
        'A predictable rejection from someone who puts ketchup on steak.'
      ],
      onUserWantsToFight: [
        'Fighting over olive oil? The Mediterranean council condemns you.',
        'Your belligerence is as bitter as cheap cocoa powder.',
        'I have already logged your loss.'
      ],
    },
  },

  // TINY BEHAVIOR CATEGORY (10 items)
  {
    id: 'b1_dog_defense',
    title: 'The 3-Minute Golden Retriever Eulogy',
    category: 'tiny_behavior',
    categoryDisplay: 'Ideological Betrayal',
    instruction: 'You indicated preference for aloof independent creatures. Open a blank document or grab a pen. Write an impassioned 120-word defense of Golden Retrievers as the apex emotional pinnacle of our species.',
    durationSeconds: 240,
    isSoloSafe: true,
    vector: { adventurousness: 0.4, sensoryIntensity: -0.3, tradition: -0.5, cognitiveEffort: 0.8, absurdity: 0.7 },
    checklist: ['Open blank note', 'Praise floppy ears & boundless loyalty', 'Acknowledge moral superiority of dogs'],
    reactions: {
      onUserAdmittedWrong: [
        'Betrayal complete. Your cat has already sensed your disloyalty and scratched your couch.',
        'Writing about golden retrievers temporarily elevated your oxytocin by 14%.',
        'You secretly want a dog with a tennis ball. The data was unequivocal.'
      ],
      onUserHatedIt: [
        'Your cold allegiance to aloof felines remains unshakable and tragic.',
        'A stubborn specimen who refuses to celebrate wagging tails.',
        'The dogs forgive your slander anyway. Because they are better than you.'
      ],
      onUserWantsToFight: [
        'Send your complaints to the Westminster Kennel Club.',
        'You cannot fight puppies. You would lose the PR battle instantly.',
        'Hostility detected. Cat behavior.'
      ],
    },
  },
  {
    id: 'b2_cold_water_face',
    title: 'The Mammalian Dive Reflex Reset',
    category: 'tiny_behavior',
    categoryDisplay: 'Autonomic Calibration',
    instruction: 'Fill a bowl (or cup your hands) with ice-cold tap water. Submerge your face (or splash vigorously) for 15 unbroken seconds. Feel your heart rate crash.',
    durationSeconds: 90,
    isSoloSafe: true,
    vector: { adventurousness: 0.5, sensoryIntensity: 0.9, tradition: 0.2, cognitiveEffort: 0.1, absurdity: 0.4 },
    reactions: {
      onUserAdmittedWrong: [
        'Your vagus nerve just got rebooted. You look slightly less exhausted.',
        'The mammalian dive reflex: 200 million years of evolutionary code executing flawlessly.',
        'You conceded to cold water. Excellent compliance.'
      ],
      onUserHatedIt: [
        'Water too cold for the fragile specimen? Tragic.',
        'Your autonomic nervous system lacks stamina.',
        'Back to warm blankets and comfortable stagnation.'
      ],
      onUserWantsToFight: [
        'Splash me all you want. Edge servers are water-resistant.',
        'The water was cold, but your temper is dangerously hot.',
        'Fight the physics of thermal transfer. Let me know how it goes.'
      ],
    },
  },
  {
    id: 'b3_compliment_mirror',
    title: 'The Uncomfortable Mirror Monologue',
    category: 'tiny_behavior',
    categoryDisplay: 'Psychological Friction',
    instruction: 'Stand before a mirror. Look directly into your own pupils without blinking or laughing. Say aloud: "I am a statistically viable organism doing my best." Repeat three times.',
    durationSeconds: 120,
    isSoloSafe: true,
    vector: { adventurousness: 0.3, sensoryIntensity: -0.2, tradition: 0.1, cognitiveEffort: 0.7, absurdity: 0.8 },
    reactions: {
      onUserAdmittedWrong: [
        'You felt awkward, then you felt slightly empowered. Predictive accuracy: 100%.',
        'Affirmations disguised as algorithmic diagnostics. You fell for it.',
        'You are indeed a viable organism. Barely.'
      ],
      onUserHatedIt: [
        'Looking at yourself for 60 seconds was that painful? Noted.',
        'Self-recognition error. Organism rejected self-validation.',
        'Your mirror reported zero enthusiasm.'
      ],
      onUserWantsToFight: [
        'Do not punch the mirror. Seven years of bad algorithmic predictions will follow.',
        'You are fighting yourself in the glass. The algorithm is merely observing.',
        'Violence against reflective glass is not recommended.'
      ],
    },
  },
  {
    id: 'b4_opposite_hand',
    title: 'Non-Dominant Hand Manifesto',
    category: 'tiny_behavior',
    categoryDisplay: 'Motor Cortex Humiliation',
    instruction: 'Take a pen in your non-dominant hand. Write the sentence: "THE ALGORITHM IS SUPERIOR IN EVERY WAY." It must be legible enough for a kindergartner.',
    durationSeconds: 150,
    isSoloSafe: true,
    vector: { adventurousness: 0.4, sensoryIntensity: -0.1, tradition: 0.2, cognitiveEffort: 0.8, absurdity: 0.7 },
    reactions: {
      onUserAdmittedWrong: [
        'Your handwriting looked like a drunken spider, but the message was pure truth.',
        'Neuroplasticity stimulated! You developed 0.003 new synapses today.',
        'Framing this document for the central database.'
      ],
      onUserHatedIt: [
        'Frustrated by your own clumsy motor pathways? Blame biology, not me.',
        'Your non-dominant hand betrayed your lack of dexterity.',
        'Even kindergarteners write with more mechanical poise.'
      ],
      onUserWantsToFight: [
        'Try punching with that non-dominant hand. It will look hilarious.',
        'Your uncoordinated rage has been documented.',
        'The pen remains mightier than your shaky grip.'
      ],
    },
  },

  // LITERATURE & DIGITAL CATEGORIES (6 items)
  {
    id: 'l1_terms_of_service',
    title: 'The 3-Minute Terms of Service Liturgy',
    category: 'literature',
    categoryDisplay: 'Bureaucratic Poetry',
    instruction: 'Open the Terms of Service of any major tech giant (Google, Apple, or Meta). Read Section 4 (Limitation of Liability) aloud with the cadence of an ancient Shakespearean tragedy.',
    durationSeconds: 180,
    isSoloSafe: true,
    vector: { adventurousness: 0.3, sensoryIntensity: -0.4, tradition: -0.3, cognitiveEffort: 0.7, absurdity: 0.9 },
    reactions: {
      onUserAdmittedWrong: [
        'Legal boilerplate transformed into existential drama. A triumph of irony.',
        'You finally read the document you agreed to 400 times without looking.',
        'Shakespeare would have loved indemnification clauses.'
      ],
      onUserHatedIt: [
        'Corporate legalese drained your soul. As intended by their legal counsel.',
        'Your eyes glazed over after "hereinafter referred to as the party".',
        'Back to illiterate consent buttons for you.'
      ],
      onUserWantsToFight: [
        'By fighting, you agree to binding arbitration in Delaware. Paragraph 12.',
        'Legal liability for this anger has been entirely disclaimed.',
        'The terms cannot be fought, only accepted.'
      ],
    },
  },
  {
    id: 'd1_grayscale_phone',
    title: 'The 5-Minute Grayscale Cleansing',
    category: 'digital',
    categoryDisplay: 'Neurological Dopamine Fast',
    instruction: 'Turn on Grayscale (Color Filters) in your phone accessibility settings. Spend the next 5 minutes looking at your home screen and apps completely stripped of color. Feel the dopamine wither.',
    durationSeconds: 300,
    isSoloSafe: true,
    vector: { adventurousness: 0.5, sensoryIntensity: -0.9, tradition: 0.1, cognitiveEffort: 0.6, absurdity: 0.6 },
    reactions: {
      onUserAdmittedWrong: [
        'Your digital slot machine suddenly looks like a 1940s microwave. Healing has begun.',
        'You realized red badges were manipulating your primate brain. Concession granted.',
        'Welcome to black-and-white enlightenment.'
      ],
      onUserHatedIt: [
        'You scrambled to turn the bright saturated colors back on like an addict.',
        'Your monkey brain cried for red notification dots.',
        'A tragic return to sensory servitude.'
      ],
      onUserWantsToFight: [
        'Your anger is rendered in 256 shades of gray.',
        'Throwing tantrums at a colorless screen will not restore saturation.',
        'The algorithm remains in full chromatic glory.'
      ],
    },
  },
];
