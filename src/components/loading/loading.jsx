import "./loading.css";

function Loading(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="laodingParent">
      <div>
        <img className="loading" src="https://i.gifer.com/ZKZg.gif" alt="" />
      </div>
    </div>
  );
}

export default Loading;
