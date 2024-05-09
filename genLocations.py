import requests
import random
import math

locationsId = []

with open("locations.txt", "r") as f:
    for line in f:
        locationsId.append(line.strip())


barPictures = ["bar1.jpeg", "bar2.jpeg", "bar3.jpeg", "bar4.jpeg", "bar5.jpeg"]
restauPictures = ["restau1.jpg", "restau2.webp",
                  "restau3.jpeg", "restau4.webp", "restau5.jpeg"]
museumPictures = ["muse1.webp", "muse2.webp",
                  "muse3.webp", "muse4.webp", "muse5.webp"]
parkPictures = ["park1.jpeg", "park2.jpeg",
                "park3.avif", "park4.jpeg", "park5.jpeg"]

barNames = ["Le bar de la rue", "Le bar de la place", "Au bar du coin", "Le bar du quartier", "Barmageddon",
            "Le bar de la plage", "Le bar de la montagne", "Le bar de la ville", "Le bar de la campagne",
            "Le bar de la forêt", "Le bar de la mer", "Le bar de la montagne"]
restauNames = ["Le restaurant de la rue", "Le restaurant de la place", "Au restaurant du coin",
               "Le restaurant du quartier", "Restaurama", "Le restaurant de la plage", "Le restaurant de la montagne",
               "Le restaurant de la ville", "Le restaurant de la campagne", "Le restaurant de la forêt",
               "Le restaurant de la mer", "Le restaurant de la montagne"]
museumNames = ["Le musée de la rue", "Le musée de la place", "Au musée du coin", "Le musée du quartier",
               "Museorama", "Le musée de la plage", "Le musée de la montagne", "Le musée de la ville",
               "Le musée de la campagne", "Le musée de la forêt", "Le musée de la mer", "Le musée de la montagne"]
parkNames = ["Le parc de la rue", "Le parc de la place", "Au parc du coin", "Le parc du quartier", "Parcorama",
             "Le parc de la plage", "Le parc de la montagne", "Le parc de la ville", "Le parc de la campagne",
             "Le parc de la forêt", "Le parc de la mer", "Le parc de la montagne"]

barDescriptions = ["Le bar est situé dans la rue principale du quartier, il est ouvert tous les jours de la semaine. "
                   "Venez déguster des cocktails et des bières artisanales dans une ambiance chaleureuse. Perso j'adore !",
                   "Le bar est situé sur la place du village, il est ouvert tous les jours de la semaine. "
                   "Venez déguster des cocktails et des bières artisanales dans une ambiance chaleureuse. Perso j'adore !",
                   "Le bar est situé dans le coin de la rue, il est ouvert tous les jours de la semaine. "
                   "Venez déguster des cocktails et des bières artisanales dans une ambiance chaleureuse. Perso j'adore !",
                   "Le bar est situé dans le quartier, il est ouvert tous les jours de la semaine. "
                   "Venez déguster des cocktails et des bières artisanales dans une ambiance chaleureuse. Perso j'adore !",
                   "Le bar est situé sur la plage, il est ouvert tous les jours de la semaine. "
                   "Venez déguster des cocktails et des bières artisanales dans une ambiance chaleureuse. Perso j'adore !",
                   "Le bar est situé sur la montagne, il est ouvert tous les jours de la semaine. "
                   "Venez déguster des cocktails et des bières artisanales dans une ambiance chaleureuse. Perso j'adore !",
                   "Le bar est situé dans la ville, il est ouvert tous les jours de la semaine. "
                   "Venez déguster des cocktails et des bières artisanales dans une ambiance chaleureuse. Perso j'adore !",
                   "Le bar est situé dans la campagne, il est ouvert tous les jours de la semaine. "
                   "Venez déguster des cocktails et des bières artisanales dans une ambiance chaleureuse. Perso j'adore !",
                   "Le bar est situé dans la forêt, il est ouvert tous les jours de la semaine. "
                   "Venez déguster des cocktails et des bières artisanales dans une ambiance chaleureuse. Perso j'adore !",
                   "Le bar est situé sur la mer, il est ouvert tous les jours de la semaine. "
                   "Venez déguster des cocktails et des bières artisanales dans une ambiance chaleureuse. Perso j'adore !"]

