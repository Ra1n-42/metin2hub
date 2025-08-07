// // routes.ts
import type { ReactElement } from 'react';
// import Login from './login';
// import Pets from '@/pages/pets';
import Home from '@/pages/home';
// import Armor from '@/pages/armor';
import Upload from '@/pages/upload';

// export interface AppRoute {
//     path: string;
//     element: ReactElement;
//     label?: string;      // optional: für Nav-Anzeige
//     showInNav?: boolean; // optional: ob es in der Navigation erscheint
// }

// export const appRoutes: AppRoute[] = [
//     { path: 'home', element: <Home />, label: 'Home', showInNav: true },
//     { path: 'pets', element: <Pets />, label: 'Pets', showInNav: true },
//     { path: 'login', element: <Login />, label: 'Login', showInNav: true },
// ];
export interface AppRoute {
    path: string;
    element?: ReactElement;
    label?: string;
    showInNav?: boolean;
    children?: AppRoute[]; // neu: für Dropdown-Unterpunkte
}

export const appRoutes: AppRoute[] = [
    { path: 'home', element: <Home />, label: 'GxT', showInNav: true },
    // {
    //     path: 'stuff',
    //     label: 'Stuff', // oder "Items", oder was du willst
    //     showInNav: true,
    //     children: [
    //         { path: 'pets', element: <Pets />, label: 'Pets', showInNav: true },
    //         // später:
    //         // { path: 'weapons', element: <Weapons />, label: 'Waffen', showInNav: true },
    //         { path: 'armor', element: <Armor />, label: 'Rüstungen', showInNav: true },
    //     ],
    // },
    { path: 'upload', element: <Upload />, label: 'Upload', showInNav: true },
    // { path: 'login', element: <Login />, label: 'Login', showInNav: true },
];
