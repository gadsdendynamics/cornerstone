import React from "react"
import _ from "lodash";
import addons from "../assets/addons.json";
import {StyledAddOns} from "./AddOns.style";
import {useRecoilState} from "recoil";
import {addonsAtom} from "../state/atoms";

export const AddOns = () => {
    const [selectedAddons, setSelectedAddons] = useRecoilState(addonsAtom);
    const handleSelectAddon = (addon, index) => {
        if (_.includes(selectedAddons, addon)) {
            const selectedCopy = [...selectedAddons]
            selectedCopy.splice(index, 1)
            setSelectedAddons(
                selectedCopy
            );
        } else {
            setSelectedAddons([...selectedAddons, addon])
        }
    }
    return (
        <StyledAddOns>
            { _.map(addons, (addon, index) => {
                const selected = _.includes(selectedAddons, addon);
                return <div key={addon.id} onClick={() => handleSelectAddon(addon, index)} className={selected ? 'selected' : ''}>
                    {addon.name}
                    <img src={addon.imageUrl} alt={addon.name} width="100px" height="100px"/>
                </div>
            })}
        </StyledAddOns>
    )
}