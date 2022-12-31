import styled from "styled-components";

const NoneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.boxColor};
  span {
    font-size: 30px;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
  }
  border-radius: 30px;
  padding: 30px;
  width: 420px;
  height: 210px;
`;

function NoneChart() {
  return (
    <NoneContainer>
      <span>데이터가 없습니다.😥</span>
    </NoneContainer>
  );
}

export default NoneChart;
