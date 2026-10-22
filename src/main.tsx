import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import AutoCinematicSite from './studio/AutoCinematicSite';
import config from './studio/generated.site.json';
import './styles.css';
const ComponentCatalog=lazy(()=>import('./App'));
const ClassicCinematic=lazy(()=>import('./cinematic/CinematicStorefront'));
const ToolkitAuditHarness=lazy(()=>import('./studio/ToolkitAuditHarness'));
const UniversalAssetSite=lazy(()=>import('./studio/UniversalAssetSite'));
const MotionShowcase=lazy(()=>import('./motion/MotionShowcase'));
const view=new URLSearchParams(window.location.search).get('view');
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div style={{minHeight:'100vh',background:'#111'}}/>}>
      {view==='toolkit'?<ComponentCatalog/>:view==='classic'?<ClassicCinematic/>:view==='audit'?<ToolkitAuditHarness/>:view==='motion'?<MotionShowcase/>:(view==='universal'||config.category!=='fashion'?<UniversalAssetSite/>:<AutoCinematicSite/>)}
    </Suspense>
  </React.StrictMode>
);
