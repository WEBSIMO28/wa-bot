// badwords.js — WhatsApp moderation list
// Compatible exports: badWords, checkText, normalizeWord, stripDiacritics
// Languages: Moroccan Darija, Arabic, Arabizi and French (plus common English terms).

const badWords = new Set([
  // Darija / Arabizi: common spellings; regional variants are not exhaustive
  'zbi','zebi','zebbi','zeb','zbel','9awed','t9awed','t9awad','t9wd','sir t9awed','sir t9awad','sir t9wd',
  'm9awed','mqawed','mkawed','m9awda','l9e7ba','l9ahba','9e7ba','9ahba','9a7ba','kahba','qahba',
  'weld l97ba','weld l9e7ba','weld l9ahba','bent l97ba','bent l9e7ba','bent l9ahba','weld l7ram','bent l7ram',
  'nik','tnik','nikek','nikmok','nik mok','nik omek','nik omk','nik bok','mnayek','mneyek','zamel','zaml',
  '7mar','7mara','7mir','hmar','hmara','hmir','bhim','bhima','kelb','kalb','klab','weld lkelb','bent lkelb',
  'mskhot','msekh','mkhanez','khanez','m3affan','m3fen','m3فن','m7enzer','9lil l7ya','9lil l7ia',
  'din mok','din bouk','y3el din mok','y3el din bouk','lah yel3an','7achak',
  'chermouta','charmouta','charmout','9e7ba','l9e7ba','l9ahba','m9e7eb',

  // Arabic script: insults and profanity
  'قحبة','قحبه','كحبة','كحبه','شرموطة','شرموطه','زبي','زب','كس','كسي','كسك','كسمك','طيز',
  'منيوك','منيوكة','نيك','نيكك','نيك أمك','نيك امك','يلعن أبوك','يلعن ابوك','يلعن أمك','يلعن امك',
  'ابن القحبة','ابن القحبه','ابن الكلب','بنت الكلب','ابن الحرام','بنت الحرام','حمار','حمارة','حيوان',
  'كلب','كلبة','خنزير','وسخ','قذر','حقير','تافه','منحط','سافل','عرص','خول','لوطي','متناك','متناكة',
  'زفت','يلعن دينك','يلعن شكلك','لعنة الله عليك','يا ابن الكلب','يا ابن الحرام','يا قحبة','يا شرموطة',

  // French
  'connard','connasse','con','conne','encule','enculé','enculée','encules','enculés','putain','pute',
  'salope','salaud','bordel','merde','merdeux','emmerde','emmerdeur','emmerdeuse','nique','niquer',
  'nique ta mere','nique ta mère','nique ta race','va te faire foutre','va te faire voir','ferme ta gueule',
  'ta gueule','batard','bâtard','bâtarde','batarde','fils de pute','fille de pute','trou du cul',
  'couillon','couillonne','enfoire','enfoiré','enfoirée','salopard','saloperie','crétin','cretin',
  'idiot','idiote','imbécile','imbecile','abruti','abrutie','débile','debile','pédé','pede','tapette','casse-toi',

  // Common English terms
  'fuck','fucking','fucked','fucker','motherfucker','shit','bullshit','bitch','bastard','asshole',
  'dickhead','dick','piss off','son of a bitch','go to hell','slut','whore',

  // More Moroccan Darija / Arabizi spellings
  'L7WA', 'TA SIR 9AWAD', 'SIR 9AWAD', 'T9AWAD', '9OWAD', 'TA9AWADIT', '9WADAT', '9WD', 'T 9AWAD',
  'T9AWD', 'TA SIR T7WA', 'SIR THWA', 'THWA', 'THWAA', 'TA9AWADIT', 'ZAMAL', 'ZOMAL', 'ZAMLA',
  'zebi','zebbi','zebbi dialek','zeb','zebbi fik','zeb omk','zeb mok','zeb bouk','zeb baba','zeb mama',
  'zbi fik','zbi mok','zbi omk','zbi bouk','zbi fik nta','zeb lah','zeb lwalidin','zeb lwalidik',
  'sir t9wd','sir tqwd','t9awed a weld','t9awd a weld','t9awed a l9lawi','t9wd a l9lawi','t9awdi','t9awdo',
  't9awed 3lia','t9awed mn hna','t9awed f rask','t9wd f rask','m9awed 3lik','m9awda 3lik','m9awed nta',
  'm9awed a weld','m9awed a l9lawi','m9awda a bent','m9awed bzaaf','m9ewed','mqewed','m9ewda','m9awdin',
  'l9e7ba','l9e7bi','l9e7bat','l9ahba','l9ehba','9ahba','9ehba','9e7ba','9e7bi','9e7bat','qehba','qahba',
  'weld l9e7ba','weld l9ahba','weld lqahba','weld lqehba','bent l9e7ba','bent l9ahba','bent lqahba',
  'weld lhram','weld l7ram','wld l7ram','wld lhram','bent l7ram','bnt l7ram','weld lklb','wld lkelb',
  'weld lkelb','weld lkalb','bent lkelb','bnt lkelb','weld l97ba','wld l97ba','bent l97ba','bnt l97ba',
  'nik omk','nik omek','nik mok','nik bok','nik bouk','nik fik','nikek','nikk','n1k','niik','nikkek','tnik',
  'tnik omk','tnik mok','tnik bouk','tnik fik','nikha','nikha lik','nikha fik','nikkom','nikhom','mnayek','mneyek',
  'mniyek','mniyka','mtnayek','mtneyek','zamel','zaml','zamla','zamlou','zamlti','zamel nta','zamel nti',
  'hmar','7mar','hmera','7mara','hmara','7mir','hmir','bhim','bhima','bhayem','kelb','kalb','klb','klab','kleb',
  'kelba','kalba','weld lkelb','bent lkelb','weld kalb','bent kalb','msekh','mskhot','msekhte','mkhanez',
  'khanez','khanz','m3affen','m3affan','m3fen','m3فن','m7enzer','7ayawan','hayawan','7aywan','9lil l7ya',
  '9lil l7ia','9lil trab','9lil l2adab','ma3ndk tarbiya','bla tarbiya','wjeh l9as7','wjeh l7jar',
  '3ayb 3lik','7chouma 3lik','sir t7wa','sir t7awa','t7wa','t7awa','t7wi','t7wiha','t7wih','t7waw',
  'lah yn3el','lah yel3en','y3el din mok','y3el din bouk','y3el din babak','y3el din mok','din mok','din bouk',
  'din baba','din mama','din omk','din bok','din babak','din mamak','lah yn3el babak','lah yn3el mok',
  'chermouta','charmouta','charmout','charmouta dyal','m9e7eb','m9e7ba','m9e7ebin','m9ewda','m9ewdin',
  'safi sir t9awed','baraka mn t9wida','sir b7alek','sir t9awed mn hna','weld l9ahba','bent l9ahba',
  'FACEBOOK.COM', 'TIKTOK.COM', 'CHAT.WHATSAPP.COM', 'https://CHAT.WHATSAPP.COM/',
  // Arabic script: expanded insults and abusive phrases
  'يا حمار','يا حمارة','يا بهيم','يا بهيمة','يا كلب','يا كلبة','يا خنزير','يا وسخ','يا قذر','يا حقير',
  'يا تافه','يا منحط','يا سافل','يا عرص','يا خول','يا لوطي','يا متناك','يا زفت','يا زبالة','يا حيوان',
  'يا ابن الكلب','يا بنت الكلب','يا ابن الحرام','يا بنت الحرام','يا ابن القحبة','يا بنت القحبة',
  'ابن القحبة','ابن القحبه','بنت القحبة','بنت القحبه','ابن الشرموطة','ابن الشرموطه','بنت الشرموطة',
  'يا شرموط','يا شرموطة','يا قحبة','يا قحبه','يا كحبة','يا كحبه','يا عاهر','يا عاهرة','يا فاسد',
  'يا عديم التربية','قليل التربية','قليل الأدب','قليل الادب','منعدم الأخلاق','منعدم الاخلاق','عديم الأخلاق',
  'عديم الاخلاق','وسخ الأخلاق','ساقط','ساقطة','منحط الأخلاق','يا غبي','يا غبية','غبي جدا','غبية جدا',
  'أحمق','احمق','حمقاء','يا أحمق','يا احمق','يا معتوه','معتوه','معتوهة','يا مجنون','يا مجنونة',
  'يا فاشل','فاشل','فاشلة','يا كذاب','يا كذابة','كذاب كبير','يا منافق','يا منافقة','يا جبان','يا جبانة',
  'يا نذل','نذل','نذلة','يا وضيع','وضيع','وضيعة','يا ساقط','يا ساقطة','يا زبالة','زبالة','قذر جدا',
  'كلب ابن كلب','كلبة بنت كلب','حيوان لا يفهم','يلعن شكلك','يلعن أصلك','يلعن اصلك','يلعن أبوك','يلعن ابوك',
  'يلعن أمك','يلعن امك','يلعن أهلك','يلعن اهلك','الله يلعنك','الله يلعن شكلك','لعنة عليك','يلعن دينك',
  'يلعن والديك','يلعن والديك','تباً لك','تبا لك','اذهب إلى الجحيم','روح للجحيم','انقلع','اخرس','اسكت يا حمار',
  'سد فمك','سد حلكك','اغرب عن وجهي','روح انقلع','يا زق','زق','زب','زبي','زبر','قضيب','كس','كسي','كسك',
  'كسمك','كسم','كسمك يا','طيزك','طيز','مؤخرتك','نيك','نيكك','منيوك','منيوكة','متناك','متناكة',
  'يلعن أبوك وأمك','يلعن ابوك وامك','ابن الوسخة','بنت الوسخة','يا ابن الوسخة','يا بنت الوسخة',

  // French: common spelling, accent and phrase variants
  'conard','connar','connasse','connasses','connerie','conneries','con de merde','sale con','sale conne',
  'gros con','grosse conne','encule','enculé','enculée','enculer','enculage','nique ta mère','nique ta mere',
  'nique ta gueule','nique ta race','nique tes morts','nique ton père','nique ton pere','va te faire foutre',
  'va te faire enculer','va chier','fais chier','fait chier','tu fais chier','casse les couilles','casse-couilles',
  'casse toi','casse-toi','dégage','degage','ferme ta gueule','ferme-la','ferme la','ta gueule',
  'sale pute','grosse pute','pute de merde','fils de pute','fille de pute','bande de cons','bande de connards',
  'bâtard','batard','bâtarde','batarde','salaud','salauds','salopard','salopards','saloperie','pourriture',
  'ordure','pauvre con','pauvre conne','espèce de con','espece de con','espèce de connard','espece de connard',
  'abruti fini','gros débile','gros debile','sale débile','sale debile','crétin fini','cretin fini','tête de con',
  'tete de con','trouduc','trou du cul','cul de merde','merde alors','merdeux','merdeuse','emmerdeur','emmerdeuse',
  'bordel de merde','putain de merde','putain de ta race','putain','putain de con','putain de connard',
  'pédé','pede','pédale','pedale','tapette','gouine','sale gouine','enculé de ta race','encule de ta race',
  'va mourir','je te déteste','je te deteste','dégage de là','degage de la','nique-toi','nique toi',

  // English: common insults and abusive phrases
  'fuck you','fuck off','fucking idiot','fucking moron','you bastard','you bitch','son of a bitch',
  'mother fucker','motherfucking','bull shit','piece of shit','piece of crap','shithead','shit head','dumbass',
  'dumb ass','jackass','smartass','ass hat','asswipe','ass hole','asshole','dipshit','douchebag','douche bag',
  'dickhead','dick head','prick','twat','wanker','tosser','bellend','arsehole','arse hole','bloody idiot',
  'stupid bitch','stupid bastard','fat bastard','you suck','screw you','piss off','shut the fuck up',
  'shut up bitch','go fuck yourself','fuck yourself','fuck you asshole','what the fuck','holy shit','bullshit',
  'piece of shit','son of a whore','motherless bastard','dumb bitch','fucking loser','worthless idiot',
  'loser','idiotic','moron','idiot','stupid','stfu','gtfo','wtf','pos','mf','mofo','f u','f.u.',

  // Spanish and widely used multilingual abuse often seen in mixed chats
  'puta','puto','putos','putas','hijo de puta','hija de puta','cabrón','cabron','cabrona','mierda',
  'joder','jodete','vete a la mierda','pendejo','pendeja','chingada','chingado','chingate','culero','culera',
  'coño','cono','maricon','maricón','gilipollas','imbecil','imbécil','idiota','estupido','estúpido',
  'bastardo','bastarda','malparido','malparida','gonorrea','carechimba','verga','vete al carajo',

  // German / Italian / Portuguese terms frequently encountered in multilingual groups
  'arschloch','scheisse','scheiße','fick dich','hurensohn','bastardo','stronzo','vaffanculo','coglione',
  'puttana','merda','porra','caralho','filho da puta','filha da puta','vai se foder','otario','otário',

  // Disguised spellings and spacing variants
  'f u c k','f.u.c.k','f*ck','f**k','fu ck','fck','fuk','phuck','sh1t','sh!t','s h i t','b!tch','b1tch',
  'b!tch ass','a$$hole','a55hole','d1ck','d!ck','b@stard','@sshole','pu7a','p0ta','m13rda','j0der',
  'z.b.i','z-b-i','z e b i','z e b','z.b','n!k','n1k','n!ke','n1ke','7mar','7mara','9a7ba','9e7ba',
  'qahba','qehba','t9wd','tqwd','t9wada','t9awad','t9awed','tqawed','m9awda','m9awed','m9ewed',

  // Additional Darija / Arabizi variants (curated; whole-token matching remains enabled)
  'zebi nta','zebi nti','zebi lik','zebi 3lik','zebbi 3lik','zebbi lik','zbi 3lik','zbi lik',
  'zbi nta','zbi nti','zeb omek','zeb omek','zeb l omk','zeb l omek','zeb lwalid','zeb lwalida',
  'sir tqawed','sir t9awed a weld','sir tqawed a weld','sir t9wed','sir t9wed a weld','sir tqwd',
  'sir t9wed mn hna','sir tqwd mn hna','sir t9wd mn hna','t9awed fik','t9awed fik nta','t9awed fik nti',
  't9awed 3la rask','t9awed 3la rassek','t9wd 3la rask','t9wd 3la rassek','t9awed 3la mok','t9wd 3la mok',
  't9awad 3lia','t9awed 3lia','tqawed 3lia','t9awad mn hna','t9awed mn temma','sir tqwd mn temma',
  'm9awed 3la rask','m9awda 3la rask','m9awed 3la rassek','m9awda 3la rassek','m9awed f mok','m9awda f mok',
  'm9awed f rask','m9awda f rask','m9ewed 3lik','m9ewda 3lik','mqewed 3lik','mqewda 3lik',
  'm9awdin 3lik','m9ewdin','m9ewdin 3lik','m9awda bzaaf','m9awed bzzaf','m9ewed bzzaf',
  '7mar nta','7mara nti','hmar nta','hmara nti','a hmar','a 7mar','a hmera','a 7mara',
  'bhim nta','bhima nti','kelb nta','kalb nta','klb nta','kelba nti','kalba nti','weld lklb','bnt lklb',
  'weld l9e7ba nta','bent l9e7ba nti','wld l9ahba','bnt l9ahba','wld l9e7ba','bnt l9e7ba',
  'weld l9e7ba dyal','bent l9e7ba dyal','weld l97ba dyalek','bent l97ba dyalek',
  '9e7ba nta','9e7ba nti','9ahba nta','9ahba nti','l9e7ba dyalek','l9ahba dyalek','l9ehba dyalek',
  'mniouk','mniyok','mneyok','mnayek nta','mneyek nta','mniyek nta','mtnayek nta','mtnayka nti',
  'zamel nta','zamel nti','zaml nta','zaml nti','zamla nti','zamlti nti','zamlti nta',
  '3ayb a weld','3ib a weld','3ib 3lik nta','7chouma a weld','7chouma 3lik nta','bla 7chma','bla 7chma nta',
  'bla tarbiya nta','ma3ndek tarbiya','ma3ndkch tarbiya','ma3ndekch l7ya','ma3ndkch l7ya',
  'wjehek 9as7','wjeh qas7','wjeh l7jar','wjeh l7did','9lil l7ya nta','9lil l7ya nti',
  'lah yn3el bouk','lah yn3el babak','lah yn3el mama','lah yn3el walidik','lah yel3en walidik',
  'y3el din babak','y3el din mamak','y3el din walidik','y3el din lwalidin','din lwalidin',
  'sir t7wa nta','sir t7wi nta','sir t7wi nti','t7wa nta','t7wi nta','t7wih nta','t7waha nti',
  'sir b7alek a hmar','sir b7alek a kelb','baraka a l7mar','baraka a l9awed','safi a m9awed',
  'a weld l7ram','a bent l7ram','weld lhram nta','bent lhram nti','wld l7ram nta','bnt l7ram nti',
  'mkhanez nta','mkhanz nta','m3affen nta','m3fen nta','msekh nta','mskhot nta','m7enzer nta',
  'khanez nta','khanz nta','m3affan nta','m3affna','weld l7رام','bent l7رام',

  // More Arabic variants and abusive phrases
  'يا ابن الوسخ','يا بنت الوسخ','يا وسخة','يا وسخ','يا قذر','يا قذرة','يا كلب ابن كلب','يا بنت الحرام',
  'يا عديم الأصل','يا عديمة الأصل','عديم الاصل','عديمة الاصل','يا قليل الأصل','يا قليلة الأصل',
  'يا قليل الأدب','يا قليلة الأدب','يا قليل الادب','يا قليلة الادب','يا عديم الذوق','يا عديمة الذوق',
  'يا ثقيل الدم','ثقيل الدم','يا سخيف','يا سخيفة','يا بليد','يا بليدة','يا فاشل يا فاشل','يا غبي يا غبي',
  'يا كذاب يا كذاب','كذاب ومنافق','منافق وكذاب','يا حقير يا حقير','يا نذل يا نذل','يا تافه يا تافه',
  'يا زبالة المجتمع','زبالة المجتمع','يا قمامة','يا قذر الأخلاق','قذر الاخلاق','منحط','منحطة','سافل جدا','سافلة جدا',
  'يا منحرف','يا منحرفة','يا فاسق','يا فاسقة','يا فاجر','يا فاجرة','يا جبان','يا جبانة','يا وضيع','يا وضيعة',
  'اخرس يا كلب','اخرسي يا كلبة','اسكت يا غبي','اسكتي يا غبية','اسكت يا حقير','انقلع يا كلب','انقلعي',
  'ابتعد عن وجهي','روح من وجهي','غور من وجهي','اغرب عن وجهي يا حقير','يا ابن الوسخة','يا بنت الوسخة',
  'لعنة عليك يا كذاب','الله ياخذك','الله ياخدك','الله لا يوفقك','الله لا يسامحك','الله يلعن أصلك','الله يلعن اصلك',
  'يلعن تربيتك','يلعن أصلك وفصلك','يلعن اصلك وفصلك','تباً عليك','تبا عليك','إلى الجحيم','الى الجحيم',
  'يا زفت','زفت عليك','يا مقرف','يا مقرفة','مقرف','مقرفة','يا قرف','قرفان منك','قرفانة منك',

  // French variants, contractions and informal spellings
  'connard de merde','connasse de merde','sale bâtard','sale batard','espèce de bâtard','espece de batard',
  'grosse merde','petite merde','merde humaine','tête de noeud','tete de noeud','tête de bite','tete de bite',
  'va te faire voir','va te faire cuire un oeuf','va te faire foutre toi','va te faire enculer toi',
  'nique ta mère sale','nique ta mere sale','nique ton père sale','nique ton pere sale','nique ta gueule sale',
  'ferme ta putain de gueule','ferme ton clapet','ferme ta bouche connard','ferme ta bouche connasse',
  'dégage connard','degage connard','dégage connasse','degage connasse','barre-toi','barre toi','casse-toi connard',
  'sale merde','sale ordure','sale enfoiré','sale enfoire','sale enfoirée','sale cretin','sale crétin',
  'gros nul','grosse nulle','nul à chier','nulle à chier','à chier','a chier','ça me fait chier','ca me fait chier',
  'tu me fais chier','tu me casses les couilles','casse les pieds','va te pendre','pauvre type','pauvre fille',
  'espèce de salope','espece de salope','sale salaud','sale salope','pute va','putain va','connard va','connasse va',
  'fils de chien','fille de chien','bande de bâtards','bande de batards','bande de salopes','bande de merdeux',
  'enculeur','enculeuse','enculé de merde','encule de merde','putain de merde','bordel de merde',

  // English variants and common obfuscations
  'fuck u','fuk you','fck you','f**k you','f*ck you','fu ck you','f u c k you','f u ck','fuk off','fck off',
  'f*ck off','f**k off','fu*k','fuc k','phuk','phuk you','fook you','motherfuker','motherfcker','mthr fkr',
  'sh1tty','shitty','sh*t','s**t','shi t','bullsh*t','bull sh*t','b!tch you','biatch','beeatch','b!tch please',
  'bast*rd','b@stard','d!ckhead','d1ckhead','d!ck head','douche bag','douche-bag','a$$','a$$hat','a$$wipe',
  'asswipe','dip sh*t','dipsh*t','dumb sh*t','piece o shit','piece of sh*t','sonofabitch','son-of-a-bitch',
  'go f yourself','go f yourself','go fk yourself','go f**k yourself','shut the f up','stfu idiot','gtfo idiot',
  'you moron','you idiot','you loser','you pathetic loser','stupid moron','dumb moron','fucking clown','clown ass',
  'trash human','worthless piece of shit','piece of garbage','scumbag','scum bag','dirtbag','dirt bag','sleazebag',
  'ass clown','assclown','shit for brains','shit-for-brains','brain-dead idiot','dumb fuck','dumbf*ck','fuckwit',

  // Extra masked / spaced / punctuation variants
  'z e b i','z-e-b-i','z_e_b_i','z.e.b.i','z*b*i','z#b#i','z3bi','zeb!','zebii','zebiii',
  't 9 w d','t-9-w-d','t.9.w.d','tq w d','tq-wd','t9w3d','t9w3da','t9aw3d','t9aw3da','tqawed','tqawad',
  '7 m a r','7-m-a-r','7.m.a.r','h m a r','h-m-a-r','h.m.a.r','9 a 7 b a','9-a-7-b-a','qahb@',
  'n i k','n-i-k','n.i.k','n!k u','n1k u','f u c k','f-u-c-k','f.u.c.k','s h i t','s-h-i-t','s.h.i.t',
  'b i t c h','b-i-t-c-h','b.i.t.c.h','a s s h o l e','a-s-s-h-o-l-e','a.s.s.h.o.l.e',
  'p u t a','p-u-t-a','p.u.t.a','m i e r d a','m-i-e-r-d-a','m.i.e.r.d.a','c o n n a r d','c-o-n-n-a-r-d'

]);

