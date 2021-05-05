import nocciolata from "../images/nocciolatasanslait.png";
import carbio from "../images/carrefourbio.png";
import jardinbio from "../images/jardinbio.png";
import ubio from "../images/ubio.png";
import nocciolatasans from "../images/nocciolatasanslait.png";

export const PRODUCTS = [
    {
        id: 0,
        name: "Nocciolata",
        barcode: "8001505005707",
        agribalyse_food_code: "31032",
        image: nocciolata,
        brand: "Rigoni di Asiago",
        label: "c",
        ecoscore_score: 45,
    },
    {
        id: 1,
        name: "Pâte à tartiner",
        barcode: "3560070472888",
        agribalyse_food_code: "31032",
        image: carbio,
        brand: "Carrefour Bio",
        label: "c",
        ecoscore_score: 51,
    },
    {
        id: 2,
        name: "Pâte à tartiner Chocolat Noisette",
        barcode: "3760020500658",
        agribalyse_food_code: "31032",
        image: jardinbio,
        brand: "Jardin Bio",
        label: "c",
        ecoscore_score: 51,
    },
    {
        id: 3,
        name: "Pâte à tartiner aux noisettes sans huile de palme",
        barcode: "3256226384296",
        agribalyse_food_code: "31032",
        image: ubio,
        brand: "U Bio",
        label: "c",
        ecoscore_score: 45,
    },
    {
        id: 4,
        name: "Nocciolata sans lait",
        barcode: "8001505000061",
        agribalyse_food_code: "31032",
        image: nocciolatasans,
        brand: "Rigoni di Asiago",
        label: "c",
        ecoscore_score: 45,
    },
];
