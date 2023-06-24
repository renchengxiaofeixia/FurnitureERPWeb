import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import store from './store/';
import locale from 'antd/locale/zh_CN';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          borderRadius: 0,
        },
      }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
)
