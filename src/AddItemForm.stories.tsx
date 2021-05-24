import {AddItemForm} from "./AddItemForm";
import React from "react";
import { action } from "@storybook/addon-actions";
import {Meta} from "@storybook/react/types-6-0";

export default  {
    title: 'AddItemForm Component',
    component: AddItemForm,
    } as Meta


export const AddItemFormExample = (props: any) => {
    return <AddItemForm addItem={action('Button "add" was pressed inside form')} />
}