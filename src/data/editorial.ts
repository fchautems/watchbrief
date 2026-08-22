import type { Watch } from "@/lib/types";

export type EditorialOverride = Partial<Watch> & { id: string };

export const editorialOverrides: EditorialOverride[] = [
  {
    id: "glashutte-original-senator-chrono-navigator",
    price: "€16,800",
    priceSourceUrl:
      "https://www.glashuette-original.com/de/watches/senator/senator-chronograph-navigator-1-37-24-20-12-71/",
    priceCheckedAt: "2026-08-22",
    priceMarket: "DE",
    priceTaxMode: "incl-vat",
    summary:
      "Un chronographe de pilote à grande date qui reste étonnamment contenu. Le flyback manufacture et ses 70 heures d’autonomie lui donnent une vraie densité technique.",
    productUrl:
      "https://www.glashuette-original.com/en/watches/senator/senator-chronograph-navigator-1-37-24-20-12-71/",
    imageUrl:
      "https://www.glashuette-original.com/app/uploads/2026/08/Glashuette-Original-W13724201271-Desktop-1920x680.jpg",
    imageSource: "Glashütte Original",
    imageSourceUrl:
      "https://www.glashuette-original.com/en/watches/senator/senator-chronograph-navigator-1-37-24-20-12-71/",
    sources: [
      "https://www.glashuette-original.com/en/watches/senator/senator-chronograph-navigator-1-37-24-20-12-71/",
      "https://www.timeandwatches.com/2026/08/glashutte-original-senator-chronograph-navigator.html",
    ],
    sourceNotes:
      "Prix harmonisé : €16 800 pour la référence 1-37-24-20-12-71 sur bracelet acier ; le tarif USD issu du seed concernait le marché américain.",
    verified: true,
    verificationStatus: "verified",
    verifiedAt: "2026-08-21",
  },
  {
    id: "czapek-promenade-transparencies-aqua-blue",
    price: "CHF 28,800 hors taxes",
    priceSourceUrl: "https://www.czapek.com/shop/1705-promenade-transparence-bleu-7077",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "excl-vat",
    thickness: "10.8 mm",
    summary:
      "Le cadran saphir fumé révèle le calibre squelette sans sacrifier la lisibilité. Une indépendante spectaculaire, mais dans un boîtier de 38 mm réellement portable.",
    productUrl:
      "https://www.czapek.com/shop/1705-promenade-transparence-bleu-7077",
    imageUrl:
      "https://www.czapek.com/web/image/product.template/7077/product_website_b2c_banner_3_image",
    imageSource: "Czapek Genève",
    imageSourceUrl:
      "https://www.czapek.com/shop/1705-promenade-transparence-bleu-7077",
    sources: [
      "https://www.czapek.com/shop/1705-promenade-transparence-bleu-7077",
      "https://monochrome-watches.com/czapek-promenade-transparencies-aqua-blue-review-price/",
    ],
    verified: true,
    verificationStatus: "verified",
    verifiedAt: "2026-08-21",
  },
  {
    id: "blancpain-bathyscaphe-70",
    price: "CHF 13,800",
    priceSourceUrl: "https://www.blancpain.com/fr/fifty-fathoms/fifty-fathoms-bathyscaphe-5903-1110-063a",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "incl-vat",
    summary:
      "Une réédition compacte très fidèle à la Bathyscaphe de 1968. Ses 37,4 mm, 300 mètres et 100 heures de réserve combinent charme vintage et vraie aptitude de plongeuse.",
    productUrl:
      "https://www.blancpain.com/en/fifty-fathoms/fifty-fathoms-bathyscaphe-5903-1110-063a",
    imageUrl:
      "https://prestigedam.swatchgroup.biz/transform/2e4b0259-57b7-4404-8581-950f0c901318/5903_1110_63A_Soldier_Face_RGB?io=transform%3Afill%2Cheight%3A900%2Cwidth%3A900",
    imageSource: "Blancpain",
    imageSourceUrl:
      "https://www.blancpain.com/en/news/blancpain-brings-back-vintage-spirit-bathyscaphe-70th-anniversary-limited-edition",
    sources: [
      "https://www.blancpain.com/en/fifty-fathoms/fifty-fathoms-bathyscaphe-5903-1110-063a",
      "https://www.blancpain.com/en/news/blancpain-brings-back-vintage-spirit-bathyscaphe-70th-anniversary-limited-edition",
      "https://monochrome-watches.com/blancpain-fifty-fathoms-bathyscaphe-70th-anniversary-limited-edition-1968-re-edition-5903-1110-63a-review-price/",
    ],
    sourceNotes:
      "Épaisseur officielle confirmée à 10,60 mm ; une valeur de 12,3 mm circulait dans la presse.",
    verified: true,
    verificationStatus: "verified",
    verifiedAt: "2026-08-21",
  },
  {
    id: "henri-grandjean-magician-atrivm-sapphire",
    priceSourceUrl: "https://henri-grandjean.com/the-magician/atrivm-red-sapphire",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "excl-vat",
    thickness: "16 mm",
    lugToLug: "45.8 mm",
    powerReserve: "40 h",
    summary:
      "Un triple tourbillon mystérieux suspendu dans une architecture de saphir coloré. Plus manifeste horloger que montre discrète, et presque un million de francs.",
    productUrl:
      "https://henri-grandjean.com/the-magician/atrivm-red-sapphire",
    imageUrl:
      "https://henri-grandjean.com/images/collection/atrivm-red/henri-grandjean-atrivm-red-sapphire-full-watch.jpg",
    imageSource: "Henri Grandjean & Cie",
    imageSourceUrl:
      "https://henri-grandjean.com/the-magician/atrivm-red-sapphire",
    sources: [
      "https://henri-grandjean.com/the-magician/atrivm-red-sapphire",
      "https://monochrome-watches.com/henri-grandjean-cie-unveils-the-magician-atrivm-green-sapphire-and-atrivm-red-sapphire/",
    ],
    sourceNotes:
      "La fiche officielle indique 40 h ; le seed mentionnait environ 42 h.",
    verified: true,
    verificationStatus: "verified",
    verifiedAt: "2026-08-21",
  },
  {
    id: "norqain-independence-skeleton-titanium",
    priceSourceUrl: "https://norqain.com/products/independence-skeleton-titanium-dlc",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "incl-vat",
    thickness: "11.8 mm",
    lugToLug: "48.75 mm",
    summary:
      "Le premier boîtier intégralement en titane Grade 5 de cette ligne ne pèse que 82 g. Le mouvement squelette COSC et les touches or rouge évitent le total look tactique.",
    productUrl:
      "https://norqain.com/products/independence-skeleton-titanium-dlc",
    imageUrl:
      "https://norqain.com/cdn/shop/files/NORQAIN_Independence_Skeleton_Titanium_DLC_Black_Rubber_2160x2700_7a8df919-96a0-4cf0-a710-5e1e0b00843f.jpg?v=1785831832&width=1200",
    imageSource: "NORQAIN",
    imageSourceUrl:
      "https://norqain.com/products/independence-skeleton-titanium-dlc",
    sources: [
      "https://norqain.com/products/independence-skeleton-titanium-dlc",
      "https://monochrome-watches.com/norqain-independence-skeleton-titanium-dlc-introducing-price/",
    ],
    verified: true,
    verificationStatus: "verified",
    verifiedAt: "2026-08-21",
  },
  {
    id: "legare-chapter1-agp-inverted",
    priceSourceUrl: "https://legarewatch.com/legare-chapter-i-agp-inverted/",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "excl-vat",
    thickness: "9.95 mm",
    summary:
      "La première montre de Legare ressuscite le double balancier différentiel d’Albert-Gustave Piguet. Une proposition très érudite, remarquablement compacte pour son architecture.",
    productUrl: "https://legarewatch.com/legare-chapter-i-agp-inverted/",
    imageUrl:
      "https://legarewatch.com/wp-content/uploads/2026/07/Legare-WBG-Ecomm-20260714_173-square-scaled.webp",
    imageSource: "Legare",
    imageSourceUrl:
      "https://legarewatch.com/legare-chapter-i-agp-inverted/",
    sources: [
      "https://legarewatch.com/legare-chapter-i-agp-inverted/",
      "https://www.fratellowatches.com/introducing-the-new-watch-brand-legare/",
    ],
    verified: true,
    verificationStatus: "verified",
    verifiedAt: "2026-08-21",
  },
  {
    id: "minase-mastercraft-j3",
    diameter: "37 mm",
    thickness: "9.9 mm",
    price: "Dès US$2,050",
    priceSourceUrl: "https://minasewatches.com/webshop/mastercraft-j3/",
    priceCheckedAt: "2026-08-22",
    priceMarket: "US",
    priceTaxMode: "unknown",
    summary:
      "Minase rend son polissage Sallaz plus accessible avec un boîtier coussin compact et un mouvement Miyota. Une porte d’entrée crédible dans l’horlogerie japonaise indépendante.",
    productUrl: "https://minasewatches.com/webshop/mastercraft-j3/",
    imageUrl:
      "https://minasewatches.com/wp-content/uploads/2026/07/J3-NBLNWH-SSD.png",
    imageFallbacks: [
      "https://minasewatches.com/wp-content/uploads/2026/07/J3-NBLNWH-SSD-100x100.png",
    ],
    imageSource: "Minase",
    imageSourceUrl: "https://minasewatches.com/webshop/mastercraft-j3/",
    sources: [
      "https://minasewatches.com/webshop/mastercraft-j3/",
      "https://www.gearpatrol.com/watches/minase-mastercraft-j3/",
    ],
    verified: true,
    verificationStatus: "verified",
    verifiedAt: "2026-08-21",
  },
  {
    id: "venezianico-nereide-opale-blu",
    priceSourceUrl: "https://www.venezianico.com/products/nereide-opale-blu-limited-edition",
    priceCheckedAt: "2026-08-22",
    priceMarket: "EU",
    priceTaxMode: "incl-vat",
    summary:
      "Une plongeuse de 42 mm dont chaque cadran en opale de laboratoire révèle des nuances différentes. La lunette en tungstène et les 200 mètres d’étanchéité maintiennent une vraie vocation d’outil.",
    productUrl: "https://www.venezianico.com/products/nereide-opale-blu-limited-edition",
    imageUrl:
      "https://www.venezianico.com/cdn/shop/files/Hero_3e766f8a-53c9-46ec-a872-398788f1e2da.png?v=1787321403&width=2500",
    imageSource: "Venezianico",
    imageSourceUrl: "https://www.venezianico.com/products/nereide-opale-blu-limited-edition",
    sources: ["https://www.venezianico.com/products/nereide-opale-blu-limited-edition"],
    sourceNotes: "Page produit officielle : édition de 600 pièces, disponibilité annoncée le 24 août 2026.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-21",
  },
  {
    id: "kiwame-yane",
    price: "¥99,000 / US$730 hors taxes",
    priceSourceUrl: "https://kiwametokyo.com/en/collections/yane%E5%B1%8B%E6%A0%B9",
    priceCheckedAt: "2026-08-22",
    priceMarket: "JP",
    priceTaxMode: "excl-vat",
    summary:
      "Deux exécutions très graphiques inspirées des toits japonais, dans un boîtier rectangulaire fin. Les versions Enji et Kuro sont toutes deux annoncées épuisées sur la boutique officielle.",
    productUrl: "https://kiwametokyo.com/en/collections/yane%E5%B1%8B%E6%A0%B9",
    imageUrl: "https://kiwametokyo.com/cdn/shop/files/yane_front1.jpg?v=1786586296&width=1200",
    imageSource: "KIWAME TOKYO",
    imageSourceUrl: "https://kiwametokyo.com/en/collections/yane%E5%B1%8B%E6%A0%B9",
    sources: ["https://kiwametokyo.com/en/collections/yane%E5%B1%8B%E6%A0%B9"],
    sourceNotes: "La collection officielle confirme les deux variantes, leur prix et leur statut épuisé.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-21",
  },
  {
    id: "iwc-big-pilot-proset-mercedes-140",
    price: "CHF 36,000",
    priceSourceUrl:
      "https://press.iwc.com/iwc-celebrates-140-years-of-innovation-with-mercedes-benz-en/",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "incl-vat",
    summary:
      "IWC inaugure son calendrier perpétuel ProSet réglable en avant comme en arrière par la couronne. Le boîtier acier de 42 mm commémore les 140 ans de Mercedes-Benz en 140 exemplaires.",
    productUrl:
      "https://www.iwc.com/us-en/watches/pilot-watches/iw329603-big-pilots-watch-perpetual-calendar-proset-140-years-mercedes-benz",
    imageUrl:
      "https://image-cdn.hypb.st/https%3A/hypebeast.com/image/2026/08/14/iwc-big-pilots-watch-perpetual-calendar-proset-140-years-mercedes-benz-ref-iw329603-release-info-1.jpg?cbr=1&fit=max&q=90&w=800",
    imageSource: "Hypebeast · photo IWC",
    imageSourceUrl:
      "https://hypebeast.com/2026/8/iwc-big-pilots-watch-perpetual-calendar-proset-140-years-mercedes-benz-ref-iw329603-release-info",
    sources: [
      "https://www.iwc.com/us-en/watches/pilot-watches/iw329603-big-pilots-watch-perpetual-calendar-proset-140-years-mercedes-benz",
      "https://press.iwc.com/iwc-celebrates-140-years-of-innovation-with-mercedes-benz-en/",
      "https://deployant.com/iwc-celebrates-140-years-of-innovation-with-mercedes-benz/",
    ],
    sourceNotes:
      "La fiche officielle confirme la référence IW329603, le calibre 82665, 60 h et 10 bar. Prix suisse CHF 36 000, TVA comprise ; l'ancienne valeur USD était le tarif US hors taxes. L'image officielle servie par IWC était trop douce dans la carte, remplacée par une photo de presse IWC relayée par Hypebeast.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-21",
  },
  {
    id: "albishorn-marinagraph-classic",
    thickness: "13 mm",
    lugToLug: "47.7 mm",
    price: "CHF 3,950 hors taxes",
    priceSourceUrl:
      "https://albishorn-watches.ch/en/collections/water-collection/marinagraph-classic-fume",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "excl-vat",
    limitedQty: 99,
    summary:
      "Un chronographe de régate monopoussoir doté d’un compte à rebours rétrograde breveté de dix minutes. La version Classic Fumé associe son cadran laqué à une lunette saphir très architecturale.",
    productUrl:
      "https://albishorn-watches.ch/en/collections/water-collection/marinagraph-classic-fume",
    imageUrl:
      "https://albishorn-watches.ch/content/3715e1b3a3727ce07247fa7543c272ac/caoutchouc-blanc.png",
    imageSource: "Albishorn",
    imageSourceUrl:
      "https://albishorn-watches.ch/en/collections/water-collection/marinagraph-classic-fume",
    sources: [
      "https://albishorn-watches.ch/en/collections/water-collection/marinagraph-classic-fume",
    ],
    sourceNotes:
      "La page officielle de la Classic Fumé indique 99 pièces, CHF 3 950 hors taxes et 64 h. L'ancien asset était une vue de cadran : il est remplacé par l'image produit officielle sur bracelet blanc.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-21",
  },
  {
    id: "seiko-presage-craftsmanship-hcc005-hcc006",
    thickness: "12.4 mm",
    lugToLug: "46.8 mm",
    waterResistance: "Résistante aux éclaboussures",
    price: "US$1,400 / US$1,650",
    priceSourceUrl: "https://www.seikowatches.com/us-en/products/presage/hcc005j1",
    priceCheckedAt: "2026-08-22",
    priceMarket: "US",
    priceTaxMode: "unknown",
    summary:
      "Deux Presage de 39,6 mm consacrées aux métiers d’art japonais : émail blanc pour la HCC005 et laque urushi pour la HCC006. Le calibre 6R5H offre trois jours de réserve.",
    productUrl: "https://www.seikowatches.com/us-en/products/presage/hcc005j1",
    imageUrl:
      "https://www.seikowatches.com/us-en/-/media/Images/Product--Image/All/Seiko/2026/05/01/21/05/HCC005J1/HCC005J1.png?mh=1200&mw=1200",
    imageFallbacks: [
      "https://www.seikowatches.com/us-en/-/media/Images/Product--Image/All/Seiko/2026/05/01/21/05/HCC006J1/HCC006J1.png?mh=1200&mw=1200",
    ],
    imageSource: "Seiko",
    imageSourceUrl: "https://www.seikowatches.com/us-en/products/presage/hcc005j1",
    sources: [
      "https://www.seikowatches.com/us-en/products/presage/hcc005j1",
      "https://www.seikowatches.com/us-en/products/presage/hcc006j1",
      "https://www.seikowatches.com/au-en/news/2026/pr/20260813",
    ],
    sourceNotes: "Les deux pages produit officielles confirment 39,6 × 12,4 mm et 72 h.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-21",
  },
  {
    id: "serica-7505-sunburst",
    powerReserve: "42 h",
    summary:
      "La 7505 compacte reçoit un cadran émaillé brun-noir inspiré des guitares électriques. Elle conserve sa certification chronomètre, ses 200 mètres et son bracelet Bonklip.",
    productUrl: "https://serica-watches.com/en/pages/serica-7505-sunburst-time-tide",
    linkLabel: "Page officielle",
    sources: ["https://serica-watches.com/en/pages/serica-7505-sunburst-time-tide"],
    sourceNotes: "Caractéristiques et prix confirmés par Serica ; image officielle réutilisable encore à confirmer.",
    verified: false,
    verificationStatus: "needs-review",
    editorialStatus: "researching",
    verifiedAt: "2026-08-21",
  },
  {
    id: "awake-son-mai-ultraviolet",
    summary:
      "Le cadran Sơn Mài superpose laque noire et violette sur feuille d’argent, avec un motif propre à chaque pièce. Cette édition partenaire de 38 mm conserve 100 mètres et 68 heures de réserve.",
    productUrl: "https://timeandtidewatches.com/founderfest-2026/",
    linkLabel: "Annonce partenaire",
    sources: ["https://timeandtidewatches.com/founderfest-2026/"],
    sourceNotes: "Annonce du partenaire de l’édition ; page produit et droits de l’image encore à confirmer.",
    verified: false,
    verificationStatus: "needs-review",
    editorialStatus: "researching",
    verifiedAt: "2026-08-21",
  },
  {
    id: "baltic-heures-du-monde-horizon-line",
    summary:
      "Cette Heures du Monde de 37 mm introduit chez Baltic un cadran en carbone forgé, animé d’accents orange. Le Soprod C125 et les 100 mètres en font un véritable outil de voyage compact.",
    productUrl: "https://timeandtidewatches.com/founderfest-2026/",
    linkLabel: "Annonce partenaire",
    sources: ["https://timeandtidewatches.com/founderfest-2026/"],
    sourceNotes: "Annonce du partenaire de l’édition ; page produit et droits de l’image encore à confirmer.",
    verified: false,
    verificationStatus: "needs-review",
    editorialStatus: "researching",
    verifiedAt: "2026-08-21",
  },
  {
    id: "furlan-marri-songlines",
    summary:
      "Un cadran brun laqué et un fond officier articulé donnent une personnalité très chaleureuse à cette automatique de 39 mm. Le calibre La Joux-Perret G100 reste visible une fois le couvercle ouvert.",
    productUrl: "https://timeandtidewatches.com/founderfest-2026/",
    linkLabel: "Annonce partenaire",
    sources: ["https://timeandtidewatches.com/founderfest-2026/"],
    sourceNotes: "Annonce du partenaire de l’édition ; page produit et droits de l’image encore à confirmer.",
    verified: false,
    verificationStatus: "needs-review",
    editorialStatus: "researching",
    verifiedAt: "2026-08-21",
  },
  {
    id: "jacques-bianchi-om-jb200-chronometer",
    thickness: "13.3 mm",
    lugToLug: "47 mm",
    summary:
      "La JB200 adopte un cadran bleu émaillé aux couleurs de l’OM et un mouvement Soprod certifié COSC. Sa quantité finale dépendra de la fenêtre de précommande annoncée pour septembre.",
    productUrl: "https://jacquesbianchi.com/en",
    linkLabel: "Annonce officielle",
    sources: [
      "https://jacquesbianchi.com/en",
      "https://www.fratellowatches.com/olympique-de-marseille-x-jacques-bianchi-marseille-jb200-chronometer/",
    ],
    sourceNotes: "La marque annonce le modèle sans page produit définitive ; photo officielle encore à confirmer.",
    verified: false,
    verificationStatus: "needs-review",
    editorialStatus: "researching",
    verifiedAt: "2026-08-21",
  },
  {
    id: "hamilton-khaki-field-auto-the-odyssey",
    priceSourceUrl: "https://www.hamiltonwatch.com/en-us/h70675530-khaki-field-auto-odyssey-limited-edition.html",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "incl-vat",
    summary:
      "La Khaki Field passe au bronze pour accompagner le film de Christopher Nolan. Ses 42 mm, son fond titane et ses 80 heures d’autonomie donnent à cette édition de 2 112 pièces une vraie présence de montre d’aventure.",
    productUrl:
      "https://www.hamiltonwatch.com/en-us/h70675530-khaki-field-auto-odyssey-limited-edition.html",
    imageUrl:
      "https://www.hamiltonwatch.com/media/catalog/product/h/7/h70675530_soldier_1.png",
    imageSource: "Hamilton",
    imageSourceUrl:
      "https://www.hamiltonwatch.com/en-us/h70675530-khaki-field-auto-odyssey-limited-edition.html",
    sources: [
      "https://www.hamiltonwatch.com/en-us/h70675530-khaki-field-auto-odyssey-limited-edition.html",
      "https://www.hamiltonwatch.com/en-us/h70675530-khaki-field-auto-odyssey-limited-edition.html",
    ],
    sourceNotes: "Fiche officielle : bronze, 42 mm, 100 m, calibre H-10 et édition de 2 112 pièces.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-22",
  },
  {
    id: "tag-heuer-formula-1-chronograph-gulf",
    priceSourceUrl:
      "https://www.tagheuer.com/int/en/timepieces/collections/tag-heuer-formula-1/44-mm-calibre-16/CBZ208B.BF0009.html",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "incl-vat",
    thickness: "14.1 mm",
    lugToLug: "47.3 mm",
    summary:
      "Une Formula 1 automatique en titane grade 2 avec lunette carbone forgé, plutôt qu’un simple habillage Gulf. Les 1 000 exemplaires conservent le Calibre 16 et 200 mètres d’étanchéité.",
    productUrl:
      "https://www.tagheuer.com/int/en/timepieces/collections/tag-heuer-formula-1/44-mm-calibre-16/CBZ208B.BF0009.html",
    imageUrl:
      "https://www.tagheuer.com/on/demandware.static/-/Sites-tagheuer-master/default/dwa8fc5c25/TAG_Heuer_Formula_1/CBZ208B.BF0009/CBZ208B.BF0009_Soldier.png?impolicy=TrimRatioResize&width=1028&ratioHeight=1&ratioWidth=1&expansion=true&padding=150",
    imageSource: "TAG Heuer",
    imageSourceUrl:
      "https://www.tagheuer.com/int/en/timepieces/collections/tag-heuer-formula-1/44-mm-calibre-16/CBZ208B.BF0009.html",
    sources: [
      "https://www.tagheuer.com/int/en/timepieces/collections/tag-heuer-formula-1/44-mm-calibre-16/CBZ208B.BF0009.html",
      "https://go.tagheuer.com/F1GulfTAT",
    ],
    sourceNotes: "La fiche officielle confirme la référence CBZ208B.BF0009, les 1 000 pièces et 200 m.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-22",
  },
  {
    id: "vacheron-overseas-34-5-red",
    price: "CHF 23,100",
    priceSourceUrl:
      "https://www.vacheron-constantin.com/fr/en/collections/overseas/4600v-200a-h127.html",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "incl-vat",
    thickness: "9.33 mm",
    summary:
      "Le cadran rouge laqué donne une personnalité rare à l’Overseas compacte. Elle conserve les trois bracelets interchangeables, 150 mètres d’étanchéité et le calibre 1088/1 visible au dos.",
    productUrl:
      "https://www.vacheron-constantin.com/fr/en/collections/overseas/4600v-200a-h127.html",
    imageUrl:
      "https://www.vacheron-constantin.com/dam/rcq/vac/iU/Lt/bl/_U/Tu/6J/as/7v/xW/KJ/aQ/iULtbl_UTu6Jas7vxWKJaQ.png.transform.vacdetail.png",
    imageSource: "Vacheron Constantin",
    imageSourceUrl:
      "https://www.vacheron-constantin.com/fr/en/collections/overseas/4600v-200a-h127.html",
    sources: [
      "https://www.vacheron-constantin.com/fr/en/collections/overseas/4600v-200a-h127.html",
      "https://www.fratellowatches.com/new-34-5mm-vacheron-constantin-overseas/",
    ],
    sourceNotes:
      "Fiche officielle de la version acier à cadran rouge : 34,5 × 9,33 mm et 150 m. Prix suisse de la référence acier 4600V/200A-H127 : CHF 23 100 ; le tarif USD/rose gold ne concernait pas cette carte.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-22",
  },
  {
    id: "christopher-ward-twelve-xander",
    price: "CHF 5,220",
    priceSourceUrl: "https://www.christopherward.com/the-twelve-xander.html",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "unknown",
    summary:
      "La Twelve X devient une toile miniature : cadran peint à la main par The Dial Artist, boîtier titane et calibre manufacture SH21. Une collaboration de 150 pièces, désormais épuisée.",
    productUrl: "https://www.christopherward.com/the-twelve-xander.html",
    imageUrl:
      "https://www.christopherward.com/dw/image/v2/BDWD_PRD/on/demandware.static/-/Sites-cw-master-catalog/default/dw4d2a3951/images/WATCHES/C12-41A5D1-THPDA-B0/C12-41A5D1-THPDA-B0_Picture_1.jpg?sw=900&sh=900",
    imageSource: "Christopher Ward",
    imageSourceUrl: "https://www.christopherward.com/the-twelve-xander.html",
    sources: ["https://www.christopherward.com/the-twelve-xander.html"],
    sourceNotes: "Page officielle : édition de 150 pièces, 41 mm, titane, calibre SH21 et statut épuisé.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-22",
  },
  {
    id: "oris-divers-date-39-olive",
    price: "CHF 2,450",
    priceSourceUrl:
      "https://www.oris.ch/en-US/product/watch/divers/new-divers/01-733-7795-4057-Set",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "incl-vat",
    summary:
      "Un cadran olive inspiré d’équipements militaires vintage, dans le format très équilibré de 39 mm. La Divers Date reste une vraie plongeuse, avec 200 mètres et le Sellita éprouvé d’Oris.",
    productUrl:
      "https://www.oris.ch/en-US/product/watch/divers/new-divers/01-733-7795-4057-Set",
    imageUrl:
      "https://image.oris.ch/data/37795_0173377954057-Set_horizontale_ds.png",
    imageSource: "Oris",
    imageSourceUrl:
      "https://www.oris.ch/en-US/product/watch/divers/new-divers/01-733-7795-4057-Set",
    sources: [
      "https://www.oris.ch/en-US/product/watch/divers/new-divers/01-733-7795-4057-Set",
      "https://www.timeandwatches.com/2026/07/oris-divers-date-39mm-olive-green.html",
    ],
    sourceNotes:
      "Fiche officielle : 39 mm, acier et 20 bar / 200 m. Prix suisse public : CHF 2 450 ; l'ancienne carte affichait les prix UK/US.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-22",
  },
  {
    id: "hublot-big-bang-sapphire-sky-blue",
    price: "CHF 70,000",
    priceSourceUrl:
      "https://www.hublot.com/en-ae/watches/big-bang/big-bang-sapphire-sky-blue-44-mm",
    priceCheckedAt: "2026-08-22",
    priceMarket: "CH",
    priceTaxMode: "incl-vat",
    summary:
      "Un boîtier saphir bleu ciel, mais une vraie démonstration mécanique : le Meca-10 manuel affiche dix jours de réserve à travers une architecture entièrement ajourée. Série limitée à 100 pièces.",
    productUrl:
      "https://www.hublot.com/en-ae/watches/big-bang/big-bang-sapphire-sky-blue-44-mm",
    imageUrl:
      "https://www.hublot.com/sites/default/files/styles/boutique_hero_image_mobile/public/2026-07/Big-Bang-Sapphire-Skye-Blue-44-mm-Soldier.png?itok=v4xOlwXV",
    imageSource: "Hublot",
    imageSourceUrl:
      "https://www.hublot.com/en-ae/watches/big-bang/big-bang-sapphire-sky-blue-44-mm",
    sources: [
      "https://www.hublot.com/en-ae/watches/big-bang/big-bang-sapphire-sky-blue-44-mm",
      "https://www.hublot.com/en-int/news/big-bang-sapphire-sky-blue",
      "https://monochrome-watches.com/hublot-big-bang-sapphire-sky-blue-meca-10-44mm-introducing-price/",
    ],
    sourceNotes:
      "Référence 424.JX.5120.RX confirmée : 44 mm, 50 m, Meca-10 / 240 h, 100 pièces. Prix suisse : CHF 70 000 ; l'ancienne carte affichait une approximation USD/EUR.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-22",
  },
  {
    id: "1776-atelier-liberty-250",
    price: "US$44,000",
    priceSourceUrl: "https://1776atelier.com/products/liberty-250",
    priceCheckedAt: "2026-08-22",
    priceMarket: "US",
    priceTaxMode: "unknown",
    thickness: "10.2 mm",
    summary:
      "Une pièce américaine de haute horlogerie plus classique qu’elle n’en a l’air : or rose massif, mouvement manuel entièrement décoré et gravure à la main. La série de 25 exemplaires célèbre les 250 ans des États-Unis.",
    productUrl: "https://1776atelier.com/products/liberty-250",
    imageUrl:
      "https://1776atelier.com/cdn/shop/files/Libert250Heroshot.jpg?v=1783977373&width=1200",
    imageSource: "1776 Atelier",
    imageSourceUrl: "https://1776atelier.com/products/liberty-250",
    sources: ["https://1776atelier.com/products/liberty-250"],
    sourceNotes: "Fiche officielle : or rose 18 ct, 41 × 10,2 mm, 25 pièces et USD 44 000.",
    verified: true,
    verificationStatus: "verified",
    editorialStatus: "publishable",
    verifiedAt: "2026-08-22",
  },
];

export const independentBrands = new Set([
  "1776 Atelier",
  "Anoma",
  "Atelier Wen",
  "Brew",
  "Christopher Ward",
  "Czapek",
  "Henri Grandjean & Cie",
  "Jacques Bianchi Marseille",
  "KIWAME TOKYO",
  "Krayon",
  "Legare",
  "Maurice de Mauriac",
  "Minase",
  "Serica",
  "Speake Marin",
  "Studio Underd0g",
  "Venezianico",
  "Wren",
  "Yema",
]);
