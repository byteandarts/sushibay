// ===== Internationalization (i18n) =====
const translations = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_menu: 'Menu',
    nav_experience: 'Experience',
    nav_craft: 'The Craft',
    nav_sushi_bay: 'Sushi Bay',
    nav_cafe_supreme: 'Café Supreme',
    nav_our_story: 'Our Story',
    nav_locations: 'Locations',
    nav_contact: 'Contact',
    nav_order: 'Order',
    nav_order_now: 'Order Now',

    // Hero - Café
    hero_cafe_tag: 'The Good Living',
    hero_cafe_title_1: 'Start Your Day',
    hero_cafe_title_2: 'Supreme',
    hero_cafe_desc:
      'Premium coffee, hearty breakfasts, and international mains crafted with love. Life is too short for bad coffee or average meals.',
    hero_view_menu: 'View Menu',
    hero_order_online: 'Order Online',

    // Hero - Sushi
    hero_sushi_tag: 'Premium Japanese Cuisine',
    hero_sushi_title_1: 'Freshly Rolled',
    hero_sushi_title_2: 'Artfully Crafted',
    hero_sushi_desc:
      'Experience the delicate balance of traditional techniques and modern flavors. Premium ingredients, masterfully crafted for an unforgettable journey.',

    // Sections
    section_highlights: 'Signature Highlights',
    section_highlights_title: "What We're Known For",
    section_highlights_desc:
      'From our legendary Molten Cake to the perfect Spanish Latte, discover what makes Café Supreme unforgettable.',
    section_full_menu: 'Full Menu',
    section_cafe_menu_title: 'The Café Supreme Menu',
    section_cafe_menu_desc:
      'From breakfast to dessert, every dish is made with care and served with love.',
    section_sushi_menu_title: 'The Sushi Bay Menu',
    section_sushi_menu_desc:
      'From classic nigiri to creative signature rolls — every piece tells a story of freshness and craft.',
    section_experience_title: 'The Good Living Philosophy',
    section_craft_title: 'Tradition Meets Modernity',
    section_gallery: 'Gallery',
    section_cafe_gallery_title: 'Inside Café Supreme',
    section_sushi_gallery_title: 'The Art of Sushi',

    // Features
    feature_coffee_title: 'Premium Coffee',
    feature_coffee_desc:
      'From classic Espresso to our signature Spanish Latte — every cup is crafted from premium beans.',
    feature_breakfast_title: 'All-Day Breakfast',
    feature_breakfast_desc:
      'Egg Pie, Classic Omelette, Salmon on Loaf — our breakfast menu serves comfort any hour of the day.',
    feature_desserts_title: 'Irresistible Desserts',
    feature_desserts_desc:
      'Our legendary Molten Cake, Lotus Carrot Cake, and handcrafted Waffles — the perfect sweet ending.',
    feature_rolls_title: 'Signature Rolls',
    feature_rolls_desc:
      'From the Crispy Ura Maki to the Dynamite Roll — each piece is a canvas of flavor and texture.',
    feature_fried_title: 'New Fried Rolls',
    feature_fried_desc:
      'Panko-crusted perfection — our Hot Lemon, Fried California, and Lava Cheese rolls are game-changers.',
    feature_platters_title: 'Party Platters',
    feature_platters_desc:
      '12pc to 60pc combos — perfect for gatherings, catering, and unforgettable celebrations.',

    // Switch banner
    switch_cafe_title: 'Craving Something Different?',
    switch_cafe_desc:
      'Try our Sushi Bay for fresh Japanese cuisine — right under the same roof.',
    switch_cafe_btn: 'Explore Sushi Bay',
    switch_sushi_title: 'In the Mood for Something Warm?',
    switch_sushi_desc:
      'Explore Café Supreme for premium coffee, breakfast, and international mains.',
    switch_sushi_btn: 'Explore Café Supreme',

    // CTA
    cta_cafe_title: 'Ready for the Good Living?',
    cta_cafe_desc:
      'Order your favorites online or visit us at any of our locations. The perfect meal is waiting.',
    cta_sushi_title: 'Ready to Taste the Ocean?',
    cta_sushi_desc:
      'Order your favorites online or visit us. Freshness is always just a roll away.',
    cta_order_online: 'Order Online',
    cta_find_us: 'Find Us',

    // Locations
    loc_find_us: 'Find Us',
    loc_title: 'Our Locations',
    loc_subtitle:
      'Visit us at any of our branches. Some locations feature both Café Supreme and Sushi Bay — the ultimate dining destination.',
    loc_main_branch: 'Main Branch',
    loc_gezerat_branch: 'Gezerat El Ward Branch',
    loc_main_address: 'Mansoura, Egypt',
    loc_gezerat_name: 'Gezerat El Ward Club',
    loc_gezerat_address: 'Gezerat El Ward Club, Mansoura',
    loc_hours_main: 'Open Daily: 8:00 AM – 2:00 AM',
    loc_hours_gezerat: 'Open Daily: 9:00 AM – 1:00 AM',
    loc_both_available: 'Both menus available',
    badge_both_menus: 'Café Supreme + Sushi Bay',
    loc_cant_make_it: "Can't Make It to Us?",
    loc_cant_make_it_desc:
      'Order online for delivery or pickup. Mix and match from both Café Supreme and Sushi Bay.',

    // Contact
    contact_title: 'Contact & Feedback',
    contact_subtitle:
      "Whether it's a catering request, corporate event, or career inquiry — we'd love to hear from you.",
    contact_send_message: 'Send Us a Message',
    contact_quick: 'Quick Contact',
    contact_name: 'Full Name',
    contact_email: 'Email',
    contact_phone: 'Phone',
    contact_subject: 'Subject',
    contact_message: 'Message',
    contact_send_btn: 'Send Message',
    contact_call_us: 'Call Us',
    contact_available: 'Available daily',
    contact_hours_title: 'Opening Hours',
    contact_hours_value: 'Daily: 8:00 AM – 2:00 AM',
    contact_locations_title: 'Locations',
    contact_locations_value: 'Main Branch · Gezerat El Ward Club',
    contact_careers_title: 'Career Opportunities',
    contact_careers_desc:
      "We're always looking for talented people to join our team. Whether you're a passionate barista, skilled sushi chef, or hospitality professional — we'd love to meet you.",

    // Story
    story_title: 'Two Worlds. One Table.',
    story_subtitle:
      'At Café Supreme & Sushi Bay, we believe you shouldn\'t have to compromise when it comes to good food. What started as a passion for the "Good Living" lifestyle has evolved into a unique dining destination where East meets West.',
    story_how_we_began: 'How We Began',
    story_east_meets_west: 'East Meets West',
    story_combined_desc_1:
      "We recognized that the best moments happen when friends and families gather, but we also know that cravings are unique. That's why we brought two distinct culinary worlds together under one roof.",
    story_combined_desc_2:
      'Whether you are craving the comfort of a gourmet burger and a hot latte, or the fresh snap of artisan sushi, we have a seat waiting for you.',

    // Splash
    cafe_name: 'Café Supreme',
    sushi_name: 'Sushi Bay',
    splash_cafe_desc:
      'The Good Living — Premium coffee, hearty breakfasts, and international mains crafted with love.',
    splash_sushi_desc:
      'Freshly Rolled. Artfully Crafted — Creative sushi and Japanese cuisine made from the freshest catch.',
    splash_cafe_subtitle:
      'The Good Living — Premium coffee, hearty breakfasts, and international mains crafted with love.',
    splash_sushi_subtitle:
      'Freshly Rolled. Artfully Crafted — Creative sushi and Japanese cuisine made from the freshest catch.',
    splash_enter_cafe: 'Enter Good Living',
    splash_enter_sushi: 'Enter Sushi Bay',
    splash_tagline: '"Two Great Tastes, One Location."',
    splash_find_branch: 'Find Nearest Branch',

    // Footer
    footer_our_story: 'Our Story',
    footer_locations: 'Locations',
    footer_contact: 'Contact',
    footer_instagram: 'Instagram',
    footer_copyright: '© 2026 Café Supreme & Sushi Bay.',

    // Menu
    menu_loading: 'Loading menu...',

    // Coming soon
    coming_soon: 'Coming Soon',

    // Story page specific
    story_how_began: 'How We Began',
    story_east_west: 'East Meets West',
    story_cafe_story: 'The Café Supreme Story',
    story_good_living_quote: '"The Good Living"',
    story_cafe_desc_1:
      'Café Supreme was born out of a simple desire: to create a space that feels like a second home. We operate on the philosophy of "Good Living" — the idea that life is too short for bad coffee or average meals.',
    story_cafe_desc_2:
      'From our signature Spanish Latte to our legendary Molten Cake, every item on our menu is crafted to bring you comfort. We are more than just a coffee shop; we are a destination for hearty breakfasts, international main courses, and the perfect environment to work, relax, or catch up with old friends.',
    story_cafe_desc_3: 'When you are with us, you are family.',
    story_cafe_promise:
      'Our Promise: Premium beans, home-style recipes, and an atmosphere that invites you to stay a while.',
    story_sushi_story: 'The Sushi Bay Story',
    story_freshness_quote: '"Freshness Rolled Daily"',
    story_sushi_desc_1:
      'Sushi Bay adds a different flavor to our story — one defined by precision, freshness, and creativity. We saw a need for high-quality Japanese cuisine that is both authentic and accessible.',
    story_sushi_desc_2:
      "Our chefs treat every roll as a canvas. Whether it's the crunch of our Fried Rolls or the delicate balance of our Sashimi Platters, we prioritize ingredients that are sourced fresh and prepared with skill.",
    story_sushi_desc_3:
      'We bring the vibrant energy of Asian fusion dining to your table, offering a lighter, zestier counterpart to your dining experience.',
    story_sushi_promise:
      'Our Promise: Catch-of-the-day freshness, artistic presentation, and bold flavors that excite the palate.',
    story_better_together: 'Why We Are Better Together',
    story_better_desc_1:
      'Have you ever tried to plan a dinner where one person wants pizza and the other wants sushi? We solved that.',
    story_better_desc_2:
      'By uniting Café Supreme and Sushi Bay, we offer the ultimate dining freedom. You can enjoy a Supreme Club Sandwich while your partner enjoys a Spicy Lemon Roll, and you can both split a Molten Cake for dessert.',
    story_tagline: 'Diverse Tastes. Unified Quality. Unforgettable Memories.',
    story_cta_title: 'Come Experience It Yourself',
    story_cta_desc:
      'Visit any of our locations or order online. Your table is waiting.',
    story_explore_cafe: 'Explore Café Supreme',
    story_explore_sushi: 'Explore Sushi Bay',

    // Contact page
    contact_get_in_touch: 'Get In Touch',
    contact_form_name_placeholder: 'Your name',
    contact_form_email_placeholder: 'your@email.com',
    contact_form_phone_placeholder: '+20 xxx xxx xxxx',
    contact_form_subject_placeholder: 'Select a topic...',
    contact_form_subject_general: 'General Inquiry',
    contact_form_subject_catering_wedding: 'Catering Request — Wedding',
    contact_form_subject_catering_corporate:
      'Catering Request — Corporate Event',
    contact_form_subject_catering_party: 'Catering Request — Private Party',
    contact_form_subject_feedback: 'Feedback',
    contact_form_subject_partnership: 'Partnership Opportunity',
    contact_form_subject_career: 'Career Application',
    contact_form_subject_other: 'Other',
    contact_form_message_placeholder: 'Tell us more...',
    contact_email_label: 'Email',
    contact_email_value: 'info@cafesupreme.com',
    contact_thank_you:
      'Thank you! Your message has been sent. We will get back to you shortly.',
    contact_career_barista: 'Barista',
    contact_career_chef: 'Kitchen Chef',
    contact_career_sushi_chef: 'Sushi Chef',
    contact_career_server: 'Server',
    contact_career_manager: 'Manager',

    // Cafe page specific
    cafe_hero_desc_full:
      'Premium coffee, hearty breakfasts, and international mains crafted with love. Life is too short for bad coffee or average meals.',
    cafe_experience_desc_1:
      'At Café Supreme, we believe that life is too short for bad coffee or average meals. Our "Good Living" philosophy is about creating a space that feels like a second home.',
    cafe_experience_desc_2:
      "From the warm lighting to the plush seating, every detail is designed to invite you to stay awhile. Whether you're here for a quick espresso or a long brunch with friends, you're part of our family.",
    cafe_read_full_story: 'Read Our Full Story',

    // Sushi page specific
    sushi_hero_desc_full:
      'Experience the delicate balance of traditional techniques and modern flavors. Premium ingredients, masterfully crafted for an unforgettable journey.',
    sushi_craft_desc_1:
      'At Sushi Bay, we believe that sushi is more than just food; it is an art form that demands patience, precision, and respect for nature.',
    sushi_craft_desc_2:
      "Our chefs treat every roll as a canvas. Whether it's the crunch of our Fried Rolls or the delicate balance of our Sashimi Platters, we prioritize ingredients that are sourced fresh and prepared with skill.",
    sushi_craft_desc_3:
      'Every morning begins with selecting the freshest fish, and every plate is crafted to deliver bold, unforgettable flavors.',
    sushi_specials_tag: 'Culinary Masterpieces',
    sushi_specials_title: "Chef's Specials",
    sushi_specials_desc:
      'Selected daily by our head chef, featuring the freshest catch and most creative rolls.',

    // Common page elements
    your_order: 'Your Order',
    total: 'Total',
    proceed_checkout: 'Proceed to Checkout',
    contact_us_link: 'Contact Us',
    cafe_link: 'Café',
    sushi_link: 'Sushi',
    home_link: 'Home',

    // Locations specific
    loc_find_us_tag: 'Find Us',
  },
  ar: {
    // Navigation
    nav_home: 'الرئيسية',
    nav_menu: 'القائمة',
    nav_experience: 'التجربة',
    nav_craft: 'الفن',
    nav_sushi_bay: 'سوشي باي',
    nav_cafe_supreme: 'كافيه سوبريم',
    nav_our_story: 'قصتنا',
    nav_locations: 'الفروع',
    nav_contact: 'تواصل معنا',
    nav_order: 'اطلب',
    nav_order_now: 'اطلب الآن',

    // Hero - Café
    hero_cafe_tag: 'الحياة الجميلة',
    hero_cafe_title_1: 'ابدأ يومك',
    hero_cafe_title_2: 'بتميز',
    hero_cafe_desc:
      'قهوة فاخرة، إفطار شهي، وأطباق عالمية محضّرة بحب. الحياة أقصر من أن تُمضيها مع قهوة سيئة أو وجبات عادية.',
    hero_view_menu: 'عرض القائمة',
    hero_order_online: 'اطلب أونلاين',

    // Hero - Sushi
    hero_sushi_tag: 'المطبخ الياباني الفاخر',
    hero_sushi_title_1: 'طازج ملفوف.',
    hero_sushi_title_2: 'مصنوع بإتقان.',
    hero_sushi_desc:
      'اختبر التوازن الدقيق بين التقنيات التقليدية والنكهات العصرية. مكونات فاخرة محضّرة بمهارة لرحلة لا تُنسى.',

    // Sections
    section_highlights: 'أبرز الأطباق',
    section_highlights_title: 'ما نشتهر به',
    section_highlights_desc:
      'من كيكة المولتن الأسطورية إلى اللاتيه الإسباني المثالي، اكتشف ما يجعل كافيه سوبريم لا يُنسى.',
    section_full_menu: 'القائمة الكاملة',
    section_cafe_menu_title: 'قائمة كافيه سوبريم',
    section_cafe_menu_desc:
      'من الإفطار إلى الحلويات، كل طبق محضّر بعناية ويُقدّم بحب.',
    section_sushi_menu_title: 'قائمة سوشي باي',
    section_sushi_menu_desc:
      'من النيغيري الكلاسيكي إلى اللفائف المميزة — كل قطعة تروي قصة من الطزاجة والإتقان.',
    section_experience_title: 'فلسفة الحياة الجميلة',
    section_craft_title: 'التقاليد تلتقي بالحداثة',
    section_gallery: 'معرض الصور',
    section_cafe_gallery_title: 'داخل كافيه سوبريم',
    section_sushi_gallery_title: 'فن السوشي',

    // Features
    feature_coffee_title: 'قهوة فاخرة',
    feature_coffee_desc:
      'من الإسبريسو الكلاسيكي إلى اللاتيه الإسباني المميز — كل كوب مصنوع من أجود أنواع البن.',
    feature_breakfast_title: 'إفطار طوال اليوم',
    feature_breakfast_desc:
      'فطيرة البيض، الأومليت الكلاسيكي، السلمون على التوست — قائمة إفطارنا تقدم الراحة في أي وقت.',
    feature_desserts_title: 'حلويات لا تُقاوم',
    feature_desserts_desc:
      'كيكة المولتن الأسطورية، كيكة الجزر باللوتس، والوافل المصنوع يدوياً — النهاية الحلوة المثالية.',
    feature_rolls_title: 'لفائف مميزة',
    feature_rolls_desc:
      'من أورا ماكي المقرمش إلى لفة الديناميت — كل قطعة لوحة فنية من النكهة والقوام.',
    feature_fried_title: 'لفائف مقلية جديدة',
    feature_fried_desc:
      'كمال البانكو المقرمش — لفائف الليمون الحار وكاليفورنيا المقلية ولافا تشيز تغيّر قواعد اللعبة.',
    feature_platters_title: 'أطباق للحفلات',
    feature_platters_desc:
      'من ١٢ إلى ٦٠ قطعة — مثالية للتجمعات والمناسبات والاحتفالات التي لا تُنسى.',

    // Switch banner
    switch_cafe_title: 'تشتهي شيئاً مختلفاً؟',
    switch_cafe_desc:
      'جرّب سوشي باي للمأكولات اليابانية الطازجة — تحت نفس السقف.',
    switch_cafe_btn: 'اكتشف سوشي باي',
    switch_sushi_title: 'في مزاج لشيء دافئ؟',
    switch_sushi_desc:
      'اكتشف كافيه سوبريم للقهوة الفاخرة والإفطار والأطباق العالمية.',
    switch_sushi_btn: 'اكتشف كافيه سوبريم',

    // CTA
    cta_cafe_title: 'جاهز للحياة الجميلة؟',
    cta_cafe_desc:
      'اطلب المفضل لديك أونلاين أو زرنا في أي من فروعنا. الوجبة المثالية بانتظارك.',
    cta_sushi_title: 'جاهز لتذوق المحيط؟',
    cta_sushi_desc:
      'اطلب المفضل لديك أونلاين أو زرنا. الطزاجة دائماً على بُعد لفة.',
    cta_order_online: 'اطلب أونلاين',
    cta_find_us: 'جِدنا',

    // Locations
    loc_find_us: 'جِدنا',
    loc_title: 'فروعنا',
    loc_subtitle:
      'زرنا في أي من فروعنا. بعض الفروع تقدم كافيه سوبريم وسوشي باي معاً — الوجهة المثالية للطعام.',
    loc_main_branch: 'الفرع الرئيسي',
    loc_gezerat_branch: 'فرع جزيرة الورد',
    loc_main_address: 'المنصورة، مصر',
    loc_gezerat_name: 'نادي جزيرة الورد',
    loc_gezerat_address: 'نادي جزيرة الورد، المنصورة',
    loc_hours_main: 'يومياً: ٨ صباحاً – ٢ صباحاً',
    loc_hours_gezerat: 'يومياً: ٩ صباحاً – ١ صباحاً',
    loc_both_available: 'القائمتان متاحتان',
    badge_both_menus: 'كافيه سوبريم + سوشي باي',
    loc_cant_make_it: 'لا تستطيع القدوم إلينا؟',
    loc_cant_make_it_desc:
      'اطلب أونلاين للتوصيل أو الاستلام. امزج بين كافيه سوبريم وسوشي باي.',

    // Contact
    contact_title: 'تواصل معنا',
    contact_subtitle:
      'سواء كان طلب تموين، حدث للشركات، أو استفسار وظيفي — يسعدنا سماعك.',
    contact_send_message: 'أرسل لنا رسالة',
    contact_quick: 'تواصل سريع',
    contact_name: 'الاسم الكامل',
    contact_email: 'البريد الإلكتروني',
    contact_phone: 'الهاتف',
    contact_subject: 'الموضوع',
    contact_message: 'الرسالة',
    contact_send_btn: 'إرسال الرسالة',
    contact_call_us: 'اتصل بنا',
    contact_available: 'متاح يومياً',
    contact_hours_title: 'ساعات العمل',
    contact_hours_value: 'يومياً: ٨ صباحاً – ٢ صباحاً',
    contact_locations_title: 'الفروع',
    contact_locations_value: 'الفرع الرئيسي · نادي جزيرة الورد',
    contact_careers_title: 'فرص العمل',
    contact_careers_desc:
      'نبحث دائماً عن أشخاص موهوبين للانضمام لفريقنا. سواء كنت باريستا شغوفاً، شيف سوشي ماهراً، أو محترف ضيافة — نتطلع للقائك.',

    // Story
    story_title: 'عالمان. طاولة واحدة.',
    story_subtitle:
      'في كافيه سوبريم وسوشي باي، نؤمن أنك لا يجب أن تتنازل عن الطعام الجيد. ما بدأ كشغف بأسلوب "الحياة الجميلة" تطور إلى وجهة طعام فريدة حيث يلتقي الشرق بالغرب.',
    story_how_we_began: 'كيف بدأنا',
    story_east_meets_west: 'الشرق يلتقي بالغرب',
    story_combined_desc_1:
      'أدركنا أن أفضل اللحظات تحدث عندما يجتمع الأصدقاء والعائلات، لكننا نعلم أيضاً أن الرغبات مختلفة. لهذا جمعنا عالمين طهي مختلفين تحت سقف واحد.',
    story_combined_desc_2:
      'سواء كنت تشتهي راحة برجر ذواقة ولاتيه ساخن، أو طزاجة سوشي حرفي، لدينا مقعد ينتظرك.',

    // Splash
    cafe_name: 'كافيه سوبريم',
    sushi_name: 'سوشي باي',
    splash_cafe_desc:
      'الحياة الجميلة — قهوة فاخرة، إفطار شهي، وأطباق عالمية محضّرة بحب.',
    splash_sushi_desc:
      'طازج ملفوف. مصنوع بإتقان — سوشي إبداعي ومأكولات يابانية من أطزج المصيد.',
    splash_cafe_subtitle:
      'الحياة الجميلة — قهوة فاخرة، إفطار شهي، وأطباق عالمية محضّرة بحب.',
    splash_sushi_subtitle:
      'طازج ملفوف. مصنوع بإتقان — سوشي إبداعي ومأكولات يابانية من أطزج المصيد.',
    splash_enter_cafe: 'ادخل الحياة الجميلة',
    splash_enter_sushi: 'ادخل سوشي باي',
    splash_tagline: '"طعمان رائعان، مكان واحد."',
    splash_find_branch: 'جِد أقرب فرع',

    // Footer
    footer_our_story: 'قصتنا',
    footer_locations: 'الفروع',
    footer_contact: 'تواصل معنا',
    footer_instagram: 'انستغرام',
    footer_copyright: '© ٢٠٢٦ كافيه سوبريم وسوشي باي.',

    // Menu
    menu_loading: 'جاري تحميل القائمة...',

    // Coming soon
    coming_soon: 'قريباً',

    // Story page specific
    story_how_began: 'كيف بدأنا',
    story_east_west: 'الشرق يلتقي بالغرب',
    story_cafe_story: 'قصة كافيه سوبريم',
    story_good_living_quote: '"الحياة الجميلة"',
    story_cafe_desc_1:
      'وُلد كافيه سوبريم من رغبة بسيطة: إنشاء مكان يبدو كمنزل ثانٍ. نحن نعمل بفلسفة "الحياة الجميلة" — فكرة أن الحياة أقصر من أن تمضيها مع قهوة سيئة أو وجبات عادية.',
    story_cafe_desc_2:
      'من اللاتيه الإسباني المميز إلى كيكة المولتن الأسطورية، كل عنصر في قائمتنا مصنوع لجلب الراحة لك. نحن أكثر من مجرد مقهى؛ نحن وجهة للفطور الشهي، الأطباق العالمية، والبيئة المثالية للعمل أو الاسترخاء أو اللقاء مع الأصدقاء.',
    story_cafe_desc_3: 'عندما تكون معنا، أنت من العائلة.',
    story_cafe_promise:
      'وعدنا: أجود أنواع البن، وصفات منزلية، وجو يدعوك للبقاء قليلاً.',
    story_sushi_story: 'قصة سوشي باي',
    story_freshness_quote: '"طازج ملفوف يومياً"',
    story_sushi_desc_1:
      'يضيف سوشي باي نكهة مختلفة لقصتنا — واحدة محددة بالدقة والطزاجة والإبداع. رأينا الحاجة لمأكولات يابانية عالية الجودة أصيلة ومتاحة.',
    story_sushi_desc_2:
      'يعامل طهاتنا كل لفة كلوحة فنية. سواء كانت قرمشة لفائفنا المقلية أو التوازن الدقيق لأطباق الساشيمي، نعطي الأولوية للمكونات الطازجة المحضرة بمهارة.',
    story_sushi_desc_3:
      'نجلب الطاقة النابضة لتناول الطعام الآسيوي إلى طاولتك، مقدمين نظيراً أخف وأكثر نكهة لتجربة تناول الطعام.',
    story_sushi_promise:
      'وعدنا: طزاجة صيد اليوم، عرض فني، ونكهات جريئة تثير الحواس.',
    story_better_together: 'لماذا نحن أفضل معاً',
    story_better_desc_1:
      'هل حاولت يوماً التخطيط لعشاء حيث يريد شخص بيتزا والآخر يريد سوشي؟ لقد حللنا ذلك.',
    story_better_desc_2:
      'بتوحيد كافيه سوبريم وسوشي باي، نقدم حرية الطعام المطلقة. يمكنك الاستمتاع بساندوتش كلوب بينما يستمتع شريكك بلفة ليمون حارة، ويمكنكما مشاركة كيكة مولتن للتحلية.',
    story_tagline: 'أذواق متنوعة. جودة موحدة. ذكريات لا تُنسى.',
    story_cta_title: 'تعال واختبرها بنفسك',
    story_cta_desc: 'زر أي من فروعنا أو اطلب أونلاين. طاولتك بانتظارك.',
    story_explore_cafe: 'اكتشف كافيه سوبريم',
    story_explore_sushi: 'اكتشف سوشي باي',

    // Contact page
    contact_get_in_touch: 'تواصل معنا',
    contact_form_name_placeholder: 'اسمك',
    contact_form_email_placeholder: 'بريدك@الإلكتروني.com',
    contact_form_phone_placeholder: '+20 xxx xxx xxxx',
    contact_form_subject_placeholder: 'اختر موضوعاً...',
    contact_form_subject_general: 'استفسار عام',
    contact_form_subject_catering_wedding: 'طلب تموين — زفاف',
    contact_form_subject_catering_corporate: 'طلب تموين — حدث شركات',
    contact_form_subject_catering_party: 'طلب تموين — حفلة خاصة',
    contact_form_subject_feedback: 'تعليقات',
    contact_form_subject_partnership: 'فرصة شراكة',
    contact_form_subject_career: 'طلب وظيفة',
    contact_form_subject_other: 'أخرى',
    contact_form_message_placeholder: 'أخبرنا المزيد...',
    contact_email_label: 'البريد الإلكتروني',
    contact_email_value: 'info@cafesupreme.com',
    contact_thank_you: 'شكراً لك! تم إرسال رسالتك. سنعود إليك قريباً.',
    contact_career_barista: 'باريستا',
    contact_career_chef: 'شيف مطبخ',
    contact_career_sushi_chef: 'شيف سوشي',
    contact_career_server: 'نادل',
    contact_career_manager: 'مدير',

    // Cafe page specific
    cafe_hero_desc_full:
      'قهوة فاخرة، إفطار شهي، وأطباق عالمية محضّرة بحب. الحياة أقصر من أن تُمضيها مع قهوة سيئة أو وجبات عادية.',
    cafe_experience_desc_1:
      'في كافيه سوبريم، نؤمن أن الحياة أقصر من أن تُمضيها مع قهوة سيئة أو وجبات عادية. فلسفة "الحياة الجميلة" هي إنشاء مكان يبدو كمنزل ثانٍ.',
    cafe_experience_desc_2:
      'من الإضاءة الدافئة إلى المقاعد المريحة، كل تفصيل مصمم لدعوتك للبقاء قليلاً. سواء كنت هنا لإسبريسو سريع أو فطور طويل مع الأصدقاء، أنت جزء من عائلتنا.',
    cafe_read_full_story: 'اقرأ قصتنا الكاملة',

    // Sushi page specific
    sushi_hero_desc_full:
      'اختبر التوازن الدقيق بين التقنيات التقليدية والنكهات العصرية. مكونات فاخرة محضّرة بمهارة لرحلة لا تُنسى.',
    sushi_craft_desc_1:
      'في سوشي باي، نؤمن أن السوشي أكثر من مجرد طعام؛ إنه شكل فني يتطلب الصبر والدقة واحترام الطبيعة.',
    sushi_craft_desc_2:
      'يعامل طهاتنا كل لفة كلوحة فنية. سواء كانت قرمشة لفائفنا المقلية أو التوازن الدقيق لأطباق الساشيمي، نعطي الأولوية للمكونات الطازجة المحضرة بمهارة.',
    sushi_craft_desc_3:
      'كل صباح يبدأ باختيار أطزج الأسماك، وكل طبق مصنوع لتقديم نكهات جريئة لا تُنسى.',
    sushi_specials_tag: 'روائع طهي',
    sushi_specials_title: 'أطباق الشيف المميزة',
    sushi_specials_desc:
      'يتم اختيارها يومياً من قبل الشيف الرئيسي، تضم أطزج المصيد وأكثر اللفائف إبداعاً.',

    // Common page elements
    your_order: 'طلبك',
    total: 'الإجمالي',
    proceed_checkout: 'متابعة الدفع',
    contact_us_link: 'تواصل معنا',
    cafe_link: 'كافيه',
    sushi_link: 'سوشي',
    home_link: 'الرئيسية',

    // Locations specific
    loc_find_us_tag: 'جِدنا',
  },
};

// Current language
let currentLang = localStorage.getItem('lang') || 'en';

// Apply translations
function applyTranslations(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  const t = translations[lang];
  if (!t) return;

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Update data-coming-soon attributes
  document.querySelectorAll('[data-coming-soon]').forEach((el) => {
    el.setAttribute('data-coming-soon', t.coming_soon || 'Coming Soon');
  });

  // Update HTML direction
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Update lang switcher button text
  const langBtn = document.querySelector('.lang-btn-text');
  if (langBtn) {
    langBtn.textContent = lang === 'ar' ? 'EN' : 'ع';
  }
}

// Toggle language
function toggleLanguage() {
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  applyTranslations(newLang);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
});
