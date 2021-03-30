var interestsX = -1.66;
var interestsYStart = -.85;
var interestsStep = .933;

var interestsButtonX = 1.8;
var interestButtonMid = -1.78
var interestButtonDist = 1.1;
var bioDefaultArray = [{
        id: "bio-header",
        position: [0, 3.2],
        inner: "<h3>About Me</h3>",
    },
    {
        id: "bio-main",
        position: [0.47, 1.5],
        inner: "<p>I am a builder, an athelete, a thinker, and an explorer. I was born and raised in Orange County, California, \
        and moved with my family to the Denver area in 2011 where I attended highschool and later college. \
        While in school I was a (2x) varsity lacrosse captain, a mathelete/computer nerd, that kid that went abroad for a semester,\
        and the slowest kid on the cross country team clocking a 19 minute 5k (which ain't bad). \
        I worked in restraunts from the time I turned 16 until I received my bachelors degree, which gave me leathery skin that has followed me since. \
        <br><br>\
        I enjoy a multitude of things in my free time but narrowing them down I will start with the travel bug that I caught at a young age and seldom supress; \
        you can see some of my favorite trips below. \
        Next, helping my father with countless home improvement projects taught me that you \
        can build anything you can picture, which got me interested in craftsmanship and creating things in general. Finally I should mention my notable \
        attraction toward anything that is fast and has two wheels. I am a \
        mountain biker in the summers, a former motorcyclist, and a current e-biker. \
        <br><br>\
        I currently live in downtown Denver beside union station, and am planning to move back to California later this year. \
        I strive for originality in everything I do, and find passion contageous and motivating. I am always looking for \
        new and exciting opportunities to learn, or just generally broaden my domain. </p>",
    },
    {
        id: "bio-pic",
        position: [-1.45, 1.5],
        inner: '<img class="bio-img" src="./img/me.png">'
    },
    {
        id: "interests",
        position: [0, -.16],
        inner: "<h3>Interests</h3>",
    },
    {
        id: "wood",
        position: [interestsX, interestsYStart - interestsStep],
        inner: '<h3 class="bio-button-header">Woodworking</h3>',
        interestPage: 1,
        buttonLinked: ['wood-button', 'bikes-button', 'travel-button']
    },
    {
        id: "travel",
        position: [interestsX, interestsYStart],
        inner: '<h3 class="bio-button-header">Travel</h3>',
        interestPage: 0,
        buttonLinked: ['travel-button', 'wood-button', 'bikes-button']
    },
    {
        id: "bikes",
        position: [interestsX, interestsYStart - (2 * interestsStep)],
        inner: '<h3 class="bio-button-header">Bikes</h3>',
        interestPage: 2,
        buttonLinked: ['bikes-button', 'wood-button', 'travel-button']
    },
    {
        id: "bio-button-down",
        direction: 'down',
        position: [interestsButtonX, interestButtonMid - interestButtonDist],
        changeRate: -1
    },
    {
        id: "bio-button-up",
        direction: 'up',
        position: [interestsButtonX, interestButtonMid + interestButtonDist],
        changeRate: 1
    }
];



var slideXStep = 1;
var slide1X = -.8;
var slide2X = slide1X + slideXStep;
var slide3X = slide2X + slideXStep;

var slideY = -1.4;
var uSlideDiff = 1.4;

var travel1 = [{
        card: "s",
        id: "slide-1",
        newid: "t1-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./img/coast2.JPG"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "t1-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./img/elfie.JPG"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "t1-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./img/plane1.JPG"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "t1-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Sao Miguel Island, Azores",
        description: "The coastline containing the Ferraria Hot Springs on one of a \
            small chain of islands in the mid-Atlantic.",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "t1-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Chiang Mai, Thailand",
        description: "This is an elfie (elephant selfie), we didn't ride them, only fed them. ",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "t1-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "Sólheimasandur, Iceland",
        description: "At the site of the 1973 U.S. Navy DC plane crash on the Icelands southern \
            coast, dubbed 'Black Sand Beach'.",
        img: "./img/motorcycle1.jpg"
    }
];

var travel2 = [{
        card: "s",
        id: "slide-1",
        newid: "t2-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./img/deer.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "t2-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./img/cabo.JPG"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "t2-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./img/gladiator.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "t2-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Nara Park - Kyoto, Japan",
        description: "A national park and sacred temple, where the deer are integrated into \
            normal life. ",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "t2-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Cabo San Lucas, Mexico",
        description: "I accidenally dropped the goPro \
            which ended up taking the best photos of the entire trip. ",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "t2-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "San Quirico d'Orcia, Italy",
        description: "The fields where Maximus Desimous Meridious finally got to meet his \
            family in the afterlife. Gladiator.",
        img: "./img/motorcycle1.jpg"
    },
];

var travel3 = [{
        card: "s",
        id: "slide-1",
        newid: "t3-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./img/laos.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "t3-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./img/coast4.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "t3-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./img/australia.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "t3-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Mekong River, Golden Triangle",
        description: "A nautious day trip up river to the border town connecting Laos, Myanmar, and Thailand. ",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "t3-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Cinque Terre, Italy",
        description: "A very small and quiet fishing town in southern Italy. This was the view from \
            our one room apartment airBnB.",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "t3-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "Port Stephens, Australia",
        description: "Caravanning from the Stockton Sand Dunes to the beach to surf \
            (on some giant foam boards). ",
        img: "./img/motorcycle1.jpg"
    },
];

