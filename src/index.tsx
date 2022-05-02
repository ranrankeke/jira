import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// 里面也与一些antd的样式 
import {DevTools,loadServer } from 'jira-dev-tool'
//务必在jira-dev-tool后面使用
import 'antd/dist/antd.less'
import { AppProviders } from './context'

loadServer(()=>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools/>
         <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById('root')
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
