import React from "react";

const Form = ({ updateMainCat }) => {
  // 필드
  // 한글검증
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  // console.log(handleFormSubmit); //undefined
  // 소문자를 대분자로 바꿔준다.
  // 상태를 생성한다.
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleInputChange = (event) => {
    // 입력값을 대문자로 바꾸기
    // console.log(event.target.value.toUpperCase());
    const userValue = event.target.value.toUpperCase();
    console.log(includesHangul(userValue));
    // 검증 전 초기화하기
    setErrorMessage("");
    if (includesHangul(userValue)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
      return;
    }
    setValue(userValue);
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("form default 금지");

    // 검증을 하기전에 초기화를 해준다.
    setErrorMessage("");
    if (value === "") {
      setErrorMessage("빈 값으로 만들 수 없습니다.");
      return;
    }

    updateMainCat(value);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="영어 대사를 입력해주세요"
        value={value}
        onChange={handleInputChange}
      />
      <button type="submit">creat</button>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </form>
  );
};

export default Form;
