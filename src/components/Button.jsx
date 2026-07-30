function Button({ text, color }) {
  return (
    <button
      style={{
        width: "220px",
        padding: "12px",
        backgroundColor: color,
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        marginBottom: "15px",
      }}
    >
      {text}
    </button>
  );
}

export default Button;