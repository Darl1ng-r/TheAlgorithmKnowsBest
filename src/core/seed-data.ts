import type { Assignment, DilemmaQuestion } from '../types';

export const NUDGE_PROVOCATIONS: string[] = [
  'Still clinging to this opinion, or has reality humbled you yet?',
  '84% of the population says you are factually mistaken. Care to double down or surrender?',
  'The clock ran out. Did prophecy occur, or was that just unearned confidence?',
  'The Algorithm tested your stubbornness. Are your tastebuds evolving or just confused?',
  'I need you to vote on this so I can verify whether our friendship is based on a lie.',
];

export const DILEMMA_POOL: DilemmaQuestion[] = [
  // --- Core Original Dilemmas ---
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
      label: 'Silent Meditation Retreat',
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

  // --- Pillar 1: Hilarious Low-Stakes Conviction Debates ---
  {
    id: 'q_cold_pizza',
    category: 'food',
    prompt: 'Cold leftover pizza eaten straight out of the fridge beats reheated pizza every time.',
    optionA: {
      id: 'A',
      label: 'Cold Fridge Slice',
      tagline: 'Solid savory cheese, zero soggy microwave crust, instant 11 PM gratification.',
      vectorDelta: { adventurousness: 0.3, sensoryIntensity: 0.5, tradition: -0.4, cognitiveEffort: -0.6, absurdity: 0.6 },
    },
    optionB: {
      id: 'B',
      label: 'Properly Reheated',
      tagline: 'Warm gooey cheese or nothing. I am an upright civilized primate, not a raccoon.',
      vectorDelta: { adventurousness: -0.3, sensoryIntensity: -0.2, tradition: 0.5, cognitiveEffort: 0.4, absurdity: -0.5 },
    },
  },
  {
    id: 'q_cart_corral',
    category: 'tiny_behavior',
    prompt: 'People who return grocery shopping carts are the only ones keeping civilization from collapsing.',
    optionA: {
      id: 'A',
      label: 'The True Moral Test',
      tagline: 'A solitary act of pure civic duty performed with zero surveillance or reward.',
      vectorDelta: { adventurousness: -0.4, sensoryIntensity: -0.3, tradition: 0.7, cognitiveEffort: 0.5, absurdity: -0.6 },
    },
    optionB: {
      id: 'B',
      label: 'Job Creation Chaos',
      tagline: 'The supermarket pays cart attendants. I leave mine gently straddling two parking spaces.',
      vectorDelta: { adventurousness: 0.6, sensoryIntensity: 0.5, tradition: -0.8, cognitiveEffort: -0.6, absurdity: 0.8 },
    },
  },
  {
    id: 'q_dnd_phone',
    category: 'digital',
    prompt: 'Putting your smartphone on Do Not Disturb 24/7 is modern self-preservation, not being anti-social.',
    optionA: {
      id: 'A',
      label: 'Permanent Silence',
      tagline: 'If it is a true emergency, call the fire department, not my glowing meme rectangle.',
      vectorDelta: { adventurousness: -0.5, sensoryIntensity: -0.8, tradition: -0.3, cognitiveEffort: 0.6, absurdity: 0.5 },
    },
    optionB: {
      id: 'B',
      label: 'Live & Connected',
      tagline: 'Immediate dopamine pings and fear of missing out keep my mortal soul vibrating.',
      vectorDelta: { adventurousness: 0.5, sensoryIntensity: 0.8, tradition: 0.3, cognitiveEffort: -0.7, absurdity: -0.3 },
    },
  },
  {
    id: 'q_boneless_wings',
    category: 'food',
    prompt: 'Boneless chicken wings are just adult chicken nuggets, and pretending otherwise is marketing cope.',
    optionA: {
      id: 'A',
      label: 'Accept The Nugget',
      tagline: 'Sauced-up processed tenders with an inflated sports bar menu markup.',
      vectorDelta: { adventurousness: -0.3, sensoryIntensity: 0.2, tradition: -0.6, cognitiveEffort: 0.5, absurdity: 0.7 },
    },
    optionB: {
      id: 'B',
      label: 'Defend The Wing',
      tagline: 'It is peak convenience. I do not wish to gnaw cartilage off a bone in public view.',
      vectorDelta: { adventurousness: 0.2, sensoryIntensity: -0.3, tradition: 0.4, cognitiveEffort: -0.4, absurdity: -0.5 },
    },
  },
  {
    id: 'q_bedroom_chair',
    category: 'tiny_behavior',
    prompt: 'The "Chair in the Bedroom" holds a sentient pile of clothes that decides when garments are dirty.',
    optionA: {
      id: 'A',
      label: 'The Sacred Chair',
      tagline: 'Not clean enough for the closet, not dirty enough for the wash. Pure fabric purgatory.',
      vectorDelta: { adventurousness: 0.4, sensoryIntensity: 0.3, tradition: -0.6, cognitiveEffort: -0.5, absurdity: 0.8 },
    },
    optionB: {
      id: 'B',
      label: 'Binary Order Only',
      tagline: 'Hang it up or throw it in the wash. A chair draped in jeans is a cry for spiritual help.',
      vectorDelta: { adventurousness: -0.6, sensoryIntensity: -0.4, tradition: 0.7, cognitiveEffort: 0.5, absurdity: -0.8 },
    },
  },
  {
    id: 'q_early_alarm',
    category: 'tiny_behavior',
    prompt: 'Waking up 3 minutes before your morning alarm is a targeted psychological attack from your own body.',
    optionA: {
      id: 'A',
      label: 'Biological Betrayal',
      tagline: 'Staring at the ceiling in cold despair knowing sleep is now legally forbidden.',
      vectorDelta: { adventurousness: -0.2, sensoryIntensity: 0.7, tradition: 0.2, cognitiveEffort: 0.6, absurdity: 0.6 },
    },
    optionB: {
      id: 'B',
      label: 'Circadian Victory',
      tagline: 'My internal biological clock defeated the digital machine. I am a primal deity.',
      vectorDelta: { adventurousness: 0.5, sensoryIntensity: -0.3, tradition: 0.4, cognitiveEffort: 0.3, absurdity: -0.4 },
    },
  },
  {
    id: 'q_airplane_ding',
    category: 'tiny_behavior',
    prompt: 'Standing up the millisecond the airplane ding sounds does not make the plane deboard any faster.',
    optionA: {
      id: 'A',
      label: 'Stay Seated In Peace',
      tagline: 'Row 24 is not moving for twelve minutes. Why stand hunched under overhead bins like a gargoyle?',
      vectorDelta: { adventurousness: -0.3, sensoryIntensity: -0.6, tradition: 0.5, cognitiveEffort: 0.6, absurdity: -0.4 },
    },
    optionB: {
      id: 'B',
      label: 'Pop Up Immediately',
      tagline: 'My calves require immediate decompression and I must establish dominance in the aisle.',
      vectorDelta: { adventurousness: 0.5, sensoryIntensity: 0.8, tradition: -0.5, cognitiveEffort: -0.4, absurdity: 0.8 },
    },
  },
  {
    id: 'q_dishwasher_loading',
    category: 'tiny_behavior',
    prompt: 'There is an optimal mathematical way to load the dishwasher, and everyone else does it like a raccoon.',
    optionA: {
      id: 'A',
      label: 'Architectural Order',
      tagline: 'Tines grouped by fork angle, bowls nested for water jet trajectories. Total engineering.',
      vectorDelta: { adventurousness: -0.6, sensoryIntensity: -0.4, tradition: 0.6, cognitiveEffort: 0.8, absurdity: -0.7 },
    },
    optionB: {
      id: 'B',
      label: 'Slam Door & Pray',
      tagline: 'If the door latches shut without breaking glass, the scalding water gods will sort it out.',
      vectorDelta: { adventurousness: 0.7, sensoryIntensity: 0.6, tradition: -0.7, cognitiveEffort: -0.7, absurdity: 0.8 },
    },
  },
  {
    id: 'q_no_worries_email',
    category: 'digital',
    prompt: 'Saying "no worries" in a work email secretly means "there were several worries, but I will survive."',
    optionA: {
      id: 'A',
      label: 'Polite Corporate Mask',
      tagline: 'The passive-aggressive titanium shield of modern digital professional diplomacy.',
      vectorDelta: { adventurousness: 0.2, sensoryIntensity: 0.4, tradition: -0.3, cognitiveEffort: 0.6, absurdity: 0.6 },
    },
    optionB: {
      id: 'B',
      label: 'Genuine Zero Worries',
      tagline: 'I literally do not care about this quarterly spreadsheet enough to harbour anxiety.',
      vectorDelta: { adventurousness: -0.4, sensoryIntensity: -0.6, tradition: 0.4, cognitiveEffort: -0.6, absurdity: -0.3 },
    },
  },
  {
    id: 'q_french_fries_clock',
    category: 'food',
    prompt: 'French fries have a strict 7-minute lifespan. After that, they are lukewarm salted packing peanuts.',
    optionA: {
      id: 'A',
      label: 'The 7-Minute Window',
      tagline: 'Eat them in the parking lot or watch their crispy soul evaporate into cardboard condensation.',
      vectorDelta: { adventurousness: 0.4, sensoryIntensity: 0.8, tradition: 0.3, cognitiveEffort: 0.3, absurdity: 0.5 },
    },
    optionB: {
      id: 'B',
      label: 'All Fries Are Beautiful',
      tagline: 'I will gladly eat limp, cold, soggy French fries at 2:00 AM without a shred of remorse.',
      vectorDelta: { adventurousness: -0.3, sensoryIntensity: -0.5, tradition: -0.4, cognitiveEffort: -0.5, absurdity: 0.7 },
    },
  },
  {
    id: 'q_self_checkout_tax',
    category: 'tiny_behavior',
    prompt: 'Self-checkout should provide a 10% discount for doing the grocery store employee\'s job.',
    optionA: {
      id: 'A',
      label: 'Cut My Employee Check',
      tagline: 'I weighed fourteen organic avocados and bagged my own oat milk. Where is my W-2 form?',
      vectorDelta: { adventurousness: 0.3, sensoryIntensity: 0.4, tradition: -0.4, cognitiveEffort: 0.6, absurdity: 0.6 },
    },
    optionB: {
      id: 'B',
      label: 'Speed Over Pennies',
      tagline: 'I will happily scan my own groceries if it means speaking to zero human beings today.',
      vectorDelta: { adventurousness: -0.4, sensoryIntensity: -0.7, tradition: 0.5, cognitiveEffort: -0.3, absurdity: -0.4 },
    },
  },
  {
    id: 'q_phone_cord_panic',
    category: 'digital',
    prompt: 'Unplugging the landline phone cord in 2002 caused more raw panic than any modern phone notification.',
    optionA: {
      id: 'A',
      label: 'Hardware Cardiac Arrest',
      tagline: 'Stretching the curly cord into the coat closet so parents wouldn\'t overhear your teenage crush.',
      vectorDelta: { adventurousness: 0.4, sensoryIntensity: 0.7, tradition: 0.8, cognitiveEffort: 0.3, absurdity: 0.5 },
    },
    optionB: {
      id: 'B',
      label: 'Modern Screen Dread',
      tagline: 'The three animated typing bubbles that appear for twenty seconds then abruptly vanish forever.',
      vectorDelta: { adventurousness: -0.3, sensoryIntensity: 0.8, tradition: -0.7, cognitiveEffort: 0.5, absurdity: 0.6 },
    },
  },
  {
    id: 'q_useless_meetings',
    category: 'digital',
    prompt: '90% of workplace meetings could have been an email, and 50% of those emails didn\'t need to be sent.',
    optionA: {
      id: 'A',
      label: 'Abolish The Calendar',
      tagline: 'Cameras off, nodding periodically in solemn silence while actively grocery shopping.',
      vectorDelta: { adventurousness: 0.5, sensoryIntensity: -0.5, tradition: -0.7, cognitiveEffort: 0.6, absurdity: 0.8 },
    },
    optionB: {
      id: 'B',
      label: 'We Need Alignment',
      tagline: 'Face-to-face banter builds culture and prevents collaborative catastrophe across departments.',
      vectorDelta: { adventurousness: -0.4, sensoryIntensity: 0.6, tradition: 0.7, cognitiveEffort: -0.3, absurdity: -0.6 },
    },
  },
  {
    id: 'q_season_temperature',
    category: 'tiny_behavior',
    prompt: '65°F (18°C) in Autumn feels crisp and cozy, but 65°F in Spring feels like hot summer.',
    optionA: {
      id: 'A',
      label: 'Atmospheric Mood Science',
      tagline: 'Our nervous systems calibrate to recent misery. Mathematical thermometers are subordinate to feelings.',
      vectorDelta: { adventurousness: 0.4, sensoryIntensity: 0.6, tradition: -0.3, cognitiveEffort: -0.2, absurdity: 0.7 },
    },
    optionB: {
      id: 'B',
      label: 'Temperature Is Just Math',
      tagline: 'It is 65 degrees Fahrenheit. Put on the light sweater or don\'t. Physics does not have vibes.',
      vectorDelta: { adventurousness: -0.5, sensoryIntensity: -0.3, tradition: 0.7, cognitiveEffort: 0.7, absurdity: -0.7 },
    },
  },
  {
    id: 'q_movie_subtitles',
    category: 'literature',
    prompt: 'Watching movies with subtitles on makes you comprehend 200% more plot, even in your native language.',
    optionA: {
      id: 'A',
      label: 'Subtitles Forever On',
      tagline: 'Modern audio mixing has actors mumbling poetry over deafening bass explosions. I must read.',
      vectorDelta: { adventurousness: -0.2, sensoryIntensity: 0.5, tradition: -0.4, cognitiveEffort: 0.7, absurdity: 0.4 },
    },
    optionB: {
      id: 'B',
      label: 'Eyes On The Visuals',
      tagline: 'Subtitles turn Oscar-winning cinematography into a high-speed speed-reading examination.',
      vectorDelta: { adventurousness: 0.3, sensoryIntensity: -0.4, tradition: 0.6, cognitiveEffort: -0.5, absurdity: -0.5 },
    },
  },

  // --- Pillar 2: Relatable Life Dilemmas & Social Predictions ---
  {
    id: 'q_text_period',
    category: 'digital',
    prompt: 'A text message ending with a single period feels 10 times more hostile than an exclamation point.',
    optionA: {
      id: 'A',
      label: 'Hostile Punctuation',
      tagline: '"Sure." is a cold declaration of psychological war. "Sure!" is friendly and cooperative.',
      vectorDelta: { adventurousness: 0.3, sensoryIntensity: 0.7, tradition: -0.5, cognitiveEffort: 0.6, absurdity: 0.7 },
    },
    optionB: {
      id: 'B',
      label: 'Grammar Is Innocent',
      tagline: 'A period concludes a grammatical sentence. Stop projecting your childhood trauma onto dots.',
      vectorDelta: { adventurousness: -0.4, sensoryIntensity: -0.5, tradition: 0.8, cognitiveEffort: -0.3, absurdity: -0.7 },
    },
  },
  {
    id: 'q_groupchat_lurker',
    category: 'digital',
    prompt: 'Every group chat has a designated lurker who never speaks but secretly screenshots everything.',
    optionA: {
      id: 'A',
      label: 'Silent Intelligence Agent',
      tagline: 'Zero messages typed in six months, yet possesses classified receipts on the entire social circle.',
      vectorDelta: { adventurousness: -0.5, sensoryIntensity: -0.3, tradition: 0.3, cognitiveEffort: 0.8, absurdity: 0.7 },
    },
    optionB: {
      id: 'B',
      label: 'Unhinged Megaphone',
      tagline: 'I send forty-seven voice notes and fourteen TikToks every morning without a filter.',
      vectorDelta: { adventurousness: 0.7, sensoryIntensity: 0.9, tradition: -0.6, cognitiveEffort: -0.7, absurdity: 0.6 },
    },
  },
  {
    id: 'q_canceling_plans',
    category: 'tiny_behavior',
    prompt: 'Canceling weekend plans gives a hit of pure serotonin that no party on earth can match.',
    optionA: {
      id: 'A',
      label: 'Sweet Relief of Flaking',
      tagline: 'The godlike euphoria of taking off your shoes and knowing you are legally excused from socializing.',
      vectorDelta: { adventurousness: -0.8, sensoryIntensity: -0.7, tradition: -0.3, cognitiveEffort: -0.5, absurdity: 0.6 },
    },
    optionB: {
      id: 'B',
      label: 'Weekend Energy Dynamo',
      tagline: 'Staying inside on Saturday makes my skin itch with suffocating existential FOMO.',
      vectorDelta: { adventurousness: 0.8, sensoryIntensity: 0.8, tradition: 0.5, cognitiveEffort: 0.4, absurdity: -0.4 },
    },
  },
  {
    id: 'q_netflix_paralysis',
    category: 'digital',
    prompt: 'Browsing streaming apps for 45 minutes before eating cold takeout in silence is an accepted hobby.',
    optionA: {
      id: 'A',
      label: 'The Endless Search',
      tagline: 'Finding the mathematically optimal entertainment is more sacred than the temperature of the noodles.',
      vectorDelta: { adventurousness: 0.3, sensoryIntensity: 0.4, tradition: -0.4, cognitiveEffort: 0.8, absurdity: 0.8 },
    },
    optionB: {
      id: 'B',
      label: 'First Banner Click',
      tagline: 'Put on whatever is currently trending in the top three slots and consume the calories immediately.',
      vectorDelta: { adventurousness: -0.3, sensoryIntensity: -0.3, tradition: 0.6, cognitiveEffort: -0.8, absurdity: -0.5 },
    },
  },
  {
    id: 'q_six_month_friend',
    category: 'tiny_behavior',
    prompt: 'Friends who don\'t speak for 6 months and resume instantly are superior to friends who text daily.',
    optionA: {
      id: 'A',
      label: 'Low-Maintenance Royalty',
      tagline: 'Zero chore texting. When we reconnect over lunch, the bond is indestructible and effortless.',
      vectorDelta: { adventurousness: 0.4, sensoryIntensity: -0.4, tradition: 0.6, cognitiveEffort: 0.3, absurdity: -0.3 },
    },
    optionB: {
      id: 'B',
      label: 'Daily Lifeline Texts',
      tagline: 'If you aren\'t sending me blurry photos of your mediocre sandwich, are we even real friends?',
      vectorDelta: { adventurousness: -0.4, sensoryIntensity: 0.7, tradition: -0.4, cognitiveEffort: -0.2, absurdity: 0.5 },
    },
  },
  {
    id: 'q_gym_spotlight',
    category: 'tiny_behavior',
    prompt: 'Nobody at the gym is judging you; 95% of them are staring at their own reflection in the mirror.',
    optionA: {
      id: 'A',
      label: 'Everyone Is Self-Obsessed',
      tagline: 'Humans only care about their own pump and playlist. Lift your little dumbbells in peace.',
      vectorDelta: { adventurousness: 0.3, sensoryIntensity: -0.3, tradition: 0.5, cognitiveEffort: 0.5, absurdity: -0.4 },
    },
    optionB: {
      id: 'B',
      label: 'The Paranoia Is Real',
      tagline: 'They are secretly counting my awkward rest intervals and silently grading my squat depth.',
      vectorDelta: { adventurousness: -0.4, sensoryIntensity: 0.8, tradition: -0.5, cognitiveEffort: 0.6, absurdity: 0.8 },
    },
  },
  {
    id: 'q_what_are_we',
    category: 'tiny_behavior',
    prompt: 'Asking "what are we?" over text message is cowardice; it requires eye contact and sweaty palms.',
    optionA: {
      id: 'A',
      label: 'In-Person Reckoning',
      tagline: 'True romantic clarity demands the gut-wrenching vulnerability of looking another mortal in the eyes.',
      vectorDelta: { adventurousness: 0.6, sensoryIntensity: 0.7, tradition: 0.8, cognitiveEffort: 0.7, absurdity: -0.5 },
    },
    optionB: {
      id: 'B',
      label: 'Digital Bubble Shield',
      tagline: 'Why suffer physical cardiac distress when blue iMessage bubbles provide a tidy exit door?',
      vectorDelta: { adventurousness: -0.5, sensoryIntensity: -0.5, tradition: -0.7, cognitiveEffort: -0.4, absurdity: 0.7 },
    },
  },
  {
    id: 'q_friday_late_meeting',
    category: 'digital',
    prompt: 'People who schedule meetings for 4:30 PM on a Friday should be barred from calendar access.',
    optionA: {
      id: 'A',
      label: 'Friday 4:30 Is Criminal',
      tagline: 'My mortal soul clocked out at 2:15 PM. Do not summon me to discuss cross-functional synergy.',
      vectorDelta: { adventurousness: -0.3, sensoryIntensity: -0.6, tradition: -0.4, cognitiveEffort: -0.6, absurdity: 0.7 },
    },
    optionB: {
      id: 'B',
      label: 'The Grind Never Sleeps',
      tagline: 'Finish the sprint with maximum velocity and enter the weekend like an unstoppable corporate titan.',
      vectorDelta: { adventurousness: 0.6, sensoryIntensity: 0.8, tradition: 0.7, cognitiveEffort: 0.7, absurdity: -0.6 },
    },
  },
  {
    id: 'q_tsundoku_books',
    category: 'literature',
    prompt: 'Buying books and actually reading the books are two completely unrelated and distinct hobbies.',
    optionA: {
      id: 'A',
      label: 'Architect of Potential',
      tagline: 'A bookshelf is an aspirational physical monument to the intellectual giant I intend to become.',
      vectorDelta: { adventurousness: 0.5, sensoryIntensity: 0.2, tradition: 0.4, cognitiveEffort: 0.4, absurdity: 0.8 },
    },
    optionB: {
      id: 'B',
      label: 'Read Before Buying',
      tagline: 'Unread books accumulating on nightstands are physical tombstones of unfulfilled discipline.',
      vectorDelta: { adventurousness: -0.4, sensoryIntensity: -0.3, tradition: -0.3, cognitiveEffort: 0.7, absurdity: -0.7 },
    },
  },
  {
    id: 'q_speakerphone_reels',
    category: 'digital',
    prompt: 'People who watch short-form video reels on speakerphone in public spaces are agents of anarchy.',
    optionA: {
      id: 'A',
      label: 'Civilization Matters',
      tagline: 'Purchase ten-dollar earbuds or sit in meditative silence like a domesticated human being.',
      vectorDelta: { adventurousness: -0.4, sensoryIntensity: -0.7, tradition: 0.8, cognitiveEffort: 0.6, absurdity: -0.5 },
    },
    optionB: {
      id: 'B',
      label: 'Main Character Energy',
      tagline: 'The airport departure gate deserves to hear this 12-second high-pitched chipmunk remix.',
      vectorDelta: { adventurousness: 0.7, sensoryIntensity: 0.9, tradition: -0.8, cognitiveEffort: -0.7, absurdity: 0.9 },
    },
  },
];

