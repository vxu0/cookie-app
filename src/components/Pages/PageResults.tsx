import Results from "../Results";
import { motion } from "framer-motion";
import PageLoading from "./PageLoading";

interface Props {
  results: string[];
  handleRestart: () => void;
}

export default function PageResults({ results, handleRestart }: Props) {
  if (results[0] === "") {
    return <PageLoading />;
  } else {
    document.body.style.background = "#5fa3ac";
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        <Results results={results} />
        <br></br>
        <br></br>
        <button className="next" onClick={handleRestart}>
          Start Over
        </button>
      </motion.div>
    );
  }
}
