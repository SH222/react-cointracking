// 1. import styled-components
import "styled-components";

// 2. 테마 정의 확장
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor: string;
  }
}