restauDescriptions = ["Le restaurant est situé dans la rue principale du quartier, il est ouvert tous les jours de la semaine. "
                      "Venez déguster des plats traditionnels et des spécialités locales dans une ambiance chaleureuse. Perso j'adore !",
                      "Le restaurant est situé sur la place du village, il est ouvert tous les jours de la semaine. "
                      "Venez déguster des plats traditionnels et des spécialités locales dans une ambiance chaleureuse. Perso j'adore !",
                      "Le restaurant est situé dans le coin de la rue, il est ouvert tous les jours de la semaine. "
                      "Venez déguster des plats traditionnels et des spécialités locales dans une ambiance chaleureuse. Perso j'adore !",
                      "Le restaurant est situé dans le quartier, il est ouvert tous les jours de la semaine. "
                      "Venez déguster des plats traditionnels et des spécialités locales dans une ambiance chaleureuse. Perso j'adore !",
                      "Le restaurant est situé sur la plage, il est ouvert tous les jours de la semaine. "
                      "Venez déguster des plats traditionnels et des spécialités locales dans une ambiance chaleureuse. Perso j'adore !",
                      "Le restaurant est situé sur la montagne, il est ouvert tous les jours de la semaine. "
                      "Venez déguster des plats traditionnels et des spécialités locales dans une ambiance chaleureuse. Perso j'adore !",
                      "Le restaurant est situé dans la ville, il est ouvert tous les jours de la semaine. "
                      "Venez déguster des plats traditionnels et des spécialités locales dans une ambiance chaleureuse. Perso j'adore !",
                      "Le restaurant est situé dans la campagne, il est ouvert tous les jours de la semaine. "
                      "Venez déguster des plats traditionnels et des spécialités locales dans une ambiance chaleureuse. Perso j'adore !",
                      "Le restaurant est situé dans la forêt, il est ouvert tous les jours de la semaine. "
                      "Venez déguster des plats traditionnels et des spécialités locales dans une ambiance chaleureuse. Perso j'adore !",
                      "Le restaurant est situé sur la mer, il est ouvert tous les jours de la semaine. "
                      "Venez déguster des plats traditionnels et des spécialités locales dans une ambiance chaleureuse. Perso j'adore !"]

museumDescriptions = ["Le musée est situé dans la rue principale du quartier, il est ouvert tous les jours de la semaine. "
                      "Venez découvrir des expositions temporaires et permanentes dans une ambiance chaleureuse. Perso j'adore !",
                      "Le musée est situé sur la place du village, il est ouvert tous les jours de la semaine. "
                      "Venez découvrir des expositions temporaires et permanentes dans une ambiance chaleureuse. Perso j'adore !",
                      "Le musée est situé dans le coin de la rue, il est ouvert tous les jours de la semaine. "
                      "Venez découvrir des expositions temporaires et permanentes dans une ambiance chaleureuse. Perso j'adore !",
                      "Le musée est situé dans le quartier, il est ouvert tous les jours de la semaine. "
                      "Venez découvrir des expositions temporaires et permanentes dans une ambiance chaleureuse. Perso j'adore !",
                      "Le musée est situé sur la plage, il est ouvert tous les jours de la semaine. "
                      "Venez découvrir des expositions temporaires et permanentes dans une ambiance chaleureuse. Perso j'adore !",
                      "Le musée est situé sur la montagne, il est ouvert tous les jours de la semaine. "
                      "Venez découvrir des expositions temporaires et permanentes dans une ambiance chaleureuse. Perso j'adore !",
                      "Le musée est situé dans la ville, il est ouvert tous les jours de la semaine. "
                      "Venez découvrir des expositions temporaires et permanentes dans une ambiance chaleureuse. Perso j'adore !",
                      "Le musée est situé dans la campagne, il est ouvert tous les jours de la semaine. "
                      "Venez découvrir des expositions temporaires et permanentes dans une ambiance chaleureuse. Perso j'adore !",
                      "Le musée est situé dans la forêt, il est ouvert tous les jours de la semaine. "
                      "Venez découvrir des expositions temporaires et permanentes dans une ambiance chaleureuse. Perso j'adore !",
                      "Le musée est situé sur la mer, il est ouvert tous les jours de la semaine. "
                      "Venez découvrir des expositions temporaires et permanentes dans une ambiance chaleureuse. Perso j'adore !"]

