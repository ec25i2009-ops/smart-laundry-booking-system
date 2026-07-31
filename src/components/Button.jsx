import "../styles/Button.css";

function Button({ text, color, onClick }) {

  return (

    <button
      className="app-button"
      style={{ background: color }}
      onClick={onClick}
    >
      {text}
    </button>

  );

}

export default Button;