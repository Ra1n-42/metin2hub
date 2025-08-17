// // routes.ts
import type { ReactElement } from 'react';
import Home from '@/pages/home';
// import Upload from '@/pages/upload';
import AssetSearchPage from '@/pages/assets';
import AssetDetailPage from '@/pages/AssetDetailPage';
import CreatorProfilePage from './CreatorProfilePage';

export interface AppRoute {
    path: string;
    element?: ReactElement;
    label?: string;
    showInNav?: boolean;
}

export const appRoutes: AppRoute[] = [
    { path: 'home', element: <Home />, label: 'GxT', showInNav: true },
    { path: 'assets', element: <AssetSearchPage />, label: 'Assets', showInNav: false },
    { path: 'asset/:id', element: <AssetDetailPage />, label: 'Asset Detail', showInNav: false },
    { path: 'creator/:name', element: <CreatorProfilePage />, label: '', showInNav: false },

    // { path: 'upload', element: <Upload />, label: 'Upload', showInNav: true },
];
