import React, {useState} from "react"
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import accessories from "./assets/accessories.json"
import {
    StyledAccessoryList,
    StyledChestRig,
    StyledChestRigBuilder, StyledPreconfiguredOptions,
    StyledSummary,
    StyledSummaryItem
} from "./ChestRigBuilder.style"
import {filter, map, find, sum, concat} from "lodash";
import {AccessoryCard} from "./components/AccessoryCard";
import {AccessoryTile} from "./components/AccessoryTile";
import {ColorSwatches} from "./components/ColorSwatches";
import {accessoriesAtom, addonsAtom, selectedAccessoryColorAtom} from "./state/atoms";
import {selectedPanelColorAtom} from "./state/atoms";
import {useRecoilState, useRecoilValue} from "recoil";
import {AddOns} from "./components/AddOns";
import 'regenerator-runtime/runtime';

export const ChestRigBuilder = () => {
    const [selected, setSelected] = useRecoilState(accessoriesAtom);
    const addons = useRecoilValue(addonsAtom);
    const selectedAccessoryColor = useRecoilValue(selectedAccessoryColorAtom);
    const selectedPanelColor = useRecoilValue(selectedPanelColorAtom);
    const accessoriesCopy = accessories;
    const filteredAccessories = () => filter(accessoriesCopy, (accessory) => accessory.color === selectedAccessoryColor);

    const handleOnDragEnd = (result) => {
        const { source, destination, draggableId } = result
        if (!destination || destination?.droppableId === "items") {
            return null
        }
        if (source?.droppableId !== destination?.droppableId) {
            const draggableItem = find(accessories, (item) => item.id === draggableId);
            setSelected([...selected, {
                id: `cr-${draggableItem.id}`,
                bcId: draggableItem.bcId,
                name: draggableItem.name,
                imageUrl: draggableItem.imageUrl,
                widthScale: draggableItem.widthScale,
                price: draggableItem.price
            }])
        } else {
            const result = Array.from(selected)
            const [removed] = result.splice(source?.index, 1)
            result.splice(destination?.index, 0, removed)
            setSelected(result)
        }
    }

    const handleRemove = (index) => {
        const selectedCopy = [...selected]
        selectedCopy.splice(index, 1)
        setSelected(
            selectedCopy
        );
    }

    const createCart = (url, cartItems) => {
        return fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItems),
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    const handleAddToCart = async () => {
        await createCart('/api/storefront/carts', {
            "lineItems": [
                {
                    "quantity": 1,
                    "productId": 202
                }
            ]
        })
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.error(error))
    }

    return (
        <React.Fragment>
            <StyledPreconfiguredOptions>

            </StyledPreconfiguredOptions>
            <StyledChestRigBuilder>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <StyledAccessoryList>
                        <Droppable droppableId="accessories" direction="vertical">
                            {provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <h2>Accessories</h2>
                                    <h3>{selectedAccessoryColor}</h3>
                                    <ColorSwatches type="accessories" />
                                    {provided.placeholder}
                                    { map(filteredAccessories(), (item, index) => {
                                        if (!item) {
                                            return null;
                                        }
                                        return <AccessoryCard key={item.id} item={item} index={index} />
                                    })}
                                </div>
                            )}
                        </Droppable>
                    </StyledAccessoryList>
                    <StyledChestRig>
                        <h2>Chest Rig</h2>
                        <h3>{selectedPanelColor.name}</h3>
                        <ColorSwatches type="panel" />
                        <Droppable droppableId="selected" direction="horizontal">
                            {provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps} style={{
                                    display: 'flex',
                                    backgroundImage: `url("${selectedPanelColor.imageUrl}")`,
                                    height: '300px',
                                    width: "auto"
                                }}>
                                    {provided.placeholder}
                                    { map(selected, (item, index) => {
                                        if (!item) {
                                            return null;
                                        }
                                        return <AccessoryTile key={item.id} item={item} index={index} remove={handleRemove}/>
                                    })}
                                </div>
                            )}
                        </Droppable>
                    </StyledChestRig>
                </DragDropContext>
            </StyledChestRigBuilder>
            <h2>Add-Ons</h2>
            <AddOns />
            <h3>Summary</h3>
            <StyledSummary>
                {/* Panel */}
                <StyledSummaryItem>
                    <div>
                        Back Panel (required)
                    </div>
                    <div>
                        $28
                    </div>
                </StyledSummaryItem>
                {/* Accessories */}
                { map(selected, (item) => {
                    if (!item) {
                        return null;
                    }
                    return <StyledSummaryItem key={item.id}><div>{item.name}</div><div>${item?.price}</div></StyledSummaryItem>
                })}
                {/* Addons */}
                { map(addons, (addon) => {
                    if (!addon) {
                        return null;
                    }
                    return <StyledSummaryItem key={addon.id}><div>{addon.name}</div><div>${addon?.price}</div></StyledSummaryItem>
                })}
                <StyledSummaryItem>
                    <div>
                        TOTAL
                    </div>
                    <div>${28 + (sum(
                        concat(map(selected, item => item?.price || 0), map(addons, addon => addon?.price || 0))))}
                    </div>
                </StyledSummaryItem>
            </StyledSummary>
            <button className="button button--primary" onClick={handleAddToCart}>Add to Cart</button>
        </React.Fragment>
    );
}
