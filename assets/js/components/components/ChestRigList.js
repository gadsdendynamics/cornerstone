import React from "react";
import {AccessoryCard} from "./AccessoryCard";

export const ChestRigList = React.memo(function ChestRigList({ accessories }) {
    if (!accessories) {
        return null;
    }
    return accessories.map((item, index) => (
        <AccessoryCard item={item} index={index} key={item.id} />
    ));
});
