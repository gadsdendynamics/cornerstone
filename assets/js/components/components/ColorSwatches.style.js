import styled from "styled-components";

export const StyledColorSwatches = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding-left: 2px;
  
  .selected {
    outline: 2px solid red;
    border-radius: 6px;
  }
`;

export const StyledSwatch = styled.div`
  padding: 2px;

  img {
    border-radius: 4px;
    object-fit: fill;
    height: 40px;
    width: 40px;

    &:hover {
      cursor: pointer;
    }
  }
`;