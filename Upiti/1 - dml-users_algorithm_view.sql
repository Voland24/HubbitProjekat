db.getCollection('users_algorithm_view').insertMany(
    [
        { 
            username: "mara.djo", 
            gender: "o",
            listGenders: ["m", "o"],
            listInterests: ["MUSIC", "MOVIES", "TV SHOWS"],
            listTurnOns: ["GYM", "ART"],
            listTurnOffs: ["GAMES", "ANIME"],
            longDistance: true,
            listPrefLoc: ["BEOGRAD", "NOVI SAD"],
            location: "BEOGRAD"
        },

        { 
            username: "kola.ni", 
            gender: "o",
            listGenders: ["f", "o"],
            listInterests: ["GYM", "ART", "FASHION"],
            listTurnOns: ["MUSIC", "MOVIES"],
            listTurnOffs: ["GAMES", "ANIME"],
            longDistance: true,
            listPrefLoc: ["NOVI SAD", "BEOGRAD", "NIS"],
            location: "NOVI SAD"
        },

        { 
            username: "aleks.mar", 
            gender: "o",
            listGenders: ["m", "f", "o"],
            listInterests: ["GAMES", "ANIME", "FASHION"],
            listTurnOns: ["GAMES", "ANIME"],
            listTurnOffs: ["MUSIC", "MOVIES"],
            longDistance: true,
            listPrefLoc: ["BEOGRAD", "NOVI SAD", "NIS"],
            location: "BEOGRAD"            
        },

        { 
            username: "dan.min",
            gender: "o",
            listGenders: ["m"],
            listInterests: ["STREAMING", "PETS", "GAMES"],
            listTurnOns: ["PHOTOGRAPHY", "ART"],
            listTurnOffs: ["SOCIAL MEDIA", "ANIME"],
            longDistance: false,
            listPrefLoc: ["NIS"],
            location: "NIS"
        },

        { 
            username: "stef.ana", 
            gender: "o",
            listGenders: ["f"],
            listInterests: ["PHOTOGRAPHY", "ART", "PETS"],
            listTurnOns: ["STREAMING", "GAMES"],
            listTurnOffs: ["GYM", "SOCIAL MEDIA"],
            longDistance: true,
            listPrefLoc: ["NOVI SAD", "NIS"],
            location: "NOVI SAD"
        },

        { 
            username: "miro.din", 
            gender: "o",
            listGenders: ["m", "o"],
            listInterests: ["GAMES", "SPORTS", "RELIGION"],
            listTurnOns: ["ART", "SOCIAL MEDIA"],
            listTurnOffs: ["BOOKS", "PHOTOGRAPHY"],
            longDistance: true,
            listPrefLoc: ["BEOGRAD", "KRALJEVO", "KRAGUJEVAC", "LESKOVAC"],
            location: "BEOGRAD"
        },

        { 
            username: "tam.stan", 
            gender: "f",
            listGenders: ["m"],
            listInterests: ["PETS", "GYM", "SPORTS"],
            listTurnOns: ["MUSIC", "MOVIES",],
            listTurnOffs: ["BOOKS", "GAMES",],
            longDistance: true,
            listPrefLoc: ["LESKOVAC", "NIS", "ALEKSINAC", "NOVI SAD"],
            location: "LESKOVAC"
        },

        { 
            username: "nenad.pav", 
            gender: "m",
            listGenders: ["m"],
            listInterests: ["PHOTOGRAPHY", "RELIGION", "SPORTS"],
            listTurnOns: ["GYM", "SPORTS"],
            listTurnOffs: ["SOCIAL MEDIA", "PETS"],
            longDistance: false,
            listPrefLoc: ["LESKOVAC"],
            location: "LESKOVAC"
        },

        { 
            username: "dar.milj", 
            gender: "f",
            listGenders: ["m", "f"],
            listInterests: ["ART", "PETS", "BOOKS"],
            listTurnOns: ["FASHION", "PHOTOGRAPHY"],
            listTurnOffs: ["RELIGION", "GAMES"],
            longDistance: true,
            listPrefLoc: ["NOVI SAD", "NIS", "KRALJEVO", "KRAGUJEVAC"],
            location: "NOVI SAD"
        },

        { 
            username: "mar.per", 
            gender: "m",
            listGenders: ["m", "o"],
            listInterests: ["SPORTS", "GYM", "BOOKS"],
            listTurnOns: ["FASHION", "PHOTOGRAPHY"],
            listTurnOffs: ["SOCIAL MEDIA", "GAMES"],
            longDistance: true,
            listPrefLoc: ["BEOGRAD", "NIS", "NOVI SAD", "ALEKSINAC"],
            location: "BEOGRAD"
        },

        { 
            username: "nenad.jovanovic", 
            gender: "m",
            listGenders: ["f"],
            listInterests: ["RELIGION", "PETS", "GYM"],
            listTurnOns: ["MUSIC", "MOVIES"],
            listTurnOffs: ["ANIME", "MANGA"],
            longDistance: false,
            listPrefLoc: ["BEOGRAD"],
            location: "BEOGRAD"
        },

        { 
            username: "mi.ljana",
            gender: "f",
            listGenders: ["m", "f", "o"],
            listInterests: ["MANGA", "ANIME", "PETS"],
            listTurnOns: ["RELIGION", "GAMES"],
            listTurnOffs: ["MUSIC", "BOOKS"],
            longDistance: false,
            listPrefLoc: ["NIS"],
            location: "NIS"
        },

        { 
            username: "dan.pes", 
            gender: "f",
            listGenders: ["m", "f"],
            listInterests: ["GAMES", "STREAMING", "SOCIAL MEDIA"],
            listTurnOns: ["PETS", "MANGA"],
            listTurnOffs: ["RELIGION", "SPORTS"],
            longDistance: false,
            listPrefLoc: ["NOVI SAD"],
            location: "NOVI SAD"
        }, 

        { 
            username: "darko.marinko", 
            gender: "m",
            listGenders: ["m", "f"],
            listInterests: ["GYM", "GAMES", "MUSIC"],
            listTurnOns: ["TV SHOWS", "ANIME"],
            listTurnOffs: ["RELIGION", "BOOKS"],
            longDistance: true,
            listPrefLoc: ["NIS", "BEOGRAD", "KRALJEVO", "KRAGUJEVAC"],
            location: "NIS"
        },

        { 
            username: "masa.tasic", 
            gender: "f",
            listGenders: ["m", "f"],
            listInterests: ["BOOKS", "PETS", "SOCIAL MEDIA"],
            listTurnOns: ["ART", "PHOTOGRAPHY"],
            listTurnOffs: ["FASHION", "STREAMING"],
            longDistance: true,
            listPrefLoc: ["NIS", "LESKOVAC", "KRALJEVO", "NOVI SAD"],
            location: "NIS"
        },

        { 
            username: "velj.ko", 
            gender: "m",
            listGenders: ["o", "f"],
            listInterests: ["STREAMING", "GAMES", "PETS"],
            listTurnOns: ["MUSIC", "ART"],
            listTurnOffs: ["SPORTS", "BOOKS"],
            longDistance: true,
            listPrefLoc: ["LESKOVAC", "NIS", "NOVI SAD", "BEOGRAD"],
            location: "LESKOVAC"
        },

        { 
            username: "mir.jana", 
            gender: "f",
            listGenders: ["m", "o"],
            listInterests: ["ART", "MANGA", "BOOKS"],
            listTurnOns: ["TV SHOWS", "GAMES"],
            listTurnOffs: ["PHOTOGRAPHY", "FASHION"],
            longDistance: false,
            listPrefLoc: ["LESKOVAC"],
            location: "LESKOVAC"
        },

        { 
            username: "jana.velj", 
            gender: "f",
            listGenders: ["o"],
            listInterests: ["FASHION", "STREAMING", "SOCIAL MEDIA"],
            listTurnOns: ["MUSIC", "TV SHOWS"],
            listTurnOffs: ["BOOKS", "PETS"],
            longDistance: true,
            listPrefLoc: ["ALEKSINAC", "NIS", "KRALJEVO", "LESKOVAC"],
            location: "ALEKSINAC"
        },

        { 
            username: "andja.djo", 
            gender: "f",
            listGenders: ["f"],
            listInterests: ["TV SHOWS", "GAMES", "RELIGION"],
            listTurnOns: ["PETS", "GYM"],
            listTurnOffs: ["SOCIAL MEDIA", "PHOTOGRAPHY"],
            longDistance: true,
            listPrefLoc: ["ALEKSINAC", "NIS", "KRALJEVO", "LESKOVAC"],
            location: "ALEKSINAC"
        },

        { 
            username: "mi.ljan", 
            gender: "m",
            listGenders: ["m"],
            listInterests: ["PHOTOGRAPHY", "FASHION", "SOCIAL MEDIA"],
            listTurnOns: ["PETS", "SPORTS"],
            listTurnOffs: ["GAMES", "STREAMING"],
            longDistance: true,
            listPrefLoc: ["KRALJEVO", "NIS", "KRAGUJEVAC", "LESKOVAC"],
            location: "KRALJEVO"
        },

        { 
            username: "maja.din", 
            gender: "f",
            listGenders: ["m", "f"],
            listInterests: ["STREAMING", "MANGA", "PETS"],
            listTurnOns: ["BOOKS", "GYM"],
            listTurnOffs: ["TV SHOWS", "MUSIC"],
            longDistance: true,
            listPrefLoc: ["NOVI SAD", "NIS", "KRAGUJEVAC", "BEOGRAD", "PROKUPLJE"],
            location: "NOVI SAD"
        },

        { 
            username: "pre.spas", 
            gender: "m",
            listGenders: ["o", "m"],
            listInterests: ["MUSIC", "ART", "PHOTOGRAPHY"],
            listTurnOns: ["GYM", "SPORTS"],
            listTurnOffs: ["GAMES", "ANIME"],
            longDistance: false,
            listPrefLoc: ["PROKUPLJE"],
            location: "PROKUPLJE"
        },

        { 
            username: "mar.ta", 
            gender: "f",
            listGenders: ["m"],
            listInterests: ["MOVIES", "TV SHOWS", "PETS"],
            listTurnOns: ["SPORTS", "MANGA"],
            listTurnOffs: ["SOCIAL MEDIA", "ART"],
            longDistance: true,
            listPrefLoc: ["KRAGUJEVAC", "BEOGRAD", "SMEDEREVO"],
            location: "KRAGUJEVAC"
        },

        { 
            username: "aleks.dim", 
            gender: "m",
            listGenders: ["f"],
            listInterests: ["ART", "FASHION", "TV SHOWS"],
            listTurnOns: ["MOVIES", "RELIGION"],
            listTurnOffs: ["PETS", "MANGA"],
            longDistance: true,
            listPrefLoc: ["KRALJEVO", "SMEDEREVO", "BEOGRAD", "PROKUPLJE"],
            location: "KRALJEVO"
        },

        { 
            username: "andj.dimi", 
            gender: "f",
            listGenders: ["m", "f"],
            listInterests: ["MANGA", "MOVIES", "MUSIC"],
            listTurnOns: ["ANIME", "PETS"],
            listTurnOffs: ["SOCIAL MEDIA", "STREAMING"],
            longDistance: true,
            listPrefLoc: ["KRALJEVO", "SMEDEREVO"],
            location: "KRALJEVO"
        },

        { 
            username: "ne.manja", 
            gender: "m",
            listGenders: ["f", "o"],
            listInterests: ["STREAMING", "FASHION", "ANIME"],
            listTurnOns: ["MOVIES", "MUSIC"],
            listTurnOffs: ["RELIGION", "GAMES"],
            longDistance: true,
            listPrefLoc: ["SMEDEREVO", "KRALJEVO", "BEOGRAD", "PROKUPLJE"],
            location: "SMEDEREVO"
        },

        { 
            username: "ste.fanper",
            gender: "m",
            listGenders: ["m", "f"],
            listInterests: ["GAMES", "SPORTS", "RELIGION"],
            listTurnOns: ["BOOKS", "STREAMING"],
            listTurnOffs: ["GYM", "PHOTOGRAPHY"],
            longDistance: true,
            listPrefLoc: ["SMEDEREVO", "BEOGRAD", "PROKUPLJE"],
            location: "SMEDEREVO"
        },

        { 
            username: "dusan.stef", 
            gender: "m",
            listGenders: ["f"],
            listInterests: ["BOOKS", "MUSIC", "PETS"],
            listTurnOns: ["GAMES", "SPORTS"],
            listTurnOffs: ["RELIGION", "ANIME"],
            longDistance: true,
            listPrefLoc: ["PROKUPLJE", "BEOGRAD", "SMEDEREVO"],
            location: "PROKUPLJE"
        }
    ]
)
