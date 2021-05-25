import React from "react";

import {EditableSpan} from "./EditableSpan";
import { action } from '@storybook/addon-actions';

export default  {
    title: 'EditableSpan Component',
    component: EditableSpan,
    argTypes: { onClick: { action: 'clicked' } },
}


export const EditableSpanExample = (props: any) => {
    return <EditableSpan
        title={'Start value'}
        onChange={action('button-click')}
    />
}