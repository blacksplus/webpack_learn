import React from'react';
import Host1Component from './host1Component';
const RemoteComponent = React.lazy(() => import('remote/host2Component'));
export default function App() {
  return (<div>
    <h1>Host1本地组件</h1>
    <Host1Component/>
    <h2>Host1远程组件</h2>
    <React.Suspense fallback={<div>Loading...</div>}>
      <RemoteComponent/>
    </React.Suspense>
  </div>);
}