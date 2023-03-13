import React, {useState} from "react"
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import accessories from "./assets/accessories.json"
import {StyledAccessoryList, StyledChestRig, StyledChestRigBuilder} from "./ChestRigBuilder.style"
import {filter, map, find} from "lodash";
import {AccessoryCard} from "./components/AccessoryCard";
import {AccessoryTile} from "./components/AccessoryTile";
import {ColorSwatches} from "./components/ColorSwatches";
import {addonsAtom, selectedAccessoryColorAtom} from "./state/atoms";
import {selectedPanelColorAtom} from "./state/atoms";
import {useRecoilValue} from "recoil";
import {AddOns} from "./components/AddOns";
import 'regenerator-runtime/runtime';

export const ChestRigBuilder = () => {
    const [selected, setSelected] = useState([])
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
            const draggableItem = find(accessories, { id: draggableId });
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
        // const accessoryRequests = _.forEach(selected, (item) => {
        //     const qty = _.size(_.filter(selected, { id: item.id}))
        //     axios.get(`/cart.php?action=add&product_id=${item.bcId}&qty=${qty}/`)
        // })

        // // Add accessories to cart
        // await Promise.all([
        //     ...accessoryRequests,
        //     // Panel
        //     axios.get(`/cart.php?action=add&product_id=200&qty=1/`),
        //     // Harness
        //     axios.get(`/cart.php?action=add&product_id=202&qty=1/`)
        // ])
    }

    return (
        <React.Fragment>
            <StyledChestRigBuilder>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <StyledAccessoryList>
                        <Droppable droppableId="accessories" direction="vertical">
                            {provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <h2>Add-Ons</h2>
                                    <AddOns />
                                    <h2>Accessories</h2>
                                    <h3>{selectedAccessoryColor}</h3>
                                    <ColorSwatches type="accessories" />
                                    {provided.placeholder}
                                    { map(filteredAccessories(), (item, index) => {
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
                                        return <AccessoryTile key={item.id} item={item} index={index} remove={handleRemove}/>
                                    })}
                                </div>
                            )}
                        </Droppable>
                    </StyledChestRig>
                </DragDropContext>
            </StyledChestRigBuilder>
            {/* Panel */}
            <p>Back Panel -- $28</p>
            {/* Accessories */}
            { map(selected, (item) => {
                return <p key={item.id}>{item.name} -- {item?.price}</p>
            })}
            {/* Addons */}
            { map(addons, (addon) => {
                return <p key={addon.id}>{addon.name} -- {addon?.price}</p>
            })}
            <div>SUMMARY GOES HERE</div>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </React.Fragment>
    );
}
