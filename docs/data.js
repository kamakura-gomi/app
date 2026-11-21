// Kamakura City sorting data.
// Source: "How to Sort and Dispose of Recyclable Items and Waste", FY2026 edition
// (City of Kamakura, issued April 2026) + door-to-door collection leaflet (Nov 2025).
// House rules added by the household are marked `house: true`.

export const SOURCE_NOTE =
  'Based on Kamakura City’s FY2026 sorting pamphlet (April 2026). Rules can change — when in doubt, check the city website or call 0467-61-3396.';

// Weekday numbers: 1 = Mon … 5 = Fri
export const CATEGORIES = {
  combustible: {
    en: 'Combustible Waste', ja: '燃やすごみ', short: 'Burnable', color: '#d9653b', icon: '🔥',
    sched: 'comb',
    bag: 'Designated PAID bag (yellow city bag, 5/10/20/40 L) — tie the handles shut.',
    howto: [
      'Put out by 8:30 a.m. on collection day (twice a week).',
      'Since April 2026 this is DOOR-TO-DOOR: houses put it on their own property facing the street (not on the road). Apartments use their own station.',
      'Use a lidded container weighted down so crows/cats and wind can’t get it.',
      'Max 5 bags per household per day.',
    ],
  },
  noncombustible: {
    en: 'Non-Combustible Waste', ja: '燃えないごみ', short: 'Non-burnable', color: '#8a6bb8', icon: '🍳',
    sched: 'monthly',
    bag: 'Designated PAID bag. Odd shapes under 50 cm: tie a 40 L paid bag to the item.',
    howto: [
      'Once a month (see your schedule) at the clean station, by 8:30 a.m.',
      'Remove all batteries from appliances first (batteries are Hazardous Waste).',
      'Umbrellas, frying pans, rod-shaped metal items under 1 m: wrap/tie a paid bag around them.',
    ],
  },
  plastic_cp: {
    en: 'Plastic Containers & Packaging', ja: '容器包装プラスチック', short: 'Plastic packaging', color: '#e0708a', icon: '🛍️',
    sched: 'pcp',
    bag: 'Clear or semi-clear bag (up to 45 L). Do NOT double-bag.',
    howto: [
      'Look for the プラ mark.',
      'Remove food so no solids remain — no need to scrub with detergent.',
      'Very greasy or smelly containers (curry, retort pouches, kimchi) → Combustible Waste instead.',
      'Hard-to-clean tube openings: cut off and put in Combustible.',
      'Once a week, at the clean station by 8:30 a.m.',
    ],
  },
  plastic_goods: {
    en: 'Plastic Goods', ja: '製品プラスチック', short: 'Plastic goods', color: '#3f7fbf', icon: '🪣',
    sched: 'pg',
    bag: 'Clear or semi-clear bag (up to 45 L). Items under 50 cm that don’t fit: put out as is with a note “SEIHIN PURASUCHIKKU”.',
    howto: [
      'Plastic PRODUCTS (not packaging) — may include small metal/rubber parts.',
      'Remove sand, mud and food. Peel stickers if possible.',
      'NOT accepted: PVC/vinyl items (→ Combustible), anything electric/battery (→ Non-Combustible).',
      'Once a month (see schedule).',
    ],
  },
  paper: {
    en: 'Paper', ja: '紙類', short: 'Paper', color: '#c9a227', icon: '📰',
    sched: 'paper',
    bag: 'Mixed paper: in a PAPER bag (closed with tape/staples). Cardboard, newspapers, magazines, cartons: tie with string. Never in plastic bags.',
    howto: [
      'Same day as Fabric. OK on rainy days.',
      'Mixed Paper (雑がみ): office paper, mail, envelopes (window OK), receipts, paper cups, cereal/tissue boxes, toilet-roll cores, wrapping paper, shredded paper, photos, notebooks.',
      'Cardboard / Newspapers + flyers / Magazines & books with a spine: bundle with string.',
      'Milk/juice cartons: rinse, cut open, dry, bundle. Plastic spouts → Plastic Packaging.',
      'Dirty or greasy paper → Combustible.',
    ],
  },
  fabric: {
    en: 'Fabric Items', ja: '布類', short: 'Fabric', color: '#7fa33a', icon: '👕',
    sched: 'paper',
    bag: 'Clear or semi-clear bag (up to 45 L), tied.',
    howto: [
      'Same day as Paper. Wash and dry first.',
      'Do NOT put out when it rains — wet fabric moulds and can’t be recycled.',
      'Leave buttons and zippers on. Torn clothes are OK.',
      'Leather/padded clothes, belts, bags, hats: only if still usable.',
    ],
  },
  plant: {
    en: 'Plant Trimmings', ja: '植木剪定材', short: 'Garden', color: '#3c9a5f', icon: '🌿',
    sched: 'plant',
    bag: 'Clear/semi-clear bag, or bundles tied with string (each under 50 cm long, 15 cm thick).',
    howto: [
      'Once a week. Remove soil; bag just before collection to avoid mould.',
      'Max 5 bags/bundles at a time.',
      'Large amounts: take to Plant Trimming Acceptance Site, 1493-2 Sekiya (100 yen up to 100 kg).',
      'NOT: wood products, oleander, fruit pits, soil/stones. Gardener’s trimmings must be taken by the gardener.',
    ],
  },
  cans_bottles: {
    en: 'Food & Beverage Cans and Bottles', ja: '缶・びん', short: 'Cans & glass', color: '#6d6a9c', icon: '🥫',
    sched: 'cans',
    bag: 'NO bag — cans in the YELLOW container, glass bottles in the BLUE container at the clean station.',
    howto: [
      'Only food & drink containers. Rinse or wipe.',
      'Remove lids: plastic lids → Plastic Packaging; metal lids/crown caps → Non-Combustible.',
      'Return beer/sake bottles to the shop when possible.',
      'Spray cans → Hazardous Waste. Non-food bottles (cosmetics etc.) → Non-Combustible.',
    ],
  },
  pet: {
    en: 'PET Bottles', ja: 'ペットボトル', short: 'PET', color: '#3aa3c9', icon: '🧴',
    sched: 'pet',
    bag: 'Clear or semi-clear bag (up to 45 L), tied.',
    howto: [
      'Only bottles with the PET mark (drinks, alcohol, soy sauce/seasonings).',
      'Remove cap, ring and label (→ Plastic Packaging). Rinse. Lightly crush.',
      'Coloured PET bottles → Combustible.',
    ],
  },
  oil: {
    en: 'Used Cooking Oil', ja: '使用済み食用油', short: 'Cooking oil', color: '#b8892a', icon: '🫗',
    sched: 'monthly',
    bag: 'Inside a capped PET bottle (500 ml preferred) — NOT in a bag.',
    howto: [
      'Liquid vegetable oil only, cooled.',
      'Rinse an empty PET bottle, remove label, fill, cap it.',
      'Write “SHOKUYO ABURA” on it with a marker.',
      'Same monthly day as Non-Combustible. Make sure it can’t roll away.',
      'Solidified oil → Combustible. Engine/mineral oil → not collected.',
    ],
  },
  hazardous: {
    en: 'Hazardous / Toxic Waste', ja: '危険・有害ごみ', short: 'Hazardous', color: '#c23b3b', icon: '⚠️',
    sched: 'monthly',
    bag: 'Clear or semi-clear bag. Batteries separate from other items.',
    howto: [
      'Same monthly day as Non-Combustible.',
      'Batteries: use up, cover terminals with tape. Rechargeable/lithium in a SEPARATE bag from dry cells.',
      'Fluorescent tubes / bulbs: in original box or wrapped in paper, write “KEIKOKAN” or “DENKYU”.',
      'Broken glass, knives: wrap in newspaper, write “KIKEN”.',
      'Spray cans & gas cartridges: completely empty.',
      'Swollen batteries: hand directly to staff at City Hall (counter 27) or Fueda Recycling Center.',
    ],
  },
  large: {
    en: 'Large Waste', ja: '粗大ごみ', short: 'Large', color: '#7a5a43', icon: '🛋️',
    sched: null,
    bag: 'Reservation + paid sticker (300 / 600 / 1,200 yen) from convenience stores, post offices, supermarkets.',
    howto: [
      'Anything about 50 cm or more in any dimension.',
      'Reserve online (24 h) or call the Environment Center 0467-53-8321 (Mon–Fri 8:15–17:00). Max 5 items per booking.',
      '600 yen: normal large item. 1,200 yen: ~1 m+ (beds, sofas, desks, big shelves…). 300 yen: rods ≥1 m / boards ≥50 cm.',
      'Write your name on the sticker, put it outside on your property by 8:30 a.m. on the day.',
    ],
  },
  not_city: {
    en: 'Not collected by the city', ja: '市で収集しないもの', short: 'Not collected', color: '#555555', icon: '🚫',
    sched: null,
    bag: 'Must go through a shop, manufacturer or licensed company.',
    howto: [
      'TV, air conditioner, fridge/freezer, washing machine, clothes dryer: Home Appliance Recycling — ask the shop, or call 0120-319640.',
      'Computers & monitors: RenetJapanRecycle (free box pickup with PC body, 0570-085-800) or the maker.',
      'Spring mattresses: ask the shop. Tires, engine oil, kerosene, extinguishers, propane, soil/stones/bricks, cars/bikes, pianos, surfboards: specialist (ask 0467-61-3396).',
    ],
  },
};

