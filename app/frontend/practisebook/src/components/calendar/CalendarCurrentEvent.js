import React, {Component} from 'react';
import {Row, Col} from "react-bootstrap";
import If from "../../utilities/If";
import {ButtonClose, ButtonEdit} from "../../utilities/Buttons";


export default class CalendarCurrentEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onButtonClickClose = this.onButtonClickClose.bind(this);
        this.onButtonClickEdit = this.onButtonClickEdit.bind(this);
    }

    componentDidMount() {
    }

    onButtonClickClose(){
        this.props.handleCloseClick();
    }

    onButtonClickEdit(){
        this.props.handleEditClick();
    }

    render() {
        return (
           <div id={"CURRENT_EVENT"}>
               <Row>
                   <Col xs={12}>
                       <div className='current_event_container'>
                           <div className='current_event_title'>
                            Podgląd danego wpisu
                           </div>
                           <Row>
                             <Col xs={12} md={6} lg={2}>
                                 <div>
                                     <h5>Ramy czasowe</h5>
                                     <div>
                                         <label>Początek: </label> <span>{this.props.event.post_date_start}</span>
                                     </div>
                                     <div>
                                         <label>Koniec: </label> <span>{this.props.event.post_date_end}</span>
                                     </div>
                                 </div>
                             </Col>
                             <Col xs={12} md={6} lg={2}>
                                 <div>
                                     <h5>Informacje o czasie dodania</h5>
                                     <div>
                                         <label>Dodano: </label> <span>{this.props.event.post_date_add}</span>
                                     </div>
                                     <div>
                                         <If isTrue={Boolean(this.props.event.post_date_edit)}>
                                         <label>Edytowano: </label> <span>{this.props.event.post_date_edit}</span>
                                         </If>
                                     </div>
                                 </div>
                             </Col>
                             <Col xs={12} md={12} lg={8}>
                                 <div>
                                     <h5>Notatki i uwagi</h5>
                                     <p>
                                         <label>Notatka studenta:</label>
                                         <span>
                                             {this.props.event.post_description}
                                         </span>
                                     </p>
                                     <If isTrue={Boolean(this.props.note)}>
                                         <p>
                                             <label>Uwaga leadera:</label>
                                             <span>
                                                 {
                                                     Boolean(this.props.note)?
                                                         this.props.note.note_content
                                                         :
                                                         'Brak uwag'
                                                 }
                                             </span>
                                         </p>
                                     </If>
                                 </div>
                             </Col>
                               <Col xs={12}>
                                       <div className='pull-right'>
                                           <ButtonClose onClick={this.onButtonClickClose}/>
                                           <If isTrue={this.props.editableMode}>
                                               <ButtonEdit onClick={this.onButtonClickEdit}/>
                                           </If>
                                       </div>
                               </Col>
                           </Row>
                       </div>
                   </Col>
               </Row>
           </div>
        )
    }
}
