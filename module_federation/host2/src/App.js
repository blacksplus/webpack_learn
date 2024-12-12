import React from'react';
import Host2Component from './host2Component';
const RemoteComponent = React.lazy(() => import('remote/host1Component')); //动态导入远程组件
export default function App() {
  return (<div>
    <h1>Host2本地组件</h1>
    <Host2Component/>
    <h2>Host2远程组件</h2>
    <React.Suspense fallback={<div>Loading...</div>}>
      <RemoteComponent/>
    </React.Suspense>
    <button onClick={() => {
      import('remote/click').then(module => {
        console.log(module);
        module.click()
      });
    }}>远程js</button>
  </div>);
}