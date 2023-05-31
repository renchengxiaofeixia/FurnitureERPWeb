import React from 'react'
import { Modal, Divider } from 'antd';


const PopupModal = ({ children, open, onOk, onCancel, title, bodyStyle, footer, width }) => {
    return (
        // open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        <>
            <Modal width={width} title={title} open={open} onOk={onOk} onCancel={onCancel} bodyStyle={bodyStyle} footer={footer}>
                <Divider />
                {children}
            </Modal>
        </>
    );
};
export default PopupModal;