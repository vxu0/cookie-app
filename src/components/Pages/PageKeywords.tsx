import KeyButton from "../KeyButton";

interface Props {
  backFn: () => void;
  nextFn: () => void;
  setFn: ({}) => void;
  form: any;
}

export default function PageKeywords({ backFn, nextFn, setFn, form }: Props) {
  // form.setValues((prev: any) => ({ ...prev, ...values }));
  // console.log("touched?", form.isTouched());
  // const callbackFn = (name: string) => {
  //   form.values[name] = !form.values[name];
  //   setFn(form.values);
  // };
  return (
    <form
      onSubmit={form.onSubmit((values: {}) => {
        // console.log("TYPE:", typeof values);
        // console.log("getvalues output:", form.getValues());
        console.log(values);
        setFn(values);
        nextFn();
      })}
    >
      <div className="question-category">
        <h3>Keywords</h3>
        <i>Flavors? Textures? Feelings? Click 'em!</i>
      </div>
      <br></br>
      {/* <div className="row"> */}
      {/* <div className="column">&nbsp;</div> */}
      <div className="column">
        {Object.keys(form.values).map((kw) => {
          return (
            <KeyButton name={kw} key={kw} label={kw} form={form}></KeyButton>
          );
        })}
      </div>
      <br></br>
      <br></br>
      {/* </div> */}
      {/* <div className="column">&nbsp;</div> */}

      {/* <div className="row"> */}
      {/* <div className="column">&nbsp;</div> */}
      {/* <div className="column"> */}
      {/* <div className="buttons"> */}
      <button className="back" type="button" onClick={backFn}>
        back
      </button>
      <button className="next" type="submit">
        next
      </button>
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </form>
  );
}
