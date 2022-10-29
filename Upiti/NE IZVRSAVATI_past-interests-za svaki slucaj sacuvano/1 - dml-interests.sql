db.getCollection('interests').insertMany(
[
    {
        "category": "MUSIC",
        "listOfSubcategories": ["ROCK", "POP", "BLUES", "EDM", "R&B", "CLASSICAL", "RAP", "JAZZ", "PUNK", "METAL", "COUNTRY", "REGGAE"]
    },

    {
        "category": "MOVIES",
        "listOfSubcategories": ["ACTION", "COMEDY", "CRIME", "MYSTERY", "FANTASY", "HORROR", "SCI-FI", "ROMANCE", "THRILLER", "WESTERN", "ADVENTURE"]
    },

    {
        "category": "GAMES",
        "listOfSubcategories": ["SANDBOX", "RTS", "SHOOTER", "MOBA", "RPG"]
    },

    {
        "category": "ANIME",
        "listOfSubcategories": ["ACTION", "ADVENTURE", "MYSTERY", "SCI-FI", "DRAMA", "FANTASY", "MAGIC", "SUPERNATURAL", "PSYCHOLOGICAL", "COMEDY", "HORROR", "ROMANCE", "SHONEN", "SHOUJO", "SEINEN", "JOSEI", "SLICE OF LIFE"]
    },

    {
        "category": "SPORTS",
        "listOfSubcategories": ["MARTIAL ARTS", "BASKETBALL", "FOOTBALL", "SOCCER", "WATERPOLO", "ATHLETICS", "CYCLING", "HANDBALL", "VOLLEYBALL", "TENNIS"]
    },

    {
        "category": "RELIGION",
        "listOfSubcategories": ["CHRISTIANITY", "ISLAM", "HINDUISM", "BUDDHISM", "ATHEISM", "AGNOSTICISM"]
    },

    {      
        "category": "PETS",
        "listOfSubcategories": ["DOGS", "CATS", "BIRDS", "RABBITS", "FISH", "REPTILES"]
    },

    {      
        "category": "DIET",
        "listOfSubcategories": ["CARNIVORISM", "VEGANISM", "VEGETARIANISM", "PESCETARIANISM"]
    },

    {      
        "category": "BOOKS",
        "listOfSubcategories": ["ACTION", "ADVENTURE", "COMIC BOOKS", "MANGA", "MYSTERY", "FANTASY", "HISTORY", "HORROR", "FICTION", "ROMANCE", "SCI-FI", "THRILLERS", "POETRY", "CRIME"]
    }
])