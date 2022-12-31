import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const BgBtn = styled.button`
  padding: 10px;
  border-radius: 50%;
  border: none;

  &:hover {
    cursor: pointer;
  }
  background-color: ${(props) => props.theme.bgColor};

  position: absolute;
  right: 0px;
`;

const StyledFontAwesome = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.theme.bgColor};
`;
function WhiteDarkBtn() {
  const isDark = useRecoilValue(isDarkAtom);
  const isDarkFn = useSetRecoilState(isDarkAtom);

  return (
    <BgBtn onClick={() => isDarkFn((current) => !current)}>
      {" "}
      {isDark ? (
        <StyledFontAwesome icon={faSun} size="2x" />
      ) : (
        <StyledFontAwesome icon={faMoon} size="2x" />
      )}
    </BgBtn>
  );
}

export default WhiteDarkBtn;
