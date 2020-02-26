import React from "react";
import {Card, Image} from "semantic-ui-react";

class CommentCard  extends React.Component{
    // img, name , content, url
    render() {
       return(
            <React.Fragment>
            <Card>
                <Image centered={true} size={'small'} src={this.props.img} alt={"Здесь изображен человек"}/>
                <Card.Content>
                    <Card.Header> {this.props.name} </Card.Header>
                    <Card.Description> {this.props.content}</Card.Description>
                </Card.Content>
                <Card.Content extra={true}> <a href={this.props.url}> {this.props.url} </a></Card.Content>
            </Card>
            </React.Fragment>
        );
    }

}

export default CommentCard;