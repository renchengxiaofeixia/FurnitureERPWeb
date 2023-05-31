import React, { useRef, useState, forwardRef, useEffect, useImperativeHandle, memo } from "react";
import { Input } from 'antd'

const InputCellEditor = memo(forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);
    const refInput = useRef(null);

    useEffect(() => {
        // focus on the input
        refInput.current.focus();
    }, []);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
        return {
            // the final value to send to the grid, on completion of editing
            getValue() {
                // this simple editor doubles any value entered into the input
                return value;
            },

            // Gets called once before editing starts, to give editor a chance to
            // cancel the editing before it even starts.
            isCancelBeforeStart() {
                return false;
            },

            // Gets called once when editing is finished (eg if Enter is pressed).
            // If you return true, then the result of the edit will be ignored.
            isCancelAfterEnd() {
                // our editor will reject any value greater than 1000
                return value > 1000;
            }
        };
    });

    return (
        <Input type="text"
            ref={refInput}
            placeholder={`请输入${props.colDef.headerName}`}
            value={value}
            onChange={(event) => setValue(event.target.value)}

        />
    );
}));

export default InputCellEditor