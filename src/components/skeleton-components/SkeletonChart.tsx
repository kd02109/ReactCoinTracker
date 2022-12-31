import styled from "styled-components";
import { skeleonDesign } from "./design";

const GraphContainer = styled.div`
  animation: ${(props) => skeleonDesign(props.theme.skeletonStart)} 2s infinite
    ease-in-out;
  &:first-child {
    margin-bottom: 10px;
  }
  padding: 100px 240px;
`;

const GraphBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function SkeletonChart() {
  return (
    <GraphBox>
      <GraphContainer></GraphContainer>
      <GraphContainer></GraphContainer>
    </GraphBox>
  );
}

export default SkeletonChart;
