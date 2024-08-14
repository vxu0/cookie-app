import { IconCookie } from "@tabler/icons-react";
import Toggle from "../Toggle";

interface Props {
  backFn: () => void;
  nextFn: () => void;
  resultsFn: (restr: {}) => void;
  setFn: ({}) => void;
  form: any;
}

interface Arr {
  [key: string]: string;
}

const labels: Arr = {
  veg: "Vegetarian/Vegan",
  gf: "Gluten-free",
  df: "Dairy-free",
};

export default function PageRestrictions({
  backFn,
  nextFn,
  setFn,
  resultsFn,
  form,
}: Props) {
  return (
    <form
      onSubmit={form.onSubmit((values: any) => {
        console.log(values);
        setFn(values);
        // results.setState(values);
        // setTimeout(resultsFn, 1000);
        resultsFn(values);
        nextFn();
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
          {Object.keys(form.values).map((kw) => {
            return (
              <Toggle
                name={kw}
                key={kw}
                label={labels[kw]}
                form={form}
              ></Toggle>
            );
          })}

          {/* <Toggle
            name="veg"
            label="Vegetarian/Vegan"
            form={form}
            setFn={setFn}
          />
          <Toggle name="gf" label="Gluten-free" form={form} setFn={setFn} />
          <Toggle name="df" label="Dairy-free" form={form} setFn={setFn} /> */}
        </div>
      </div>
      {/* <br></br> */}

      {/* <button className="next">Back</button> */}
      <br></br>
      <button className="cookie" type="submit">
        <IconCookie
          size={96}
          color="orange"
          fill="orange"
          className="cookie"
        ></IconCookie>
      </button>
      <br></br>
      <h3 className="clickme">I'm ready!</h3>
      <br></br>
      <br></br>
      <br></br>
      <button className="back" type="button" onClick={backFn}>
        back
      </button>
      <br></br>
    </form>
  );
}
