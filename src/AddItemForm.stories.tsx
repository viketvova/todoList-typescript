import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";


export default  {
    title: 'AddItemForm Component',
    component: AddItemForm,
    }


export const AddItemFormExample = (props: any) => {
    return <AddItemForm addItem={action('Button "add" was pressed inside form')} />
}