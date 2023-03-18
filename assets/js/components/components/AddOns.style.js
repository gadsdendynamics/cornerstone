import styled from "styled-components";

export const StyledAddOns = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
  
  .selected {
    border-radius: 4px;
    outline: 2px solid red;
  }
`;