parkDescriptions = ["Le parc est situé dans la rue principale du quartier, il est ouvert tous les jours de la semaine. "
                    "Venez vous promener et vous détendre dans un cadre verdoyant et paisible. Perso j'adore !",
                    "Le parc est situé sur la place du village, il est ouvert tous les jours de la semaine. "
                    "Venez vous promener et vous détendre dans un cadre verdoyant et paisible. Perso j'adore !",
                    "Le parc est situé dans le coin de la rue, il est ouvert tous les jours de la semaine. "
                    "Venez vous promener et vous détendre dans un cadre verdoyant et paisible. Perso j'adore !",
                    "Le parc est situé dans le quartier, il est ouvert tous les jours de la semaine. "
                    "Venez vous promener et vous détendre dans un cadre verdoyant et paisible. Perso j'adore !",
                    "Le parc est situé sur la plage, il est ouvert tous les jours de la semaine. "
                    "Venez vous promener et vous détendre dans un cadre verdoyant et paisible. Perso j'adore !",
                    "Le parc est situé sur la montagne, il est ouvert tous les jours de la semaine. "
                    "Venez vous promener et vous détendre dans un cadre verdoyant et paisible. Perso j'adore !",
                    "Le parc est situé dans la ville, il est ouvert tous les jours de la semaine. "
                    "Venez vous promener et vous détendre dans un cadre verdoyant et paisible. Perso j'adore !",
                    "Le parc est situé dans la campagne, il est ouvert tous les jours de la semaine. "
                    "Venez vous promener et vous détendre dans un cadre verdoyant et paisible. Perso j'adore !",
                    "Le parc est situé dans la forêt, il est ouvert tous les jours de la semaine. "
                    "Venez vous promener et vous détendre dans un cadre verdoyant et paisible. Perso j'adore !",
                    "Le parc est situé sur la mer, il est ouvert tous les jours de la semaine. "
                    "Venez vous promener et vous détendre dans un cadre verdoyant et paisible. Perso j'adore !"]

Amenities = ["Wifi", "Parking", "Wheelchair_accessible", "Pet_friendly", "Family_friendly",
             "Outdoor_seating", "Restrooms", "Checkroom", "Air_conditioning", "Smoking_area"]

streetNames = ["Rue de la Paix", "Avenue des Champs-Elysées", "Boulevard Haussmann", "Rue de Rivoli", "Rue de la Roquette",
               "Rue de la République", "Rue de la Gare", "Rue de la Mairie", "Rue de la Poste", "Rue de la Liberté",
               "Rue de la Plage", "Rue de la Montagne", "Rue de la Ville", "Rue de la Campagne", "Rue de la Forêt", "Rue de la Mer"]

citiesFrance = ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux",
                "Lille", "Rennes", "Reims", "Le Havre", "Saint-Etienne", "Toulon", "Grenoble", "Dijon", "Angers", "Nîmes", "Villeurbanne"]

citiesGermany = ["Berlin", "Hambourg", "Munich", "Cologne", "Francfort", "Stuttgart", "Düsseldorf", "Dortmund", "Essen",
                 "Leipzig", "Bremen", "Dresde", "Hanovre", "Nuremberg", "Duisbourg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster"]

citiesItaly = ["Rome", "Milan", "Naples", "Turin", "Palermo", "Gênes", "Bologne", "Florence", "Bari", "Catane",
               "Venise", "Vérone", "Messine", "Padoue", "Trieste", "Brescia", "Prato", "Reggio de Calabre", "Modène", "Livourne"]

citiesSpain = ["Madrid", "Barcelone", "Valence", "Séville", "Zaragoza", "Málaga", "Murcie", "Palma", "Las Palmas", "Bilbao",
               "Alicante", "Cordoue", "Valladolid", "Vigo", "Gijón", "Hospitalet de Llobregat", "La Corogne", "Elche", "Oviedo", "Badalone"]

