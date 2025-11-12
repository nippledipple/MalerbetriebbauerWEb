export interface KnowledgeEntry {
  keywords: string[];
  response: string;
  category?: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ['öffnungszeit', 'geöffnet', 'offen', 'wann', 'zeit', 'montag', 'freitag', 'samstag', 'sonntag'],
    response: 'Unsere Öffnungszeiten sind: Montag bis Freitag von 08:00 bis 17:00 Uhr, Samstag nach Vereinbarung.',
    category: 'hours'
  },
  {
    keywords: ['leistung', 'service', 'angebot', 'was macht', 'dienstleistung', 'arbeiten'],
    response: 'Wir bieten an: Innenanstrich, Fassadenarbeiten, Lackierungen, Tapezierarbeiten, Bodenbeschichtungen, Verputzarbeiten, Spachteltechniken und Sonderanstriche.',
    category: 'services'
  },
  {
    keywords: ['telefon', 'anrufen', 'telefonisch', 'nummer', 'erreichen'],
    response: 'Natürlich! Du erreichst uns unter der Telefonnummer, die auf der Website angegeben ist. Falls du sie hier nicht siehst, findest du sie ganz unten auf der Seite.',
    category: 'contact'
  },
  {
    keywords: ['adresse', 'standort', 'wo', 'lage', 'betrieb', 'maps', 'google'],
    response: 'Unser Betrieb befindet sich in der Neustraße 19, 95173 Schönwald. Klick hier, um uns auf Google Maps zu öffnen.',
    category: 'location'
  },
  {
    keywords: ['email', 'mail', 'e-mail', 'schreiben'],
    response: 'Du kannst uns gerne eine E-Mail schreiben an: malerbauer.mer@gmail.com',
    category: 'contact'
  },
  {
    keywords: ['sigma clean air', 'clean air', 'schadstoff', 'kinderzimmer', 'schlafzimmer', 'gesund'],
    response: 'Sigma Clean Air ist eine schadstoffabsorbierende Innenfarbe, die ideal für Schlaf- und Kinderzimmer geeignet ist. Sie verbessert aktiv die Raumluftqualität.',
    category: 'products'
  },
  {
    keywords: ['sigma perfect', 'premium wandfarbe', 'strapazierfähig'],
    response: 'Sigma Perfect ist unsere Premium-Wandfarbe mit gleichmäßigem Verlauf und besonders hoher Strapazierfähigkeit. Perfekt für hochwertige Innenräume.',
    category: 'products'
  },
  {
    keywords: ['sigma renova', 'renovier', 'hochdeckend', 'renovierung'],
    response: 'Sigma Renova ID Matt ist eine hochdeckende Farbe, die sich besonders gut für Renovierungen eignet und leicht zu verarbeiten ist.',
    category: 'products'
  },
  {
    keywords: ['sigma pearl clean', 'abwaschbar', 'küche', 'flur'],
    response: 'Sigma Pearl Clean ist abwaschbar und ideal für stark beanspruchte Bereiche wie Küchen und Flure geeignet.',
    category: 'products'
  },
  {
    keywords: ['sigma siloxan', 'fassade', 'außen', 'wetterbeständig'],
    response: 'Sigma Siloxan Matt ist eine wetterbeständige Fassadenfarbe, die wasserdampfdurchlässig ist und perfekt für Außenfassaden geeignet ist.',
    category: 'products'
  },
  {
    keywords: ['sigma silikat', 'mineral', 'diffusion'],
    response: 'Sigma Silikat ist eine mineralische Fassadenfarbe für diffusionsoffene Oberflächen mit hervorragenden Wetterschutzeigenschaften.',
    category: 'products'
  },
  {
    keywords: ['sigma façade', 'schmutzabweisend', 'elastisch'],
    response: 'Sigma Façade Topcoat ist eine elastische, schmutzabweisende Außenfarbe mit Schutzfilm für langanhaltenden Fassadenschutz.',
    category: 'products'
  },
  {
    keywords: ['rot', 'rote couch', 'rotes sofa', 'roter', 'kombinier'],
    response: 'Zu einer roten Couch passen neutrale, warme Wandfarben gut – zum Beispiel ein helles Creme, ein zartes Grau oder ein warmes Sandbeige. Wenn du einen starken Kontrast möchtest, passt auch ein helles Blaugrau oder ein Taupe-Ton. Für diese Wirkung empfehlen wir z.B. Sigma Perfect in einem warmen Weiß oder Sigma Clean Air in einem hellen Beigeton.',
    category: 'advice'
  },
  {
    keywords: ['blau', 'blaue wand', 'blaues zimmer', 'kombination blau'],
    response: 'Blautöne lassen sich wunderbar mit hellen Naturtönen kombinieren. Zu einem blauen Raum passen warme Holztöne, helles Beige oder ein zartes Creme. Für einen modernen Look kannst du auch mit Grau oder Weiß arbeiten.',
    category: 'advice'
  },
  {
    keywords: ['grau', 'graue wand', 'graues zimmer'],
    response: 'Graue Wände sind zeitlos und vielseitig. Sie lassen sich perfekt mit warmen Akzentfarben wie Senfgelb, Terrakotta oder Rosé kombinieren. Auch mit natürlichen Holztönen und weißen Elementen entsteht ein harmonisches Gesamtbild.',
    category: 'advice'
  },
  {
    keywords: ['holz', 'holztür', 'holzfenster', 'holzrahmen'],
    response: 'Für Holzflächen im Außenbereich empfehlen wir Sigma Contour Aqua-PU Matt oder Sigma Amarol Triol Satin. Beide sind wasserbasiert, langlebig und schützen das Holz vor Witterung.',
    category: 'advice'
  },
  {
    keywords: ['bad', 'badezimmer', 'feucht', 'nass'],
    response: 'Für Badezimmer empfehlen wir Sigma Aqua Pearl Clean – eine wasserabweisende, glänzende Oberfläche, die ideal für feuchte Räume ist.',
    category: 'advice'
  },
  {
    keywords: ['keller', 'feucht', 'bitumen', 'untergrund'],
    response: 'Für Kellerräume oder feuchte Untergründe eignet sich Sigma Panerabit – eine Spezialbeschichtung mit Bitumenanteil.',
    category: 'advice'
  },
  {
    keywords: ['preis', 'kosten', 'teuer', 'kostet'],
    response: 'Die Preise hängen von der Art der Arbeit, der Fläche und den verwendeten Materialien ab. Am besten fordere ein individuelles Angebot an – ich kann dir dabei helfen!',
    category: 'general'
  },
  {
    keywords: ['termin', 'besichtigung', 'vor ort', 'kommen'],
    response: 'Gerne vereinbaren wir einen Termin für eine kostenlose Besichtigung vor Ort. Ruf uns einfach an oder fordere über mich ein Angebot an.',
    category: 'general'
  },
  {
    keywords: ['wie lange', 'dauer', 'zeit', 'schnell'],
    response: 'Die Dauer hängt vom Umfang der Arbeiten ab. Bei einem Vor-Ort-Termin können wir dir eine genauere Zeitplanung geben.',
    category: 'general'
  }
];

export function findBestMatch(userInput: string): string | null {
  const input = userInput.toLowerCase();

  let bestMatch: KnowledgeEntry | null = null;
  let maxMatches = 0;

  for (const entry of knowledgeBase) {
    let matches = 0;
    for (const keyword of entry.keywords) {
      if (input.includes(keyword)) {
        matches++;
      }
    }

    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = entry;
    }
  }

  if (maxMatches > 0 && bestMatch) {
    return bestMatch.response;
  }

  return null;
}

export const quickButtons = [
  { id: 'hours', label: 'Wie sind eure Öffnungszeiten?', action: 'hours' },
  { id: 'offer', label: 'Ich möchte ein Angebot anfordern', action: 'offer' },
  { id: 'services', label: 'Welche Leistungen bietet ihr an?', action: 'services' },
  { id: 'phone', label: 'Kann ich euch telefonisch erreichen?', action: 'phone' },
  { id: 'location', label: 'Wo befindet sich euer Betrieb?', action: 'location' }
];
