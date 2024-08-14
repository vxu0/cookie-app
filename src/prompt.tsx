import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const lightLevelToPhrase = ["light", "not too heavy nor light", "heavy"];

const healthLevelToPhrase = [
  "healthy",
  "fairly healthy",
  "fairly indulgent",
  "indulgent",
];

const abbreviations: { [key: string]: string } = {
  veg: "vegetarian/vegan",
  gf: "gluten-free",
  df: "dairy-free",
  carbs: "carb-heavy",
  african: "African",
  american: "American",
  caribbean: "Caribbean",
  eastAsian: "East Asian",
  indian: "Indian",
  italian: "Italian",
  latinAmerican: "Latin American",
  mediterranean: "Mediterranean",
  mexican: "Mexican",
  southeastAsian: "Southeast Asian",
};

function abbrToWord(abbr: string) {
  return abbreviations[abbr] ? abbreviations[abbr] : abbr;
}

function listToPhrase(list: string[]) {
  var words = Array.prototype.map.call(list, (abbr: string) => {
    return abbrToWord(abbr);
  });
  if (words.length === 1) {
    return words[0];
  }
  if (words.length === 2) {
    return words[0] + " and " + words[1];
  }
  var phrase = Array.prototype.slice.call(words, 0, -1).join(", ");
  phrase = phrase.concat(", and " + Array.prototype.at.call(words, -1));
  return phrase;
}

function objToList(obj: { [key: string]: boolean }) {
  var lis = Object.keys(obj).filter((key) => obj[key]);
  return lis;
}

async function generate(
  sweet: boolean,
  lightLevel: number,
  healthLevel: number,
  keywords: { [key: string]: boolean },
  cuisines: { [key: string]: boolean },
  restrictions: { [key: string]: boolean }
) {
  console.log("in generate fn");
  console.log(arguments);
  const prompt = `Recommend a ${sweet ? "sweet" : "savory"} dish that is ${
    lightLevelToPhrase[lightLevel - 1]
  } and ${healthLevelToPhrase[healthLevel - 1]}.${
    keywords ? ` It should be ${listToPhrase(objToList(keywords))}.` : ""
  }${
    cuisines
      ? ` Specific cuisines including ${listToPhrase(
          objToList(cuisines)
        )} are favored.`
      : ""
  }${
    restrictions ? ` It must be ${listToPhrase(objToList(restrictions))}.` : ""
  } Provide two more options. Respond with only the dish names separated by commas and no other punctuation.`;
  console.log("PROMPT:", prompt);
  // return prompt;
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-4o-mini",
  });
  console.log(chatCompletion);
  return chatCompletion.choices[0].message.content?.split(",");
}

export default generate;
