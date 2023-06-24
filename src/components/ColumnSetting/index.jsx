import { Popover, Tree, Checkbox, Button } from 'antd';
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

const FixTreeType = {
    Left: 1,
    Right: 1 << 1,
    NoFix: 1 << 2,
}


const ColumnSettingPopover = ({ columns, onClose ,children }) => {
    //增加sort字段 方便排序
    columns = columns.map((col, idx) => {
        col.sort = idx; return col
    })
    const [cols, setCols] = useState(columns)
    const [fixLeftCols, setFixLeftCols] = useState([])
    const [fixRightCols, setFixRightCols] = useState([])

    const [checkedKeys, setCheckedKeys] = useState([]);
    const [checkedFixLeftKeys, setCheckedFixLeftKeys] = useState([]);
    const [checkedFixRightKeys, setCheckedFixRightKeys] = useState([]);

    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    

    useEffect(() => {

    }, [])

    const onOk = async () => {
        onClose(true)
    }


    const onClick = (node, colFixType) => {
        switch (colFixType) {
            case ColFixType.ToLeft:
                let lfCols = [...fixLeftCols, node]
                if(checkedKeys.some(f=>f == node.field)){
                    setCheckedKeys(checkedKeys.filter(f=> f != node.field))
                    setCheckedFixLeftKeys([...checkedFixLeftKeys,node.field])
                }
                setFixLeftCols(lfCols.sort((a, b) => a.sort - b.sort))
                setCols(cols.filter(k => !(k.headerName == node.headerName && k.field == node.field)))
                break;
            case ColFixType.ToRight:
                let rtCols = [...fixRightCols, node]
                if(checkedKeys.some(f=> f == node.field)){
                    setCheckedKeys(checkedKeys.filter(f=> f != node.field))
                    setCheckedFixRightKeys([...checkedFixRightKeys,node.field])
                }
                setFixRightCols(rtCols.sort((a, b) => a.sort - b.sort))
                setCols(cols.filter(k => !(k.headerName == node.headerName && k.field == node.field)))
                break;
            case ColFixType.RightToLeft:
                let rtlCols = [...fixLeftCols, node]
                if(checkedFixRightKeys.some(f=> f == node.field)){
                    setCheckedFixRightKeys(checkedFixRightKeys.filter(f=> f != node.field))
                    setCheckedFixLeftKeys([...checkedFixLeftKeys,node.field])
                }
                setFixLeftCols(rtlCols.sort((a, b) => a.sort - b.sort))
                setFixRightCols(fixRightCols.filter(k => !(k.headerName == node.headerName && k.field == node.field)))
                break;
            case ColFixType.LeftToRight:
                let ltrCols = [...fixRightCols, node]
                if(checkedFixLeftKeys.some(f=> f == node.field)){
                    setCheckedFixLeftKeys(checkedFixLeftKeys.filter(f=> f != node.field))
                    setCheckedFixRightKeys([...checkedFixRightKeys,node.field])
                }
                setFixRightCols(ltrCols.sort((a, b) => a.sort - b.sort))
                setFixLeftCols(fixLeftCols.filter(k => !(k.headerName == node.headerName && k.field == node.field)))
                break;
            case ColFixType.ReleaseLeft:
                let relLeftCols = [...cols, node]
                if(checkedFixLeftKeys.some(f=> f == node.field)){
                    setCheckedFixLeftKeys(checkedFixLeftKeys.filter(f=> f != node.field))
                    setCheckedKeys([...checkedKeys,node.field])
                }
                setCols(relLeftCols.sort((a, b) => a.sort - b.sort))
                setFixLeftCols(fixLeftCols.filter(k => !(k.headerName == node.headerName && k.field == node.field)))
                break;
            case ColFixType.ReleaseRight:
                let relRightCols = [...cols, node]
                if(checkedFixRightKeys.some(f=> f == node.field)){
                    setCheckedFixRightKeys(checkedFixRightKeys.filter(f=> f != node.field))
                    setCheckedKeys([...checkedKeys,node.field])
                }
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

    const onCheckAllChange = (e) => {
        if(e.target.checked){
            setCheckedKeys(cols.map(k=>k.field))
            setCheckedFixLeftKeys(fixLeftCols.map(k=>k.field))
            setCheckedFixRightKeys(fixRightCols.map(k=>k.field))
        }
        else{
            setCheckedKeys([])
            setCheckedFixLeftKeys([])
            setCheckedFixRightKeys([])
        }
        setIndeterminate(false);
        setCheckAll(e.target.checked)
    };

    const onCheck = (checkedKeysValue,fixTreeType)=>{
        let setKeys = new Set()
        switch(fixTreeType)
        {
            case FixTreeType.Left:
                setCheckedFixLeftKeys(checkedKeysValue)
                setKeys = new Set([...checkedKeysValue,...checkedKeys,...checkedFixRightKeys])
                break;
            case FixTreeType.Right:
                setCheckedFixRightKeys(checkedKeysValue)
                setKeys = new Set([...checkedKeysValue,...checkedKeys,...checkedFixLeftKeys])
                break;
            case FixTreeType.NoFix:
                setCheckedKeys(checkedKeysValue)
                setKeys = new Set([...checkedKeysValue,...checkedFixRightKeys,...checkedFixLeftKeys])
                break;
            default:
                break;
        }

        if([...setKeys].length == 0){
            setIndeterminate(false)
            setCheckAll(false)
        }
        else if([...setKeys].length == columns.length){
            setIndeterminate(false)
            setCheckAll(true)
        }
        else if([...setKeys].length> 0){
            setIndeterminate(true)
            setCheckAll(false)
        }
    }

    const onResetClick = () =>{
        setCols(columns)
        setFixLeftCols([])
        setFixRightCols([])

        setCheckedKeys(columns.map(k=>k.field))
        setCheckedFixLeftKeys([])
        setCheckedFixRightKeys([])

        setIndeterminate(false)
        setCheckAll(true)
    }

    return (
        <div className='column-setting-overlay'>
            <Popover title={()=>(
                <div className='column-setting-title'>
                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                        列展示
                    </Checkbox>
                    <Button type="link" onClick={onResetClick} style={{padding:0}}>重置</Button>
                </div>)
            } placement="bottom" trigger="click" content={()=>(
                <div className="column-setting-list column-setting-list-group">
                    {fixLeftCols.length > 0 ?
                        (<><span className="column-setting-list-title">固定在左侧</span>
                            <Tree draggable
                                blockNode
                                checkable onCheck={val=>onCheck(val,FixTreeType.Left)}
                                checkedKeys={checkedFixLeftKeys}>
                                {fixLeftCols.map(renderFixLeftTreeNode)}
                            </Tree></>
                        ) : <></>}
                    {cols.length > 0 ?
                        (<>{fixLeftCols.length > 0 || fixRightCols.length > 0 ? <span className="column-setting-list-title">不固定</span> : <></>}
                            <Tree
                                draggable
                                blockNode
                                checkable onCheck={val=>onCheck(val,FixTreeType.NoFix)}
                                checkedKeys={checkedKeys}>
                                {cols.map(renderTreeNode)}
                            </Tree></>) : <></>
                    }
                    {fixRightCols.length > 0 ?
                        (<><span className="column-setting-list-title">固定在右侧</span>
                            <Tree draggable
                                blockNode
                                checkable onCheck={val=>onCheck(val,FixTreeType.Right)}
                                checkedKeys={checkedFixRightKeys}
                                >
                                {fixRightCols.map(renderFixRightTreeNode)}
                            </Tree></>) : <></>}
                </div>
            )}>
                {children}
            </Popover>
        </div>
    )
}

export default ColumnSettingPopover