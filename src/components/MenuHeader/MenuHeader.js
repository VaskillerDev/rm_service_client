import React, {Component} from 'react';
import '../../App.css';
import {Container, Menu} from "semantic-ui-react";



const getRouterProperty  = async (item) => {
   return await fetch(item, {method: 'GET'}).then(r => r.json());
};




class MenuHeader extends  Component {

    constructor(){
        super();
        this.state = {data: {}, isLoading: false};
    }

    async getData(){
        this.setState({isLoading: true});
        const r = await getRouterProperty('/sections');
        this.setState({data: r});
        this.setState({isLoading: false});
    }


    UNSAFE_componentWillMount()
     {
        this.getData();
    };


    render() {
        const  {data,isLoading} = this.state;
        if (isLoading) {return <div/>} else { return(
            <Container className={'App-menu'} >
            <Menu  fluid={true} floated={true} widths={4} >



                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                {data.map(e=>  <Menu.Item href={e.url} key={e.id} >  {e.title}  </Menu.Item>)}


    </Menu>
            </Container>
            );}

    }
}

export default  MenuHeader;