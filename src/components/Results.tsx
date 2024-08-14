import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";

interface Props {
  results: string[];
}

const Results = ({
  results,
}: // result,
Props) => {
  const largeProps: ConfettiProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 300,
    width: 1600,
    colors: ["#041E43", "#1471BF", "#5BB4DC", "#FC027B", "#66D805"],
  };

  return (
    <>
      <h1>
        <i>result:</i>
      </h1>
      <br />
      <h1>
        <a
          id="resultOne"
          href={`https://www.google.com/search?q=${results[0]}`}
          target="_blank"
        >
          {results[0]}
        </a>
      </h1>
      {results[0] != "" && <ConfettiExplosion {...largeProps} />}
      <br />
      <h2>
        <i>
          alternatives:
          <br />
          {
            <i>
              <a
                id="resultTwo"
                href={`https://www.google.com/search?q=${results[1]}`}
                target="_blank"
              >
                {results[1]}
              </a>
            </i>
          }
          <br />
          {
            <i>
              <a
                id="resultThree"
                href={`https://www.google.com/search?q=${results[2]}`}
                target="_blank"
              >
                {results[2]}
              </a>
            </i>
          }
        </i>
      </h2>
    </>
  );
};

export default Results;
