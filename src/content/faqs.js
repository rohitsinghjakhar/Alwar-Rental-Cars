import { SITE } from './site.js'

const phone = SITE.phone.display

/** FAQ groups. Answers are written to stand alone — search engines and AI assistants quote them directly. */
export const FAQ_GROUPS = [
  {
    id: 'booking',
    title: { en: 'Booking & timings', hi: 'बुकिंग और समय' },
    items: [
      {
        q: { en: 'How do I book a self drive car in Alwar?', hi: 'अलवर में सेल्फ ड्राइव कार कैसे बुक करें?' },
        a: {
          en: `WhatsApp or call ${SITE.name} on ${phone} with the car type, your pickup and return dates and where you plan to go. You can also send the booking form on our website. We confirm availability and the price before you come.`,
          hi: `${SITE.nameHi} को ${phone} पर व्हाट्सऐप या कॉल करें और कार का प्रकार, पिकअप व वापसी की तारीख और कहाँ जाना है बताएँ। आप वेबसाइट का बुकिंग फ़ॉर्म भी भेज सकते हैं। आने से पहले हम उपलब्धता और कीमत पक्की कर देते हैं।`,
        },
      },
      {
        q: { en: 'What are your timings?', hi: 'आपका समय क्या है?' },
        a: {
          en: 'We are open from 8:00 AM to 8:00 PM. Pickups and returns happen within these hours — WhatsApp or call us to fix a slot.',
          hi: 'हम सुबह 8:00 से रात 8:00 बजे तक खुले रहते हैं। पिकअप और वापसी इसी समय में होती है — समय तय करने के लिए व्हाट्सऐप या कॉल करें।',
        },
      },
      {
        q: { en: 'Where do I pick up the car?', hi: 'कार कहाँ से लेनी होगी?' },
        a: {
          en: 'From our location near PNB Bank, Diwakari, Alwar, Rajasthan 301001. We share the exact spot when you confirm your booking.',
          hi: 'हमारी जगह से — पीएनबी बैंक के पास, दिवाकरी, अलवर, राजस्थान 301001। बुकिंग पक्की होने पर हम सही जगह बता देते हैं।',
        },
      },
      {
        q: { en: 'How much does a self drive car cost in Alwar?', hi: 'अलवर में सेल्फ ड्राइव कार का किराया कितना है?' },
        a: {
          en: 'The price depends on the car and how long you need it. Send us your dates on WhatsApp and we share the exact quote, including any security deposit, before you book — no surprises at pickup.',
          hi: 'किराया कार और समय पर निर्भर करता है। व्हाट्सऐप पर अपनी तारीखें भेजें — बुकिंग से पहले हम सही कीमत और सिक्योरिटी डिपॉज़िट (यदि हो) बता देते हैं, पिकअप पर कोई सरप्राइज़ नहीं।',
        },
      },
      {
        q: { en: 'Do I have to pay online?', hi: 'क्या ऑनलाइन भुगतान करना होगा?' },
        a: {
          en: 'No. This website does not take payments. Everything is confirmed directly with us on call or WhatsApp.',
          hi: 'नहीं। यह वेबसाइट कोई भुगतान नहीं लेती। सब कुछ सीधे हमसे कॉल या व्हाट्सऐप पर तय होता है।',
        },
      },
    ],
  },
  {
    id: 'documents',
    title: { en: 'Documents', hi: 'दस्तावेज़' },
    items: [
      {
        q: { en: 'Which documents do I need to rent a self drive car?', hi: 'सेल्फ ड्राइव कार किराये पर लेने के लिए कौन से दस्तावेज़ चाहिए?' },
        a: {
          en: 'Two documents are compulsory for every booking: your Aadhaar card and a valid driving licence. Keep both with you at pickup for verification.',
          hi: 'हर बुकिंग के लिए दो दस्तावेज़ ज़रूरी हैं: आपका आधार कार्ड और वैध ड्राइविंग लाइसेंस। सत्यापन के लिए पिकअप के समय दोनों साथ रखें।',
        },
      },
      {
        q: { en: 'Can I rent a car with a learner’s licence?', hi: 'क्या लर्निंग लाइसेंस से कार मिल सकती है?' },
        a: {
          en: 'No. A learner’s licence only lets you drive with a licensed instructor beside you, so it cannot be used for self drive. You need a permanent driving licence valid for cars (LMV).',
          hi: 'नहीं। लर्निंग लाइसेंस पर आप केवल लाइसेंसधारी प्रशिक्षक के साथ ही गाड़ी चला सकते हैं, इसलिए सेल्फ ड्राइव के लिए यह मान्य नहीं है। कार (LMV) के लिए वैध स्थायी ड्राइविंग लाइसेंस चाहिए।',
        },
      },
      {
        q: { en: 'I don’t have an Aadhaar card. Can I still rent?', hi: 'मेरे पास आधार कार्ड नहीं है। क्या फिर भी कार मिल सकती है?' },
        a: {
          en: `Please call us on ${phone} before booking so we can tell you what is possible in your case.`,
          hi: `कृपया बुकिंग से पहले ${phone} पर कॉल करें, ताकि हम आपके मामले में क्या संभव है बता सकें।`,
        },
      },
    ],
  },
  {
    id: 'cars',
    title: { en: 'Cars', hi: 'गाड़ियाँ' },
    items: [
      {
        q: { en: 'Which cars can I rent?', hi: 'कौन सी गाड़ियाँ किराये पर मिलती हैं?' },
        a: {
          en: 'Hatchbacks like the Maruti Suzuki Swift, sedans like the Dzire, SUVs like the Hyundai Creta and Mahindra Thar, and 7-seaters like the Ertiga and Toyota Innova Crysta. Availability changes daily, so message us for today’s options.',
          hi: 'स्विफ्ट जैसी हैचबैक, डिज़ायर जैसी सेडान, हुंडई क्रेटा और महिंद्रा थार जैसी एसयूवी, और अर्टिगा व टोयोटा इनोवा क्रिस्टा जैसी 7-सीटर। उपलब्धता रोज़ बदलती है, इसलिए आज के विकल्प के लिए मैसेज करें।',
        },
      },
      {
        q: { en: 'Do you have 7-seater cars for families or groups?', hi: 'क्या परिवार या ग्रुप के लिए 7-सीटर गाड़ी है?' },
        a: {
          en: 'Yes — the Maruti Suzuki Ertiga and the Toyota Innova Crysta both seat seven. The Innova Crysta is the more spacious choice for long trips with seven adults.',
          hi: 'हाँ — मारुति सुज़ुकी अर्टिगा और टोयोटा इनोवा क्रिस्टा दोनों में सात लोग बैठते हैं। सात बड़ों के साथ लंबी यात्रा के लिए इनोवा क्रिस्टा ज़्यादा खुली है।',
        },
      },
      {
        q: { en: 'Do you have automatic or CNG cars?', hi: 'क्या ऑटोमैटिक या सीएनजी गाड़ियाँ हैं?' },
        a: {
          en: 'Some models come in automatic or CNG versions depending on availability. Tell us your preference when you book and we will confirm.',
          hi: 'उपलब्धता के अनुसार कुछ मॉडल ऑटोमैटिक या सीएनजी में मिलते हैं। बुकिंग के समय अपनी पसंद बताएँ, हम पक्का कर देंगे।',
        },
      },
    ],
  },
  {
    id: 'trips',
    title: { en: 'Trips & areas', hi: 'यात्रा और क्षेत्र' },
    items: [
      {
        q: { en: 'Can I take the car outside Alwar, to Jaipur or Delhi NCR?', hi: 'क्या कार अलवर से बाहर, जयपुर या दिल्ली एनसीआर ले जा सकते हैं?' },
        a: {
          en: 'Tell us your route and dates when you book — trips to Sariska, Bhangarh, Neemrana, Jaipur, Delhi NCR and other parts of Rajasthan are common, and we confirm the details for your journey.',
          hi: 'बुकिंग के समय अपना रास्ता और तारीखें बताएँ — सरिस्का, भानगढ़, नीमराना, जयपुर, दिल्ली एनसीआर और राजस्थान के दूसरे हिस्सों की यात्राएँ आम हैं, हम आपकी यात्रा के हिसाब से सब पक्का कर देते हैं।',
        },
      },
      {
        q: { en: 'Who usually rents from you?', hi: 'आपसे आमतौर पर कौन कार लेता है?' },
        a: {
          en: 'Tourists exploring Alwar and Rajasthan, local families, business travellers and government employees on official tours. Business and government travellers especially like self drive because the schedule stays in their hands.',
          hi: 'अलवर और राजस्थान घूमने आए पर्यटक, स्थानीय परिवार, बिज़नेस यात्री और सरकारी दौरे पर जाने वाले कर्मचारी। बिज़नेस और सरकारी यात्रियों को सेल्फ ड्राइव ख़ास पसंद है क्योंकि समय उनके अपने हाथ में रहता है।',
        },
      },
      {
        q: { en: 'Which areas do you serve?', hi: 'आप किन क्षेत्रों में सेवा देते हैं?' },
        a: {
          en: 'Cars are picked up from Diwakari, Alwar. Customers come from Alwar city and nearby towns such as Bhiwadi, Neemrana, Behror, Tijara, Khairthal and Rajgarh, as well as travellers arriving from Delhi NCR and Jaipur.',
          hi: 'कार दिवाकरी, अलवर से मिलती है। हमारे ग्राहक अलवर शहर और पास के कस्बों — भिवाड़ी, नीमराना, बहरोड़, तिजारा, खैरथल और राजगढ़ — से आते हैं, साथ ही दिल्ली एनसीआर और जयपुर से आने वाले यात्री भी।',
        },
      },
    ],
  },
]

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items)
export const HOME_FAQS = [ALL_FAQS[0], ALL_FAQS[5], ALL_FAQS[3], ALL_FAQS[11], ALL_FAQS[1]]
