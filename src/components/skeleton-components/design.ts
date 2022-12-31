import { keyframes } from "styled-components";

export const skeleonDesign = (color: string) => keyframes`
    0% {
        background-color: ${color};
        opacity: 0.7;
    }
    50% {
        background-color: ${color};
        opacity: 1.0;
    }
    100% {
        background-color: ${color};
        opacity: 0.7;
    }
`;
