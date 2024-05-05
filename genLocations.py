# Code pour générer des locations dans la base de données, cette version ne fonctionne pas !

import requests
import math
# Définition des données de la requête
# "Parking", "Outdoor_seating",
data = {
    "name": "Bar 0",
    "address": {
        "street": "2223 Boulevard Montmartre",
        "city": "Paris",
        "zipcode": "75002",
        "country": "France"
    },
    "structure": "Bar",
    "type": {
        "typeName": "Pub",
        "artisticPeriod": "",
        "artType": "",
        "isPublic": True,
        "stars": "",
    },
    "amenities": ["Parking", "Outdoor_seating"],
    "description": "Le barrrrr est decrit iciciicicici",
    "price": 0,
    "priceRange": 2,
    "isExactPrice": False,
    "isFree": True,
    "pictures": ["1713275049993-bar.jpeg", "1713275059580-parc.jpeg", "1713275064323-restaurant.jpeg", "1713275053349-musee.jpeg"],
    "isActive": True,
    "isDisabled": False,
    "creationState": 0,
    "authorId": "65ff49b4b18bf02e03cfaa73",
    "__v": 0
}

# Boucle pour envoyer la requête 20 fois
for _ in range(20):
    # Ajout de 1 à la location 50
    data["name"] = "Bar " + str(int(data["name"].split(" ")[1]) + 1)

    # Envoi de la requête POST
    response = requests.post(
        "http://localhost:3000/api/locations/newlocation", json=data)

    # Vérification du code de statut de la réponse
    if response.status_code == 200:
        print("Requête envoyée avec succès pour la location", data["name"])
    else:
        print("Erreur lors de l'envoi de la requête pour la location",
              data["name"])
