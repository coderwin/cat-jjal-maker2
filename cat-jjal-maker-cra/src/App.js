import logo from "./logo.svg";
import "./App.css";
import "./common/cs/cat_jall_maker.css";

import React from "react";
import Title from "./components/Title";
import MainCard from "./components/MainCard";
import Favorites from "./components/Favorites";
import Form2 from "./components/Form";

console.log("야옹");

// 위의 메소드를 하나의 객체에 넣기
const jsonLocalStorage = {
  setItem: (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

// 고양이 사진을 oepn api를 사용하여 불러오기
const getcuteCatImage = async (text) => {
  // open api url
  const OPEN_API_DOMAIN = "https://cataas.com";
  // fetch로 보내기
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  console.log(responseJson);
  console.log(responseJson.url);
  // 원하는 url 만들기
  return `${OPEN_API_DOMAIN}${responseJson.url}`;
};

//  컴포넌트를 쓰려면 그냥 태그방식으로 쓰면 된다.

const App = () => {
  // 이미지 필드
  const CAT1 = "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react";
  const CAT2 = "https://cataas.com/cat/BxqL2EjFmtxDkAm2/says/inflearn";
  const CAT3 = "https://cataas.com/cat/18MD6byVC1yKGpXp/says/JavaScript";
  // 이미지 list
  const catList = [CAT1, CAT2, CAT3];

  // 상태를 자식 컴포넌트에서 같이 사용하기
  // 최적화 하기
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });

  const [image, setImage] = React.useState(CAT1);
  // MainCard에서 사용한다.
  // const [likeHeart, setLikeHeart] = React.useState("🤍");
  // Favorites에서 사용한다.
  // 최적화
  const [cats, setCats] = React.useState(() => {
    return jsonLocalStorage.getItem("cats") || [];
  });

  console.log("카운터", counter);

  // 이미 좋아요 목록에 있는지 확인
  const aleardyImage = cats.includes(image);

  // 새로우 사진을 open API를 이용해서 불러오기
  const setInititalCat = async () => {
    const img = await getcuteCatImage("First Cat");
    setImage(img);
  };

  React.useEffect(function () {
    setInititalCat();
  }, []);

  // 렌더링 될때만 실행하라
  React.useEffect(function () {
    console.log("하하");
  }, []);

  console.log("hello");

  // setInititalCat();

  const updateMainCat = async (value) => {
    const newCat = await getcuteCatImage(value);
    // 이미지 바꾸기
    setImage(newCat);

    setCounter(function (prev) {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return prev + 1;
    });
  };

  // MainCard 컴포넌트의 하트를 클릭했을 때
  function handleHeartClick() {
    // setLikeHeart("❤️"); // 상태로 둘 필요가 없다.
    // Favorites 카드에 좋아요클릭한 카드가 추가된다.
    // MainCard에 있는 이미지를 받아온다.
    const newCats = [image, ...cats];
    setCats([image, ...cats]);
    // cats를 localStorage에 저정하기
    jsonLocalStorage.setItem("cats", newCats);
  }

  const catNumber = counter === null ? "" : `${counter}번째`;

  return (
    <div>
      <Title>{catNumber} 고양이 가라사대 1</Title>
      <Title>두번째 고양이 가라사대</Title>
      <Form2 updateMainCat={updateMainCat} />
      <MainCard
        img={image}
        onHeartClick={handleHeartClick}
        aleardyImage={aleardyImage}
      />
      <Favorites cats={cats} />
    </div>
  );
};

export default App;
