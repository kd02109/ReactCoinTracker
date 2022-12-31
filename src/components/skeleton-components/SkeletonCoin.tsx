import styled from "styled-components";
import { Container } from "../StyledComponents";
import { skeleonDesign } from "./design";

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  padding: 10px 20px;
  border-radius: 10px;
  animation: ${(props) => skeleonDesign(props.theme.skeletonStart)} 2s infinite
    ease-in-out;
  a {
    display: block;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
  animation: ${(props) => skeleonDesign(props.theme.skeletonStart)} 2s infinite
    ease-in-out;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 40px;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  max-width: 500px;
  display: block;
  padding: 40px 40px;
  animation: ${(props) => skeleonDesign(props.theme.skeletonStart)} 2s infinite
    ease-in-out;
`;

function SkeletonCoin() {
  return (
    <Container>
      <Overview>
        <OverviewItem>
          <span></span>
          <span></span>
        </OverviewItem>
        <OverviewItem>
          <span></span>
          <span></span>
        </OverviewItem>
        <OverviewItem>
          <span></span>
          <span></span>
        </OverviewItem>
      </Overview>
      <Description></Description>
      <Overview>
        <OverviewItem>
          <span></span>
          <span></span>
        </OverviewItem>
        <OverviewItem>
          <span></span>
          <span></span>
        </OverviewItem>
      </Overview>
      <Tabs>
        <Tab></Tab>
        <Tab></Tab>
      </Tabs>
    </Container>
  );
}

export default SkeletonCoin;
