import React from "react"
import {StyledColorSwatches, StyledSwatch} from "./ColorSwatches.style"
import colors from "../assets/colors.json"
import _ from "lodash"
import {useRecoilState} from "recoil";
import {selectedAccessoryColorAtom, selectedPanelColorAtom} from "../state/atoms";

export const ColorSwatches = ({type}) => {
    const [selectedAccessoryColor, setSelectedAccessoryColor] = useRecoilState(selectedAccessoryColorAtom);
    const [selectedPanelColor, setSelectedPanelColor] = useRecoilState(selectedPanelColorAtom);

    const handleChangeAccessoryColor = (color) => {
        setSelectedAccessoryColor(color.name)
    }
    const handleChangePanelColor = (color) => {
        setSelectedPanelColor(color)
    }

    return (
        <StyledColorSwatches>
            { type === "accessories" ? _.map(colors, (color) => {
                const selected = _.isEqual(selectedAccessoryColor, color.name);
                return <StyledSwatch key={color.name} onClick={() => handleChangeAccessoryColor(color)} className={selected ? 'selected': ''}>
                    <img src={color.imageUrl} alt={color.name} width="60px" height="60px"/>
                </StyledSwatch>
            }) : _.map(colors, (color) => {
                const selected = _.isEqual(selectedPanelColor, color);
                return <StyledSwatch key={color.name} onClick={() => handleChangePanelColor(color)} className={selected ? 'selected' : ''}>
                    <img src={color.imageUrl} alt={color.name} width="60px" height="60px"/>
                </StyledSwatch>
            })
            }
        </StyledColorSwatches>
    )
}
