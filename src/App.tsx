import { useState } from "react";
import OptionGroup from "./components/OptionGroup";
import Toggle from "./components/Toggle";
import CheckboxGroup from "./components/CheckboxGroup";
import Rating from "./components/Rating";
import { IconCookie } from "@tabler/icons-react";
import "./App.css";
import KeyButton from "./components/KeyButton";
import { useForm } from "@mantine/form";
import { getRankedFoods } from "./script.tsx";
import Results from "./components/Results.tsx";
import { motion } from "framer-motion";

// https://www.gcu.edu/blog/gcu-experience/most-popular-cuisines-us
// chat GPT
// Give me a list of popular authentic dishes belonging to each of the following cuisines: American, Italian, Mexican, Latin American, Caribbean, East Asian, Southeast Asian, Indian, Mediterranean, African. I would like around eight to ten dishes for each cuisine, except for the American category, which can have more than eight to ten dishes. The dishes should be mostly main dishes, diverse in flavor and texture, as well as a few desserts and snacks. Please specify whether each dish is a main, dessert, or snack.

function App() {
  const [section, setSection] = useState(0);
  // 0: basics
  // 1: savory
  // 2: sweet
  // 3: cuisines
  // 4: restrictions
  // 5: results
  const [results, setResults] = useState([""]);

  const formOne = useForm({
    initialValues: {
      sweetSavory: "sweet",
      lightHeavy: "light",
      healthyLevel: 0,
    },
    validate: {
      healthyLevel: (value) =>
        value === 0 ? "Selection required: healthy level" : null,
    },
  });

  const formTwoSavory = useForm({
    initialValues: {
      spicy: false,
      fried: false,
      carbs: false,
      cheesy: false,
      meaty: false,
      crunchy: false,
      comforting: false,
      refreshing: false,
    },
  });

  const formTwoSweet = useForm({
    initialValues: {
      warm: false,
      fruity: false,
      chocolatey: false,
      baked: false,
      creamy: false,
      nutty: false,
    },
  });

  const formThree = useForm({
    initialValues: {
      american: false,
      italian: false,
      mexican: false,
      latinAmerican: false,
      caribbean: false,
      eastAsian: false,
      southeastAsian: false,
      indian: false,
      mediterranean: false,
      african: false,
    },
  });

  const formFour = useForm({
    initialValues: {
      veg: false,
      gf: false,
      df: false,
    },
  });

  const nextPage = () => {
    if (section === 0 && formOne.values.sweetSavory == "savory") {
      setSection(1);
    } else if (section === 0) {
      setSection(2);
    } else if (section === 1 || section === 2) {
      setSection(3);
    } else {
      setSection(4);
    }
  };

  function chooseFormTwo() {
    if (formOne.values.sweetSavory == "sweet") {
      return formTwoSweet;
    }
    return formTwoSavory;
  }

  return (
    <>
      <h1 hidden={section === 5}>cravie</h1>
      <p hidden={section !== 0}>
        Need help deciding what to eat? Select your preferences below and hit
        the cookie to generate suggestions!
      </p>
      <br hidden={section === 0} />

      <div className="card">
        {section === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <form
              onSubmit={formOne.onSubmit((values) => {
                console.log(values);
                nextPage();
              })}
            >
              <div className="question-category">
                <h3>The Basics</h3>
                <i>What are you looking for?</i>
              </div>

              <br></br>

              <OptionGroup
                name="sweetSavory"
                options={["sweet", "savory"]}
                form={formOne}
              />
              <br />

              <OptionGroup
                name="lightHeavy"
                options={["light", "middle", "heavy"]}
                form={formOne}
              />

              <Rating name="healthyLevel" form={formOne} />
              <br></br>

              <button
                className="next"
                type="submit"
                disabled={!formOne.isValid()}
              >
                Next
              </button>
            </form>
          </motion.div>
        )}

        {section === 1 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <form
              onSubmit={formTwoSavory.onSubmit((values) => {
                console.log(values);
                nextPage();
              })}
            >
              <div className="question-category">
                <h3>Keywords</h3>
                <i>Flavors? Textures? Feelings? Click 'em!</i>
              </div>
              <br></br>
              <div className="row">
                <div className="column">&nbsp;</div>
                <div className="column">
                  <KeyButton
                    name="spicy"
                    label="spicy"
                    form={formTwoSavory}
                  ></KeyButton>
                  <KeyButton
                    name="fried"
                    label="fried"
                    form={formTwoSavory}
                  ></KeyButton>
                  <KeyButton
                    name="carbs"
                    label="carbs"
                    form={formTwoSavory}
                  ></KeyButton>
                  <KeyButton
                    name="cheesy"
                    label="cheesy"
                    form={formTwoSavory}
                  ></KeyButton>
                  <KeyButton
                    name="meaty"
                    label="meaty"
                    form={formTwoSavory}
                  ></KeyButton>
                  <KeyButton
                    name="crunchy"
                    label="crunchy"
                    form={formTwoSavory}
                  ></KeyButton>
                  <KeyButton
                    name="comforting"
                    label="comforting"
                    form={formTwoSavory}
                  ></KeyButton>
                  <KeyButton
                    name="refreshing"
                    label="refreshing"
                    form={formTwoSavory}
                  ></KeyButton>
                </div>
              </div>
              <br></br>
              <br></br>
              <button className="next" type="submit">
                Next
              </button>
            </form>
          </motion.div>
        )}

        {section === 2 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <form
              onSubmit={formTwoSweet.onSubmit((values) => {
                console.log(values);
                nextPage();
              })}
            >
              <div className="question-category">
                <h3>Keywords</h3>
                <i>Ingredients? Flavors? Textures? Click 'em!</i>
              </div>
              <br></br>
              <div className="row">
                <div className="column">&nbsp;</div>
                <div className="column">
                  <KeyButton
                    name="warm"
                    label="warm"
                    form={formTwoSweet}
                  ></KeyButton>
                  <KeyButton
                    name="fruity"
                    label="fruity"
                    form={formTwoSweet}
                  ></KeyButton>
                  <KeyButton
                    name="chocolatey"
                    label="chocolatey"
                    form={formTwoSweet}
                  ></KeyButton>
                  <KeyButton
                    name="creamy"
                    label="creamy"
                    form={formTwoSweet}
                  ></KeyButton>
                  <KeyButton
                    name="baked"
                    label="baked"
                    form={formTwoSweet}
                  ></KeyButton>
                  <KeyButton
                    name="nutty"
                    label="nutty"
                    form={formTwoSweet}
                  ></KeyButton>
                </div>
              </div>
              <br></br>
              <br></br>
              <button className="next" type="submit">
                Next
              </button>
            </form>
          </motion.div>
        )}

        {section === 3 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <form
              onSubmit={formThree.onSubmit((values) => {
                console.log(values);
                nextPage();
              })}
            >
              <div className="question-category">
                <h3>Cuisines</h3>
                <i>Select any cuisines you're down with</i>
              </div>

              <br></br>
              <CheckboxGroup
                form={formThree}
                options={[
                  { title: "American", name: "american", image: "🍔" },
                  { title: "Italian", name: "italian", image: "🍝" },
                  { title: "Mexican", name: "mexican", image: "🌮" },
                  {
                    title: "Latin American",
                    name: "latinAmerican",
                    image: "🫔",
                  },
                  { title: "Caribbean", name: "caribbean", image: "🍗" },
                  { title: "East Asian", name: "eastAsian", image: "🍣" },
                  {
                    title: "Southeast Asian",
                    name: "southeastAsian",
                    image: "🍲",
                  },
                  { title: "Indian", name: "indian", image: "🍛" },
                  {
                    title: "Mediterranean",
                    name: "mediterranean",
                    image: "🥙",
                  },
                  { title: "African", name: "african", image: "🥘" },
                  // { title: "All of the above", image: "🌈" },
                  // { title: "American", image: "🍔" },
                  // { title: "Chinese", image: "🥡" },
                  // { title: "Cuban", image: "🍛" },
                  // { title: "Greek", image: "🥙" },
                  // { title: "Indian", image: "🍛" },
                  // { title: "Italian", image: "🍝" },
                  // { title: "Japanese", image: "🍣" },
                  // { title: "Korean", image: "🍲" },
                  // { title: "Mexican", image: "🌮" },
                  // { title: "Thai", image: "🍲" },
                  // { title: "Vietnamese", image: "🍜" },
                ]}
              />
              <br></br>
              <br></br>
              <br></br>
              <button className="next" type="submit">
                Next
              </button>
            </form>
          </motion.div>
        )}

        {section === 4 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <form
              onSubmit={formFour.onSubmit((values) => {
                console.log(values);
                nextPage();
              })}
            >
              <div className="question-category">
                <h3>Dietary Restrictions</h3>
                <i>No moo, no worries!</i>
              </div>
              <br></br>
              <div className="row">
                <div className="column">&nbsp;</div>
                <div className="column-toggle">
                  <Toggle name="veg" label="Vegetarian/Vegan" form={formFour} />
                  <Toggle name="gf" label="Gluten-free" form={formFour} />
                  <Toggle name="df" label="Dairy-free" form={formFour} />
                </div>
              </div>
              <br></br>
              <br></br>
              <IconCookie
                size={96}
                color="orange"
                fill="orange"
                className="cookie"
                onClick={() => {
                  setSection(-1);
                  document.body.style.background = "#5fa3ac";
                  getRankedFoods(
                    formOne.values,
                    chooseFormTwo().values,
                    formThree.values,
                    formFour.values
                  )
                    .then((res) => {
                      setResults(res);
                      console.log("results:", results);
                      setSection(5);
                    })
                    .catch((err) => console.log("results error:", err));
                }}
              ></IconCookie>
              <br></br>
              <h3 className="clickme">I'm ready!</h3>
              <br></br>
              <br></br>
              <br></br>
            </form>
          </motion.div>
        )}
        {section === 5 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <Results
              resultOne={results.length == 3 ? results[0] : "..."}
              resultTwo={results.length == 3 ? results[1] : "..."}
              resultThree={results.length == 3 ? results[2] : "..."}
            />
            <br></br>
            <br></br>
            <br></br>
            <button className="next" onClick={() => window.location.reload()}>
              Start Over
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default App;
