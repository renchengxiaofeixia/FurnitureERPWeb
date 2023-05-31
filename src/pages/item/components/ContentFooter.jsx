import React, { useState, useRef } from 'react'
import { Divider, Tabs, Col, Row } from 'antd';
import { CaretDownFilled, CaretUpOutlined } from '@ant-design/icons';
import { Resizable } from 're-resizable';


import SubItems from './SubItems'
import styles from "../index.module.scss";


const initialItems = [{
    label: '商品规格',
    children: <SubItems />,
    key: '1',
},
{
    label: '操作日记',
    children: 'Content of Tab 3',
    key: '2'
}];

let productFoldHeight = localStorage.getItem("productFoldHeight") || 280;
const ContentFooter = (props) => {
    const { offsetHeight } = props

    const refHeight = useRef()
    const [minHeight, setMinHeight] = useState(160);
    const [footerHeight, setFooterHeight] = useState(productFoldHeight + 'px');
    const [enable, setEnable] = useState({ top: true, bottom: false })


    const onChange = (key) => {
        console.log(key);
    };

    const foldFooter = (height) => {
        if (!height) {
            setEnable({ top: false, bottom: false })
            setMinHeight(0)
            setFooterHeight('0px')

        } else {
            setEnable({ top: true, bottom: false })
            setMinHeight(160)
            setFooterHeight(productFoldHeight + 'px')
        }
    }

    const resizableOptions = {
        ref: refHeight,
        maxWidth: "100%",
        enable: enable,
        maxHeight: offsetHeight + 'px',
        minHeight: minHeight + 'px',
        className: 'display_flex columnFlex',
        defaultSize: { width: '100%' },
        size: { height: footerHeight },
        onResize: (e) => {

        },
        onResizeStart: (e) => { setFooterHeight('') },
        onResizeStop: (e) => {
            localStorage.setItem('productFoldHeight', refHeight.current.state.height)
            setFooterHeight(refHeight.current.state.height + 'px')
        },

    }

    return (
        <>
            <Resizable
                {...resizableOptions}
            >
                <div className={styles.item_footer_resizable}>
                    <Divider plain className={styles.item_footer_divider} >
                        {minHeight == 0 ?
                            (<CaretUpOutlined
                                className={styles.item_footer_arrows}
                                onClick={() => foldFooter(true)} />) :
                            (<CaretDownFilled
                                className={styles.item_footer_arrows}
                                onClick={() => foldFooter(false)} />)
                        }
                    </Divider>
                    <Tabs
                        onChange={onChange}
                        type="card"
                        items={initialItems}
                        className='tab_heade_content'
                    />
                </div>
            </Resizable>

        </>
    )
}

export default ContentFooter