// Items. cat = category key. clip = photo prompt(s) for on-device recognition.
// special: 'pet' | 'diaper' | 'size50'
export const ITEMS = [
  // ---------- PET ----------
  { id: 'pet_bottle', en: 'PET bottle (drinks, tea, water)', ja: 'ペットボトル', cat: 'pet', special: 'pet',
    kw: 'water bottle plastic bottle drink tea soda juice 飲料 ボトル', clip: ['a clear plastic PET drink bottle', 'a plastic water bottle', 'an empty plastic tea bottle'] },
  { id: 'pet_soy', en: 'Soy sauce / mirin PET bottle', ja: 'しょうゆのペットボトル', cat: 'pet', special: 'pet',
    kw: 'soy sauce mirin seasoning shoyu 調味料', clip: ['a plastic soy sauce bottle'] },
  { id: 'pet_cap', en: 'PET bottle cap', ja: 'ペットボトルのキャップ', cat: 'plastic_cp',
    kw: 'cap lid bottle top キャップ ふた', clip: ['a small plastic bottle cap'], note: 'Caps and the plastic ring go in Plastic Containers & Packaging.' },
  { id: 'pet_label', en: 'PET bottle label', ja: 'ペットボトルのラベル', cat: 'plastic_cp', kw: 'label wrapper film ラベル' },
  { id: 'pet_ring', en: 'PET bottle cap ring', ja: 'キャップのリング', cat: 'plastic_cp', house: true, kw: 'ring neck ring リング' },
  { id: 'pet_colored', en: 'Coloured PET bottle (green, brown, blue…)', ja: '色付きペットボトル', cat: 'combustible',
    kw: 'colored coloured green brown imported', note: 'Coloured PET can’t be recycled in Japan → Combustible.' },
  { id: 'pet_whitecap', en: 'PET bottle with white / non-PET screw top', ja: '白いキャップ部のボトル', cat: 'plastic_cp', house: true,
    kw: 'white neck white top opaque screw hot drink', note: 'Because the screw top is not PET, the WHOLE bottle goes in Plastic Containers & Packaging (not PET).' },

  // ---------- Cans & bottles ----------
  { id: 'can_drink', en: 'Drink can (aluminium / steel)', ja: '飲料缶', cat: 'cans_bottles',
    kw: 'beer can soda can coke aluminum aluminium steel 空き缶 アルミ', clip: ['an aluminum soda can', 'a beer can'] },
  { id: 'can_food', en: 'Food can (tuna, tomatoes, pet food)', ja: '食品缶', cat: 'cans_bottles',
    kw: 'tin can canned food tuna cat food dog food 缶詰', clip: ['an empty tin food can', 'a canned food tin'] },
  { id: 'glass_bottle', en: 'Glass drink bottle (beer, wine, sake)', ja: 'びん', cat: 'cans_bottles',
    kw: 'wine bottle beer bottle sake bottle glass 瓶 ビン', clip: ['a glass wine bottle', 'a brown glass beer bottle', 'a glass sake bottle'], note: 'Remove the cap. Return beer/sake bottles to the store if you can.' },
  { id: 'glass_jar', en: 'Glass jar (jam, food)', ja: 'ジャムなどのびん', cat: 'cans_bottles',
    kw: 'jar jam honey pickles glass', clip: ['a glass jam jar'], note: 'Rinse. Metal lid → Non-Combustible; plastic lid → Plastic Packaging.' },
  { id: 'glass_med', en: 'Health drink / medicine glass bottle', ja: '栄養ドリンクのびん', cat: 'cans_bottles', kw: 'vitamin drink medicine small brown bottle', clip: ['a small brown glass medicine bottle'] },
  { id: 'can_lid', en: 'Lid of a food can', ja: '缶のふた', cat: 'cans_bottles', kw: 'can lid tin lid' },
  { id: 'cosmetic_bottle', en: 'Cosmetic / perfume glass bottle', ja: '化粧品のびん', cat: 'noncombustible',
    kw: 'perfume cosmetics nail polish glass non-food', clip: ['a glass perfume bottle'], note: 'Not a food/drink bottle → Non-Combustible.' },

  // ---------- Plastic containers & packaging ----------
  { id: 'plastic_bag', en: 'Plastic shopping bag / film', ja: 'レジ袋・ポリ袋', cat: 'plastic_cp',
    kw: 'shopping bag plastic bag film wrap poly レジ袋', clip: ['a plastic shopping bag', 'a crumpled plastic bag'] },
  { id: 'wrap', en: 'Plastic wrap / packaging film', ja: 'ラップ・包装フィルム', cat: 'plastic_cp', kw: 'cling film saran wrap packaging film', clip: ['clear plastic wrap film'] },
  { id: 'snack_bag', en: 'Snack / chips bag', ja: 'お菓子の袋', cat: 'plastic_cp', kw: 'chips crisps snack bag candy wrapper', clip: ['an empty potato chips bag', 'a snack wrapper'] },
  { id: 'tray', en: 'Meat / fish tray', ja: '食品トレイ', cat: 'plastic_cp', kw: 'tray styrofoam tray meat fish supermarket', clip: ['a white styrofoam meat tray', 'a plastic food tray'], note: 'Rinse off food.' },
  { id: 'styrofoam', en: 'Styrofoam packing', ja: '発泡スチロール', cat: 'plastic_cp', kw: 'polystyrene foam packing cushioning', clip: ['styrofoam packing material'], note: 'Can be put out as is even if 50 cm or larger.' },
  { id: 'bubble', en: 'Bubble wrap', ja: 'プチプチ（緩衝材）', cat: 'plastic_cp', kw: 'air cushion packing bubble', clip: ['bubble wrap'] },
  { id: 'cup_yogurt', en: 'Yogurt / pudding cup', ja: 'ヨーグルトのカップ', cat: 'plastic_cp', kw: 'cup yogurt pudding jelly natto', clip: ['an empty plastic yogurt cup'] },
  { id: 'natto', en: 'Natto container', ja: '納豆の容器', cat: 'plastic_cp', kw: 'natto', note: 'Remove most of the sticky beans; if very dirty → Combustible.' },
  { id: 'cup_noodle', en: 'Cup noodle container (plastic)', ja: 'カップ麺の容器', cat: 'plastic_cp', kw: 'ramen cup instant noodles', clip: ['an empty instant cup noodle container'], note: 'Paper cup-noodle containers → Mixed Paper if clean.' },
  { id: 'bento', en: 'Bento / take-away container', ja: '弁当容器', cat: 'plastic_cp', kw: 'lunch box takeaway takeout convenience store container', clip: ['a plastic takeaway bento container'] },
  { id: 'tofu', en: 'Tofu container', ja: '豆腐のパック', cat: 'plastic_cp', kw: 'tofu pack', clip: ['an empty plastic tofu container'] },
  { id: 'egg_carton', en: 'Egg carton (plastic)', ja: '卵のパック', cat: 'plastic_cp', kw: 'eggs pack', clip: ['a clear plastic egg carton'], note: 'Paper/pulp egg cartons → Mixed Paper.' },
  { id: 'clamshell', en: 'Fruit / strawberry pack', ja: 'いちごのパック', cat: 'plastic_cp', kw: 'clamshell berry strawberry tomato pack', clip: ['a clear plastic fruit clamshell container'] },
  { id: 'fruit_net', en: 'Fruit net bag', ja: '果物のネット', cat: 'plastic_cp', kw: 'mesh net onion orange', clip: ['a plastic mesh net bag for fruit'] },
  { id: 'shampoo', en: 'Shampoo / detergent bottle', ja: 'シャンプーや洗剤の容器', cat: 'plastic_cp', kw: 'conditioner soap detergent bleach body wash pump bottle', clip: ['a plastic shampoo bottle', 'a plastic laundry detergent bottle'], note: 'Just empty it — no need to wash inside.' },
  { id: 'refill_pouch', en: 'Refill pouch', ja: '詰め替え袋', cat: 'plastic_cp', kw: 'refill pack pouch tsumekae', clip: ['a plastic refill pouch'] },
  { id: 'tube', en: 'Toothpaste / mayonnaise tube', ja: 'チューブ', cat: 'plastic_cp', kw: 'toothpaste mayo ketchup wasabi tube', clip: ['a squeezed toothpaste tube', 'a mayonnaise bottle'], note: 'If the opening is hard to clean, cut it off → Combustible.' },
  { id: 'plastic_lid', en: 'Plastic lid / cap (any bottle)', ja: 'プラスチックのふた', cat: 'plastic_cp', kw: 'lid cap jar lid' },
  { id: 'carton_spout', en: 'Plastic spout of a paper carton', ja: '紙パックの注ぎ口', cat: 'plastic_cp', kw: 'spout milk carton opening' },
  { id: 'medicine_ptp', en: 'Pill blister pack', ja: '薬の包装シート', cat: 'plastic_cp', kw: 'ptp blister tablets pills', clip: ['an empty medicine blister pack'] },
  { id: 'retort', en: 'Retort pouch / greasy curry container', ja: 'レトルトパウチ・油汚れの容器', cat: 'combustible', kw: 'curry retort pouch greasy oily kimchi smelly dirty plastic', note: 'Greasy or smelly packaging → Combustible.' },

  // ---------- Plastic goods ----------
  { id: 'bucket', en: 'Plastic bucket / bowl / basket', ja: 'バケツ・洗面器', cat: 'plastic_goods', kw: 'basin laundry basket bowl', clip: ['a plastic bucket', 'a plastic laundry basket'] },
  { id: 'storage_box', en: 'Plastic storage box / case', ja: '収納ケース', cat: 'plastic_goods', kw: 'container box drawer clear case', clip: ['a clear plastic storage box'] },
  { id: 'tupperware', en: 'Food storage container (Tupperware)', ja: '密閉容器（タッパー）', cat: 'plastic_goods', kw: 'tupperware lunchbox reusable container', clip: ['a reusable plastic food storage container with lid'] },
  { id: 'cd', en: 'CD / DVD and case', ja: 'CD・DVD', cat: 'plastic_goods', kw: 'cd dvd blu-ray disc case', clip: ['a CD disc', 'a DVD case'] },
  { id: 'tapes', en: 'Video / cassette tape, floppy disk', ja: 'ビデオテープ・カセット', cat: 'plastic_goods', kw: 'vhs video cassette floppy', clip: ['a VHS videotape', 'an audio cassette tape'] },
  { id: 'hanger_plastic', en: 'Plastic hanger', ja: 'プラスチックのハンガー', cat: 'plastic_goods', kw: 'clothes hanger', clip: ['a plastic clothes hanger'] },
  { id: 'toy_plastic', en: 'Plastic toy (no batteries)', ja: 'おもちゃ（電池なし）', cat: 'plastic_goods', kw: 'lego blocks toy car train rails figure', clip: ['a plastic toy', 'lego toy blocks'], note: 'Toys with batteries/electric → remove battery, toy → Non-Combustible. Soft vinyl dolls → Combustible.' },
  { id: 'sponge', en: 'Kitchen sponge', ja: 'スポンジ', cat: 'plastic_goods', kw: 'sponge scrubber', clip: ['a kitchen sponge'] },
  { id: 'toothbrush', en: 'Toothbrush', ja: '歯ブラシ', cat: 'plastic_goods', kw: 'tooth brush', clip: ['a used toothbrush'] },
  { id: 'mat', en: 'Silicone / urethane mat', ja: 'マット（シリコン・ウレタン）', cat: 'plastic_goods', kw: 'yoga mat bath mat joint mat foam', clip: ['a foam floor mat'] },
  { id: 'plant_pot', en: 'Plastic plant pot / planter', ja: 'プランター・植木鉢（プラ）', cat: 'plastic_goods', kw: 'planter flower pot garden', clip: ['a plastic plant pot'], note: 'Wash off the soil.' },
  { id: 'bath_cover', en: 'Bathtub cover', ja: '風呂ふた', cat: 'plastic_goods', kw: 'bath lid', note: 'OK even if over 50 cm.' },
  { id: 'cutting_board', en: 'Plastic cutting board', ja: 'まな板（プラ）', cat: 'plastic_goods', kw: 'chopping board', clip: ['a plastic cutting board'] },
  { id: 'pen', en: 'Ballpoint pen / plastic stationery', ja: 'ボールペン・文房具', cat: 'plastic_goods', kw: 'pen marker ruler stationery', clip: ['a plastic ballpoint pen'] },
  { id: 'clothespin', en: 'Clothes pegs / laundry hanger', ja: '洗濯ばさみ・ピンチハンガー', cat: 'plastic_goods', kw: 'pegs clothespins', clip: ['plastic clothespins'] },
  { id: 'cutlery_plastic', en: 'Plastic spoon / fork / straw', ja: 'プラスチックのスプーン・ストロー', cat: 'plastic_goods', kw: 'disposable cutlery straw', clip: ['a plastic spoon and fork'] },
  { id: 'pvc', en: 'Vinyl / PVC item (hose, soft vinyl doll)', ja: '塩ビ製品', cat: 'combustible', kw: 'pvc vinyl hose rubber', note: 'PVC/vinyl and rubber → Combustible.' },

  // ---------- Paper ----------
  { id: 'cardboard', en: 'Cardboard box', ja: '段ボール', cat: 'paper', kw: 'carton box amazon corrugated delivery', clip: ['a brown cardboard box', 'flattened cardboard boxes'], note: 'Flatten and tie with string.' },
  { id: 'newspaper', en: 'Newspaper & flyers', ja: '新聞・チラシ', cat: 'paper', kw: 'news flyer leaflet advertising', clip: ['a folded newspaper'], note: 'Tie with string.' },
  { id: 'magazine', en: 'Magazine / book (with spine)', ja: '雑誌・本', cat: 'paper', kw: 'book catalogue comic manga', clip: ['a magazine', 'a paperback book'], note: 'Tie with string.' },
  { id: 'milk_carton', en: 'Milk / juice carton', ja: '紙パック', cat: 'paper', kw: 'milk carton juice paper pack tetra', clip: ['a paper milk carton'], note: 'Rinse, cut open, dry, bundle. Silver-lined OK. Plastic spout → Plastic Packaging.' },
  { id: 'mixed_paper', en: 'Mixed paper (mail, receipts, envelopes)', ja: '雑がみ', cat: 'paper', kw: 'letter mail envelope receipt memo office paper postcard dm', clip: ['a paper envelope', 'paper receipts and letters'], note: 'Put in a paper bag. Window envelopes OK.' },
  { id: 'paper_box', en: 'Cereal / tissue / snack paper box', ja: 'お菓子の箱・ティッシュ箱', cat: 'paper', kw: 'paperboard box cereal tissue box', clip: ['an empty cereal box', 'an empty tissue box'], note: 'Mixed Paper (paper bag or tied).' },
  { id: 'toilet_core', en: 'Toilet-paper / wrap core', ja: 'トイレットペーパーの芯', cat: 'paper', kw: 'core roll tube', clip: ['a cardboard toilet paper roll'], note: 'Mixed Paper. Tubes 50 cm or longer → Large Waste (paid bag).' },
  { id: 'paper_cup', en: 'Paper cup', ja: '紙コップ', cat: 'paper', kw: 'coffee cup', clip: ['a paper coffee cup'] },
  { id: 'paper_bag', en: 'Paper bag', ja: '紙袋', cat: 'paper', kw: 'shopping paper bag', clip: ['a paper shopping bag'] },
  { id: 'notebook', en: 'Notebook / booklet', ja: 'ノート', cat: 'paper', kw: 'note book pamphlet', clip: ['a spiral notebook'], note: 'Staples and rings can stay on.' },
  { id: 'shredded', en: 'Shredded paper', ja: 'シュレッダーくず', cat: 'paper', kw: 'shredder', note: 'In a paper bag.' },
  { id: 'photo', en: 'Photograph', ja: '写真', cat: 'paper', kw: 'photo picture print' },
  { id: 'egg_carton_paper', en: 'Paper/pulp egg carton', ja: '紙製の卵パック', cat: 'paper', kw: 'pulp moulded egg' },
  { id: 'dirty_paper', en: 'Dirty / greasy paper, pizza box', ja: '汚れた紙', cat: 'combustible', kw: 'pizza box greasy oily dirty paper', clip: ['a greasy pizza box'] },
  { id: 'tissue', en: 'Used tissue / kitchen paper', ja: 'ティッシュ・キッチンペーパー', cat: 'combustible', kw: 'napkin paper towel kitchen towel', clip: ['used crumpled tissue paper'] },
  { id: 'thermal_transfer', en: 'Iron-on transfer paper', ja: '昇華転写紙', cat: 'combustible', kw: 'transfer' },

  // ---------- Fabric ----------
  { id: 'clothes', en: 'Clothes (shirts, sweaters, socks)', ja: '衣類', cat: 'fabric', kw: 'shirt t-shirt sweater jeans pants dress kimono socks', clip: ['a folded t-shirt', 'old clothes', 'a pair of jeans'] },
  { id: 'towel', en: 'Towel / sheet / blanket / curtains', ja: 'タオル・シーツ・毛布', cat: 'fabric', kw: 'bed sheet blanket curtain drape', clip: ['a bath towel', 'a blanket'] },
  { id: 'bag_fabric', en: 'Bag / belt / hat (usable condition)', ja: 'かばん・ベルト・帽子', cat: 'fabric', kw: 'handbag purse backpack belt cap hat', clip: ['a handbag', 'a hat'], note: 'Only if still usable; otherwise Combustible.' },
  { id: 'shoes', en: 'Shoes, sneakers, slippers, boots', ja: '靴・スリッパ', cat: 'combustible', kw: 'shoe sneaker boot sandal slipper', clip: ['a pair of sneakers', 'a pair of shoes'] },
  { id: 'stuffed', en: 'Stuffed toy / cushion / pillow', ja: 'ぬいぐるみ・クッション・枕', cat: 'combustible', kw: 'teddy plush zabuton cushion pillow', clip: ['a stuffed teddy bear', 'a pillow', 'a cushion'], note: 'Under 50 cm. Bigger → Large Waste.' },

  // ---------- Combustible ----------
  { id: 'food', en: 'Food scraps / kitchen waste', ja: '生ごみ', cat: 'combustible', kw: 'leftovers vegetable peel fish bones coffee grounds tea leaves', clip: ['food scraps', 'vegetable peels', 'a banana peel'], note: 'Drain water well.' },
  { id: 'shells', en: 'Egg shells / sea shells / fruit pits', ja: '貝殻・卵の殻・種', cat: 'combustible', kw: 'eggshell seashell clam pit seed', clip: ['broken egg shells', 'sea shells'] },
  { id: 'chopsticks', en: 'Disposable chopsticks / wooden items', ja: '割りばし・木製品', cat: 'combustible', kw: 'wood bamboo skewer toothpick', clip: ['disposable wooden chopsticks'], note: 'Wooden items 50 cm–1 m → Large Waste (paid bag).' },
  { id: 'diaper', en: 'Disposable diapers / pads', ja: '紙おむつ', cat: 'combustible', special: 'diaper', kw: 'nappy diaper incontinence pad', clip: ['a disposable diaper'], note: 'FREE: flush solids, put only diapers in a clear bag (≤45 L) — no paid bag needed. Pet diapers need a paid bag.' },
  { id: 'sanitary', en: 'Sanitary items / bandages / masks', ja: '生理用品・マスク', cat: 'combustible', kw: 'mask plaster bandage cotton swab', clip: ['a used face mask'] },
  { id: 'pet_sheet', en: 'Pet sheets / cat litter', ja: 'ペットシーツ・猫砂', cat: 'combustible', kw: 'cat litter dog pee pad', clip: ['cat litter'] },
  { id: 'foil', en: 'Aluminium foil', ja: 'アルミホイル', cat: 'combustible', kw: 'aluminum foil tin foil', clip: ['crumpled aluminum foil'] },
  { id: 'kairo', en: 'Heat pack (kairo) / ice pack', ja: 'カイロ・保冷剤', cat: 'combustible', kw: 'hand warmer hokkairo cold pack', clip: ['a disposable hand warmer pack', 'a gel ice pack'] },
  { id: 'rubber', en: 'Rubber gloves / rubber items', ja: 'ゴム製品', cat: 'combustible', kw: 'gloves rubber band', clip: ['rubber kitchen gloves'] },
  { id: 'raincoat', en: 'Raincoat / leather gloves / quilted items', ja: 'レインコート・革手袋', cat: 'combustible', kw: 'rain coat gloves' },
  { id: 'cigarette', en: 'Cigarette butts (fully out)', ja: 'たばこの吸い殻', cat: 'combustible', kw: 'cigarette ash tobacco' },
  { id: 'oil_solid', en: 'Solidified cooking oil', ja: '固めた油', cat: 'combustible', kw: 'oil hardened absorbed' },
  { id: 'cat_hair', en: 'Hair, dust, vacuum dust, lint', ja: 'ほこり・髪の毛', cat: 'combustible', kw: 'vacuum dust lint' },
  { id: 'candle', en: 'Candles, wooden toys, small wood', ja: 'ろうそく・木のおもちゃ', cat: 'combustible', kw: 'candle wood toy' },
  { id: 'plastic_dm', en: 'Plastic mailer / laundry bag from cleaner', ja: 'DMのビニール封筒・クリーニング袋', cat: 'combustible', kw: 'direct mail plastic envelope dry cleaning bag', note: 'Plastic that wrapped non-products (mail, laundry) → Combustible.' },

  // ---------- Non-combustible ----------
  { id: 'ceramic', en: 'Ceramic plate / mug / bowl', ja: '陶磁器（皿・茶碗）', cat: 'noncombustible', kw: 'dish plate mug cup bowl pottery porcelain', clip: ['a ceramic plate', 'a ceramic coffee mug'], note: 'If broken → Hazardous (wrap, write KIKEN).' },
  { id: 'glass_cup', en: 'Drinking glass / glassware', ja: 'コップ・ガラス食器', cat: 'noncombustible', kw: 'glass cup tumbler', clip: ['a drinking glass'], note: 'If broken → Hazardous (wrap, write KIKEN).' },
  { id: 'pot', en: 'Pot / frying pan / kettle', ja: '鍋・フライパン・やかん', cat: 'noncombustible', kw: 'saucepan pan kettle wok', clip: ['a metal cooking pot', 'a frying pan', 'a metal kettle'], note: 'Frying pans: tie a paid bag to the handle.' },
  { id: 'cutlery_metal', en: 'Metal cutlery / scissors / metal items', ja: 'スプーン・はさみ・金属製品', cat: 'noncombustible', kw: 'spoon fork scissors metal tool', clip: ['metal spoons and forks', 'scissors'] },
  { id: 'umbrella', en: 'Umbrella', ja: '傘', cat: 'noncombustible', kw: 'parasol', clip: ['an umbrella'], note: 'Wrap a paid bag around it.' },
  { id: 'small_appliance', en: 'Small appliance (hair dryer, toaster, rice cooker)', ja: '小型家電', cat: 'noncombustible', kw: 'electric appliance hairdryer toaster rice cooker iron kettle radio fan',
    clip: ['a hair dryer', 'a toaster', 'an electric rice cooker', 'a clothes iron'], note: 'Remove batteries first. 50 cm or bigger → Large Waste.' },
  { id: 'electric_toy', en: 'Electric / remote-control toy (battery removed)', ja: '電池式のおもちゃ', cat: 'noncombustible', kw: 'remote control toy robot', note: 'Battery → Hazardous. If battery can’t be removed and under 50 cm → Hazardous as is.' },
  { id: 'metal_lid', en: 'Metal bottle lid / crown cap', ja: '金属のふた・王冠', cat: 'noncombustible', kw: 'bottle cap crown cap metal lid jar lid', clip: ['a metal bottle cap'] },
  { id: 'hanger_wire', en: 'Wire / metal hanger', ja: '針金ハンガー', cat: 'noncombustible', kw: 'wire hanger', clip: ['a wire coat hanger'] },
  { id: 'nonfood_can', en: 'Non-food can (empty paint, oil can)', ja: '食品以外の缶', cat: 'noncombustible', kw: 'paint can empty cookie tin tin box', note: 'Paint cans with paint still inside → Large Waste (300 yen).' },
  { id: 'printer', en: 'Printer / scanner / PC peripherals', ja: 'プリンター', cat: 'noncombustible', kw: 'printer scanner keyboard mouse external hard drive cable', clip: ['a computer printer', 'a computer keyboard'], note: 'Bigger than 50 cm → Large Waste.' },
  { id: 'mirror', en: 'Mirror (unbroken)', ja: '鏡', cat: 'noncombustible', kw: 'mirror', note: 'Broken → Hazardous (KIKEN).' },

  // ---------- Hazardous ----------
  { id: 'battery', en: 'Battery – dry cell (AA, AAA, 9V)', ja: '乾電池', cat: 'hazardous', kw: 'battery aa aaa alkaline', clip: ['AA batteries'], note: 'Tape the terminals.' },
  { id: 'coin_battery', en: 'Coin / button battery', ja: 'ボタン電池', cat: 'hazardous', kw: 'cr2032 button cell', clip: ['a coin cell battery'] },
  { id: 'liion', en: 'Rechargeable / lithium-ion battery, power bank', ja: 'リチウムイオン電池・モバイルバッテリー', cat: 'hazardous', kw: 'mobile battery power bank lithium rechargeable', clip: ['a portable power bank'], note: 'Discharge, tape terminals, separate bag from dry cells. Swollen → hand to staff at City Hall.' },
  { id: 'phone', en: 'Smartphone / mobile phone', ja: 'スマートフォン', cat: 'hazardous', kw: 'iphone cell phone mobile', clip: ['a smartphone'], note: 'Erase your data first.' },
  { id: 'small_rechargeable', en: 'Electric toothbrush, shaver, earbuds, smartwatch, handy fan, heated-tobacco device', ja: '電動歯ブラシ・シェーバー・イヤホン', cat: 'hazardous',
    kw: 'airpods earphones earbuds shaver razor smartwatch handy fan iqos vape', clip: ['wireless earbuds', 'an electric toothbrush', 'an electric shaver', 'a smartwatch'] },
  { id: 'spray', en: 'Spray can / aerosol', ja: 'スプレー缶', cat: 'hazardous', kw: 'aerosol hairspray spray paint insect spray', clip: ['an aerosol spray can'], note: 'Use up completely. Still contains liquid → Large Waste (300 yen).' },
  { id: 'gas_cartridge', en: 'Gas cartridge (cassette stove)', ja: 'カセットボンベ', cat: 'hazardous', kw: 'butane gas can camping', clip: ['a butane gas cartridge'], note: 'Use up completely.' },
  { id: 'lighter', en: 'Lighter', ja: 'ライター', cat: 'hazardous', kw: 'lighter zippo bbq', clip: ['a disposable cigarette lighter'] },
  { id: 'bulb', en: 'Light bulb / fluorescent tube', ja: '電球・蛍光管', cat: 'hazardous', kw: 'lamp bulb led fluorescent tube', clip: ['a light bulb', 'a fluorescent light tube'], note: 'In original box or wrapped in paper; write DENKYU / KEIKOKAN.' },
  { id: 'thermometer', en: 'Mercury thermometer / BP monitor', ja: '水銀体温計', cat: 'hazardous', kw: 'mercury thermometer blood pressure', clip: ['a glass thermometer'] },
  { id: 'broken_glass', en: 'Broken glass / ceramics / mirror', ja: '割れたガラス・陶器', cat: 'hazardous', kw: 'broken shattered shards', clip: ['broken glass shards', 'a broken ceramic plate'], note: 'Wrap in newspaper, write KIKEN.' },
  { id: 'knife', en: 'Knife / razor / blades', ja: '包丁・刃物', cat: 'hazardous', kw: 'kitchen knife cutter blade razor', clip: ['a kitchen knife'], note: 'Wrap the blade in paper, write KIKEN.' },

  // ---------- Oil / plant ----------
  { id: 'cooking_oil', en: 'Used cooking oil (liquid)', ja: '使用済み食用油', cat: 'oil', kw: 'tempura frying oil vegetable oil', clip: ['used cooking oil in a bottle'] },
  { id: 'branches', en: 'Tree branches / pruning', ja: '枝', cat: 'plant', kw: 'branch twigs pruning tree bamboo', clip: ['cut tree branches', 'a bundle of twigs'] },
  { id: 'leaves', en: 'Grass / fallen leaves / weeds', ja: '草・落ち葉', cat: 'plant', kw: 'grass leaves weeds lawn', clip: ['a pile of fallen leaves', 'cut grass'] },
  { id: 'flowers', en: 'Cut flowers', ja: '切り花', cat: 'plant', kw: 'bouquet flowers', clip: ['a bouquet of wilted flowers'] },
  { id: 'soil', en: 'Soil / stones / bricks', ja: '土・石・レンガ', cat: 'not_city', kw: 'soil dirt stones rocks bricks concrete tiles sand', clip: ['a pile of soil', 'stones and bricks'] },

  // ---------- Large ----------
  { id: 'furniture', en: 'Furniture (chair, table, shelf)', ja: '家具', cat: 'large', kw: 'chair table shelf desk chest drawer bookcase', clip: ['a wooden chair', 'a table', 'a bookshelf'] },
  { id: 'sofa', en: 'Sofa / bed frame', ja: 'ソファ・ベッド', cat: 'large', kw: 'couch bed', clip: ['a sofa', 'a bed frame'], note: '1,200-yen sticker. Spring mattresses are NOT collected.' },
  { id: 'futon', en: 'Futon / carpet', ja: '布団・カーペット', cat: 'large', kw: 'futon carpet rug duvet', clip: ['a folded futon', 'a rolled carpet'] },
  { id: 'bicycle', en: 'Bicycle', ja: '自転車', cat: 'large', kw: 'bike', clip: ['a bicycle'] },
  { id: 'big_appliance', en: 'Appliance 50 cm+ (microwave, vacuum, heater)', ja: '大型の家電（電子レンジ等）', cat: 'large', kw: 'microwave vacuum cleaner heater stove fan', clip: ['a microwave oven', 'a vacuum cleaner', 'an electric fan'], note: 'If smaller than 50 cm → Non-Combustible. Remove batteries.' },
  { id: 'pole', en: 'Laundry pole / long stick (1 m+)', ja: '物干し竿', cat: 'large', kw: 'pole rod stick', note: '300-yen sticker.' },
  { id: 'paint_full', en: 'Spray/paint can still with contents', ja: '中身の残った缶', cat: 'large', kw: 'paint leftover full can', note: '300-yen sticker (dangerous items).' },

  // ---------- Not collected ----------
  { id: 'tv', en: 'TV', ja: 'テレビ', cat: 'not_city', kw: 'television', clip: ['a flat screen TV'] },
  { id: 'fridge', en: 'Refrigerator / freezer', ja: '冷蔵庫', cat: 'not_city', kw: 'fridge freezer', clip: ['a refrigerator'] },
  { id: 'washer', en: 'Washing machine / clothes dryer', ja: '洗濯機・乾燥機', cat: 'not_city', kw: 'washer dryer laundry machine', clip: ['a washing machine'] },
  { id: 'aircon', en: 'Air conditioner', ja: 'エアコン', cat: 'not_city', kw: 'aircon ac', clip: ['an air conditioner unit'] },
  { id: 'pc', en: 'Computer / laptop / monitor', ja: 'パソコン', cat: 'not_city', kw: 'laptop desktop pc monitor macbook', clip: ['a laptop computer', 'a computer monitor'] },
  { id: 'mattress', en: 'Spring mattress', ja: 'スプリングマットレス', cat: 'not_city', kw: 'mattress spring', clip: ['a mattress'] },
  { id: 'tire', en: 'Tires / car battery / engine oil', ja: 'タイヤ・バッテリー', cat: 'not_city', kw: 'tyre tire car battery engine oil kerosene', clip: ['a car tire'] },
  { id: 'extinguisher', en: 'Fire extinguisher / propane tank', ja: '消火器・プロパンガス', cat: 'not_city', kw: 'extinguisher propane', clip: ['a fire extinguisher'] },
  { id: 'surfboard', en: 'Surfboard / bodyboard', ja: 'サーフボード', cat: 'not_city', kw: 'surf board bodyboard windsurf', clip: ['a surfboard'] },
];

