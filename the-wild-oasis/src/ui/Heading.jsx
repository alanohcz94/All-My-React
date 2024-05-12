import React from "react";
import styled, { css } from "styled-components";

// styled creates a whole new component when we declare it this way. For it's styles
// in styled components the documentation suggest that we should use the as props if we want to use the same styling as the
// what we declared
// if as prop is not the tag will still remain as h1 but only the styling change for best practice it is good to commit on what you want
// even thought the styling is the same we want to do it right
let Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 400;
    `}
`;

export default Heading;
