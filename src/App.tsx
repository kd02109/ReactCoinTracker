import React from "react";
import GlobalStyle from "./components/GlobalStyle";
import Router from "./Router";
//import { ReactQueryDevtools } from "react-query/devtools"; //쿼리 확인 가능
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./components/atoms";
import { lightThem, darkThem } from "./them";

//fragment -> 유령 컴포넌트로서 다른 컴포넌트를 담는 가짜 컴포넌트 역할을 한다.
function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkThem : lightThem}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
