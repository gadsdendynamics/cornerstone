import styled from "styled-components";

export const StyledColorSwatches = styled.div`
  display: flex;
  margin-bottom: 10px;
  
  .selected {
    border: 2px solid red;
    border-radius: 12px;
  }
`;

export const StyledSwatch = styled.div`
  padding: 2px;
  img {
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: -3px;
  }
  
`;