
import React, { useEffect, useState } from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { setPreviewImage } from '@/store/modules/item'
import { BASE_URL, HEADERS } from '@/service/interface'
import request from '@/service/index'
import PopupModal from "@/components/PopupModal"

const UploadImages = ((props) => {
    const dispatch = useDispatch()
    const { previewImage } = useSelector((state) => state.item)

    const [fileList, setFileList] = useState([])
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        if (previewImage) {
            setFileList([{
                url: BASE_URL + previewImage
            }])
        }
    }, [previewImage])

    // 解析粘贴板
    const pasteUpload = (event) => {
        event.stopPropagation()
        const data = event.clipboardData || window.clipboardData
        let tempFile = null // 存储文件数据
        if (data.items && data.items.length) {
            // 检索剪切板items
            for (const value of data.items) {
                if (value.type.indexOf('image') !== -1) {
                    tempFile = value.getAsFile()
                    break
                }
            }
        }
        handleUpload(tempFile)
    }

    // 手动上传粘贴文件
    const handleUpload = (file) => {
        if (!file) {
            return
        }
        const formData = new FormData()
        formData.append('fi', file)
        request.post('/public/upload', formData).then((res) => {
            setFileList([{ url: res.data }])
            dispatch(setPreviewImage(res.data || ''))
        })
    }


    const handlePreview = async (file) => setOpenEdit(true)
    const handleChange = ({ fileList }) => {
        dispatch(setPreviewImage(fileList[0]?.response || ''))
        return setFileList(fileList)
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="mar_top">上传图片</div>
        </div>
    )
    return (<>
        <div className='mar_top' onPaste={pasteUpload}>
            <Upload
                name="fi"
                action={BASE_URL + "/public/upload"}
                listType="picture-card"
                headers={{ 'Authorization': HEADERS.Authorization }}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <PopupModal footer={null} open={openEdit} onCancel={() => setOpenEdit(false)}>
                <img
                    alt="example"
                    className='widthFill'
                    src={BASE_URL + previewImage}
                />
            </PopupModal>
        </div>
    </>)
});

export default UploadImages
