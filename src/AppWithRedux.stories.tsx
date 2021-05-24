import React from "react";
import { action } from "@storybook/addon-actions";
import {Meta} from "@storybook/react/types-6-0";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";


export default  {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
} as Meta


export const AppWithReduxExample = (props: any) => {
    return <Provider store={store}>
    <AppWithRedux />
    </Provider>
}