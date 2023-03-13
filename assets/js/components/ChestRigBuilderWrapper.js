import React from "react";
import {ChestRigBuilder} from "./ChestRigBuilder";
import {RecoilRoot} from "recoil";

export const ChestRigBuilderWrapper = () => {
    return (
        <RecoilRoot>
            <ChestRigBuilder />
        </RecoilRoot>
    )
}