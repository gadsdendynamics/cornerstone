import React from "react";
import {AccessoryCard} from "./AccessoryCard";

export const AccessoryList = React.memo(function AccessoryList({ accessories }) {
    if (!accessories) {
        return null;
    }
    return accessories.map((item, index) => (
        <AccessoryCard item={item} index={index} key={item.id} />
    ));
});
