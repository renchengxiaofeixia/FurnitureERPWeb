
import React from 'react'
import { Image } from 'antd';
import {
    BASE_URL
} from "@/service/interface"
import styles from './index.module.scss'

const ImagesCell = ((props, ref) => {
    return (
        <>
            {
                props.value ? (<Image alt="图片加载失败！"
                    height={40}
                    width={40}
                    rootClassName={styles.table_cell_images}
                    src={BASE_URL + props.value} />) : ''
            }
        </>
    )
});

export default ImagesCell
