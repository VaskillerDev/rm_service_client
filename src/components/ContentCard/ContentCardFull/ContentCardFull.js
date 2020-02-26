import React                             from "react";
import {Card, Container, Divider, Header, Label} from "semantic-ui-react";
import axios                             from "axios";
import {LazyLoadImage}                   from "react-lazy-load-image-component";
import cfg                               from "../../../config/backend-api";
import ReactMarkdown from "react-markdown";

const addTags =  (tags) => {

    return tags.map(e=> <Label> {e.name} </Label>);

};

const getRoute = () => {
    const path = window.location.pathname.split('/');
    return path[path.length-1];
};

class ContentCardFull  extends React.Component{
    // img, name , content, url

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            img: "",     // изображение
            alt_img: "", // альтернативный текст
            header: "",  // заголовок
            content: ""  // сontent
        }
    }

    async getData() {
        axios.get(`${cfg().bcknd.host}/posts/${getRoute()}`)
            .then( r =>{
                this.setState({
                    img: cfg().bcknd.host + r.data.image.url,
                    alt_img: r.data.image.alt_image,
                    header: r.data.header,
                    content: r.data.content
                });
            })
            .catch(e => console.log(e));
    }

    UNSAFE_componentWillMount() {
        this.setState({isLoading: true});
        this.getData();
        this.setState({isLoading: false});
    }

    render() {
        console.log(getRoute());
        return(
            <Container>
                <Header as={"h1"} style={{fontSize:"250%"}}>{this.state.header}</Header>
                <br/>
                <LazyLoadImage src = {this.state.img} effect={'blur'} style={{borderRadius:'16px 16px 16px 16px'}}  width={'90%'} alt={this.state.alt_img} />
                <Divider/>
                <Container textAlign={"left"}>
                <ReactMarkdown source={this.state.content}/>
                </Container>
            </Container>

        );
    }

}

export default ContentCardFull;
