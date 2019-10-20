import React,{Component,useState,useEffect} from 'react';
import {Button, Container, Dimmer, Dropdown, Input, Label, Loader, Segment} from "semantic-ui-react";

//todo: устранить глобальность - внести в комопнент, как только станет известно !!!
let cache = new Map(); // Глобальный кэш на компонент

const getRouterProperty  = async (item) => {
    return await fetch(item, {method: 'GET'}).then(r => r.json());
};

function ButtonToggle(props)  {

    let [check,setCheck] = useState(false);

    useEffect(()=>{
        check? cache.set(props.bkey, props.bvalue) : cache.delete(props.bkey, props.bvalue);

        if (cache.size > 0)     {props.parrentCallback(true);}
        if (cache.size === 0)   {props.parrentCallback(false)}
    });

    return <Button toggle={true}  value={props.bvalue}
                   active={check} key={props.bkey}
                   onClick={()=>{setCheck(check = !check);}} >{props.bkey}</Button>
}

function FormComment(props) {
    const [comment,setComment] = useState("");

    useEffect(()=>{
       props.parrentCallback(comment);
    });

    return <Container>  <Input id={'node_comment'} placeholder={'Ваши контакты'}  onChange={e => setComment(e.target.value)}/> <br/> <br/> <TotalPrice/> </Container>
}

function TotalPrice() {

    /**
     * @return {number}
     */
    function Sum() {
        let sum = 0;
         cache.forEach(e=>sum+=e);
        return sum;
    }

    return(<Label>{`Итог: ${Sum()} ₽`}</Label>)
}

