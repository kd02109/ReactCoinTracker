import styled from "styled-components";

export const Container = styled.div`
  padding: 0px 2rem;
  max-width: 30rem;
  margin: 0px auto;
`;

export const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
  position: relative;
  a {
    position: absolute;
    left: 10px;
  }
`;

export const CoinList = styled.ul``;

export const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};

  font-size: 15px;
  padding: 10px;
  border-radius: 15px;
  max-width: 500px;
  margin: auto;
  margin-bottom: 10px;
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 20px;
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

export const Loder = styled.span`
  font-size: 30px;
  text-align: center;
  display: block;
`;

export const CoinImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-left: 10px;
`;
