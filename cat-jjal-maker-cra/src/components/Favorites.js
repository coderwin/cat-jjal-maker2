import CatItem from "./CatItem";

function Favorites({ cats }) {
  // cats가 없을 때
  if (cats.length === 0) {
    return <div>"사진 위 하트를 눌러 고양이 사진을 저장해봐요!"</div>;
  }

  const catList = cats.map((cat, index) => {
    console.log(index);
    return <CatItem key={index} img={cat} />;
  });

  return <ul className="favorites">{catList}</ul>;
}

export default Favorites;
