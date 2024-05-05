/* eslint-disable max-lines */
import { Icon } from "@mui/material"
import {
  Restaurant,
  Park,
  LocalBar,
  Museum,
  Wifi,
  LocalParking,
  Accessible,
  Pets,
  FamilyRestroom,
  SmokingRooms,
  Deck,
  AcUnit,
  Checkroom,
  Wc,
  TravelExplore,
  Brush,
  Science,
  SportsBar,
  LocalBarOutlined,
  WineBar,
  Fastfood,
  RoomService,
  RestaurantMenu,
  LocalFlorist,
  Apartment,
  Forest,
  Star,
  Cancel,
} from "@mui/icons-material"

export const parkIsPublic = [
  {
    id: 1,
    name: true,
    translation: "Locations.typeOptions.park.public",
    icon: <Icon component={Park} fontSize="large" />,
  },
  {
    id: 2,
    name: false,
    translation: "Locations.typeOptions.park.private",
    icon: <Icon component={Park} fontSize="large" />,
  },
]

export const starRestaurant = [
  {
    id: 1,
    name: 1,
    icon: (
      <>
        <Icon component={Star} fontSize="large" />
      </>
    ),
    translation: "Locations.typeOptions.restaurant.starRestaurant.oneStar",
  },
  {
    id: 2,
    name: 2,
    icon: (
      <>
        <Icon component={Star} fontSize="large" />
        <Icon component={Star} fontSize="large" />
      </>
    ),
    translation: "Locations.typeOptions.restaurant.starRestaurant.twoStars",
  },
  {
    id: 3,
    name: 3,
    icon: (
      <>
        <Icon component={Star} fontSize="large" />
        <Icon component={Star} fontSize="large" />
        <Icon component={Star} fontSize="large" />
      </>
    ),
    translation: "Locations.typeOptions.restaurant.starRestaurant.threeStars",
  },
  {
    id: 0,
    name: 0,
    icon: <Icon component={Cancel} fontSize="large" />,
    translation: "Locations.typeOptions.restaurant.starRestaurant.zeroStar",
  },
]

export const artTypes = [
  {
    id: 1,
    name: "Painting",
    translation: "Locations.artTypes.painting",
  },
  {
    id: 2,
    name: "Sculpture",
    translation: "Locations.artTypes.sculpture",
  },
  {
    id: 3,
    name: "Photography",
    translation: "Locations.artTypes.photography",
  },
  {
    id: 4,
    name: "Drawing",
    translation: "Locations.artTypes.drawing",
  },
  {
    id: 5,
    name: "Installation",
    translation: "Locations.artTypes.installation",
  },
  {
    id: 6,
    name: "Performance",
    translation: "Locations.artTypes.performance",
  },
  {
    id: 7,
    name: "Digital",
    translation: "Locations.artTypes.digital",
  },
  {
    id: 8,
    name: "Mixed_media",
    translation: "Locations.artTypes.mixedMedia",
  },
]

export const artisticPeriods = [
  {
    id: 1,
    name: "Ancient",
    translation: "Locations.artisticPeriods.ancient",
  },
  {
    id: 2,
    name: "Medieval",
    translation: "Locations.artisticPeriods.medieval",
  },
  {
    id: 3,
    name: "Renaissance",
    translation: "Locations.artisticPeriods.renaissance",
  },
  {
    id: 4,
    name: "Baroque",
    translation: "Locations.artisticPeriods.baroque",
  },
  {
    id: 5,
    name: "Neoclassical",
    translation: "Locations.artisticPeriods.neoclassical",
  },
  {
    id: 6,
    name: "Romantic",
    translation: "Locations.artisticPeriods.romantic",
  },
  {
    id: 7,
    name: "Modern",
    translation: "Locations.artisticPeriods.modern",
  },
  {
    id: 8,
    name: "Contemporary",
    translation: "Locations.artisticPeriods.contemporary",
  },
]

