import React, {Component} from "react";
import { Image} from "semantic-ui-react";
import '../../../App.css';


const getSocialLinksProperty  = async (item) => {
    return await fetch(item, {method: 'GET'}).then(r => r.json());
};

class SocialLinks extends Component {

    constructor(){
        super();

        this.state = {
            data : [],
            isLoading: false
        }

    }

    async getData(){
        this.setState({isLoading: true});
        const r = await getSocialLinksProperty('/sociallinks');
        this.setState({data: r});
        this.setState({isLoading: false});
    }

    UNSAFE_componentWillMount() {
    this.getData();
    }

    render() {
        const  {data,isLoading} = this.state;

        if (isLoading) {return <div/>
        } else {
            return  (

                    <Image.Group   className={'App-sociallinks'}  >
                        {data.filter(e=>e.url != null).map(e =>  <Image alt={e.url} href={e.url}  centered={true}  src={e.img.url} key={e.id} size={'tiny'}/>)}
                    </Image.Group>

                );
            }

    }

}

export default SocialLinks;