function normalizeWord(value) {
  let s = String(value ?? '').toLowerCase()
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/[ى]/g, 'ي')
    .replace(/[ؤ]/g, 'و')
    .replace(/[ئ]/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[ـ]/g, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '');

  // Arabizi substitutions are applied only when Latin letters are present.
  if (/[a-z]/i.test(s)) {
    s = s.replace(/0/g, 'o').replace(/1/g, 'i').replace(/2/g, 'z')
      .replace(/3/g, 'e').replace(/4/g, 'a').replace(/5/g, 's')
      .replace(/6/g, 'g').replace(/7/g, 'h').replace(/8/g, 'b').replace(/9/g, 'q');
    // Reduce excessive repeated letters without collapsing ordinary double letters.
    s = s.replace(/([a-z])\1{2,}/g, '$1$1');
  }
  return s;
}

function stripDiacritics(value) {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[ßæœøđłıșțőű]/g, ch => ({'ß':'ss','æ':'ae','œ':'oe','ø':'o','đ':'d','ł':'l','ı':'i','ș':'s','ț':'t','ő':'o','ű':'u'}[ch]));
}

function canonical(value) {
  return stripDiacritics(normalizeWord(value)).replace(/[’‘`´]/g, "'").replace(/\s+/g, ' ').trim();
}

const foldedBadWords = new Set([...badWords].map(canonical));
const phrases = [...foldedBadWords].filter(w => /\s/.test(w)).sort((a,b) => b.length - a.length);

function checkText(text) {
  if (typeof text !== 'string' || !text.trim()) return { found: false };
  const normalized = canonical(text);

  // Phrase matches require a non-letter/digit boundary on either side.
  for (const phrase of phrases) {
    const escaped = phrase.split(' ').map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[\\s\\W_]+');
    const re = new RegExp(`(?:^|[^a-z0-9\\u0600-\\u06FF])${escaped}(?:$|[^a-z0-9\\u0600-\\u06FF])`, 'u');
    if (re.test(normalized)) return { found: true, word: phrase };
  }

  // Individual terms match whole tokens only, reducing accidental substring matches.
  const tokens = normalized.match(/[a-z0-9]+|[\u0600-\u06FF]+/gu) || [];
  for (const token of tokens) {
    if (foldedBadWords.has(token)) return { found: true, word: token };
  }
  return { found: false };
}

module.exports = { badWords, checkText, normalizeWord, stripDiacritics };
