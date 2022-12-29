import spinner from "../assets/spinner.gif";

function Loader() {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{
        width: "20vh",
        height: "20vh",
        margin: "auto",
        marginTop: "20vh",
        display: "block",
      }}
    />
  );
}

export default Loader;