var travel4 = [{
        card: "s",
        id: "slide-1",
        newid: "t4-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./img/iceland-mnt.JPG"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "t4-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./img/stairs3.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "t4-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./img/bomb.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "t4-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Vík í Mýrdal, Iceland",
        description: "This whole drive was riddled with commanding ridges and small churches \
            tucked into the land. ",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "t4-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Haiku Stairs - Oahu, Hawaii",
        description: "Know as the 'Stairway to Heaven', a hike to the top of Oahu. Unfortunately \
            I went when it was cloudy. ",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "t4-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "Hiroshima, Japan",
        description: "Genbaku Dome in Hiroshima Peace Memorial Park, one of few structures that survived the bomb.",
        img: "./img/motorcycle1.jpg"
    },
];

var travel5 = [{
        card: "s",
        id: "slide-1",
        newid: "t4-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./img/frst.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "t5-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./img/buda.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "t4-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./img/aby.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "t5-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Poca Da Dona Beija, Azores",
        description: "Hot springs spread accross five or so different pools. The pools deeper into the forest \
        had warmer temperatures. ",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "t5-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Budapest, Hungary",
        description: "The Hungarian parliment building, taken from the Széchenyi Chain Bridge.",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "t5-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "Abbey Road, London",
        description: "Was next to impossible to get a photo with just our group after hours of trying, still cool for Beatles fans.",
        img: "./img/motorcycle1.jpg"
    },
];

var wood1 = [{
        card: "s",
        id: "slide-1",
        newid: "w1-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./img/prewood1.jpg"
    },
    {
        card: "s",
        newid: "w1-s2",
        id: "slide-2",
        position: [slide2X, slideY],
        description: "",
        img: "./img/table2.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "w1-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./img/finaltable.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "w1-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Pt. 1",
        description: "For this project I started with a 14-ish ft. Russian Artic Pine Slab, which they halved for me.",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "w1-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Pt. 2",
        description: "Then, I constructed a mould, and gathered 12 gallons of epoxy resin to fill in the middle of the desk.",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "w1-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "Pt. 3",
        description: "The final product, which I mounted to some cast iron legs. ",
        img: "./img/motorcycle1.jpg"
    },
];
var wood2 = [{
        card: "s",
        id: "slide-1",
        newid: "w2-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./img/bed1.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "w2-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./img/bed2.JPG"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "w2-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./img/finalbed.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "w2-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Pt. 1",
        description: "Building the frame of a bed, while fixing a storage drawer on the left side. ",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "w2-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Pt. 2",
        description: "Then fixed weathered barn wood on the sides, before ceiling it with clear stain. ",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "w2-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "Pt. 3",
        description: "The final product. ",
        img: "./img/motorcycle1.jpg"
    },
];
var wood3 = [{
        card: "s",
        id: "slide-1",
        newid: "w3-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./img/pending.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "w3-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./img/pending.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "w3-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./img/pending.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "w3-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "---",
        description: "",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "w3-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "---",
        description: "",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "w3-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "---",
        description: "",
        img: "./img/motorcycle1.jpg"
    },
];

var bike1 = [{
        card: "s",
        id: "slide-1",
        newid: "b1-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./img/motorcycle1.JPG"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "b1-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./img/bike3.PNG"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "b1-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./img/moped1.JPG"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "b1-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "Kawasaki Ninja ZX-6R",
        description: "My previous flame. No longer in my life, dont cry because its over, smile because it happened. ",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "b1-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "Super 73 - S1",
        description: "My current flame. More eco-friendly and 'safer'. ",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "b1-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "Cherry Red Mopeds",
        description: "Photo contest winning photo; post riding these around the entire country like they went faster than 35 mph.",
        img: "./img/motorcycle1.jpg"
    },
];

var bike2 = [{
        card: "s",
        id: "slide-1",
        newid: "b2-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./img/pending.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "b2-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./img/pending.jpg"
    },
    {
        card: "s",
        newid: "b2-s3",
        id: "slide-3",
        position: [slide3X, slideY],
        description: "",
        img: "./img/pending.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "b2-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "---",
        description: "",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "b2-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "---",
        description: "",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "b2-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "---",
        description: "",
        img: "./img/motorcycle1.jpg"
    },
];

var bike3 = [{
        card: "s",
        id: "slide-1",
        newid: "b3-s1",
        position: [slide1X, slideY],
        description: "",
        img: "./img/pending.jpg"
    },
    {
        card: "s",
        id: "slide-2",
        newid: "b3-s2",
        position: [slide2X, slideY],
        description: "",
        img: "./img/pending.jpg"
    },
    {
        card: "s",
        id: "slide-3",
        newid: "b3-s3",
        position: [slide3X, slideY],
        description: "",
        img: "./img/pending.jpg"
    },
    {
        card: "u",
        id: "uslide-1",
        newid: "b3-u1",
        position: [slide1X, slideY - uSlideDiff],
        header: "---",
        description: "",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-2",
        newid: "b3-u2",
        position: [slide2X, slideY - uSlideDiff],
        header: "---",
        description: "",
        img: "./img/motorcycle1.jpg"
    },
    {
        card: "u",
        id: "uslide-3",
        newid: "b3-u3",
        position: [slide3X, slideY - uSlideDiff],
        header: "---",
        description: "",
        img: "./img/motorcycle1.jpg"
    },
];

var interestPage = 0;
var currentPage = 0;

var allInterestObjs = [
    [
        travel1, travel2, travel3, travel4, travel5
    ],
    [
        wood1, wood2, wood3
    ],
    [
        bike1, bike2, bike3
    ]
];

var alternatingScenes = {
    pic1: travel1,
    pic2: travel2
}