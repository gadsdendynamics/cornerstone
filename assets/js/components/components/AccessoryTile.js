import React from "react";
import {StyledAccessoryTile, StyledTileOverlay} from "./AccessoryTile.style";
import {Draggable} from "react-beautiful-dnd";
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const AccessoryTile = ({item, index, remove}) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {provided => (
                <StyledAccessoryTile
                    item={item}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {/*{item.name}*/}
                    <img src={item.imageUrl} alt={item.name} />
                    <StyledTileOverlay>
                        <FontAwesomeIcon icon={faCircleXmark} onClick={() => remove(index)} color="red" size="2x"/>
                    </StyledTileOverlay>

                </StyledAccessoryTile>
            )}
        </Draggable>
    );
}