// Collection days by district from April 1, 2026 (pamphlet pages 1–2).
// comb: weekdays for Combustible; paper (= paper & fabric), pet, plant, cans, pcp: weekday;
// md: weekday of the monthly items; nc: nth week for Non-Combustible + Hazardous + Cooking Oil; pg: nth for Plastic Goods.
const D = (name, comb, paper, pet, plant, cans, pcp, md, nc, pg) => ({ name, comb, paper, pet, plant, cans, pcp, md, nc, pg });
export const DISTRICTS = [
  D('Juniso, Jomyoji, Nikaidoh', [1, 4], 2, 3, 3, 5, 5, 2, 1, 3),
  D('Nishi Mikado, Yukinoshita, Ogigayatsu, Komachi, Onarimachi, Sasuke', [1, 4], 2, 3, 3, 5, 5, 2, 2, 4),
  D('Omachi, Zaimokuza', [1, 4], 2, 3, 3, 5, 5, 2, 3, 2),
  D('Yuigahama, Sasamemachi', [1, 4], 5, 3, 3, 2, 2, 5, 2, 4),
  D('Hase, Gokurakuji, Sakanoshita', [2, 5], 1, 3, 1, 4, 4, 3, 1, 3),
  D('Inamuragasaki, Shichirigahama-higashi', [2, 5], 1, 3, 4, 4, 1, 3, 1, 3),
  D('Koshigoe (1–5-chome), Tsu-nishi', [2, 5], 4, 3, 1, 3, 1, 4, 2, 3),
  D('Koshigoe (other), Tsu, Shichirigahama', [2, 5], 4, 3, 1, 3, 1, 4, 3, 1),
  D('Nishi-kamakura, Kamakurayama', [2, 5], 1, 3, 1, 4, 4, 3, 1, 3),
  D('Kajiwara (other than 1–5-chome), Terabun (other than 1–3-chome)', [1, 4], 5, 3, 2, 5, 2, 3, 4, 2),
  D('Kamimachiya, Tebiro', [2, 5], 1, 3, 1, 4, 4, 3, 2, 4),
  D('Fueda, Tokiwa', [2, 5], 1, 3, 1, 4, 4, 3, 3, 1),
  D('Kajiwara (1–5-chome), Terabun (1–3-chome), Yamasaki (Uguisuyama)', [1, 4], 5, 3, 2, 5, 2, 3, 4, 2),
  D('Yamanouchi', [1, 4], 3, 3, 2, 5, 2, 5, 1, 3),
  D('Dai (other than 1–5-chome)', [2, 5], 1, 3, 4, 3, 1, 4, 4, 2),
  D('Kobukuroya', [1, 4], 3, 3, 2, 5, 2, 5, 3, 1),
  D('Yamasaki (other than Uguisuyama), Dai (1–5-chome)', [2, 5], 1, 3, 4, 3, 1, 4, 4, 2),
  D('Ofuna (except 6-chome)', [1, 4], 5, 3, 3, 2, 5, 2, 3, 1),
  D('Takano, Imaizumi, Imaizumi-dai', [1, 4], 5, 3, 3, 2, 5, 2, 4, 2),
  D('Iwase, Ofuna 6-chome', [1, 4], 5, 3, 3, 2, 5, 2, 2, 4),
  D('Okamoto', [2, 5], 3, 3, 1, 1, 4, 4, 1, 4),
  D('Ueki', [2, 5], 3, 3, 1, 1, 4, 4, 2, 4),
  D('Tamanawa, Shiromeguri, Sekiya', [2, 5], 3, 3, 1, 1, 4, 4, 3, 1),
];

