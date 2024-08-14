import { useState, useEffect } from "react";

export default function PageLoading() {
  const [dots, setDots] = useState(0);
  //   const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setDots((n) => (n + 1) % 4), 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="row"></div>
      <div className="loading row">
        <h1>loading{".".repeat(dots)}</h1>
      </div>
      <div className="row"></div>
    </>
  );
}
