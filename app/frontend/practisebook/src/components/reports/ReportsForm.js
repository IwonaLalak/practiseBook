import React, {Component} from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar, Radio} from 'react-bootstrap';
import {ButtonCancel, ButtonClose, ButtonEdit, ButtonSave} from "../../utilities/Buttons";
import ReactNotify from 'react-notify';
import If from "../../utilities/If";
import Select from "react-select";


export default class ReportsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editionMode: this.props.editionMode,
            grade: '3.0',
            description: '',
            rb1: null,
            rb2: null,
            rb3: null,
            rb4: null,
            rb5: null,
            rb6: null,
            rb7: null,
            practise_id: null,
            saveButtonClicked: false,
            selectedStudent: null,
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
        this.onChangeStudent = this.onChangeStudent.bind(this);

    }

    onCloseBtnClick() {
        this.props.handleCancelClick();
    }

    onSaveBtnClick() {
        this.setState({saveButtonClicked: true});

        if (
            this.state.rb1 && this.state.rb2 && this.state.rb3 && this.state.rb4 && this.state.rb5 && this.state.rb6 && this.state.rb7 &&
            this.state.description.length > 0 && this.state.grade && this.state.practise_id
        ) {
            let data = {
                practise_id: this.state.practise_id,
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

            this.props.handleSaveClick(data, Boolean(this.props.report));
        }
        else {
            this.refs.notificator.error("Błąd zapisu raportu.", "Nie uzupełniono poprawnie wszystkich danych", 3000);
        }
    }

    onCancelBtnClick() {
        if (this.props.editionMode == false) {
            this.setState({editionMode: false})
        }
        else {
            this.props.handleCancelClick();
        }
    }

    componentDidMount() {
        if (this.props.report) {
            this.setState({
                grade: this.props.report.raport_grade,
                description: this.props.report.raport_description,
                rb1: this.props.report.radiobox1,
                rb2: this.props.report.radiobox2,
                rb3: this.props.report.radiobox3,
                rb4: this.props.report.radiobox4,
                rb5: this.props.report.radiobox5,
                rb6: this.props.report.radiobox6,
                rb7: this.props.report.radiobox7,
                practise_id: this.props.report.practise_id
            })
        }
        if(this.props.practise_id){
            this.setState({practise_id: this.props.practise_id});
        }
    }

    turnOnEditionMode() {
        this.setState({editionMode: true})
    }

    onChangeRadioGroup1(e) {
        this.setState({rb1: e.target.value})
    }

    onChangeRadioGroup2(e) {
        this.setState({rb2: e.target.value})
    }

    onChangeRadioGroup3(e) {
        this.setState({rb3: e.target.value})
    }

    onChangeRadioGroup4(e) {
        this.setState({rb4: e.target.value})
    }

    onChangeRadioGroup5(e) {
        this.setState({rb5: e.target.value})
    }

    onChangeRadioGroup6(e) {
        this.setState({rb6: e.target.value})
    }

    onChangeRadioGroup7(e) {
        this.setState({rb7: e.target.value})
    }

    onChangeDescription(e) {
        this.setState({description: e.target.value})
    }

    onChangeGrade(e) {
        this.setState({grade: e.target.value})
    }

    onChangeStudent(e){
        this.setState({selectedStudent: e, practise_id: null});
        if(e != null){
            let practise = this.props.practises.find(practises => practises.student_id == e.user_id);
            this.setState({practise_id: practise.practise_id});
        }
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
                                <If isTrue={!this.props.report && !this.props.practise_id}>
                                    <Row>
                                        <Col xs={12}>
                                            <h5>Wybór ocenianego studenta</h5>
                                        </Col>
                                        <Col xs={12} sm={5} md={3} className={(this.state.saveButtonClicked && !this.state.practise_id)? 'has-error':''}>
                                            <FormGroup>
                                                <Col xs={12}>
                                                    <Select
                                                        options={this.props.students}
                                                        value={this.state.selectedStudent}
                                                        name="StudentSelect"
                                                        onChange={this.onChangeStudent}
                                                        clearable={false}
                                                        labelKey="lastname"
                                                        valueKey="user_id"
                                                        placeholder="Wybierz studenta"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </If>
                                <Row>
                                    <Col xs={12}>
                                        <h5>Ocena znajomości przez studenta zakładu pracy oraz zasad w nim panujących</h5>
                                    </Col>
                                    <Col xs={12} className={(this.state.saveButtonClicked && this.state.rb1 == null) ? 'has-error' : ''}>
                                        Czy student zapoznał się z przepisami bezpiecznej pracy i stosował je przez cały czas odbywania praktyki?
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup1" inline disabled={!this.state.editionMode} value={1}
                                                       onChange={this.onChangeRadioGroup1}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox1 == 1 : false}>
                                                    TAK
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup1" inline disabled={!this.state.editionMode} value={0}
                                                       onChange={this.onChangeRadioGroup1}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox1 == 0 : false}>
                                                    NIE
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} className={(this.state.saveButtonClicked && this.state.rb2 == null) ? 'has-error' : ''}>
                                        Czy student zapoznał się z strukturą organizacyjną zakładu pracy?
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup2" inline disabled={!this.state.editionMode} value={1}
                                                       onChange={this.onChangeRadioGroup2}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox2 == 1 : false}>
                                                    TAK
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup2" inline disabled={!this.state.editionMode} value={0}
                                                       onChange={this.onChangeRadioGroup2}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox2 == 0 : false}>
                                                    NIE
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} className={(this.state.saveButtonClicked && this.state.rb3 == null) ? 'has-error' : ''}>
                                        Czy student zapoznał się z najważniejszymi zadaniami realizowanymi przez poszczególne wydziały / zespoły
                                        organizacyjne przedsiębiorstwa?
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup3" inline disabled={!this.state.editionMode} value={1}
                                                       onChange={this.onChangeRadioGroup3}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox3 == 1 : false}>
                                                    TAK
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup3" inline disabled={!this.state.editionMode} value={0}
                                                       onChange={this.onChangeRadioGroup3}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox3 == 0 : false}>
                                                    NIE
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} className={(this.state.saveButtonClicked && this.state.rb4 == null) ? 'has-error' : ''}>
                                        Czy student potrafi scharakteryzować specyfikę produktów bądź usług przygotowywanych w zakładzie pracy?
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup4" inline disabled={!this.state.editionMode} value={1}
                                                       onChange={this.onChangeRadioGroup4}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox4 == 1 : false}>
                                                    TAK
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup4" inline disabled={!this.state.editionMode} value={0}
                                                       onChange={this.onChangeRadioGroup4}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox4 == 0 : false}>
                                                    NIE
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12}>
                                        <h5>Ocena umiejętności zawodowych i miękkich studenta</h5>
                                    </Col>
                                    <Col xs={12} className={(this.state.saveButtonClicked && this.state.rb5 == null) ? 'has-error' : ''}>
                                        Ocenić stopień umiejętności studenta niezbędnych do wykonania zadań określonych w planie praktyk
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup5" inline disabled={!this.state.editionMode} value={1}
                                                       onChange={this.onChangeRadioGroup5}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox5 == 1 : false}>
                                                    Dostateczny
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup5" inline disabled={!this.state.editionMode} value={2}
                                                       onChange={this.onChangeRadioGroup5}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox5 == 2 : false}>
                                                    Dobry
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup5" inline disabled={!this.state.editionMode} value={3}
                                                       onChange={this.onChangeRadioGroup5}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox5 == 3 : false}>
                                                    Bardzo dobry
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} className={(this.state.saveButtonClicked && this.state.rb6 == null) ? 'has-error' : ''}>
                                        Ocenić stopień samoorganizacji oraz jakości pracy studenta
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup6" inline disabled={!this.state.editionMode} value={1}
                                                       onChange={this.onChangeRadioGroup6}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox6 == 1 : false}>
                                                    Dostateczny
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup6" inline disabled={!this.state.editionMode} value={2}
                                                       onChange={this.onChangeRadioGroup6}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox6 == 2 : false}>
                                                    Dobry
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup6" inline disabled={!this.state.editionMode} value={3}
                                                       onChange={this.onChangeRadioGroup6}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox6 == 3 : false}>
                                                    Bardzo dobry
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} className={(this.state.saveButtonClicked && this.state.rb7 == null) ? 'has-error' : ''}>
                                        Ocenić stopień komunikatywności, umiejętności współpracy oraz kultury osobistej studenta
                                        <FormGroup>
                                            <Col xs={12}>
                                                <Radio name="radioGroup7" inline disabled={!this.state.editionMode} value={1}
                                                       onChange={this.onChangeRadioGroup7}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox7 == 1 : false}>
                                                    Dostateczny
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup7" inline disabled={!this.state.editionMode} value={2}
                                                       onChange={this.onChangeRadioGroup7}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox7 == 2 : false}>
                                                    Dobry
                                                </Radio>
                                                {' '}
                                                <Radio name="radioGroup7" inline disabled={!this.state.editionMode} value={3}
                                                       onChange={this.onChangeRadioGroup7}
                                                       defaultChecked={(this.props.report) ? this.props.report.radiobox7 == 3 : false}>
                                                    Bardzo dobry
                                                </Radio>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className={(this.state.saveButtonClicked && this.state.description.length < 1) ? 'has-error' : ''}>
                                        <h5>Formularz oceny słownej studenta</h5>
                                        <FormGroup>
                                            <Col xs={12}>
                                                <textarea
                                                    className="form-control"
                                                    style={{height: '200px'}}
                                                    disabled={!this.state.editionMode}
                                                    onChange={this.onChangeDescription}
                                                    defaultValue={(this.props.report) ? this.props.report.raport_description : ''}
                                                ></textarea>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={6} className={(this.state.saveButtonClicked && this.state.grade == null) ? 'has-error' : ''}>
                                        <h5>Całkowita ocena studenta</h5>
                                        <FormGroup>
                                            <Col xs={12}>
                                                <FormControl componentClass="select"
                                                             placeholder="select"
                                                             style={{width: '200px'}}
                                                             disabled={!this.state.editionMode}
                                                             onChange={this.onChangeGrade}
                                                >
                                                    <option value="2.0"
                                                            selected={(this.props.report) ? this.props.report.raport_grade == '2.0' : false}>2.0
                                                    </option>
                                                    <option value="3.0"
                                                            selected={(this.props.report) ? this.props.report.raport_grade == '3.0' : false}>3.0
                                                    </option>
                                                    <option value="3.5"
                                                            selected={(this.props.report) ? this.props.report.raport_grade == '3.5' : false}>3.5
                                                    </option>
                                                    <option value="4.0"
                                                            selected={(this.props.report) ? this.props.report.raport_grade == '4.0' : false}>4.0
                                                    </option>
                                                    <option value="4.5"
                                                            selected={(this.props.report) ? this.props.report.raport_grade == '4.5' : false}>4.5
                                                    </option>
                                                    <option value="5.0"
                                                            selected={(this.props.report) ? this.props.report.raport_grade == '5.0' : false}>5.0
                                                    </option>
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
