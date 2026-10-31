/**
 * Cars shown on the website. Replace with the cars you actually rent.
 * `photo` refers to src/content/photos.js; `shape` / `color` drive the illustration fallback.
 */

export const FLEET = [
  {
    id: 'swift',
    slug: 'maruti-suzuki-swift',
    brand: 'Maruti Suzuki',
    model: 'Swift',
    type: 'hatchback',
    shape: 'hatchback',
    color: '#C4512B',
    photo: 'swift',
    seats: 5,
    bags: 2,
    transmission: { en: 'Manual', hi: 'मैनुअल' },
    fuel: { en: 'Petrol', hi: 'पेट्रोल' },
    fuelType: 'Petrol',
    name: { en: 'Maruti Suzuki Swift', hi: 'मारुति सुज़ुकी स्विफ्ट' },
    tag: { en: 'City favourite', hi: 'शहर की पसंद' },
    summary: {
      en: 'A nimble, fuel-efficient hatchback that is easy to drive and park in Alwar’s busy markets.',
      hi: 'फुर्तीली और कम ईंधन खाने वाली हैचबैक — अलवर के भीड़-भाड़ वाले बाज़ारों में चलाना और पार्क करना आसान।',
    },
    about: {
      en: [
        'The Swift is India’s go-to city car, and for good reason. It is light on its feet, simple to drive and gives good mileage — ideal when your day is a string of short trips around Alwar.',
        'Book it for errands in the city, a quick visit to Bala Quila or Siliserh, or a budget-friendly highway run to Jaipur or Delhi NCR with two or three people.',
      ],
      hi: [
        'स्विफ्ट भारत की सबसे भरोसेमंद सिटी कार है। हल्की, चलाने में आसान और अच्छा माइलेज — अलवर में दिनभर छोटे-छोटे सफ़र के लिए एकदम सही।',
        'शहर के काम, बाला किला या सिलीसेढ़ की छोटी सैर, या दो-तीन लोगों के साथ जयपुर या दिल्ली एनसीआर की किफ़ायती हाईवे यात्रा के लिए बुक करें।',
      ],
    },
    idealFor: {
      en: ['City errands', 'Couples & solo travellers', 'Short highway trips', 'First-time self drive'],
      hi: ['शहर के काम', 'कपल और अकेले यात्री', 'छोटी हाईवे यात्रा', 'पहली बार सेल्फ ड्राइव'],
    },
  },
  {
    id: 'dzire',
    slug: 'maruti-suzuki-dzire',
    brand: 'Maruti Suzuki',
    model: 'Dzire',
    type: 'sedan',
    shape: 'sedan',
    color: '#E9E3D8',
    photo: 'dzire',
    seats: 5,
    bags: 3,
    transmission: { en: 'Manual', hi: 'मैनुअल' },
    fuel: { en: 'Petrol / CNG', hi: 'पेट्रोल / सीएनजी' },
    fuelType: 'Petrol, CNG',
    name: { en: 'Maruti Suzuki Dzire', hi: 'मारुति सुज़ुकी डिज़ायर' },
    tag: { en: 'Smooth highway sedan', hi: 'आरामदायक हाईवे सेडान' },
    summary: {
      en: 'A comfortable compact sedan with a proper boot — a calm, economical choice for highway days.',
      hi: 'बड़ी डिक्की वाली आरामदायक सेडान — हाईवे के सफ़र के लिए शांत और किफ़ायती विकल्प।',
    },
    about: {
      en: [
        'The Dzire pairs Swift-like ease of driving with a separate boot for luggage, so a family of four can travel with bags out of sight.',
        'It is a favourite for Alwar–Jaipur and Alwar–Delhi runs, wedding visits and office travel where you want a neat, comfortable sedan.',
      ],
      hi: [
        'डिज़ायर में स्विफ्ट जैसी आसान ड्राइविंग के साथ सामान के लिए अलग डिक्की मिलती है — चार लोगों का परिवार आराम से सफ़र कर सकता है।',
        'अलवर–जयपुर और अलवर–दिल्ली यात्रा, शादी-ब्याह और ऑफ़िस के काम के लिए यह एक साफ़-सुथरी, आरामदायक सेडान है।',
      ],
    },
    idealFor: {
      en: ['Family trips', 'Jaipur & Delhi runs', 'Weddings & functions', 'Office travel'],
      hi: ['परिवार के साथ सफ़र', 'जयपुर और दिल्ली यात्रा', 'शादी और समारोह', 'ऑफ़िस यात्रा'],
    },
  },
  {
    id: 'creta',
    slug: 'hyundai-creta',
    brand: 'Hyundai',
    model: 'Creta',
    type: 'suv',
    shape: 'suv',
    color: '#E9E3D8',
    photo: 'creta',
    seats: 5,
    bags: 3,
    transmission: { en: 'Manual / Automatic', hi: 'मैनुअल / ऑटोमैटिक' },
    fuel: { en: 'Diesel', hi: 'डीज़ल' },
    fuelType: 'Diesel',
    name: { en: 'Hyundai Creta', hi: 'हुंडई क्रेटा' },
    tag: { en: 'Business ready', hi: 'बिज़नेस के लिए तैयार' },
    summary: {
      en: 'A premium, high-riding SUV — comfortable on highways and confident on rough village roads.',
      hi: 'ऊँची और प्रीमियम एसयूवी — हाईवे पर आरामदायक और गाँव की कच्ची सड़कों पर भी भरोसेमंद।',
    },
    about: {
      en: [
        'The Creta gives you a commanding view of the road, a quiet cabin and enough ground clearance for the uneven stretches you meet outside the city.',
        'It makes a strong impression for client meetings and official visits, and is just as good for a family weekend at Sariska.',
      ],
      hi: [
        'क्रेटा में सड़क का बेहतर नज़ारा, शांत केबिन और शहर के बाहर की ऊबड़-खाबड़ सड़कों के लिए अच्छा ग्राउंड क्लीयरेंस मिलता है।',
        'क्लाइंट मीटिंग और सरकारी दौरों के लिए शानदार, और परिवार के साथ सरिस्का के वीकेंड के लिए भी उतनी ही अच्छी।',
      ],
    },
    idealFor: {
      en: ['Client meetings', 'Official tours', 'Long highway drives', 'Families of five'],
      hi: ['क्लाइंट मीटिंग', 'सरकारी दौरे', 'लंबी हाईवे यात्रा', 'पाँच लोगों का परिवार'],
    },
  },
  {
    id: 'thar',
    slug: 'mahindra-thar',
    brand: 'Mahindra',
    model: 'Thar',
    type: 'suv',
    shape: 'offroad',
    color: '#2a2d33',
    photo: 'thar',
    seats: 4,
    bags: 1,
    transmission: { en: 'Manual', hi: 'मैनुअल' },
    fuel: { en: 'Diesel', hi: 'डीज़ल' },
    fuelType: 'Diesel',
    name: { en: 'Mahindra Thar', hi: 'महिंद्रा थार' },
    tag: { en: 'Weekend escape', hi: 'वीकेंड एडवेंचर' },
    summary: {
      en: 'The iconic Indian 4x4 — made for Aravalli hill roads, Sariska weekends and photos you will keep.',
      hi: 'भारत की मशहूर 4x4 — अरावली की पहाड़ी सड़कों, सरिस्का के वीकेंड और यादगार तस्वीरों के लिए।',
    },
    about: {
      en: [
        'Few cars match the Thar for a sense of adventure. It sits high, handles broken roads with ease and turns a simple drive to Bhangarh or Sariska into the highlight of the trip.',
        'It seats four, and the rear seats are reached from the front — best for friends or couples travelling light.',
      ],
      hi: [
        'एडवेंचर के मामले में थार का कोई मुकाबला नहीं। ऊँची बैठक, टूटी सड़कों पर भी आसान — भानगढ़ या सरिस्का की ड्राइव ही यात्रा का सबसे यादगार हिस्सा बन जाती है।',
        'इसमें चार लोग बैठते हैं और पीछे की सीट पर आगे से जाना होता है — दोस्तों या कपल के लिए, कम सामान के साथ सबसे अच्छी।',
      ],
    },
    idealFor: {
      en: ['Sariska & Bhangarh', 'Hill & village roads', 'Friends’ weekends', 'Photo-worthy drives'],
      hi: ['सरिस्का और भानगढ़', 'पहाड़ी और गाँव की सड़कें', 'दोस्तों का वीकेंड', 'यादगार ड्राइव'],
    },
  },
  {
    id: 'ertiga',
    slug: 'maruti-suzuki-ertiga',
    brand: 'Maruti Suzuki',
    model: 'Ertiga',
    type: 'seven',
    shape: 'muv',
    color: '#F1EEE8',
    photo: 'ertiga',
    seats: 7,
    bags: 2,
    transmission: { en: 'Manual', hi: 'मैनुअल' },
    fuel: { en: 'Petrol / CNG', hi: 'पेट्रोल / सीएनजी' },
    fuelType: 'Petrol, CNG',
    name: { en: 'Maruti Suzuki Ertiga', hi: 'मारुति सुज़ुकी अर्टिगा' },
    tag: { en: 'Family trips', hi: 'परिवार की यात्रा' },
    summary: {
      en: 'An easy-driving 7-seater that keeps the whole family together without the running cost of a big SUV.',
      hi: 'चलाने में आसान 7-सीटर — बड़ी एसयूवी के खर्च के बिना पूरा परिवार एक साथ।',
    },
    about: {
      en: [
        'The Ertiga drives like a car but seats seven across three rows, making it the most practical family choice for temple visits, weddings and day trips.',
        'With the third row folded, it also swallows plenty of luggage for a longer holiday in Rajasthan.',
      ],
      hi: [
        'अर्टिगा कार जैसी आसानी से चलती है लेकिन तीन कतारों में सात लोग बैठते हैं — मंदिर दर्शन, शादी और डे-ट्रिप के लिए परिवार की सबसे व्यावहारिक पसंद।',
        'तीसरी कतार मोड़ने पर लंबी राजस्थान यात्रा के लिए भरपूर सामान भी आ जाता है।',
      ],
    },
    idealFor: {
      en: ['Families of 6–7', 'Temple & pilgrimage trips', 'Weddings', 'Budget group travel'],
      hi: ['6–7 लोगों का परिवार', 'मंदिर और तीर्थ यात्रा', 'शादी-ब्याह', 'किफ़ायती ग्रुप यात्रा'],
    },
  },
  {
    id: 'innova',
    slug: 'toyota-innova-crysta',
    brand: 'Toyota',
    model: 'Innova Crysta',
    type: 'seven',
    shape: 'muv',
    color: '#F1EEE8',
    photo: 'innova',
    seats: 7,
    bags: 4,
    transmission: { en: 'Manual', hi: 'मैनुअल' },
    fuel: { en: 'Diesel', hi: 'डीज़ल' },
    fuelType: 'Diesel',
    name: { en: 'Toyota Innova Crysta', hi: 'टोयोटा इनोवा क्रिस्टा' },
    tag: { en: 'Groups & officials', hi: 'ग्रुप और अधिकारी' },
    summary: {
      en: 'India’s most trusted people-mover — spacious, sturdy and supremely comfortable on long drives.',
      hi: 'भारत की सबसे भरोसेमंद बड़ी गाड़ी — खुली, मज़बूत और लंबी यात्रा में बेहद आरामदायक।',
    },
    about: {
      en: [
        'The Innova Crysta is the car officials, families and groups ask for by name. Every row is genuinely comfortable, and it stays composed over hundreds of kilometres.',
        'Choose it for official tours, multi-day trips across Rajasthan, or when you need room for seven adults and their bags.',
      ],
      hi: [
        'इनोवा क्रिस्टा वह गाड़ी है जिसे अधिकारी, परिवार और ग्रुप नाम से माँगते हैं। हर कतार सचमुच आरामदायक, और सैकड़ों किलोमीटर तक स्थिर।',
        'सरकारी दौरों, राजस्थान की कई दिन की यात्रा, या सात बड़ों और उनके सामान के लिए इसे चुनें।',
      ],
    },
    idealFor: {
      en: ['Official tours', 'Groups of 7', 'Multi-day Rajasthan trips', 'Delhi NCR trips'],
      hi: ['सरकारी दौरे', '7 लोगों का ग्रुप', 'कई दिन की राजस्थान यात्रा', 'एनसीआर यात्रा'],
    },
  },
]

export const carBySlug = (slug) => FLEET.find((c) => c.slug === slug)
export const carById = (id) => FLEET.find((c) => c.id === id)
