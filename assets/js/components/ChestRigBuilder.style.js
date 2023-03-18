import styled from "styled-components";

export const StyledChestRigBuilder = styled.div`
  display: flex;
  width: 100%;
  height: 600px;
  margin: 10px;
  position: relative;
`;

export const StyledBackground = styled.div`
  background-image: url('/images/background.jpeg');
  position: absolute;
`;

export const StyledAccessoryList = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  overflow-y: auto;
`;

export const StyledChestRig = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSummary = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
`;

export const StyledSummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledPreconfiguredOptions = styled.div`
  display: flex;
`;