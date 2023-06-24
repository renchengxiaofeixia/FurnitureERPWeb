import React, { useState, useEffect } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Typography, ColorPicker } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { setTheme } from "@/store/modules/app";
const { Title } = Typography;
const SetTheme = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.app);
  const [open, setOpen] = useState(false);
  const [colorHex, setColorHex] = useState(theme);

  useEffect(() => {
    dispatch(
      setTheme(typeof colorHex === "string" ? colorHex : colorHex.toHexString())
    );
  }, [colorHex]);
  return (
    <>
      <div className="absolute bottom-5 right-5">
        <Button type="primary" onClick={() => setOpen(true)}>
          <SettingOutlined />
        </Button>
      </div>

      <Drawer
        title="主题色设置"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Space wrap className="flex-col">
          <Title level={5}>主题色</Title>
          <ColorPicker format="hex" value={colorHex} onChange={setColorHex} />
        </Space>
      </Drawer>
    </>
  );
};
export default SetTheme;
