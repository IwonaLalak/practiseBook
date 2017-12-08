import React, {Component} from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar, Radio} from 'react-bootstrap';
import {ButtonCancel, ButtonClose, ButtonEdit, ButtonSave} from "../../utilities/Buttons";
import ReactNotify from 'react-notify';
import If from "../../utilities/If";


export default class ReportsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editionMode: this.props.editionMode,
            grade: null,
            description: '',
            rb1: null,
            rb2: null,
            rb3: null,
            rb4: null,
            rb5: null,
            rb6: null,
            rb7: null,
            saveButtonClicked: false,
        };
        this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
        this.turnOnEditionMode = this.turnOnEditionMode.bind(this);

        this.onChangeRadioGroup1 = this.onChangeRadioGroup1.bind(this);
        this.onChangeRadioGroup2 = this.onChangeRadioGroup2.bind(this);
        this.onChangeRadioGroup3 = this.onChangeRadioGroup3.bind(this);
        this.onChangeRadioGroup4 = this.onChangeRadioGroup4.bind(this);
        this.onChangeRadioGroup5 = this.onChangeRadioGroup5.bind(this);
        this.onChangeRadioGroup6 = this.onChangeRadioGroup6.bind(this);
        this.onChangeRadioGroup7 = this.onChangeRadioGroup7.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeGrade = this.onChangeGrade.bind(this);

    }

    onCloseBtnClick() {
       // this.props.handleCloseFormClick();
        this.props.handleCancelClick();
    }

    onSaveBtnClick() {
        this.setState({saveButtonClicked: true});

        if(
            this.state.rb1 && this.state.rb2 && this.state.rb3 && this.state.rb4 && this.state.rb5 && this.state.rb6 && this.state.rb7 &&
                this.state.description.length > 0 && this.state.grade
        ){
            let data = {
                practise_id: '',
                leader_id: localStorage.getItem("current_userid"),
                raport_grade: this.state.grade,
                raport_description: this.state.description,
                radiobox1: this.state.rb1,
                radiobox2: this.state.rb2,
                radiobox3: this.state.rb3,
                radiobox4: this.state.rb4,
                radiobox5: this.state.rb5,
                radiobox6: this.state.rb6,
                radiobox7: this.state.rb7,
            }

            this.props.handleSaveClick(data);
        }
        else{

        }
    }

    onCancelBtnClick() {
        if(this.props.editionMode == false){
            this.setState({editionMode: false})
        }
        else{
            this.props.handleCancelClick();
        }
    }

    componentDidMount() {

    }

    turnOnEditionMode() {
        this.setState({editionMode: true})
    }

    onChangeRadioGroup1(e){
        this.setState({rb1: e.target.value})
    }

    onChangeRadioGroup2(e){
        this.setState({rb2: e.target.value})
    }

    onChangeRadioGroup3(e){
        this.setState({rb3: e.target.value})
    }

    onChangeRadioGroup4(e){
        this.setState({rb4: e.target.value})
    }

    onChangeRadioGroup5(e){
        this.setState({rb5: e.target.value})
    }

    onChangeRadioGroup6(e){
        this.setState({rb6: e.target.value})
    }

    onChangeRadioGroup7(e){
        this.setState({rb7: e.target.value})
    }

    onChangeDescription(e){
        this.setState({description: e.target.value})
    }

    onChangeGrade(e){
        this.setState({grade: e.target.value})
    }

    render() {

        return (
            <div>
                <ReactNotify ref='notificator'/>
                <Row>
                    <Col xs={12} md={10} lg={9}>
                        <div id="REPORT_FORM">
                            <div id="report-form-corner"></div>
                            <Form horizontal>
                                <Row>
                                    <Col xs={12}>
                                        <h5>Ocena znajomości przez studenta zakładu pracy oraz zasad w nim panujących</h5>
                                    </Col>
                                    <Col xs={12}>
                                        Czy student zapoznał się z przepisami bezpiecznej pracy i stosował je przez cały czas odbywania praktyki?
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup1" inline disabled={!this.state.editionMode} value={true} onChange={this.onChangeRadioGroup1}>
                                                    TAK
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup1" inline disabled={!this.state.editionMode} value={false} onChange={this.onChangeRadioGroup1}>
                                                    NIE
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12}>
                                        Czy student zapoznał się z strukturą organizacyjną zakładu pracy?
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup2" inline disabled={!this.state.editionMode} value={true} onChange={this.onChangeRadioGroup2}>
                                                    TAK
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup2" inline disabled={!this.state.editionMode} value={false} onChange={this.onChangeRadioGroup2}>
                                                    NIE
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12}>
                                        Czy student zapoznał się z najważniejszymi zadaniami realizowanymi przez poszczególne wydziały / zespoły
                                        organizacyjne
                                        przedsiębiorstwa?
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup3" inline disabled={!this.state.editionMode} value={true} onChange={this.onChangeRadioGroup3}>
                                                    TAK
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup3" inline disabled={!this.state.editionMode} value={false} onChange={this.onChangeRadioGroup3}>
                                                    NIE
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12}>
                                        Czy student potrafi scharakteryzować specyfikę produktów bądź usług przygotowywanych w zakładzie pracy?
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup4" inline disabled={!this.state.editionMode} value={true} onChange={this.onChangeRadioGroup4}>
                                                    TAK
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup4" inline disabled={!this.state.editionMode} value={false} onChange={this.onChangeRadioGroup4}>
                                                    NIE
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12}>
                                        <h5>Ocena umiejętności zawodowych i miękkich studenta</h5>
                                    </Col>
                                    <Col xs={12}>
                                        Ocenić stopień umiejętności studenta niezbędnych do wykonania zadań określonych w planie praktyk
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup5" inline disabled={!this.state.editionMode} value={1} onChange={this.onChangeRadioGroup5}>
                                                    Dostateczny
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup5" inline disabled={!this.state.editionMode} value={2} onChange={this.onChangeRadioGroup5}>
                                                    Dobry
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup5" inline disabled={!this.state.editionMode} value={3} onChange={this.onChangeRadioGroup5}>
                                                    Bardzo dobry
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12}>
                                        Ocenić stopień samoorganizacji oraz jakości pracy studenta
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup6" inline disabled={!this.state.editionMode} value={1} onChange={this.onChangeRadioGroup6}>
                                                    Dostateczny
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup6" inline disabled={!this.state.editionMode} value={2} onChange={this.onChangeRadioGroup6}>
                                                    Dobry
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup6" inline disabled={!this.state.editionMode} value={3} onChange={this.onChangeRadioGroup6}>
                                                    Bardzo dobry
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12}>
                                        Ocenić stopień komunikatywności, umiejętności współpracy oraz kultury osobistej studenta
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup7" inline disabled={!this.state.editionMode} value={1} onChange={this.onChangeRadioGroup7}>
                                                    Dostateczny
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup7" inline disabled={!this.state.editionMode} value={2} onChange={this.onChangeRadioGroup7}>
                                                    Dobry
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup7" inline disabled={!this.state.editionMode} value={3} onChange={this.onChangeRadioGroup7}>
                                                    Bardzo dobry
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <h5>Formularz oceny słownej studenta</h5>
                                        <FormGroup>
                                            <Col xs={12}>
                                                <textarea
                                                    className="form-control"
                                                    style={{height: '200px'}}
                                                    disabled={!this.state.editionMode}
                                                    onChange={this.onChangeDescription}
                                                ></textarea>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <h5>Całkowita ocena studenta</h5>
                                        <FormGroup>
                                            <Col xs={12}>
                                                <FormControl componentClass="select"
                                                             placeholder="select"
                                                             style={{width: '200px'}}
                                                             disabled={!this.state.editionMode}
                                                             onChange={this.onChangeGrade}
                                                >
                                                    <option value="3.0">3.0</option>
                                                    <option value="3.5">3.5</option>
                                                    <option value="4.0">4.0</option>
                                                    <option value="4.5">4.5</option>
                                                    <option value="5.0">5.0</option>
                                                </FormControl>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <FormGroup style={{marginRight: '15px', marginTop: '34px'}}>
                                            <div className="pull-right">
                                                <If isTrue={!this.state.editionMode}>
                                                    <ButtonToolbar>
                                                        <ButtonClose onClick={this.onCloseBtnClick}/>
                                                        <ButtonEdit onClick={this.turnOnEditionMode}/>
                                                    </ButtonToolbar>
                                                </If>
                                                <If isTrue={this.state.editionMode}>
                                                    <ButtonToolbar>
                                                        <ButtonCancel onClick={this.onCancelBtnClick}/>
                                                        <ButtonSave onClick={this.onSaveBtnClick}/>
                                                    </ButtonToolbar>
                                                </If>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