export const locationType = [
  {
    Museum: [
      {
        id: 1,
        name: "Art",
        translation: "Locations.typeOptions.museum.art",
        icon: <Icon component={Brush} fontSize="large" />,
        selected: false,
      },
      {
        id: 2,
        name: "History",
        translation: "Locations.typeOptions.museum.history",
        icon: <Icon component={TravelExplore} fontSize="large" />,
        selected: false,
      },
      {
        id: 3,
        name: "Science",
        translation: "Locations.typeOptions.museum.science",
        icon: <Icon component={Science} fontSize="large" />,
        selected: false,
      },
    ],
  },
  {
    Bar: [
      {
        id: 1,
        name: "Cocktail_bar",
        translation: "Locations.typeOptions.bar.cocktailBar",
        icon: <Icon component={LocalBarOutlined} fontSize="large" />,
        selected: false,
      },
      {
        id: 2,
        name: "Pub",
        translation: "Locations.typeOptions.bar.pub",
        icon: <Icon component={SportsBar} fontSize="large" />,
        selected: false,
      },
      {
        id: 3,
        name: "Wine_bar",
        translation: "Locations.typeOptions.bar.wineBar",
        icon: <Icon component={WineBar} fontSize="large" />,
        selected: false,
      },
    ],
  },
  {
    Restaurant: [
      {
        id: 1,
        name: "Fast food",
        translation: "Locations.typeOptions.restaurant.fastFood",
        icon: <Icon component={Fastfood} fontSize="large" />,
        selected: false,
      },
      {
        id: 2,
        name: "Gourmet",
        translation: "Locations.typeOptions.restaurant.gourmet",
        icon: <Icon component={RoomService} fontSize="large" />,
        selected: false,
      },
      {
        id: 3,
        name: "Local",
        translation: "Locations.typeOptions.restaurant.local",
        icon: <Icon component={RestaurantMenu} fontSize="large" />,
        selected: false,
      },
    ],
  },
  {
    Park: [
      {
        id: 1,
        name: "Botanical",
        translation: "Locations.typeOptions.park.botanical",
        icon: <Icon component={LocalFlorist} fontSize="large" />,
        selected: false,
      },
      {
        id: 2,
        name: "City",
        translation: "Locations.typeOptions.park.city",
        icon: <Icon component={Apartment} fontSize="large" />,
        selected: false,
      },
      {
        id: 3,
        name: "National",
        translation: "Locations.typeOptions.park.national",
        icon: <Icon component={Forest} fontSize="large" />,
        selected: false,
      },
    ],
  },
]

export const locationStructure = [
  {
    id: 1,
    name: "Museum",
    translation: "Locations.structureOptions.museum",
    icon: <Icon component={Museum} fontSize="large" />,
    selected: false,
  },
  {
    id: 2,
    name: "Bar",
    translation: "Locations.structureOptions.bar",
    icon: <Icon component={LocalBar} fontSize="large" />,
    selected: false,
  },
  {
    id: 3,
    name: "Restaurant",
    translation: "Locations.structureOptions.restaurant",
    icon: <Icon component={Restaurant} fontSize="large" />,
    selected: false,
  },
  {
    id: 4,
    name: "Park",
    translation: "Locations.structureOptions.park",
    icon: <Icon component={Park} fontSize="large" />,
    selected: false,
  },
]

export const locationAmenities = [
  {
    id: 1,
    name: "Wifi",
    translation: "Locations.amenitiesOptions.wifi",
    icon: <Icon component={Wifi} fontSize="large" />,
    selected: false,
  },
  {
    id: 2,
    name: "Parking",
    translation: "Locations.amenitiesOptions.parking",
    icon: <Icon component={LocalParking} fontSize="large" />,
    selected: false,
  },
  {
    id: 3,
    name: "Wheelchair_accessible",
    translation: "Locations.amenitiesOptions.wheelchairAccessible",
    icon: <Icon component={Accessible} fontSize="large" />,
    selected: false,
  },
  {
    id: 4,
    name: "Pet_friendly",
    translation: "Locations.amenitiesOptions.petFriendly",
    icon: <Icon component={Pets} fontSize="large" />,
    selected: false,
  },
  {
    id: 5,
    name: "Family_friendly",
    translation: "Locations.amenitiesOptions.familyFriendly",
    icon: <Icon component={FamilyRestroom} fontSize="large" />,
    selected: false,
  },
  {
    id: 6,
    name: "Outdoor_seating",
    translation: "Locations.amenitiesOptions.outdoorSeating",
    icon: <Icon component={Deck} fontSize="large" />,
    selected: false,
  },
  {
    id: 8,
    name: "Smoking_area",
    translation: "Locations.amenitiesOptions.smokingArea",
    icon: <Icon component={SmokingRooms} fontSize="large" />,
    selected: false,
  },
  {
    id: 9,
    name: "Air_conditioning",
    translation: "Locations.amenitiesOptions.airConditioning",
    icon: <Icon component={AcUnit} fontSize="large" />,
    selected: false,
  },
  {
    id: 10,
    name: "Checkroom",
    translation: "Locations.amenitiesOptions.checkroom",
    icon: <Icon component={Checkroom} fontSize="large" />,
    selected: false,
  },
  {
    id: 11,
    name: "Restrooms",
    translation: "Locations.amenitiesOptions.restrooms",
    icon: <Icon component={Wc} fontSize="large" />,
    selected: false,
  },
]

export const locationSteps = [
  {
    stepName: "name",
    stepId: 0,
    progression: 10,
  },
  {
    stepName: "address",
    stepId: 1,
    progression: 20,
  },
  {
    stepName: "structure",
    stepId: 2,
    progression: 30,
  },
  {
    stepName: "type",
    stepId: 3,
    progression: 40,
  },
  {
    stepName: "description",
    stepId: 4,
    progression: 50,
  },
  {
    stepName: "amenities",
    stepId: 5,
    progression: 60,
  },
  {
    stepName: "pictures",
    stepId: 6,
    progression: 70,
  },
  {
    stepName: "price",
    stepId: 7,
    progression: 80,
  },
  {
    stepName: "recap",
    stepId: 8,
    progression: 90,
  },
]
