import './App.css';
import React                     from 'react';
import MenuHeader                from "./components/MenuHeader/MenuHeader";
import {Image}                   from "semantic-ui-react";
import logo                      from '../src/image/logo.png';
import { Redirect, Switch}       from "react-router";
import { BrowserRouter, Route }  from 'react-router-dom';
import Calculator                from "./components/MenuCalculator/Calculator/Calculator";
import Help                      from "./components/Help/Help";
import ContentCardSpawn          from "./components/ContentCard/ContentCardSpawn";
import SocialLinks               from "./components/MenuHeader/SocialLinks/SocialLinks";



function App() {
  return (
    <div className={'App'}>

        <div  className={'App-menuheader'}>
            <Image className={'App-logo'}  size={'tiny'} src={logo} alt={"RM SERVICE"} />
            <br/>
            <br/>
            <p  > Ремонт техники Apple по Санкт-Петербургу </p>
        <MenuHeader />


        </div>
        <br/><br/>
        <SocialLinks/>
        <br/>
        <BrowserRouter >
            <Switch>
            <Redirect exact={true} from={'/'}  to={"/main"}/>
            </Switch>
        <Route path={'/main'} component={ContentCardSpawn}/>
        <Route path={'/calc'} component={Calculator}/>
        <Route path={'/help'} component={Help}/>
        </BrowserRouter>
        <br/>


    </div>
  );
}

export default App;
