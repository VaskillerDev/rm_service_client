import React,{Component} from 'react'
import {Container, Flag, Segment} from "semantic-ui-react";
import SocialLinks from "../MenuHeader/SocialLinks/SocialLinks";

class Footer extends Component {

    render(){

        return(

              <Segment textAlign={'left'}  style={{background:'#00303b',color:'#eff4d8',borderRadius: '0 0 0 0'}}>
                <address>
                    <strong> Контакты: <a href={'tel:+79312784610'}>+7 931 278 46 10</a></strong>
                </address>
                  <div>
                      <strong> <Flag name='russia' /> Россия. Санкт-Петерург</strong>
                  </div>
                  <address>
                      Rm-Repair - ремонт техники Apple.
                  </address>

              </Segment>


        );
    }
}

export  default  Footer;
