import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDark } = useDarkMode();

  const isDarkMode = !isDark ? "light" : "dark";

  return (
    <StyledLogo>
      <Img src={`/logo-${isDarkMode}.png`} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
