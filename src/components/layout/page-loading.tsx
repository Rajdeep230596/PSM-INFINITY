export function PageLoading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0b",
        color: "#e8d8c8",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 11,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
        }}
      >
        Loading
      </p>
    </div>
  );
}
