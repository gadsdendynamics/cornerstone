import React from "react";
import {StyledAccessoryCard, StyledName} from "./AccessoryCard.style";
import {Draggable} from "react-beautiful-dnd";

export const AccessoryCard = ({item, index}) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {provided => (
                <StyledAccessoryCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    width={item.widthScale}
                >
                    <StyledName>{item.name}</StyledName>
                    <img src={item.imageUrl} alt={item.name} />
                </StyledAccessoryCard>
            )}
        </Draggable>
    );
}