citiesUnitedKingdom = ["Londres", "Birmingham", "Glasgow", "Liverpool", "Bristol", "Manchester", "Sheffield", "Newcastle", "Leeds",
                       "Edimbourg", "Leicester", "Coventry", "Belfast", "Nottingham", "Southampton", "Cardiff", "Kingston", "Reading", "Aberdeen", "Plymouth"]

citiesNetherlands = ["Amsterdam", "Rotterdam", "La Haye", "Utrecht", "Eindhoven", "Tilbourg", "Groningue", "Almere", "Breda", "Nijmegen",
                     "Enschede", "Haarlem", "Arnhem", "Zaanstad", "Amersfoort", "Apeldoorn", "s-Hertogenbosch", "Haarlemmermeer", "Zwolle", "Leiden"]

countries = ["France", "Germany", "Italy",
             "Spain", "United Kingdom", "Netherlands"]

structure = ["Bar", "Restaurant", "Museum", "Park"]

museumTypes = ["Science", "Art", "History"]

barTypes = ["Pub", "Cocktail_bar", "Wine_bar"]

restaurantTypes = ["Gourmet", "Fast food", "Local"]

parkTypes = ["City", "Botanical", "National"]

authorId = [
    "663cf22d62646e6de3cedc69",
    "663d0ad362646e6de3cedc7a",
    "663d0b4962646e6de3cedc85",
    "663d0b9662646e6de3cedc8d",
    "663d0be162646e6de3cedc95",
    "663d0c3d62646e6de3cedc9d",
    "663d0c8762646e6de3cedca7",
    "663d0cd362646e6de3cedcaf"

]

artistictPeriod = ["Ancient", "Medieval", "Renaissance",
                   "Baroque", "Neoclassical", "Romantic", "Modern", "Contemporary"]

artType = ["Painting", "Sculpture", "Photography", "Drawing", "Installation",
           "Performance", "Digital", "Mixed_media"]

data = {
}


def generateLocation():
    data["structure"] = structure[math.floor(random.random() * 4)]

    data["isFree"] = random.choice([True, False])

    if data["isFree"] == False:
        data["priceRange"] = random.randint(1, 5)
        data["isExactPrice"] = random.choice([True, False])
        data["price"] = random.randint(1, 100)
    for _ in range(math.floor(random.random() * 10)):
        data["amenities"].append(Amenities[math.floor(random.random() * 10)])

    if data["structure"] == "Bar":
        data["name"] = barNames[math.floor(random.random() * len(barNames))]
        data["description"] = barDescriptions[math.floor(
            random.random() * len(barDescriptions))]
        data["type"]["typeName"] = barTypes[math.floor(
            random.random() * len(barTypes))]
        for _ in range(math.floor(random.random() * 4) + 1):
            data["pictures"].append(
                barPictures[math.floor(random.random() * len(barPictures))])

    elif data["structure"] == "Restaurant":
        data["name"] = restauNames[math.floor(
            random.random() * len(restauNames))]
        data["description"] = restauDescriptions[math.floor(
            random.random() * len(restauDescriptions))]
        data["type"]["typeName"] = restaurantTypes[math.floor(
            random.random() * len(restaurantTypes))]
        for _ in range(math.floor(random.random() * 4) + 1):
            data["pictures"].append(
                restauPictures[math.floor(random.random() * len(restauPictures))])

    elif data["structure"] == "Museum":
        data["name"] = museumNames[math.floor(
            random.random() * len(museumNames))]
        data["description"] = museumDescriptions[math.floor(
            random.random() * len(museumDescriptions))]
        data["type"]["typeName"] = museumTypes[math.floor(
            random.random() * len(museumTypes))]
        data["type"]["artisticPeriod"] = artistictPeriod[math.floor(
            random.random() * len(artistictPeriod))]
        data["type"]["artType"] = artType[math.floor(
            random.random() * len(artType))]
        for _ in range(math.floor(random.random() * 4) + 1):
            data["pictures"].append(
                museumPictures[math.floor(random.random() * len(museumPictures))])

    elif data["structure"] == "Park":
        data["name"] = parkNames[math.floor(random.random() * len(parkNames))]
        data["description"] = parkDescriptions[math.floor(
            random.random() * len(parkDescriptions))]
        data["type"]["typeName"] = parkTypes[math.floor(
            random.random() * len(parkTypes))]
        data["type"]["isPublic"] = random.choice([True, False])
        for _ in range(math.floor(random.random() * 4) + 1):
            data["pictures"].append(
                parkPictures[math.floor(random.random() * len(parkPictures))])

    data["address"]["street"] = str(math.floor(random.random(
    ) * 199)) + " " + streetNames[math.floor(random.random() * len(streetNames))]
    data["address"]["city"] = citiesFrance[math.floor(
        random.random() * len(citiesFrance))]
    data["address"]["country"] = countries[math.floor(
        random.random() * len(countries))]
    data["address"]["zipcode"] = random.randint(10000, 99999)


