import styled from "styled-components";
import { skeleonDesign } from "./design";

const SkeletonLayout = styled.ul``;

const SkeletonBox = styled.li`
  font-size: 15px;
  padding: 10px;
  border-radius: 15px;
  max-width: 500px;
  margin: auto;
  margin-bottom: 10px;
  -webkit-animation: ${(props) => skeleonDesign(props.theme.skeletonStart)} 2s
    infinite ease-in-out;
  animation: ${(props) => skeleonDesign(props.theme.skeletonStart)} 2s infinite
    ease-in-out;
  span {
    display: block;
    padding: 30px 20px;
  }
`;

function Skeleton() {
  const arr = Array.from({ length: 100 }, () => 0);
  console.log(arr);
  return (
    <SkeletonLayout>
      {arr.map((box) => (
        <SkeletonBox key={box}>
          <span></span>
        </SkeletonBox>
      ))}
    </SkeletonLayout>
  );
}

export default Skeleton;