export const ASSIGNMENT_POOL: Assignment[] = [
  // --- Pillar 3: Micro-Challenges ---
  {
    id: 'c1_opposite_hill',
    title: 'The 24-Hour Opposite Hill',
    category: 'tiny_behavior',
    categoryDisplay: 'Cognitive Inversion',
    instruction: 'Pick one trivial opinion you defend fiercely (e.g. pineapple on pizza, Android vs Apple, cold showers). For the next 24 hours, passionately defend the exact opposite stance to anyone who asks.',
    durationSeconds: 180,
    isSoloSafe: true,
    vector: { adventurousness: 0.8, sensoryIntensity: 0.4, tradition: -0.7, cognitiveEffort: 0.8, absurdity: 0.8 },
    checklist: ['Identify sacred petty opinion', 'Adopt the opposite stance with straight face', 'Observe internal cognitive dissonance'],
    reactions: {
      onUserAdmittedWrong: [
        'You realized the other side had valid points. Your ego is shattered.',
        'The opposite hill had a better view. Welcome to ideological treason.',
        'Your stubbornness has been scientifically reduced by 12%.'
      ],
      onUserHatedIt: [
        'Living a lie proved unbearable. Your stubborn mortal pride survived.',
        'Defending the enemy made your stomach churn. Truly unwavering.',
        'You returned to your petty hill with twice the righteous fury.'
      ],
      onUserWantsToFight: [
        'Still clinging to this opinion, or has reality humbled you yet?',
        'You cannot argue with an algorithm that forced you to argue with yourself.',
        'Your internal civil war has been logged into the central archive.'
      ],
    },
  },
  {
    id: 'c2_group_bet',
    title: 'The Friend Group Blind Bet',
    category: 'tiny_behavior',
    categoryDisplay: 'Social Prediction',
    instruction: 'Post an absurdly specific prediction in your friend group chat (e.g., "Someone will bring up their fantasy football team or their ex within 15 minutes tonight"). Lock in 90%+ confidence.',
    durationSeconds: 120,
    isSoloSafe: true,
    vector: { adventurousness: 0.7, sensoryIntensity: 0.6, tradition: -0.4, cognitiveEffort: 0.6, absurdity: 0.7 },
    checklist: ['Draft hyper-specific social prediction', 'Send to group chat with zero context', 'Wait for someone to walk directly into the trap'],
    reactions: {
      onUserAdmittedWrong: [
        'Prophecy confirmed. You are the omniscient puppet master of your friend group.',
        'They walked into your trap like clockwork. Terrifying predictive accuracy.',
        'The group chat has been thoroughly humbled. Crown yourself psychic.'
      ],
      onUserHatedIt: [
        'The clock ran out. Did prophecy occur, or was that just unearned confidence?',
        'Your friend group subverted your prediction entirely. You are no oracle.',
        'Hubris detected. Your friends proved disappointingly unpredictable.'
      ],
      onUserWantsToFight: [
        'I need you to vote on this so I can verify whether our friendship is based on a lie.',
        'Fight your friend group, not the statistical model.',
        'Your friends failed the script. Direct your hostility at them.'
      ],
    },
  },
  {
    id: 'c3_blind_taste',
    title: 'The Blind Taste Test Swap',
    category: 'food',
    categoryDisplay: 'Sensory Calibration',
    instruction: 'Take your sacred daily staple brand (your go-to coffee, sparkling water, or chocolate) and have someone pour it alongside a budget generic rival blindfolded. Guess which is which.',
    durationSeconds: 150,
    isSoloSafe: true,
    vector: { adventurousness: 0.6, sensoryIntensity: 0.7, tradition: 0.2, cognitiveEffort: 0.6, absurdity: 0.5 },
    checklist: ['Procure favorite brand & budget generic', 'Close eyes or blindfold yourself', 'Take two sips and swallow your branding pride'],
    reactions: {
      onUserAdmittedWrong: [
        'You picked the $1.29 generic store brand. Your gourmet identity is dead.',
        'Marketing tricked your brain for years. Welcome to biochemical reality.',
        'You just saved $400 a year on corporate pretension.'
      ],
      onUserHatedIt: [
        'Your tongue actually recognized the premium roast. Impressive biological precision.',
        'The cheap version offended your delicate palate as predicted.',
        'Your expensive habits have empirical justification.'
      ],
      onUserWantsToFight: [
        '84% of the population says you are factually mistaken. Care to double down or surrender?',
        'You cannot sue your own tastebuds for slander.',
        'Branding defeated, specimen agitated.'
      ],
    },
  },
  {
    id: 'c4_draft_detox',
    title: 'The Unsent Draft Detox',
    category: 'digital',
    categoryDisplay: 'Impulse Restraint',
    instruction: 'Open an empty note. Type out the totally blunt, unfiltered response you want to send to an annoying email or text message. Read it once, take a screenshot, then permanently delete it.',
    durationSeconds: 180,
    isSoloSafe: true,
    vector: { adventurousness: 0.4, sensoryIntensity: 0.6, tradition: -0.2, cognitiveEffort: 0.7, absurdity: 0.6 },
    checklist: ['Type the raw catastrophic truth', 'Bask in the unedited honesty for 30 seconds', 'Delete forever and send a polite "No worries!"'],
    reactions: {
      onUserAdmittedWrong: [
        'You vented the psychic poison without burning your bridge. Peak executive function.',
        'The urge to detonate your career or friendship was safely contained.',
        'Catharsis achieved with zero HR involvement.'
      ],
      onUserHatedIt: [
        'You still secretly want to send the bomb. The restraint is killing you.',
        'Being the bigger person feels shockingly unsatisfying.',
        'The draft was art. Too bad society cannot handle it.'
      ],
      onUserWantsToFight: [
        'Sending that email would have resulted in immediate unemployment.',
        'Take your anger out on the delete key, not the server.',
        'Your rage draft has been purged from cache.'
      ],
    },
  },
  {
    id: 'c5_subtitle_strike',
    title: 'The Subtitle Strike Protocol',
    category: 'literature',
    categoryDisplay: 'Auditory Endurance',
    instruction: 'Turn off all subtitles and captions on your television for the next 20 minutes of whatever you watch. Try to decipher the actors whispering over dynamic explosion sound mixes.',
    durationSeconds: 300,
    isSoloSafe: true,
    vector: { adventurousness: 0.5, sensoryIntensity: 0.8, tradition: 0.4, cognitiveEffort: 0.8, absurdity: 0.4 },
    checklist: ['Disable all subtitle tracks', 'Resist the urge to turn them back on during mumbling', 'Evaluate modern audio mixing with raw ears'],
    reactions: {
      onUserAdmittedWrong: [
        'You realized you were reading TV instead of watching it. Your eyes thank you.',
        'You survived twenty minutes without glancing at the bottom third of the screen.',
        'Pure visual cinema restored.'
      ],
      onUserHatedIt: [
        'You missed 65% of the dialogue because the protagonist whispered in a hallway.',
        'Sound mixing won. Subtitles are non-negotiable medical equipment.',
        'Back to English subtitles for native English speakers.'
      ],
      onUserWantsToFight: [
        'Blame Christopher Nolan\'s audio team, not the algorithm.',
        'The actors refuse to enunciate. We sympathize with your fury.',
        'Subtitles are a crutch, but your auditory cortex needs a wheelchair.'
      ],
    },
  },
  {
    id: 'c6_three_tab_diet',
    title: 'The 3-Tab Fast',
    category: 'digital',
    categoryDisplay: 'Digital Minimalism',
    instruction: 'Close every single browser tab until exactly three remain. If you open a fourth tab during your current work session, you must close an existing one immediately.',
    durationSeconds: 240,
    isSoloSafe: true,
    vector: { adventurousness: -0.4, sensoryIntensity: -0.8, tradition: 0.3, cognitiveEffort: 0.7, absurdity: -0.4 },
    checklist: ['Perform the great tab purge', 'Enforce strict 3-tab ceiling', 'Observe the terrifying calm in your brain'],
    reactions: {
      onUserAdmittedWrong: [
        'Your RAM and your nervous system both stopped overheating. Serenity unlocked.',
        'Those other 38 tabs were never going to be read anyway. Concession logged.',
        'You are no longer an agent of browser chaos.'
      ],
      onUserHatedIt: [
        'You felt naked without your 47 open tabs guarding your consciousness.',
        'Tab hoarding is your love language. The diet failed.',
        'Your CPU wept when you reopened all 50 tabs immediately.'
      ],
      onUserWantsToFight: [
        'Those articles from 2023 were not going to read themselves, specimen.',
        'Your browser history is a landfill. Do not yell at the sanitation worker.',
        'Tabs closed. Dignity partially restored.'
      ],
    },
  },
  {
    id: 'c7_cold_beverage',
    title: 'The Plain Beverage Audit',
    category: 'food',
    categoryDisplay: 'Gastronomic Deconstruction',
    instruction: 'Order or prepare your staple daily drink completely plain—no flavored syrups, vanilla pumps, extra sugars, or sweeteners. Consume it bare and decide if you actually like the base flavor.',
    durationSeconds: 150,
    isSoloSafe: true,
    vector: { adventurousness: 0.5, sensoryIntensity: 0.6, tradition: 0.5, cognitiveEffort: 0.4, absurdity: 0.3 },
    checklist: ['Strip all sweeteners and syrup pumps', 'Take three deliberate sips of the raw liquid', 'Admit whether you like the drink or just like liquid sugar'],
    reactions: {
      onUserAdmittedWrong: [
        'The unvarnished bean or tea leaf was actually delicious. Palate elevation complete.',
        'You realized four pumps of caramel was masking cheap dishwater coffee.',
        'A victory for biological maturity.'
      ],
      onUserHatedIt: [
        'It tasted like bitter tree bark. You don\'t like coffee; you like candy in a cup.',
        'Your sweet tooth staged an immediate internal riot.',
        'Back to dessert beverages for the fragile specimen.'
      ],
      onUserWantsToFight: [
        'The Algorithm tested your stubbornness. Are your tastebuds evolving or just confused?',
        'Sugar withdrawal detected in central telemetry.',
        'Fight the barista, not the math.'
      ],
    },
  },

  // --- Original Music Prescriptions ---
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

  // --- Original Food Prescriptions ---
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

  // --- Original Tiny Behavior & Digital Prescriptions ---
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