function ButtonNext() {

    let [isLoading,setLoading]      = useState(false);
    let [color,setColor]        = useState('blue');
    let [message,setMessage]    = useState("Отправить заяку");

   async function sendData(data) {

       return await fetch('http://localhost:8080/send', {
           method: 'POST',
           headers: {
               'Content-Type':  'application/json;charset=utf-8'
           },
           body: JSON.stringify(data)
       }).then(r=> {if (r.status === 500) {new Error("Ошибка на сервере")}})
          .catch(e=>console.log(e));
   }


   function sendForm(){

        try {
            setLoading(isLoading = true);
            const model    = document.getElementById('node_model').innerText;
            const comment  = document.getElementById('node_comment').value;

            const jsDetect = new RegExp('<[^\\w<>]*(?:[^<>"\'\\s]*:)?[^\\w<>]*(?:\\W*s\\W*c\\W*r\\W*i\\W*p\\W*t|\\W*f\\W*o\\W*r\\W*m|\\W*s\\W*t\\W*y\\W*l\\W*e|\\W*s\\W*v\\W*g|\\W*m\\W*a\\W*r\\W*q\\W*u\\W*e\\W*e|(?:\\W*l\\W*i\\W*n\\W*k|\\W*o\\W*b\\W*j\\W*e\\W*c\\W*t|\\W*e\\W*m\\W*b\\W*e\\W*d|\\W*a\\W*p\\W*p\\W*l\\W*e\\W*t|\\W*p\\W*a\\W*r\\W*a\\W*m|\\W*i?\\W*f\\W*r\\W*a\\W*m\\W*e|\\W*b\\W*a\\W*s\\W*e|\\W*b\\W*o\\W*d\\W*y|\\W*m\\W*e\\W*t\\W*a|\\W*i\\W*m\\W*a?\\W*g\\W*e?|\\W*v\\W*i\\W*d\\W*e\\W*o|\\W*a\\W*u\\W*d\\W*i\\W*o|\\W*b\\W*i\\W*n\\W*d\\W*i\\W*n\\W*g\\W*s|\\W*s\\W*e\\W*t|\\W*i\\W*s\\W*i\\W*n\\W*d\\W*e\\W*x|\\W*a\\W*n\\W*i\\W*m\\W*a\\W*t\\W*e)[^>\\w])|(?:<\\w[\\s\\S]*[\\s\\0\\/]|[\'"])(?:formaction|style|background|src|lowsrc|ping|on(?:d(?:e(?:vice(?:(?:orienta|mo)tion|proximity|found|light)|livery(?:success|error)|activate)|r(?:ag(?:e(?:n(?:ter|d)|xit)|(?:gestur|leav)e|start|drop|over)?|op)|i(?:s(?:c(?:hargingtimechange|onnect(?:ing|ed))|abled)|aling)|ata(?:setc(?:omplete|hanged)|(?:availabl|chang)e|error)|urationchange|ownloading|blclick)|Moz(?:M(?:agnifyGesture(?:Update|Start)?|ouse(?:PixelScroll|Hittest))|S(?:wipeGesture(?:Update|Start|End)?|crolledAreaChanged)|(?:(?:Press)?TapGestur|BeforeResiz)e|EdgeUI(?:C(?:omplet|ancel)|Start)ed|RotateGesture(?:Update|Start)?|A(?:udioAvailable|fterPaint))|c(?:o(?:m(?:p(?:osition(?:update|start|end)|lete)|mand(?:update)?)|n(?:t(?:rolselect|extmenu)|nect(?:ing|ed))|py)|a(?:(?:llschang|ch)ed|nplay(?:through)?|rdstatechange)|h(?:(?:arging(?:time)?ch)?ange|ecking)|(?:fstate|ell)change|u(?:echange|t)|l(?:ick|ose))|m(?:o(?:z(?:pointerlock(?:change|error)|(?:orientation|time)change|fullscreen(?:change|error)|network(?:down|up)load)|use(?:(?:lea|mo)ve|o(?:ver|ut)|enter|wheel|down|up)|ve(?:start|end)?)|essage|ark)|s(?:t(?:a(?:t(?:uschanged|echange)|lled|rt)|k(?:sessione|comma)nd|op)|e(?:ek(?:complete|ing|ed)|(?:lec(?:tstar)?)?t|n(?:ding|t))|u(?:ccess|spend|bmit)|peech(?:start|end)|ound(?:start|end)|croll|how)|b(?:e(?:for(?:e(?:(?:scriptexecu|activa)te|u(?:nload|pdate)|p(?:aste|rint)|c(?:opy|ut)|editfocus)|deactivate)|gin(?:Event)?)|oun(?:dary|ce)|l(?:ocked|ur)|roadcast|usy)|a(?:n(?:imation(?:iteration|start|end)|tennastatechange)|fter(?:(?:scriptexecu|upda)te|print)|udio(?:process|start|end)|d(?:apteradded|dtrack)|ctivate|lerting|bort)|DOM(?:Node(?:Inserted(?:IntoDocument)?|Removed(?:FromDocument)?)|(?:CharacterData|Subtree)Modified|A(?:ttrModified|ctivate)|Focus(?:Out|In)|MouseScroll)|r(?:e(?:s(?:u(?:m(?:ing|e)|lt)|ize|et)|adystatechange|pea(?:tEven)?t|movetrack|trieving|ceived)|ow(?:s(?:inserted|delete)|e(?:nter|xit))|atechange)|p(?:op(?:up(?:hid(?:den|ing)|show(?:ing|n))|state)|a(?:ge(?:hide|show)|(?:st|us)e|int)|ro(?:pertychange|gress)|lay(?:ing)?)|t(?:ouch(?:(?:lea|mo)ve|en(?:ter|d)|cancel|start)|ime(?:update|out)|ransitionend|ext)|u(?:s(?:erproximity|sdreceived)|p(?:gradeneeded|dateready)|n(?:derflow|load))|f(?:o(?:rm(?:change|input)|cus(?:out|in)?)|i(?:lterchange|nish)|ailed)|l(?:o(?:ad(?:e(?:d(?:meta)?data|nd)|start)?|secapture)|evelchange|y)|g(?:amepad(?:(?:dis)?connected|button(?:down|up)|axismove)|et)|e(?:n(?:d(?:Event|ed)?|abled|ter)|rror(?:update)?|mptied|xit)|i(?:cc(?:cardlockerror|infochange)|n(?:coming|valid|put))|o(?:(?:(?:ff|n)lin|bsolet)e|verflow(?:changed)?|pen)|SVG(?:(?:Unl|L)oad|Resize|Scroll|Abort|Error|Zoom)|h(?:e(?:adphoneschange|l[dp])|ashchange|olding)|v(?:o(?:lum|ic)e|ersion)change|w(?:a(?:it|rn)ing|heel)|key(?:press|down|up)|(?:AppComman|Loa)d|no(?:update|match)|Request|zoom))[\\s\\0]*=');

           if (jsDetect.test(comment)){ throw new Error('JS detected')}

            const data = {
              model    : model,
              services : JSON.stringify([...cache]),
              comment  : comment
            };

            sendData(data).then(()=>{
                setLoading(isLoading = false);
                setColor(color='green');
                setMessage(message = "Заявка отправлена")
            });



        } catch (e) {
            setLoading(isLoading = false);
            setColor(color='red');
            setMessage(message = "Произошла ошибка");
            console.log(e);
        }

    }

    return (<Button loading={isLoading} color={color} onClick={sendForm}> {message}</Button>);
}

