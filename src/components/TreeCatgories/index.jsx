import React, { useState, useEffect } from 'react'
import { Collapse, Tree, TreeSelect } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { EditCatAsync } from '@/store/modules/item'
import {
    CatgoriesItem,
} from '@/Api/item'

const { Panel } = Collapse;
// 转成树状数据格式
function catgoriesTreeData(data) {
    let cateTreeData = []
    const catdts = [...data]
    catdts.forEach(k => {
        let cats = catdts.filter(j => j.pid == k.guid)
        k.children = cats;
        k.value = k.title = k.cateName
    });
    cateTreeData = catdts.filter(k => !k.pid);
    return [...cateTreeData];
}

const TreeCatgories = ({ treeSelect, className, style, treeSelectOptions, catgoriesOptions, placeholder }) => {
    const dispatch = useDispatch()
    let [cateData, setCateData] = useState([])
    let [cateTreeData, setCateTreeData] = useState([])

    const catgoriesAsync = async () => {
        let res = await CatgoriesItem()
        setCateData(res.data)
        setCateTreeData(catgoriesTreeData(res.data))
    }

    useEffect(() => {
        catgoriesAsync()
    }, [])


    const onDrop = (dragInfo) => {
        let { dragNode, node, dropToGap, dropPosition } = dragInfo;
        if (dragNode.title === "未分类" || dragNode.title === "全部") {
            return
        }
        let tmpCateData = cateData;
        // 获取拖动的位置
        let selectedDragNodeDataIndex = tmpCateData.findIndex(k => k.id == dragNode.id);
        // 获取相邻的位置
        let sublingNodeIndex = tmpCateData.findIndex(k => k.id == node.id);
        // 删除拖动的数据
        let selectedDragNodeData = tmpCateData.splice(selectedDragNodeDataIndex, 1)[0];

        if (dropToGap) { //同级
            selectedDragNodeData.pid = node.pid;
        } else {
            selectedDragNodeData.pid = node.guid;
        }
        // debugger
        // 插入拖动的数据到新的位置
        tmpCateData.splice(sublingNodeIndex + 1, 0, selectedDragNodeData)
        setCateTreeData(catgoriesTreeData(cateData))
        dispatch(EditCatAsync(tmpCateData))
    };

    return (
        <>
            {!treeSelect ? (<Collapse className={className} defaultActiveKey={['1']} size="small" style={style}>
                <Panel header="商品分类" key="1">
                    <Tree
                        treeData={[
                            { cateName: '全部', title: '全部', value: '-1', key: '-1' },
                            { cateName: '未分类', title: '未分类', value: '0', key: '0' },
                            ...cateTreeData]}
                        onDrop={onDrop}
                        fieldNames={{ title: 'cateName', key: 'id', children: 'children' }}
                        {...catgoriesOptions}
                    />
                </Panel>
            </Collapse>) : (
                <TreeSelect
                    treeData={cateTreeData}
                    fieldNames={{ title: 'cateName', key: 'id', children: 'itemCats' }}
                    placeholder={placeholder}
                    treeDefaultExpandAll
                    {...treeSelectOptions}
                >

                </TreeSelect>
            )}
        </>
    )
}

export default TreeCatgories