// Town names (町名) → district, for "find my district from my address".
// `ro`: romaji spellings. `split`: [from, to, districtIfInRange, districtOtherwise] by chome.
// `ask`: the town is split by an area name the address can't show, so the user picks.
const DN = name => {
  const i = DISTRICTS.findIndex(d => d.name === name);
  if (i < 0) throw new Error('Unknown district ' + name);
  return i;
};
const T = (ja, ro, district, extra = {}) => ({ ja, ro, d: district == null ? null : DN(district), ...extra });
export const TOWNS = [
  T('十二所', ['juniso', 'juunisho', 'junisho', 'juunisou'], 'Juniso, Jomyoji, Nikaidoh'),
  T('浄明寺', ['jomyoji', 'joumyouji', 'jomyouji'], 'Juniso, Jomyoji, Nikaidoh'),
  T('二階堂', ['nikaido', 'nikaidoh', 'nikaidou'], 'Juniso, Jomyoji, Nikaidoh'),
  T('西御門', ['nishimikado'], 'Nishi Mikado, Yukinoshita, Ogigayatsu, Komachi, Onarimachi, Sasuke'),
  T('雪ノ下', ['yukinoshita'], 'Nishi Mikado, Yukinoshita, Ogigayatsu, Komachi, Onarimachi, Sasuke'),
  T('扇ガ谷', ['ogigayatsu', 'ougigayatsu', 'ohgigayatsu'], 'Nishi Mikado, Yukinoshita, Ogigayatsu, Komachi, Onarimachi, Sasuke'),
  T('小町', ['komachi'], 'Nishi Mikado, Yukinoshita, Ogigayatsu, Komachi, Onarimachi, Sasuke'),
  T('御成町', ['onarimachi', 'onaricho', 'onarichou'], 'Nishi Mikado, Yukinoshita, Ogigayatsu, Komachi, Onarimachi, Sasuke'),
  T('佐助', ['sasuke'], 'Nishi Mikado, Yukinoshita, Ogigayatsu, Komachi, Onarimachi, Sasuke'),
  T('大町', ['omachi', 'oomachi', 'ohmachi'], 'Omachi, Zaimokuza'),
  T('材木座', ['zaimokuza'], 'Omachi, Zaimokuza'),
  T('由比ガ浜', ['yuigahama'], 'Yuigahama, Sasamemachi'),
  T('笹目町', ['sasamemachi', 'sasamecho'], 'Yuigahama, Sasamemachi'),
  T('長谷', ['hase'], 'Hase, Gokurakuji, Sakanoshita'),
  T('極楽寺', ['gokurakuji'], 'Hase, Gokurakuji, Sakanoshita'),
  T('坂ノ下', ['sakanoshita'], 'Hase, Gokurakuji, Sakanoshita'),
  T('稲村ガ崎', ['inamuragasaki'], 'Inamuragasaki, Shichirigahama-higashi'),
  T('七里ガ浜東', ['shichirigahamahigashi'], 'Inamuragasaki, Shichirigahama-higashi', { en: 'Shichirigahama-higashi' }),
  T('七里ガ浜', ['shichirigahama'], 'Koshigoe (other), Tsu, Shichirigahama'),
  T('腰越', ['koshigoe'], null, { split: [1, 5, DN('Koshigoe (1–5-chome), Tsu-nishi'), DN('Koshigoe (other), Tsu, Shichirigahama')] }),
  T('津西', ['tsunishi'], 'Koshigoe (1–5-chome), Tsu-nishi', { en: 'Tsu-nishi' }),
  T('津', ['tsu'], 'Koshigoe (other), Tsu, Shichirigahama', { short: true }),
  T('西鎌倉', ['nishikamakura'], 'Nishi-kamakura, Kamakurayama', { en: 'Nishi-kamakura' }),
  T('鎌倉山', ['kamakurayama'], 'Nishi-kamakura, Kamakurayama'),
  T('梶原', ['kajiwara'], null, { split: [1, 5, DN('Kajiwara (1–5-chome), Terabun (1–3-chome), Yamasaki (Uguisuyama)'), DN('Kajiwara (other than 1–5-chome), Terabun (other than 1–3-chome)')] }),
  T('寺分', ['terabun'], null, { split: [1, 3, DN('Kajiwara (1–5-chome), Terabun (1–3-chome), Yamasaki (Uguisuyama)'), DN('Kajiwara (other than 1–5-chome), Terabun (other than 1–3-chome)')] }),
  T('上町屋', ['kamimachiya'], 'Kamimachiya, Tebiro'),
  T('手広', ['tebiro'], 'Kamimachiya, Tebiro'),
  T('笛田', ['fueda'], 'Fueda, Tokiwa'),
  T('常盤', ['tokiwa'], 'Fueda, Tokiwa'),
  T('山崎', ['yamasaki', 'yamazaki'], null, {
    ask: 'Is your home in the Uguisuyama area of Yamasaki?',
    choices: [['Yes, Uguisuyama', DN('Kajiwara (1–5-chome), Terabun (1–3-chome), Yamasaki (Uguisuyama)')], ['No, other Yamasaki', DN('Yamasaki (other than Uguisuyama), Dai (1–5-chome)')]],
    hint: ['uguisu', '鶯'],
  }),
  T('山ノ内', ['yamanouchi', 'yamanoushi'], 'Yamanouchi'),
  T('台', ['dai'], null, { short: true, split: [1, 5, DN('Yamasaki (other than Uguisuyama), Dai (1–5-chome)'), DN('Dai (other than 1–5-chome)')] }),
  T('小袋谷', ['kobukuroya'], 'Kobukuroya'),
  T('大船', ['ofuna', 'oofuna', 'ohfuna'], null, { split: [6, 6, DN('Iwase, Ofuna 6-chome'), DN('Ofuna (except 6-chome)')] }),
  T('高野', ['takano'], 'Takano, Imaizumi, Imaizumi-dai'),
  T('今泉台', ['imaizumidai'], 'Takano, Imaizumi, Imaizumi-dai', { en: 'Imaizumi-dai' }),
  T('今泉', ['imaizumi'], 'Takano, Imaizumi, Imaizumi-dai'),
  T('岩瀬', ['iwase'], 'Iwase, Ofuna 6-chome'),
  T('岡本', ['okamoto'], 'Okamoto'),
  T('植木', ['ueki'], 'Ueki'),
  T('玉縄', ['tamanawa'], 'Tamanawa, Shiromeguri, Sekiya'),
  T('城廻', ['shiromeguri'], 'Tamanawa, Shiromeguri, Sekiya'),
  T('関谷', ['sekiya'], 'Tamanawa, Shiromeguri, Sekiya'),
];

export const CONTACTS = [
  ['Sorting questions (Resource Management Div.)', '0467-61-3396'],
  ['Large waste reservations / clean stations (Environment Center)', '0467-53-8321'],
  ['Door-to-door combustible collection (missed pickup after 15:30)', '0467-40-5542'],
  ['Plant Trimming Acceptance Site, Sekiya', '0467-45-0526'],
  ['Home Appliance Recycling coupon center', '0120-319640'],
  ['PC recycling (RenetJapanRecycle)', '0570-085-800'],
];
