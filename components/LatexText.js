import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

function LatexText({ text }) {
  // console.log("latext tecxt = ", text);
  return (
    <div className="text-left">
      <Latex className="text-left">{text}</Latex>
    </div>
  );
}

export default LatexText;
