import { Modal } from 'antd';
const MessageModal = ({open,onClose,message}) => {
  return (
    <>
      <Modal
        title="提示"
        centered
        open={open}
        onOk={() => onClose(true)}
        onCancel={() => onClose(false)}
      >
        {message}
      </Modal>
    </>
  );
};
export default MessageModal;