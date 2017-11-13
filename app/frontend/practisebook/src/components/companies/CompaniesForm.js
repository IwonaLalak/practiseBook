import React, {Component} from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar} from 'react-bootstrap';
import {ButtonCancel, ButtonSave} from "../../utilities/Buttons";
import Select from 'react-select';
import If from '../../utilities/If';
import ReactNotify from 'react-notify';

export default class CompaniesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            brand: '',
            description: '',
            email: '',
            phone: '',
            city: '',
            street: '',
            place: '',
            addBtnClicked: false,
        };
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangePlace = this.onChangePlace.bind(this);
    }

    onChangeName(e){this.setState({name:e.target.value})}
    onChangeBrand(e){this.setState({brand:e.target.value})}
    onChangeDescription(e){this.setState({description:e.target.value})}
    onChangeEmail(e){this.setState({email:e.target.value})}
    onChangePhone(e){this.setState({phone:e.target.value})}
    onChangeCity(e){this.setState({city:e.target.value})}
    onChangeStreet(e){this.setState({street:e.target.value})}
    onChangePlace(e){this.setState({place:e.target.value})}

    onAddBtnClick() {

        this.setState({addBtnClicked: true});

        let correct = true;

        if (!(
                this.state.name.length > 0 &&
                this.state.brand.length > 0 &&
                this.state.phone.length > 0 &&
                this.state.email.length > 0 &&
                this.state.city.length > 0 &&
                this.state.street.length > 0 &&
                this.state.place.length > 0 &&
                this.state.description.length > 0
            )) correct = false;

        if (correct) {
            let data = {
                name: this.state.name,
                brand: this.state.brand,
                phone: this.state.phone,
                email: this.state.email,
                city: this.state.city,
                street: this.state.street,
                place: this.state.place,
                description: this.state.description
            }
            this.props.handleAddClick(data);

            this.setState({
                name: '',
                brand: '',
                phone: '',
                email: '',
                city: '',
                street: '',
                place: '',
                description: null,
                addBtnClicked: false
            });

            let inputs = document.getElementsByTagName('input');

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = '';
            }
        }
        else {
            this.refs.notificator.error("Błąd dodawania nowej firmy.", "Nie uzupełniono poprawnie danych", 3000);
        }
    }

    onCancelBtnClick() {
        this.props.handleCancelClick();
    }

    componentDidMount() {
        if (this.props.editedCompany) {
            this.setState({
                name: this.props.editedCompany.name,
                brand: this.props.editedCompany.brand,
                phone: this.props.editedCompany.phone,
                email: this.props.editedCompany.email,
                city: this.props.editedCompany.city,
                street: this.props.editedCompany.street,
                place: this.props.editedCompany.place,
                description: this.props.editedCompany.description
                })
        }
    }

    render() {

        return (
            <div>
                <ReactNotify ref='notificator'/>
                <Form horizontal>
                    <div>
                        <Col sm={12} md={(this.props.horizontal) ? 8 : 12} lg={(this.props.horizontal) ? 8 : 12}>
                            <FormGroup style={(this.props.horizontal) ? {} : {float: 'left', width: '45%'}}>
                                <h5>Dane ogólne</h5>
                                <Row>
                                    <Col md={6} lg={6}
                                         className={(this.state.addBtnClicked && !this.state.name.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Nazwa</ControlLabel>
                                        <FormControl type="text" onChange={this.onChangeName}
                                                     defaultValue={(this.props.editedCompany) ? this.props.editedCompany.name : ''}/>
                                    </Col>
                                    <Col md={6} lg={6}
                                         className={(this.state.addBtnClicked && !this.state.brand.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Branża</ControlLabel>
                                        <FormControl type="text" onChange={this.onChangeBrand}
                                                     defaultValue={(this.props.editedCompany) ? this.props.editedCompany.brand : ''}/>
                                    </Col>
                                    <Col md={12} lg={12}
                                         className={(this.state.addBtnClicked && !this.state.description.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Opis</ControlLabel>
                                        <FormControl type="text" onChange={this.onChangeDescription}
                                                     defaultValue={(this.props.editedCompany) ? this.props.editedCompany.description : ''}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup style={(this.props.horizontal) ? {} : {float: 'left', width: '45%', marginLeft: '5%', marginBottom: 0}}>
                                {
                                    (this.props.horizontal)?
                                        <h5>Dane kontaktowe</h5>
                                        :
                                        <h5>Dane teleadresowe</h5>
                                }
                                <Row>
                                    <Col md={6} lg={6}
                                         className={(this.state.addBtnClicked && !this.state.email.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl type="email" onChange={this.onChangeEmail}
                                                     defaultValue={(this.props.editedCompany) ? this.props.editedCompany.email : ''}/>
                                    </Col>
                                    <Col md={6} lg={6}
                                         className={(this.state.addBtnClicked && !this.state.phone.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Telefon</ControlLabel>
                                        <FormControl type="number" onChange={this.onChangePhone}
                                                     defaultValue={(this.props.editedCompany) ? this.props.editedCompany.phone : ''}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup style={(this.props.horizontal) ? {} : {float: 'left', width: '45%', marginLeft: '5%'}}>
                                <If isTrue={this.props.horizontal}><h5>Dane adresowe</h5></If>
                                <Row>
                                    <Col md={4} lg={5}
                                         className={(this.state.addBtnClicked && !this.state.city.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Miasto</ControlLabel>
                                        <FormControl type="text" onChange={this.onChangeCity}
                                                     defaultValue={(this.props.editedCompany) ? this.props.editedCompany.city : ''}/>
                                    </Col>
                                    <Col md={5} lg={5}
                                         className={(this.state.addBtnClicked && !this.state.street.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Ulica</ControlLabel>
                                        <FormControl type="text" onChange={this.onChangeStreet}
                                                     defaultValue={(this.props.editedCompany) ? this.props.editedCompany.street : ''}/>
                                    </Col>

                                    <Col md={3} lg={2}
                                         className={(this.state.addBtnClicked && !this.state.place.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Numer</ControlLabel>
                                        <FormControl type="text" onChange={this.onChangePlace}
                                                     defaultValue={(this.props.editedCompany) ? this.props.editedCompany.place : ''}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <div style={{clear: 'both'}}>
                                <FormGroup>
                                    <div className={(this.props.horizontal) ? "pull-right" : ""}>
                                        <ButtonToolbar>
                                            <ButtonCancel onClick={this.onCancelBtnClick}/>
                                            <ButtonSave onClick={this.onAddBtnClick}/>
                                        </ButtonToolbar>
                                    </div>
                                </FormGroup>
                            </div>
                        </Col>
                    </div>
                </Form>
            </div>
        )
    }
}
