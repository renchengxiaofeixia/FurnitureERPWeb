import React from 'react'
import { Modal, Divider } from 'antd';


const PopupModal = ({ children, open, onOk, onCancel, title, bodyStyle }) => {
    return (
        // open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        <>
            <Modal title={title} open={open} onOk={onOk} onCancel={onCancel} bodyStyle={bodyStyle}>
                <Divider />
                {children}
            </Modal>
        </>
    );
};
export default PopupModal;