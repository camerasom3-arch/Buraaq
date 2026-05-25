import { Product } from './types';

export const PRODUCTS: Product[] = [
  // FASHION
  {
    id: 'f1',
    name: 'Minimalist Premium Cotton Hoodie',
    nameSo: 'Funaanad Cudbi ah oo Casri ah',
    nameAr: 'سترة قطنية ممتازة وبسيطة',
    description: 'Elevate your daily street style with this exceptional premium cotton hoodie. Breathable, warm, and tailored for comfort.',
    descriptionSo: 'Ku qurxi qaabkaaga dhar-xirashada funaanadan fudud ee ka samaysan cudbi qaali ah. Waa mid diiran, hawo qaadanaysa, aadna ugu raaxo leh xirashada.',
    descriptionAr: 'ارتقِ بأسلوبك اليومي مع هذه السترة المميزة المصنوعة من القطن الفاخر. مريحة، دافئة، ومصممة خصيصاً لراحتك.',
    price: 45.00,
    originalPrice: 65.00,
    rating: 4.8,
    reviewsCount: 124,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1556911220-1110e3459871?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80'
    ],
    options: {
      colors: ['Charcoal Black', 'Heather Gray', 'Olive Green'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    countInStock: 25,
    tags: ['Best Seller', '30% Off', 'Premium']
  },
  {
    id: 'f2',
    name: 'Dynamic Athletic Running Sneakers',
    nameSo: 'Kabaha Oroda ee Active',
    nameAr: 'حذاء رياضي ديناميكي للجري',
    description: 'Designed back-to-front for comfort and agility. High-grip rubber outsole and responsive air cushion make running or walking a breeze.',
    descriptionSo: 'Loogu talagalay orodka iyo socodka ee maalin kasta. Cag jilicsan oo caawinaysa raaxada lugta iyo difaacidda dhabarka.',
    descriptionAr: 'مصمم بالكامل لتوفير الراحة والرشاقة. نعل مطاطي مانع للانزلاق ووسادة هوائية تجعل الجري أو المشي في غاية السهولة.',
    price: 79.00,
    originalPrice: 110.00,
    rating: 4.7,
    reviewsCount: 89,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80'
    ],
    options: {
      colors: ['Crimson Red', 'All Black', 'Classic White'],
      sizes: ['39', '40', '41', '42', '43', '44']
    },
    countInStock: 14,
    tags: ['Hot Deal', 'Top Rated']
  },
  {
    id: 'f3',
    name: 'Classic Vintage Leather Watch',
    nameSo: 'Saacad Jiir ah oo Vintage ah',
    nameAr: 'ساعة كلاسيكية ذات حزام جلدي عتيق',
    description: 'Handcrafted leather band meets mechanical brilliance. Features a water-resistant dial with dual time settings and subtle elegance.',
    descriptionSo: 'Saacad tayo sare leh oo dhex dillaacday qurux iyo casriyeyn. Xadhig jilicsan oo jiir ah iyo weji biyaha transmits oo bilicsan.',
    descriptionAr: 'حزام جلدي مصنوع يدوياً يلتقي مع البراعة الميكانيكية. تتميز بمينا مقاوم للماء مع إعدادات توقيت مزدوجة وأناقة ناعمة.',
    price: 125.00,
    rating: 4.9,
    reviewsCount: 56,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80'
    ],
    options: {
      colors: ['Tan Amber', 'Dark Espresso']
    },
    countInStock: 8,
    tags: ['Limited Edition']
  },

  // ELECTRONICS
  {
    id: 'e1',
    name: 'Pro ANC Wireless Headphones',
    nameSo: 'Samaacadaha Dhegaha ee ANC Pro',
    nameAr: 'سماعات رأس لاسلكية برو بخاصية إلغاء الضوضاء',
    description: 'Immerse yourself into absolute silence. Next-generation active noise cancellation blocks up to 98% of ambient noise for 40 hours continuous play.',
    descriptionSo: 'Nadiifi dhawaqa agagaarkaaga adigoo isticmaalaya samaacadahan wireless-ka ah ee leh tiknoolajiyadda joojinta jabaqda. Waxay shaqayn kartaa ilaa 40 saacadood.',
    descriptionAr: 'انغمس في صمت مطلق. تقنية إلغاء الضوضاء النشطة من الجيل التالي تحجب ما يصل إلى 98% من الضوضاء المحيطة لـ 40 ساعة من التشغيل المستمر.',
    price: 189.00,
    originalPrice: 249.00,
    rating: 4.9,
    reviewsCount: 312,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'
    ],
    options: {
      colors: ['Matte Black', 'Snow White', 'Midnight Blue']
    },
    countInStock: 18,
    tags: ['Best Seller', '24% Off']
  },
  {
    id: 'e2',
    name: 'Ultra Slim Smartwatch GPS',
    nameSo: 'Saacadda Smart ee Ultra Slim',
    nameAr: 'ساعة ذكية نحيفة للغاية مع نظام تحديد المواقع (GPS)',
    description: 'Track your health, location, and daily schedule with seamless sync. Featuring AMOLED display, cellular GPS, and heartbeat tracking.',
    descriptionSo: 'Saacad caqli badan oo kaa caawinaysa la socodka caafimaadkaaga, orodkaaga, iyo fariimahaaga. Weji AMOLED ah iyo tijaabiyaha wadnaha.',
    descriptionAr: 'تتبع صحتك، وموقعك، وجدولك اليومي من خلال تزامن سلس. تتميز بشاشة AMOLED، ونظام GPS خلوي، وتتبع نبضات القلب.',
    price: 150.00,
    originalPrice: 199.00,
    rating: 4.6,
    reviewsCount: 201,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80'
    ],
    options: {
      colors: ['Midnight Star', 'Rose Silver', 'Forest Green']
    },
    countInStock: 10,
    tags: ['Popular']
  },
  {
    id: 'e3',
    name: 'HiFi Portable Bluetooth Speaker',
    nameSo: 'Samaacada gacanta ee HiFi Bluetooth',
    nameAr: 'مكبر صوت بلوتوث محمول عالي الدقة',
    description: 'Dual audio radiators bring thunderous rich bass and crystal clear trebles. Waterproof IPX7 rating ensures worry-free beach or shower tunes.',
    descriptionSo: 'Samaacada ugu tayada fiican ee Bluetooth-ka. Waxay adkaysi u leedahay biyaha (IPX7), waxayna leedahay cod degan oo bass xoogan leh.',
    descriptionAr: 'إشعاع صوتي مزدوج يمنحك جهيراً وغناءً فائق الوضوح. تصنيف مقاومة الماء IPX7 يضمن لك الاستماع للموسيقى على الشاطئ أو أثناء الاستحمام دون قلق.',
    price: 59.00,
    originalPrice: 89.00,
    rating: 4.5,
    reviewsCount: 94,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=600&q=80'
    ],
    options: {
      colors: ['Black Obsidian', 'Coral Pink', 'Teal Wave']
    },
    countInStock: 30,
    tags: ['Trend']
  },

  // HOME & KITCHEN
  {
    id: 'h1',
    name: 'Modern Wooden Desk Lamp',
    nameSo: 'Laambada Miiska oo Wooden ah',
    nameAr: 'مصباح مكتب خشبي مودرن',
    description: 'Infuse organic style and adjustable warmth to your remote work table. High quality natural oak framework with soft LED dimmer technology.',
    descriptionSo: 'Nuur weji diiran oo iftiimiya miiskaada aqriska iyo shaqada. Laga sameeyay loox dabiici ah oo aad u qurux badan oo leh dimming LED ah.',
    descriptionAr: 'أضف لمسة طبيعية وإضاءة دافئة قابلة للتعديل إلى مكتب عملك. هيكل من خشب البلوط الطبيعي عالي الجودة مع تقنية تعتيم LED ناعمة.',
    price: 38.00,
    originalPrice: 48.00,
    rating: 4.8,
    reviewsCount: 77,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80'
    ],
    options: {
      colors: ['Light Oak', 'Walnut Brown']
    },
    countInStock: 12,
    tags: ['New Arrival', 'Eco Friendly']
  },
  {
    id: 'h2',
    name: 'Double-Walled Steel Cold Brewer',
    nameSo: 'Weelka Diyaarinta Qaxwada qabow',
    nameAr: 'صانع القهوة الباردة مزدوج الجدار من الفولاذ المقاوم للصدأ',
    description: 'Brew cafe-grade ultra smooth cold brew coffee right at home. 24-hour heat lock insulation preserves peak flavor profile easily.',
    descriptionSo: 'Ku diyaari gurigaaga bun qabow oo aad u macaan. Mar kasta wuu ilaalinayaa heerkulka adigoo isticmaalaya tiknoolajiyadda labada lakab.',
    descriptionAr: 'حضّر قهوة باردة ناعمة للغاية ومماثلة للمقاهي في منزلك. عزل حراري مزدوج يحافظ على النكهة المثالية لمدة 24 ساعة.',
    price: 34.00,
    rating: 4.6,
    reviewsCount: 45,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80'
    ],
    countInStock: 25,
    tags: ['Chef Special']
  },
  {
    id: 'h3',
    name: 'Ergonomic Memory Foam Sleep Pillow',
    nameSo: 'Barkin Caafimaad oo Jilicsan',
    nameAr: 'وسادة نوم طبية مريحة من رغوة الذاكرة',
    description: 'Wake up fully refreshed. Perfectly contours and cradles your shoulders, neck, and head to solve sleeping pains permanently.',
    descriptionSo: 'Barkin jilicsan ee caafimaadka qoorta loogu talagalay. Waxay badbixisaa dhabar xanuunka waxayna ku siinaysaa hurdo aad u macaan.',
    descriptionAr: 'استيقظ بنشاط كامل وطاقة متجددة. تحيط وتدعم كتفيك ورقبتك ورأسك بشكل مثالي للقضاء على آلام النوم نهائياً.',
    price: 28.00,
    originalPrice: 38.00,
    rating: 4.7,
    reviewsCount: 160,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80'
    ],
    countInStock: 15,
    tags: ['Top Rated']
  },

  // BEAUTY / COSMETICS
  {
    id: 'b1',
    name: 'Organic Revitalizing Vitamin C Oil',
    nameSo: 'Saliid dabiici ah ee Vitamin C',
    nameAr: 'زيت فيتامين سي العضوي لتنشيط البشرة',
    description: 'Glow naturally with 100% active, organic botanical extracts. Hydrates deeply, balances skin tones, and combats fine lines effectively.',
    descriptionSo: 'Sifee oo dhalaali wajigaaga adigoo isticmaalaya saliida Vitamin C ee dabiiciga ah. Waxay qoyaan dhab ah siisaa maqaarka waxayna siisaa dhalaal.',
    descriptionAr: 'تألقي بنضارة طبيعية مع مستخلصات نباتية مفعمة بالحيوية وعضوية 100%. يرطب بعمق، ويوحد لون البشرة، ويحارب الخطوط الدقيقة بفعالية.',
    price: 24.00,
    originalPrice: 35.00,
    rating: 4.8,
    reviewsCount: 184,
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80'
    ],
    countInStock: 40,
    tags: ['Organic', 'Best Seller']
  },
  {
    id: 'b2',
    name: 'Exquisite French Lavender Perfume',
    nameSo: 'Cadarka Premium ee Faransiiska',
    nameAr: 'عطر اللافندر الفرنسي الفاخر',
    description: 'A delicate masterclass bouquet of wild lavender fields, French rose nectar, and sweet organic white amber hints.',
    descriptionSo: 'Cadar si gaar ah loogu talagalay oo wata carafta boqorol ee Lavender Faransiiska iyo ubaxa dabiiciga ah. Caraf waarta oo aad u macaan.',
    descriptionAr: 'تحفة فنية رائعة تجمع بين حقول اللافندر البرية، ورحيق الورد الفرنسي، ولمسات ناعمة من العنبر الأبيض العضوي الفاخر.',
    price: 85.00,
    originalPrice: 120.00,
    rating: 4.9,
    reviewsCount: 71,
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80'
    ],
    countInStock: 12,
    tags: ['Luxury Selection']
  },
  {
    id: 'b3',
    name: 'Nourishing Shea Butter Lip Balm Set',
    nameSo: 'Balm-ka Dibnaha ee Shea Butter (Set)',
    nameAr: 'مجموعة مرطب الشفاه المغذي بزبدة الشيا',
    description: 'Keep lips perfectly supple all day. Infused with coconut oil, honey combs, and pure organic shea butter extracts.',
    descriptionSo: 'Ilaali jilicsanaanta dibnahaaga maalin kasta. Waxaa laga sameeyay malabka dabiiciga, saliid qumbaha iyo shea butter tayo leh.',
    descriptionAr: 'حافظي على نعومة شفتيك طوال اليوم. غني بزيت جوز الهند، وأقراص العسل، ومستخلصات زبدة الشيا العضوية النقية.',
    price: 15.00,
    rating: 4.4,
    reviewsCount: 110,
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80'
    ],
    countInStock: 50,
    tags: ['Vegan']
  }
];
