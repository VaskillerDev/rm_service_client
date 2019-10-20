import React,{Component} from 'react';
import {Container, Dimmer, Divider, Header, Image, Label, Loader, Segment} from "semantic-ui-react";


const getRouterProperty  = async (item) => {
    return await fetch(item, {method: 'GET'}).then(r => r.json()).catch(e=>{console.log(e);});
};

const findByName = (data,name) => {

  try {
      let res = '';
      if (data) {
          res = data.filter(e => e.name === name);
          if (!res[0].img.url) { throw new Error('img.url not found')}
          return res[0].img.url;
      }
  } catch (e) { return ''; }
};



class Help extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            data: []
        }
    }

    UNSAFE_componentWillMount() {
    this.setState({isLoading: true});
    getRouterProperty('imagestores').then(r => this.setState({data : r, isLoading: false}) );

    }

    render() {

        const {isLoading,data} = this.state;

        if (isLoading) {return <Dimmer active={true}> <Loader/> </Dimmer>
        } else
        {

        return (

            <Container>
                <Header size={'huge'} textAlign={'center'}> Первичная диагностика устройства</Header>
                <Segment textAlign={'left'}>

                    <Header size={'large'} > Замена тачскрина </Header>
                    <Image  floated={'left'} size={'tiny'} src={findByName(data,"icn_dspl_inv") }  alt={'Здесь изображен дисплей'} />
                    <p>  {"Экран вашего устройства,называемый \"дисплейный модуль\" состоит из нескольких слоёв: подсветка,матрица и тачскрин (в простонародье стекло). "} </p>
                    <Divider/>
                    <p> { "После сильного удара,как правило,тачскрин не выдерживает оказываемого на него давления и быстро приходит в негодность.  "  } </p>
                    <Divider/>
                    <p> {"Наш сервис предлагает вам услугу по замене стекла вашего дисплейного модуля," +
                    "но есть ряд критериев,которым должно соответствовать ваше устройство: " +
                    "оригинальная матрица,отсутствие видимых дефектов (пятна,полосы,пыль)."} </p>



                    <br/> <br/>
                    <Label attached={'bottom left'} color={'yellow'} tag={true}> Категория ремонта: Medium</Label>
                    <br/> <br/>
                </Segment>

                <Segment textAlign={'left'}>
                    <Header size={'large'} > Замена дисплейного модуля </Header>
                    <p> {"В случае,когда на экране вашего устройства присутствуют пятна,полосы и другие видимые дефекты - потребуется замена дисплейного модуля "} </p>

                    <br/> <br/>
                    <Label attached={'bottom left'} color={'green'} tag={true}> Категория ремонта: Easy</Label>

                </Segment>

                <Segment textAlign={'left'}>
                    <Header size={'large'} > Замена аккумулятора </Header>
                    <Image  floated={'left'} size={'tiny'} src={findByName(data,"icn_btr_inv") }  alt={'Здесь изображена батарейка'} />
                    <p> {"Аккумуляторная батарея любого типа производства имеет свойства расходовать свою емкость со временем. "} </p>
                    <p> {"Компания Apple рекомендует менять аккумуляторную батарею каждые 3 года пользования устройства."} </p>
                    <Divider/>
                    <p>{"Состояние аккумулятора вы можете проверить в: \"Настройки\"-> \"Аккумулятор\" -> \"Состояние аккумулятора в процентном содержании.\" "} </p>
                    <br/> <br/>
                    <Label attached={'bottom left'} color={'green'} tag={true}> Категория ремонта: Easy</Label>
                    <br/> <br/>
                </Segment>

                <Segment textAlign={'left'}>
                <Header size={'large'} > Замена стекла корпуса </Header>
                <Image  floated={'left'} size={'tiny'} src={findByName(data,"icn_dspl_inv") }  alt={'Здесь изображена батарейка'} />
                <p> {"Аккумуляторная батарея любого типа производства имеет свойства расходовать свою емкость со временем. "} </p>
                <p> {"Компания Apple рекомендует менять аккумуляторную батарею каждые 3 года пользования устройства."} </p>
                <Divider/>
                <p>{"Состояние аккумулятора вы можете проверить в: \"Настройки\"-> \"Аккумулятор\" -> \"Состояние аккумулятора в процентном содержании.\" "} </p>
                <br/> <br/>
                <Label attached={'bottom left'} color={'yellow'} tag={true}> Категория ремонта: Medium</Label>
                <br/> <br/>
                </Segment>


                <Segment textAlign={'left'}>
                    <Header size={'large'} > Ремонт материнской платы</Header>
                    <Image  floated={'left'} size={'tiny'} src={findByName(data,"icn_schm_inv") }  alt={'Здесь изображена плата'} />
                    <p> {"В случае,когда модульный ремонт бессилен,основной областью поиска проблемы является материнская плата."} </p>
                    <Divider/>
                    <p>{"Паяльные работы по замене элементов на плате производятся в лаборатории в специально-отведенном для этого месте. "} </p>
                    <br/> <br/><br/> <br/>
                    <Label attached={'bottom left'} color={'red'} tag={true}> Категория ремонта: Hard</Label>
                    <br/> <br/>
                </Segment>


            </Container>

        ); //TODO: Аккумулятор

        }

    }

}

export default Help;