class Calculator extends Component {

    constructor(props){
        super(props);

        this.state = {
            data:            [],
            models:          [],
            repairs:         [],
            isLoading:       false,
            FormComment:     null,
            ButtonNext:      null
        };

        this.setRepairs      = this.setRepairs.bind(this);
        this.showFormComment = this.showFormComment.bind(this);
        this.showButtonNext  = this.showButtonNext.bind(this);
    }

    async getData(){
        this.setState({isLoading: true});
        const r = await getRouterProperty('/services');
        this.setState({data: r});
        const models = [];
        let i = 0;
        r.forEach(e => {
            models.push({key: i, value: e.model, text: e.model});
            i++;
        });
        this.setState({models: models });
        this.setState({isLoading: false});
    }

    UNSAFE_componentWillMount() {
        this.getData()
    }

    setRepairs(e,data){

        cache = new Map();



        const model     = this.state.data
                            .filter(e=>e.model === data.value);
        const repairs   = model[0].repair;
        this.setState( {repairs: Object.keys(repairs)
                                .map(e => <ButtonToggle key={e}
                                                        bkey={e}
                                                        bvalue={repairs[e]}
                                                        parrentCallback={this.showFormComment}
                                /> )});


    }

    showFormComment(signal){
        if (signal) {
            this.setState({FormComment :<FormComment parrentCallback={this.showButtonNext}/>}); //TODO: Баг с кнопкой, которая не исчезает при пустом кэше
        } else {
            this.setState({FormComment : null});
        }
    }

    showButtonNext(words){

        if (cache.size > 0) {
            if (words.length > 0) {
                this.setState({ButtonNext: <ButtonNext/>})
            }
            if (words.length <= 0) {
                this.setState({ButtonNext: null})
            }
        }
    }


    render() {

    const {models, isLoading} = this.state;

        if (isLoading) {return <Dimmer active> <Loader/> </Dimmer> }
        else
        {return(
            <Container >
                <Segment stacked={true} textAlign={'center'} color={'blue'} >

                    <Dropdown id={'node_model'} basic={true} button={true} options={models}  scrolling={true} placeholder='Модель' onChange={this.setRepairs}/>
                    <br/> <br/>

                    <Button.Group  basic={true} vertical={true} >
                        {this.state.repairs}
                    </Button.Group>
                    <br/> <br/>
                    {this.state.FormComment}
                    <br/>
                    {this.state.ButtonNext}
                </Segment>


            </Container>
        );}

    }

}

export default Calculator;