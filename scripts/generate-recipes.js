import { writeFileSync } from "fs";

const CUISINES = [
  "Italian",
  "Thai",
  "Mexican",
  "Japanese",
  "French",
  "Chinese",
  "Indian",
  "Mediterranean",
  "American",
  "Spanish",
];
const ADJECTIVES = [
  "Savory",
  "Tangy",
  "Smoky",
  "Earthy",
  "Fragrant",
  "Succulent",
  "Crispy",
  "Buttery",
  "Hearty",
  "Tender",
];
const NOUNS = [
  "Rice",
  "Pasta",
  "Noodles",
  "Bread",
  "Soup",
  "Salad",
  "Stew",
  "Curry",
  "Sushi",
  "Taco",
  "Pizza",
  "Burger",
  "Sandwich",
  "Wrap",
  "Dumpling",
  "Paella",
  "Ramen",
  "Burrito",
];

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const receipes = Array.from({ length: 5000 }, (_, i) => {
  const id = i + 1;
  const name = `${randomFrom(ADJECTIVES)} ${randomFrom(NOUNS)}`;
  return {
    id,
    name: `${name} #${id}`,
    cuisine: randomFrom(CUISINES),
    servings: Number(Math.floor(Math.random() * 10)) + 1,
    minutes: Math.floor(Math.random() * 120) + 1,
  };
});

const fileContents = `// data/mockRecipesData.js\nexport const mockRecipes = ${JSON.stringify(receipes, null, 2)};\n`;

writeFileSync("data/mockRecipesData.js", fileContents);
console.log(`Generated ${receipes.length} receipes to data/mockRecipesData.js`);
