// 테마 생성
// styled.d.ts 정의파일 속 속성들과 같아야 함
import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  bgColor: "#2f313b",
  textColor: "#f5f6fa",
  accentColor: "white",
  priceTextColor: "black",
  hover: "#395170",
  boxColor: "black",
  listBoxColor: "black",
};

export const lightTheme: DefaultTheme = {
  bgColor: "#f5f6fa",
  textColor: "#1a2c30",
  accentColor: "#1a2c30",
  priceTextColor: "black",
  hover: "#80a3d1",
  boxColor: "#80a3d1",
  listBoxColor: "white",
};
