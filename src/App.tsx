import { useState } from "react";
import { useForm } from "@mantine/form";
import MotionWrapper from "./components/MotionWrapper.tsx";
import "./App.css";
import PageBasics from "./components/Pages/PageBasics.tsx";
import PageKeywords from "./components/Pages/PageKeywords.tsx";
import PageCuisines from "./components/Pages/PageCuisines.tsx";
import PageRestrictions from "./components/Pages/PageRestrictions.tsx";
import generate from "./prompt.tsx";
import PageResults from "./components/Pages/PageResults.tsx";

// https://www.gcu.edu/blog/gcu-experience/most-popular-cuisines-us
// chat GPT
// Give me a list of popular authentic dishes belonging to each of the following cuisines: American, Italian, Mexican, Latin American, Caribbean, East Asian, Southeast Asian, Indian, Mediterranean, African. I would like around eight to ten dishes for each cuisine, except for the American category, which can have more than eight to ten dishes. The dishes should be mostly main dishes, diverse in flavor and texture, as well as a few desserts and snacks. Please specify whether each dish is a main, dessert, or snack.

function App() {
  const [section, setSection] = useState(0);
  // 0: basics
  // 1: keywords (sweet/savory)
  // 2: cuisines
  // 3: restrictions
  // 4: results
  const [sweetOrSavory, setSweetOrSavory] = useState("sweet");
  const [basics, setBasics] = useState({});
  const [sweetKeywords, setSweetKeywords] = useState({});
  const [savoryKeywords, setSavoryKeywords] = useState({});
  const [cuisines, setCuisines] = useState({});
  const [_, setRestrictions] = useState({});

  const [results, setResults] = useState(["", "", ""]);

  function nextPage() {
    setSection(section + 1);
  }

  function backPage() {
    setSection(section - 1);
  }

  function getResults(restr: {}) {
    console.log("in results fn");
    setSection(-1);
    // document.body.style.background = "#5fa3ac";
    let sweet = sweetOrSavory === "sweet";
    let lightLevel = 1;
    switch (formBasics.values.lightHeavy) {
      case "light":
        lightLevel = 1;
        break;
      case "middle":
        lightLevel = 2;
        break;
      case "heavy":
        lightLevel = 3;
        break;
      default:
        lightLevel = 2;
    }
    let healthLevel = formBasics.values.healthyLevel;
    let keywords = sweetOrSavory === "sweet" ? sweetKeywords : savoryKeywords;
    // keywords = Object.keys(keywords).filter((key) => keywords[key]);
    let restrictions = restr;

    generate(sweet, lightLevel, healthLevel, keywords, cuisines, restrictions)
      .then((res: string[] | undefined) => {
        if (res) {
          console.log(res);
          setResults(res);
        } else {
          console.log("error generating result");
        }
      })
      .catch((err) => console.log("error: ", err));

    return [];
  }

  function handleRestart() {
    setSweetOrSavory("sweet");
    setBasics({});
    setSweetKeywords({});
    setSavoryKeywords({});
    setCuisines({});
    setRestrictions({});
    setResults(["", "", ""]);

    formBasics.reset();
    formSavoryKeywords.reset();
    formSweetKeywords.reset();
    formCuisines.reset();
    formRestrictions.reset();

    document.body.style.background = "#32575c";
    setSection(0);
  }

  //
  const formBasics = useForm({
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

  const formCuisines = useForm({
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

  const formSavoryKeywords = useForm({
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

  const formSweetKeywords = useForm({
    initialValues: {
      warm: false,
      fruity: false,
      chocolatey: false,
      baked: false,
      creamy: false,
      nutty: false,
    },
  });

  const formRestrictions = useForm({
    initialValues: {
      veg: false,
      gf: false,
      df: false,
    },
  });

  return (
    <>
      <h1 hidden={section === 4}>cravie</h1>
      <p hidden={section !== 0}>
        Need help deciding what to eat? Select your preferences below and hit
        the cookie to generate suggestions!
      </p>
      <br hidden={section === 0} />

      {/* for compiling sakes; remove later */}
      <p hidden={true}>{JSON.stringify(basics)}</p>

      <div className="card">
        {/* basics */}
        {section === 0 && (
          <MotionWrapper
            body={
              <PageBasics
                nextFn={nextPage}
                setFn={setBasics}
                sweetFn={setSweetOrSavory}
                form={formBasics}
              />
            }
          />
        )}

        {/* keywords */}
        {section === 1 && (
          <MotionWrapper
            body={
              sweetOrSavory === "sweet" ? (
                <PageKeywords
                  backFn={backPage}
                  setFn={setSweetKeywords}
                  nextFn={nextPage}
                  form={formSweetKeywords}
                />
              ) : (
                <PageKeywords
                  backFn={backPage}
                  setFn={setSavoryKeywords}
                  nextFn={nextPage}
                  form={formSavoryKeywords}
                />
              )
            }
          />
        )}

        {/* cuisines */}
        {section === 2 && (
          <MotionWrapper
            body={
              <PageCuisines
                backFn={backPage}
                nextFn={nextPage}
                setFn={setCuisines}
                form={formCuisines}
              />
            }
          />
        )}

        {/* restrictions */}
        {section === 3 && (
          <MotionWrapper
            body={
              <PageRestrictions
                backFn={backPage}
                nextFn={nextPage}
                resultsFn={getResults}
                setFn={setRestrictions}
                form={formRestrictions}
              />
            }
          />
        )}

        {/* results */}
        {section === 4 && (
          <MotionWrapper
            body={
              <PageResults results={results} handleRestart={handleRestart} />
            }
          />
        )}
      </div>
    </>
  );
}

export default App;
