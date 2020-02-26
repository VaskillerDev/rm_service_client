import './App.css';
import React, {Fragment} from 'react';
import MenuHeader                from "./components/MenuHeader/MenuHeader";
import {Image}                   from "semantic-ui-react";
import { Redirect, Switch}       from "react-router";
import { BrowserRouter, Route }  from 'react-router-dom';
import Calculator                from "./components/MenuCalculator/Calculator/Calculator";
import Help                      from "./components/Help/Help";
import ContentCardSpawn          from "./components/ContentCard/ContentCardSpawn";
import SocialLinks               from "./components/MenuHeader/SocialLinks/SocialLinks";
import About                     from "./components/About/About";
import {ParallaxProvider}        from "react-scroll-parallax/cjs";
import axios                     from "axios";
import cfg                       from "./config/backend-api";
import ContentCardFull from "./components/ContentCard/ContentCardFull/ContentCardFull";
import Footer from "./components/Footer/Footer";

class  Logo extends React.Component {
    constructor(props){
        super(props);
        this.state = {img: null}
    }

    UNSAFE_componentWillMount() {
        axios.get(cfg().bcknd.host+'/imagestores?name=img_logo').then(r=>this.setState({img: r.data[0].img.url}) );
    }

    render() {
        const {img} = this.state;
        return <Image className={'App-logo'}  style={{width: '96px',height: '96px'}} src={`${cfg().bcknd.host}${img}`} alt={"RM SERVICE"} />
    }
}


function App() {

  return (
      <ParallaxProvider>
    <div className={'App'}>

        <div  className={'App-menuheader'}>
            <Logo/>
        <MenuHeader />

        </div>
        <br/><br/>
        <SocialLinks/>
        <br/>
        <BrowserRouter >
            <Switch>
            <Redirect exact={true} from={'/'}  to={"/main"}/>
            </Switch>
        <Route path={'/main'}  component={ContentCardSpawn}/>
        <Route path={'/about'} component={About}/>
        <Route path={'/calc'}  component={()=> {return(<Fragment> <Calculator/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> </Fragment>)}}/>
        <Route path={'/help'}  component={Help}/>
        <Route path={'/posts'} component={ContentCardFull} />
        </BrowserRouter>
        <br/>

        <Footer/>
    </div>
      </ParallaxProvider>
  );
}

export default App;
