const MainCard = ({ img, onHeartClick, aleardyImage }) => {
  const heartIcon = aleardyImage === true ? "❤️" : "🤍";

  return (
    <div className="main-card" style={{ border: "1px solid red" }}>
      <img src={img} alt="고양이" width="400" />
      <button onClick={onHeartClick}>{heartIcon}</button>
    </div>
  );
};

export default MainCard;
