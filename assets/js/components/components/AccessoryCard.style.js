import styled from "styled-components";

export const StyledAccessoryCard = styled.div`
  display: flex;
  position: relative;
  margin: 20px;
  border-radius: 4px;
  width: ${props => (props.width * 18)}px;
  padding: 4px;
  height: 100px;
  background: rgb(210, 210, 210);
  color: white;

  img {
    border-radius: 4px;
    object-fit: cover;
  }
  
  :hover {
    background: rgba(120, 120, 120, .5);
  }
`;

export const StyledName = styled.div`
  position: absolute;
`;