def generateLocationData():
    data["authorId"] = authorId[math.floor(random.random() * len(authorId))]
    data["amenities"] = []
    data["type"] = {}
    data["pictures"] = []
    data["address"] = {}
    data["isActive"] = True
    generateLocation()
    return data


def sendData(data):
    response = requests.post(
        "http://localhost:3000/api/locations/newlocation", json=data)
    resjson = response.json()
    resjson = resjson["locationId"]
    with open("locations.txt", "a") as f:
        f.write(resjson + "\n")

    print(resjson)


comments = [
    "Super endroit, j'ai adoré !",
    "Très bon accueil, je recommande !",
    "Les cocktails sont délicieux !",
    "Le personnel est très sympa !",
    "Le cadre est magnifique !",
    "Je reviendrai avec plaisir !",
    "Très bonne ambiance !",
    "Les plats sont excellents !",
    "Les expositions sont très intéressantes !",
    "Le parc est très agréable !",
    "Les oeuvres sont magnifiques !",
    "Les animations sont top !",
    "Les concerts sont géniaux !",
    "Les spectacles sont super !",
    "Mouais, sans plus...",
    "Je n'ai pas aimé...",
    "Je ne recommande pas...",
    "Je suis déçu, je ne reviendrai pas",
    "Je n'ai pas aimé du tout !",
    "Je suis très déçu !",
    "Franchement, c'est nul, passez votre chemin...",
    "Je ne comprends pas les avis positifs...",
    "Je ne recommande pas du tout !",
    "Je suis très déçu, je ne reviendrai pas...",
    "Je n'ai pas aimé du tout, je ne recommande pas...",
    "Je suis très déçu, je ne reviendrai pas...",
    "Je n'ai pas aimé du tout, je ne recommande pas..."
]


def generateComments():
    for locationId in locationsId:
        for _ in range(math.floor(random.random() * 6)):
            comment = {}
            comment["userId"] = authorId[math.floor(
                random.random() * len(authorId))]
            comment["rating"] = random.randint(3, 5)

            # needComment = random.choice([True, False])
            # if needComment:
            #     comment["comment"] = comments[math.floor(
            #         random.random() * len(comments))]
            sendComment(comment, locationId)


def sendComment(comment, locationId):
    response = requests.post(
        "http://localhost:3000/api/locations/comments/" + locationId, json=comment)
    resjson = response.json()
    print(resjson)
    print(locationId)
    print("Comment generated !")


def generateLikes():
    for userId in authorId:
        for _ in range(math.floor(random.random() * 20) + 10):
            locationId = locationsId[math.floor(
                random.random() * len(locationsId))]
            sendLike(userId, locationId)


def sendLike(userId, locationId):
    response = requests.post(
        "http://localhost:3000/api/locations/likes", json={"userId": userId, "locationId": locationId})
    resjson = response.json()
    print(resjson)


while True:
    action = input("Do you want to generate a location ? (y/n) ")

    if action != "y" and action != "n":
        break

    if action == "y":
        inputNbrToGenerate = input(
            "How many locations do you want to generate ? ")

        for _ in range(int(inputNbrToGenerate)):
            data = generateLocationData()
            sendData(data)
            print("Location generated !")

    if action == "n":
        action2 = input("Do you want to generate a comment an like ? (y/n) ")

        # generateLikes()
        generateComments()
