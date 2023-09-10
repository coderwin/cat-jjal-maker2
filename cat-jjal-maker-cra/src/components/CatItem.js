function CatItem(props) {
  return (
    <li>
      {props.title}
      <img
        src={props.img}
        style={{ width: "150px", border: "1px solid react-dom" }}
      />
    </li>
  );
}

export default CatItem;
