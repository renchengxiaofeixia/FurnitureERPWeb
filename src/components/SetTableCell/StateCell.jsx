
import React from 'react'
import styles from "./index.module.scss"


const StateCell = (({ value }) => {
    return (
        <>
            <div className={styles.table_state}>
                <span className={`${styles.table_state_dot}  ${value == 'Using' ? styles.table_state_enable : value == 'ForBid' ? styles.table_state_disabled : styles.table_state_del}`}></span>
                <span> {value == 'Using' ? '启用' : value == 'ForBid' ? '禁用' : "删除"}</span>
            </div>
        </>
    )
});

export default StateCell
