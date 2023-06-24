import { Modal, Tree, Divider } from 'antd';
import { VerticalAlignTopOutlined, VerticalAlignBottomOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import './columnsetting.scss'
const { TreeNode } = Tree


const ColFixType = {
    ToLeft: 1,
    ToRight: 1 << 1,
    LeftToRight: 1 << 2,
    RightToLeft: 1 << 3,
    ReleaseLeft: 1 << 4,
    ReleaseRight: 1 << 5,
}


const ColumnSettingModal = ({ columns, onClose }) => {
    //增加sort字段 方便排序
    columns = columns.map((col, idx) => {
        col.sort = idx; return col
    })
    const [cols, setCols] = useState(columns)
    const [fixLeftCols, setFixLeftCols] = useState([])
    const [fixRightCols, setFixRightCols] = useState([])
    useEffect(() => {

    }, [])

    const onOk = async () => {
        onClose(true)
    }


    const onClick = (node, colFixType) => {
        switch (colFixType) {
            case ColFixType.ToLeft:
                let lfCols = [...fixLeftCols, node]
                setFixLeftCols(lfCols.sort((a, b) => a.sort - b.sort))
                setCols(cols.filter(k => !(k.headerName == node.headerName && k.field == node.field)))
                break;
            case ColFixType.ToRight:
                let rtCols = [...fixRightCols, node]
                setFixRightCols(rtCols.sort((a, b) => a.sort - b.sort))
                setCols(cols.filter(k => !(k.headerName == node.headerName && k.field == node.field)))
                break;
            case ColFixType.RightToLeft:
                let rtlCols = [...fixLeftCols, node]
                setFixLeftCols(rtlCols.sort((a, b) => a.sort - b.sort))
                setFixRightCols(fixRightCols.filter(k => !(k.headerName == node.headerName && k.field == node.field)))
                break;
            case ColFixType.LeftToRight:
                let ltrCols = [...fixRightCols, node]
                setFixRightCols(ltrCols.sort((a, b) => a.sort - b.sort))
                setFixLeftCols(fixLeftCols.filter(k => !(k.headerName == node.headerName && k.field == node.field)))
                break;
            case ColFixType.ReleaseLeft:
                let relLeftCols = [...cols, node]
                setCols(relLeftCols.sort((a, b) => a.sort - b.sort))
                setFixLeftCols(fixLeftCols.filter(k => !(k.headerName == node.headerName && k.field == node.field)))
                break;
            case ColFixType.ReleaseRight:
                let relRightCols = [...cols, node]
                setCols(relRightCols.sort((a, b) => a.sort - b.sort))
                setFixRightCols(fixRightCols.filter(k => !(k.headerName == node.headerName && k.field == node.field)))
                break;
            default:
                break;
        }
    }

    function renderTreeNode(node) {
        return (
            <TreeNode title={
                <span className='column-setting-list-item' >
                    <div className='column-setting-list-item-title'>{node.headerName}</div>
                    <span className='column-setting-list-item-option'>
                        <span><VerticalAlignTopOutlined onClick={() => onClick(node, ColFixType.ToLeft)} /></span>
                        <span><VerticalAlignBottomOutlined onClick={() => onClick(node, ColFixType.ToRight)} /></span>
                    </span>
                </span>
            } key={node.field}>
            </TreeNode>
        );
    }

    function renderFixLeftTreeNode(node) {
        return (
            <TreeNode title={
                <span className='column-setting-list-item' >
                    <div className='column-setting-list-item-title'>{node.headerName}</div>
                    <span className='column-setting-list-item-option'>
                        <span><VerticalAlignMiddleOutlined onClick={() => onClick(node, ColFixType.ReleaseLeft)} /></span>
                        <span><VerticalAlignBottomOutlined onClick={() => onClick(node, ColFixType.LeftToRight)} /></span>
                    </span>
                </span>
            } key={node.field}>
            </TreeNode>
        );
    }

    function renderFixRightTreeNode(node) {
        return (
            <TreeNode title={
                <span className='column-setting-list-item' >
                    <div className='column-setting-list-item-title'>{node.headerName}</div>
                    <span className='column-setting-list-item-option'>
                        <span><VerticalAlignTopOutlined onClick={() => onClick(node, ColFixType.RightToLeft)} /></span>
                        <span><VerticalAlignMiddleOutlined onClick={() => onClick(node, ColFixType.ReleaseRight)} /></span>
                    </span>
                </span>
            } key={node.field}>
            </TreeNode>
        );
    }


    return (
        <Modal title="列展示" open={true} onOk={onOk} onCancel={onClose} bodyStyle={{ height: 400 }}>
            <Divider />
            <div className="column-setting-list column-setting-list-group">
                {fixLeftCols.length > 0 ?
                    (<><span className="column-setting-list-title">固定在左侧</span>
                        <Tree draggable
                            blockNode
                            checkable>
                            {fixLeftCols.map(renderFixLeftTreeNode)}
                        </Tree></>
                    ) : <></>}
                {cols.length > 0 ?
                    (<>{fixLeftCols.length > 0 || fixRightCols.length > 0 ? <span className="column-setting-list-title">不固定</span> : <></>}
                        <Tree
                            draggable
                            blockNode
                            checkable>
                            {cols.map(renderTreeNode)}
                        </Tree></>) : <></>
                }
                {fixRightCols.length > 0 ?
                    (<><span className="column-setting-list-title">固定在右侧</span>
                        <Tree draggable
                            blockNode
                            checkable>
                            {fixRightCols.map(renderFixRightTreeNode)}
                        </Tree></>) : <></>}
            </div>
        </Modal>
    )
}

export default ColumnSettingModal