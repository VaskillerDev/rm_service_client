import React,{Component} from "react";
import {Card, Container, Divider, Label} from "semantic-ui-react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactMarkdown from "react-markdown";

const addTags =  (tags) => {

   return tags.map(e=> <Label> {e.name} </Label>);

};


class ContentCard extends Component{

    render() {
        return(
            <Card fluid={true} href={this.props.url}  name={this.props.url}>
                <div/>
                <LazyLoadImage src = {this.props.src} effect={'blur'} style={{borderRadius:'4px 4px 0 0'}}  width={'100%'} alt={this.props.alt} />

                <Card.Content textAlign={'left'} style={{borderStyle:"hidden"}}  >
                    <Card.Header textAlign = {'center'}> {this.props.header}</Card.Header>
                    <Divider/>
                    <Card.Description>
                    <Container >
                        <ReactMarkdown source={this.props.content}/>
                    </Container>
                    </Card.Description>
                    <br/>
                    <Card.Meta>
                        {addTags(this.props.tags)}
                    </Card.Meta>
                </Card.Content>

            </Card>
        );
    }


}

export default  ContentCard;
