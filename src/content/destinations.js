/**
 * Road-trip guides from Alwar. Distances / times are approximate road figures.
 * x / y / curve position each place on the stylised map (viewBox 600 × 560, Alwar at 340,320).
 */

export const DESTINATIONS = [
  {
    id: 'bala-quila',
    slug: 'bala-quila-alwar-fort',
    photo: 'bala-quila',
    km: 6,
    x: 312,
    y: 276,
    curve: [-22, -4],
    cars: ['swift', 'creta', 'thar'],
    name: { en: 'Bala Quila', hi: 'बाला किला' },
    fullName: { en: 'Bala Quila (Alwar Fort)', hi: 'बाला किला (अलवर किला)' },
    kind: { en: 'Hill fort', hi: 'पहाड़ी किला' },
    time: { en: '20 min', hi: '20 मिनट' },
    note: {
      en: 'The fort above the city — go early for cool air and the view over Alwar.',
      hi: 'शहर के ऊपर बना किला — ठंडी हवा और अलवर के नज़ारे के लिए सुबह जल्दी जाएँ।',
    },
    intro: {
      en: [
        'Bala Quila is the hill fort that watches over Alwar from an Aravalli ridge. Its walls and bastions date back to the 16th century and run along the hilltop, with sweeping views of the city, the Sagar tank and the hills beyond.',
        'The road up winds through the forested Bala Quila area, which forms part of the Sariska buffer zone. A forest check-post controls entry and the timings are set by the forest department, so confirm them locally before you go.',
      ],
      hi: [
        'बाला किला अरावली की पहाड़ी पर बना वह किला है जो ऊपर से पूरे अलवर को देखता है। इसकी दीवारें और बुर्ज 16वीं सदी के हैं और पहाड़ी की चोटी पर दूर तक फैले हैं — यहाँ से शहर, सागर तालाब और पहाड़ियों का शानदार नज़ारा दिखता है।',
        'ऊपर जाने वाली सड़क बाला किला के जंगल से होकर गुज़रती है, जो सरिस्का बफ़र ज़ोन का हिस्सा है। प्रवेश वन विभाग की चौकी से होता है और समय वन विभाग तय करता है, इसलिए जाने से पहले स्थानीय रूप से पता कर लें।',
      ],
    },
    see: {
      en: ['Ramparts with views over Alwar', 'Old gateways and bastions', 'Sunrise over the Aravallis', 'Birdlife in the forest belt'],
      hi: ['अलवर के नज़ारे वाली प्राचीर', 'पुराने दरवाज़े और बुर्ज', 'अरावली पर सूर्योदय', 'जंगल में पक्षियों की दुनिया'],
    },
    tips: {
      en: ['The hill road is narrow with sharp bends — drive slowly and use the horn on blind turns.', 'Mornings are cooler and clearer for photos.', 'Carry water; there are few shops on top.'],
      hi: ['पहाड़ी सड़क संकरी है और मोड़ तीखे हैं — धीरे चलाएँ और अंधे मोड़ पर हॉर्न दें।', 'सुबह मौसम ठंडा रहता है और फ़ोटो के लिए रोशनी अच्छी होती है।', 'पानी साथ रखें, ऊपर दुकानें बहुत कम हैं।'],
    },
    bestTime: { en: 'October to March, early morning', hi: 'अक्टूबर से मार्च, सुबह जल्दी' },
    route: { en: 'Alwar city → Bala Quila forest road', hi: 'अलवर शहर → बाला किला वन मार्ग' },
  },
  {
    id: 'siliserh',
    slug: 'siliserh-lake',
    photo: 'siliserh',
    km: 13,
    x: 292,
    y: 350,
    curve: [-4, 20],
    cars: ['swift', 'dzire', 'ertiga'],
    name: { en: 'Siliserh Lake', hi: 'सिलीसेढ़ झील' },
    fullName: { en: 'Siliserh Lake & Lake Palace', hi: 'सिलीसेढ़ झील और लेक पैलेस' },
    kind: { en: 'Lake & palace', hi: 'झील और महल' },
    time: { en: '25 min', hi: '25 मिनट' },
    note: {
      en: 'Boating, a lake palace and an easy sunset drive out of town.',
      hi: 'नौका विहार, झील किनारे महल और शाम की आसान ड्राइव।',
    },
    intro: {
      en: [
        'Siliserh is a large lake ringed by Aravalli hills, a short drive south-west of Alwar on the way towards Sariska. A 19th-century royal palace on its bank is now a heritage hotel run by Rajasthan Tourism (RTDC).',
        'It is the easiest half-day escape from the city: drive out after lunch, take a boat on the lake when boating is open, and stay for the sunset over the water.',
      ],
      hi: [
        'सिलीसेढ़ अरावली की पहाड़ियों से घिरी बड़ी झील है, जो अलवर से सरिस्का की ओर थोड़ी ही दूरी पर है। किनारे पर बना 19वीं सदी का शाही महल अब राजस्थान पर्यटन (RTDC) का हेरिटेज होटल है।',
        'शहर से आधे दिन की सबसे आसान सैर: दोपहर के बाद निकलें, नौका विहार खुला हो तो झील में घूमें और पानी पर डूबते सूरज का नज़ारा देखें।',
      ],
    },
    see: {
      en: ['Lake Palace terrace views', 'Boating (seasonal)', 'Sunset over the hills', 'Combine with Sariska on the same day'],
      hi: ['लेक पैलेस की छत से नज़ारा', 'नौका विहार (मौसमी)', 'पहाड़ियों पर सूर्यास्त', 'उसी दिन सरिस्का भी घूमें'],
    },
    tips: {
      en: ['Weekends get busy in the evening — arrive a little before sunset.', 'The lake is fullest after the monsoon.', 'Any car works on this smooth road.'],
      hi: ['वीकेंड की शाम को भीड़ होती है — सूर्यास्त से थोड़ा पहले पहुँचें।', 'मानसून के बाद झील सबसे भरी रहती है।', 'सड़क अच्छी है, कोई भी कार ठीक रहेगी।'],
    },
    bestTime: { en: 'August to February, late afternoon', hi: 'अगस्त से फ़रवरी, शाम के समय' },
    route: { en: 'Alwar → Siliserh road (towards Sariska)', hi: 'अलवर → सिलीसेढ़ रोड (सरिस्का की ओर)' },
  },
  {
    id: 'sariska',
    slug: 'sariska-tiger-reserve',
    photo: 'sariska',
    km: 37,
    x: 284,
    y: 404,
    curve: [24, 6],
    cars: ['thar', 'creta', 'ertiga'],
    name: { en: 'Sariska Tiger Reserve', hi: 'सरिस्का टाइगर रिज़र्व' },
    fullName: { en: 'Sariska Tiger Reserve', hi: 'सरिस्का टाइगर रिज़र्व' },
    kind: { en: 'Wildlife', hi: 'वन्यजीव' },
    time: { en: '50 min', hi: '50 मिनट' },
    note: {
      en: 'Morning safaris in the Aravallis. Keep the car ready for an early start.',
      hi: 'अरावली में सुबह की सफ़ारी — जल्दी निकलने के लिए कार तैयार रखें।',
    },
    intro: {
      en: [
        'Sariska is one of Rajasthan’s best-known tiger reserves, set in dry Aravalli forest less than an hour from Alwar. Alongside tigers it shelters leopards, sambar, nilgai, spotted deer, jungle cats and hundreds of bird species.',
        'You drive yourself to the reserve gate and go into the forest on an official safari vehicle. Safaris are booked through the Rajasthan Forest Department, and core zones usually close during the monsoon (roughly July to September). Rules for private vehicles inside the reserve change, so check the official booking site before you travel.',
      ],
      hi: [
        'सरिस्का राजस्थान के सबसे मशहूर टाइगर रिज़र्व में से एक है, जो अलवर से एक घंटे से भी कम दूरी पर अरावली के सूखे जंगलों में है। यहाँ बाघों के साथ तेंदुआ, सांभर, नीलगाय, चीतल, जंगली बिल्ली और सैकड़ों तरह के पक्षी मिलते हैं।',
        'आप खुद ड्राइव करके रिज़र्व के गेट तक जाते हैं और जंगल के अंदर आधिकारिक सफ़ारी वाहन से जाते हैं। सफ़ारी राजस्थान वन विभाग से बुक होती है और कोर ज़ोन आमतौर पर मानसून (लगभग जुलाई से सितंबर) में बंद रहते हैं। रिज़र्व के अंदर निजी वाहनों के नियम बदलते रहते हैं, इसलिए जाने से पहले आधिकारिक वेबसाइट देख लें।',
      ],
    },
    see: {
      en: ['Morning or evening jungle safari', 'Kankwari Fort inside the reserve', 'Pandupol Hanuman temple', 'Siliserh Lake on the way back'],
      hi: ['सुबह या शाम की जंगल सफ़ारी', 'रिज़र्व के अंदर कांकवाड़ी किला', 'पांडुपोल हनुमान मंदिर', 'लौटते समय सिलीसेढ़ झील'],
    },
    tips: {
      en: ['Book safari slots in advance on the official forest department site.', 'Leave Alwar early — morning safaris start around sunrise.', 'Fill fuel in Alwar before you head into the hills.', 'Avoid driving forest roads after dark and never stop to feed animals.'],
      hi: ['सफ़ारी की सीट वन विभाग की आधिकारिक वेबसाइट पर पहले से बुक करें।', 'अलवर से जल्दी निकलें — सुबह की सफ़ारी सूर्योदय के आसपास शुरू होती है।', 'पहाड़ियों की ओर जाने से पहले अलवर में ही पेट्रोल/डीज़ल भरवा लें।', 'अँधेरे में जंगल की सड़कों पर गाड़ी न चलाएँ और जानवरों को कुछ न खिलाएँ।'],
    },
    bestTime: { en: 'October to June (core zones usually close in monsoon)', hi: 'अक्टूबर से जून (मानसून में कोर ज़ोन आमतौर पर बंद)' },
    route: { en: 'Alwar → Siliserh → Sariska gate', hi: 'अलवर → सिलीसेढ़ → सरिस्का गेट' },
  },
  {
    id: 'bhangarh',
    slug: 'bhangarh-fort',
    photo: 'bhangarh',
    km: 85,
    x: 250,
    y: 470,
    curve: [34, -6],
    cars: ['thar', 'creta', 'dzire'],
    name: { en: 'Bhangarh Fort', hi: 'भानगढ़ किला' },
    fullName: { en: 'Bhangarh Fort', hi: 'भानगढ़ किला' },
    kind: { en: 'Heritage', hi: 'धरोहर' },
    time: { en: '2 hr', hi: '2 घंटे' },
    note: {
      en: 'Rajasthan’s most talked-about ruins, through Sariska’s hill roads.',
      hi: 'राजस्थान के सबसे चर्चित खंडहर — सरिस्का की पहाड़ी सड़कों से होकर।',
    },
    intro: {
      en: [
        'Bhangarh is a late-16th-century fortified town at the foot of the Aravallis, now in ruins and protected by the Archaeological Survey of India. Its bazaar street, temples and hillside palace make it one of the most atmospheric heritage sites in Rajasthan — and the legends around it make it one of the most famous.',
        'The ASI does not allow entry before sunrise or after sunset, so plan a daytime visit. The drive from Alwar through the Sariska and Thanagazi side is part of the experience.',
      ],
      hi: [
        'भानगढ़ अरावली की तलहटी में बसा 16वीं सदी के आख़िर का किलेबंद शहर है, जो अब खंडहर है और भारतीय पुरातत्व सर्वेक्षण (ASI) द्वारा संरक्षित है। इसका बाज़ार, मंदिर और पहाड़ी पर बना महल इसे राजस्थान की सबसे रोमांचक धरोहरों में से एक बनाते हैं — और इससे जुड़ी कहानियाँ इसे सबसे मशहूर।',
        'ASI सूर्योदय से पहले और सूर्यास्त के बाद प्रवेश की अनुमति नहीं देता, इसलिए दिन में ही जाएँ। अलवर से सरिस्का और थानागाजी की ओर से जाने वाली ड्राइव भी यात्रा का मज़ा है।',
      ],
    },
    see: {
      en: ['The old bazaar street', 'Gopinath and Someshwar temples', 'Palace ruins with valley views', 'Ajabgarh and Sariska on the same route'],
      hi: ['पुरानी बाज़ार गली', 'गोपीनाथ और सोमेश्वर मंदिर', 'घाटी के नज़ारे वाले महल के खंडहर', 'उसी रास्ते पर अजबगढ़ और सरिस्का'],
    },
    tips: {
      en: ['Start early so you are back on the highway before dark.', 'Roads narrow after Thanagazi — keep speeds low through villages.', 'Carry water, a cap and comfortable shoes for the climb.'],
      hi: ['जल्दी निकलें ताकि अँधेरा होने से पहले हाईवे पर लौट आएँ।', 'थानागाजी के बाद सड़कें संकरी हैं — गाँवों में रफ़्तार कम रखें।', 'चढ़ाई के लिए पानी, टोपी और आरामदायक जूते रखें।'],
    },
    bestTime: { en: 'October to March, daytime only', hi: 'अक्टूबर से मार्च, केवल दिन में' },
    route: { en: 'Alwar → Sariska → Thanagazi → Bhangarh', hi: 'अलवर → सरिस्का → थानागाजी → भानगढ़' },
  },
  {
    id: 'neemrana',
    slug: 'neemrana-fort-palace',
    photo: 'neemrana',
    km: 75,
    x: 282,
    y: 196,
    curve: [-24, 4],
    cars: ['dzire', 'creta', 'swift'],
    name: { en: 'Neemrana', hi: 'नीमराना' },
    fullName: { en: 'Neemrana Fort-Palace', hi: 'नीमराना फ़ोर्ट-पैलेस' },
    kind: { en: 'Fort-palace', hi: 'किला-महल' },
    time: { en: '1 hr 45 min', hi: '1 घंटा 45 मिनट' },
    note: {
      en: 'A 15th-century fort-palace on the way towards Delhi NCR.',
      hi: 'दिल्ली एनसीआर की ओर जाते रास्ते पर 15वीं सदी का किला-महल।',
    },
    intro: {
      en: [
        'Neemrana’s fort-palace dates from 1464 and climbs a hillside in terraces beside the Delhi–Jaipur highway. Restored as a heritage hotel, it is one of the best-known weekend getaways between Delhi and Jaipur.',
        'Because the palace is a hotel, day visits are usually by prior booking. Nearby, the old Neemrana stepwell is worth a stop. It is an easy detour if you are driving between Alwar and Delhi NCR.',
      ],
      hi: [
        'नीमराना का किला-महल 1464 का है और दिल्ली–जयपुर हाईवे के पास पहाड़ी पर सीढ़ीनुमा बना है। अब यह हेरिटेज होटल है और दिल्ली–जयपुर के बीच सबसे मशहूर वीकेंड जगहों में से एक है।',
        'महल होटल है, इसलिए दिन में घूमने के लिए आमतौर पर पहले से बुकिंग करनी पड़ती है। पास की पुरानी नीमराना बावड़ी भी देखने लायक है। अलवर और दिल्ली एनसीआर के बीच ड्राइव करते समय यह आसान पड़ाव है।',
      ],
    },
    see: {
      en: ['Terraced palace and hanging gardens', 'Neemrana stepwell (baori)', 'Sunset from the ramparts', 'A stop on the way to Delhi NCR'],
      hi: ['सीढ़ीनुमा महल और बगीचे', 'नीमराना बावड़ी', 'प्राचीर से सूर्यास्त', 'दिल्ली एनसीआर के रास्ते का पड़ाव'],
    },
    tips: {
      en: ['Book a meal or day visit with the hotel before you go.', 'NH-48 is busy with trucks — keep to the left lane unless overtaking.', 'Pair it with a Delhi NCR trip.'],
      hi: ['जाने से पहले होटल में खाने या दिन की विज़िट की बुकिंग कर लें।', 'NH-48 पर ट्रक बहुत चलते हैं — ओवरटेक के अलावा बाईं लेन में रहें।', 'इसे दिल्ली एनसीआर यात्रा के साथ जोड़ें।'],
    },
    bestTime: { en: 'October to March', hi: 'अक्टूबर से मार्च' },
    route: { en: 'Alwar → Behror side → Neemrana (NH-48)', hi: 'अलवर → बहरोड़ की ओर → नीमराना (NH-48)' },
  },
  {
    id: 'jaipur',
    slug: 'alwar-to-jaipur',
    photo: 'jaipur',
    km: 150,
    x: 130,
    y: 492,
    curve: [-10, -46],
    cars: ['dzire', 'creta', 'innova'],
    name: { en: 'Jaipur', hi: 'जयपुर' },
    fullName: { en: 'Jaipur, the Pink City', hi: 'जयपुर, गुलाबी नगरी' },
    kind: { en: 'Pink City', hi: 'गुलाबी नगरी' },
    time: { en: '3 hr', hi: '3 घंटे' },
    note: {
      en: 'Forts, bazaars and food — an easy full-day or overnight trip.',
      hi: 'किले, बाज़ार और खाना — पूरे दिन या रात रुकने की आसान यात्रा।',
    },
    intro: {
      en: [
        'Rajasthan’s capital is about three hours from Alwar. Its walled city is a UNESCO World Heritage Site, and Amer Fort is part of the UNESCO-listed Hill Forts of Rajasthan.',
        'Driving yourself means you can do Amer Fort in the cool of the morning, the old city and bazaars in the afternoon, and Nahargarh for sunset — on your own clock.',
      ],
      hi: [
        'राजस्थान की राजधानी अलवर से लगभग तीन घंटे दूर है। इसका परकोटा शहर यूनेस्को विश्व धरोहर है, और आमेर किला यूनेस्को की सूची वाले "राजस्थान के पहाड़ी किलों" में शामिल है।',
        'खुद ड्राइव करने का मतलब है — सुबह की ठंडक में आमेर किला, दोपहर में पुराना शहर और बाज़ार, और सूर्यास्त के लिए नाहरगढ़ — सब अपने समय पर।',
      ],
    },
    see: {
      en: ['Amer Fort', 'Hawa Mahal & City Palace', 'Jantar Mantar', 'Johari and Bapu bazaars', 'Sunset at Nahargarh'],
      hi: ['आमेर किला', 'हवा महल और सिटी पैलेस', 'जंतर मंतर', 'जौहरी और बापू बाज़ार', 'नाहरगढ़ पर सूर्यास्त'],
    },
    tips: {
      en: ['Most drivers take the Dausa route; the Sariska–Shahpura road is slower but scenic.', 'Parking is tight in the old city — park once and walk between sights.', 'Reach Amer early to beat the crowds and the heat.'],
      hi: ['ज़्यादातर लोग दौसा वाला रास्ता लेते हैं; सरिस्का–शाहपुरा वाली सड़क धीमी है पर सुंदर।', 'पुराने शहर में पार्किंग मुश्किल है — एक बार पार्क करें और पैदल घूमें।', 'भीड़ और गर्मी से बचने के लिए आमेर जल्दी पहुँचें।'],
    },
    bestTime: { en: 'October to March', hi: 'अक्टूबर से मार्च' },
    route: { en: 'Alwar → Rajgarh → Dausa → Jaipur', hi: 'अलवर → राजगढ़ → दौसा → जयपुर' },
  },
  {
    id: 'delhi',
    slug: 'alwar-to-delhi-ncr',
    photo: 'delhi',
    km: 160,
    x: 470,
    y: 64,
    curve: [-44, 30],
    cars: ['dzire', 'creta', 'innova'],
    name: { en: 'Delhi NCR', hi: 'दिल्ली एनसीआर' },
    fullName: { en: 'Delhi NCR (Delhi, Gurugram)', hi: 'दिल्ली एनसीआर (दिल्ली, गुरुग्राम)' },
    kind: { en: 'Capital region', hi: 'राजधानी क्षेत्र' },
    time: { en: '3 hr 30 min', hi: '3 घंटे 30 मिनट' },
    note: {
      en: 'Business in Gurugram or Delhi without depending on a driver.',
      hi: 'गुरुग्राम या दिल्ली में काम — ड्राइवर पर निर्भर हुए बिना।',
    },
    intro: {
      en: [
        'Alwar is roughly three to four hours from Delhi and Gurugram, depending on where you are headed and the traffic. Many of our business customers drive up for meetings in the NCR and come back the same day.',
        'You can go via Bhiwadi and Dharuhera on NH-48, or use the Delhi–Mumbai Expressway, which is often quicker for south Delhi, Sohna and Gurugram.',
      ],
      hi: [
        'अलवर से दिल्ली और गुरुग्राम लगभग तीन से चार घंटे दूर है — यह आपकी मंज़िल और ट्रैफ़िक पर निर्भर करता है। हमारे कई बिज़नेस ग्राहक एनसीआर में मीटिंग के लिए जाते हैं और उसी दिन लौट आते हैं।',
        'आप भिवाड़ी और धारूहेड़ा होते हुए NH-48 से जा सकते हैं, या दिल्ली–मुंबई एक्सप्रेसवे ले सकते हैं जो दक्षिण दिल्ली, सोहना और गुरुग्राम के लिए अक्सर जल्दी पहुँचाता है।',
      ],
    },
    see: {
      en: ['Meetings in Gurugram & Delhi', 'India Gate and Kartavya Path', 'Shopping and family visits', 'Neemrana as a stop on the way'],
      hi: ['गुरुग्राम और दिल्ली में मीटिंग', 'इंडिया गेट और कर्तव्य पथ', 'खरीदारी और रिश्तेदारों से मिलना', 'रास्ते में नीमराना पड़ाव'],
    },
    tips: {
      en: ['Avoid entering Gurugram or Delhi at peak office hours.', 'There are toll plazas on the way — confirm the toll (FASTag) arrangement with us at pickup.', 'During severe pollution alerts (GRAP), Delhi sometimes restricts older diesel vehicles — check before you go.'],
      hi: ['ऑफ़िस के व्यस्त समय में गुरुग्राम या दिल्ली में घुसने से बचें।', 'रास्ते में टोल प्लाज़ा हैं — टोल (FASTag) की व्यवस्था पिकअप के समय हमसे पूछ लें।', 'गंभीर प्रदूषण अलर्ट (GRAP) के दौरान दिल्ली कभी-कभी पुरानी डीज़ल गाड़ियों पर रोक लगाती है — जाने से पहले जाँच लें।'],
    },
    bestTime: { en: 'All year; start early on weekdays', hi: 'साल भर; हफ़्ते के दिनों में जल्दी निकलें' },
    route: { en: 'Alwar → Bhiwadi → Dharuhera → Gurugram / Delhi', hi: 'अलवर → भिवाड़ी → धारूहेड़ा → गुरुग्राम / दिल्ली' },
  },
]

export const MORE_PLACES = {
  en: ['City Palace (Vinay Vilas)', 'Moosi Maharani ki Chhatri', 'Purjan Vihar (Company Bagh)', 'Vijay Mandir Palace', 'Karni Mata Temple', 'Jaisamand Lake', 'Neelkanth Mahadev temples', 'Bharatpur (Keoladeo National Park)', 'Mathura–Vrindavan'],
  hi: ['सिटी पैलेस (विनय विलास)', 'मूसी महारानी की छतरी', 'पुरजन विहार (कंपनी बाग)', 'विजय मंदिर पैलेस', 'करणी माता मंदिर', 'जयसमंद झील', 'नीलकंठ महादेव मंदिर', 'भरतपुर (केवलादेव राष्ट्रीय उद्यान)', 'मथुरा–वृंदावन'],
}

export const destinationBySlug = (slug) => DESTINATIONS.find((d) => d.slug === slug)
export const destinationById = (id) => DESTINATIONS.find((d) => d.id === id)
