import "./Die.css";

export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#C17817" : "#fff",
  };
  return (
    <div className="die-main" style={style} onClick={props.holdNum}>
      <h2>{props.num}</h2>
    </div>
  );
}
