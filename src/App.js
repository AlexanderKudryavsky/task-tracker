import React, {Suspense, lazy} from 'react';
import './App.scss';
import IndexPage from "./components/IndexPage/IndexPage";
import {Route} from "react-router-dom";
import Preloader from "./components/Preloader/Preloader";
const NewPage = React.lazy(() => import('./components/NewPage/NewPage'));
const EditPage = React.lazy(() => import("./components/EditPage/EditPage"));
const Login = React.lazy(() => import("./components/Login/Login"));

const App = (props) => {
    return(
        <div className={'app'}>
            <div>
                <Suspense  fallback={<Preloader/>}>
                <Route exact path='/' component={(props) =>
                    <IndexPage {...props}/>}
                />
                <Route exact path='/add' component={(props) =>
                    <NewPage {...props}/>}
                />
                <Route exact path='/edit/:id' component={(props) =>
                    <EditPage {...props}/>}
                />
                <Route exact path='/login' component={() =>
                    <Login/>}
                />
                </Suspense>
            </div>
        </div>
    )
};

export default App
