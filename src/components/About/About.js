import React,{Component} from "react";
import {Button, CardGroup, Header, Image, Loader, Segment, Statistic} from "semantic-ui-react";
import {Parallax} from "react-scroll-parallax/cjs";
import axios      from "axios";
import CommentCard from "../CommentCard/CommentCard";
import Calculator from "../MenuCalculator/Calculator/Calculator";
import cfg          from "../../config/backend-api";

const getRouterProperty  = async (item) => {
    return await fetch(cfg().bcknd.host+"/"+item, {method: 'GET'}).then(r => r.json()).catch(e=>{console.log(e);});
};

const findByName = (data,name) => {
    try {
        let res = 'err';
        if (data) {
            res = data.filter(e => e.name === name);
            if (!res[0].img.url) { throw new Error('img.url not found')}
            return cfg().bcknd.host+res[0].img.url;
        }
    } catch (e) { return 'rre'; }
};


const arrayToCommentCard = (data) => {
    return data.map(x=><CommentCard img={cfg().bcknd.host+x.img.url} key={x.name} name={x.name} content={x.content} url={x.url}/>)
};

class About extends Component{
    constructor(props) { super(props); this.state = {data: <Loader/>,data_images: []} }

    UNSAFE_componentWillMount() {
    axios.get(cfg().bcknd.host+"/comments").then(r=> this.setState({data: arrayToCommentCard(r.data)}))
                                                .catch(r=>this.setState({data: <Loader/>}));
    getRouterProperty('imagestores')      .then(r => this.setState({data_images : r}) );
    }

    render() {
        const {data_images} = this.state;
    return(
        <div>

            <Parallax   y={[-20, 20]} >
                <Header textAlign={'center'} size={'huge'}>
                    <Header.Content>
                        Быстрый и надёжный ремонт техники в Apple в городе Санкт-Петербург.
                    </Header.Content>
                    <br/><br/>
                    <Header.Subheader>
                        Сервис ремонта вашего iPhone c выезом мастера в любую точку.
                    </Header.Subheader>
                    <br/>
                </Header>
            </Parallax>

            <Parallax y={[-50 ,50]} >
                <Image floated={'right'} src={findByName(data_images,'img_0')} size={'mini'}/>
                <Image floated={'right'} src={findByName(data_images,'img_spaceman')} size={'medium'}/>
                <Image floated={'right'} src={findByName(data_images,'img_1')} size={'mini'}/>
                <Image floated={'right'} src={findByName(data_images,'img_0')} size={'tiny'}/>
            </Parallax>



            <Parallax   y={[40, -90]} >

                <Segment compact={true} style={{backgroundColor: '#00303b'}}>
                    <Header textAlign={'center'} size={'middle'} >
                        <Header.Content >
                            <Statistic size={'huge'} >
                                <Statistic.Label style={{color: '#eff4d8'}}>НАМ ДОВЕРЯЮТ</Statistic.Label>
                                <Statistic.Label style={{color: '#eff4d8'}}> Более</Statistic.Label>
                                <Statistic.Value style={{color: '#eff4d8'}}>500</Statistic.Value>
                                <Statistic.Label style={{color: '#eff4d8'}}>Клиентов</Statistic.Label>
                            </Statistic>
                        </Header.Content>

                    </Header>
                </Segment>
            </Parallax>

            <Parallax   y={[-20, 20]} >
                <Header textAlign={'center'} size={'huge'}>
                    <Header.Content>
                        Только фиксированные цены.
                    </Header.Content>
                    <br/><br/>
                    <Header.Subheader>
                        У нас указана только конечная цена ремонта с учетом цен запчастей. Никакого лукавства.
                    </Header.Subheader>
                    <br/>
                </Header>
            </Parallax>


            <Parallax   y={[40, -40]} >
                <br/><br/><br/>
                <Segment compact={true} style={{backgroundColor: '#00303b'}} textAlign={'right'}>
                    <Header textAlign={'right'} size={'middle'} >
                        <Header.Content >
                            <Statistic size={'huge'} >
                                <Statistic.Label style={{color: '#eff4d8'}}>ОПЫТ РАБОТЫ</Statistic.Label>
                                <Statistic.Label style={{color: '#eff4d8'}}> Более</Statistic.Label>
                                <Statistic.Value style={{color: '#eff4d8'}}>7</Statistic.Value>
                                <Statistic.Label style={{color: '#eff4d8'}}>Лет</Statistic.Label>
                            </Statistic>
                        </Header.Content>

                    </Header>
                </Segment>
            </Parallax>


            <Parallax y={[0 ,-50]} >
                <Image floated={'left'} src={findByName(data_images,'img_1')} size={'tiny'}/>
                <Image floated={'left'} src={findByName(data_images,'img_robot')} size={'medium'}/>
                <Image floated={'left'} src={findByName(data_images,'img_1')} size={'mini'}/>
            </Parallax>



            <Parallax   y={[0, 0]} >
                <br/> <br/> <br/> <br/>
                <Header textAlign={'center'} size={'huge'}>
                    <Header.Content>
                        Надежность и прозрачность услуг.
                    </Header.Content>
                    <br/><br/>
                    <Header.Subheader>
                        Мы гарантируем качество наших ремонтных работ и не оставим Вас с сломанным устройством.
                    </Header.Subheader>

                </Header>
            </Parallax>


            <Parallax   y={[10, -5]} >
                <br/><br/><br/><br/> <br/>
                <Segment style={{boxShadow: '0 5px  60px gray'}}>
                    <Header textAlign={'center'} size={'huge'}>
                        <Header.Content>
                            Нам доверяют:
                        </Header.Content>
                    </Header>
                    <CardGroup centered={true}>
                        {this.state.data}
                    </CardGroup>

                </Segment>

                <br/>

                <Button style={{boxShadow: '0 5px  60px gray'}} href={'/help'} circular={true} size={'huge'}  color={'teal'}> Помощь </Button>
                <br/><br/><br/>
                <Calculator/>

            </Parallax>

</div>
    );
}


}

export default About
