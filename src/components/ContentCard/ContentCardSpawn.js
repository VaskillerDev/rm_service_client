import React,{Component} from "react";
import {CardGroup, Container, Dimmer, Loader,} from "semantic-ui-react";
import ContentCard from "./ContentCard";
import cfg from "../../config/backend-api";

const getPostProperty  = async (item) => {
    return await fetch(cfg().bcknd.host+item, {method: 'GET'}).then(r => r.json());
};

const sliceText = (text) => {
    text = text.slice(0,128);
    if (text.length >= 128) {text = text.concat("...");}
    return text;
};

class ContentCardSpawn extends Component{

    constructor(props){
        super(props);
        this.state = {data: {}, isLoading: false};
    }

    async getData(){
        this.setState({isLoading: true});
        const r = await getPostProperty('/posts');
        this.setState({data: r});
        this.setState({isLoading: false});
    }

    UNSAFE_componentWillMount() {
        this.getData();
    }

    render() {
        const {data,isLoading} = this.state;
        if (isLoading) {return <Dimmer active> <Loader/>  </Dimmer>} else {

            return (
               <Container>
                <CardGroup doubling={true} itemsPerRow={2} >
                    {data.map(e=>
                            <ContentCard
                                src={cfg().bcknd.host+e.image.url}
                                alt={e.alt_image}
                                url={`posts/${e.id}`}
                                header={e.header}
                                content={sliceText(e.content)}
                                key={e.id}
                                tags = {e.tags} />
                    )}

                </CardGroup>
               </Container>
            );

        }

    }


}

export default  ContentCardSpawn;
