import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pl';
import PostsService from "../../pages/Posts/PostsService";
import NotesService from "../../pages/Notes/NotesService";
import CalendarTop from "./CalendarTop";
import If from "../../utilities/If";
import CalendarCurrentEvent from "./CalendarCurrentEvent";


moment.locale();
BigCalendar.momentLocalizer(moment);

export default class CalendarItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            events: [],
            timeslotsValue: 2,
            stepValue: 15,
            today: new Date(Date.now()),
            current_event: null,
            current_note:null,
        };
        this.getStudentNotes = this.getStudentNotes.bind(this);
        this.getStudentsPosts = this.getStudentsPosts.bind(this);
        this.onSelectSlot = this.onSelectSlot.bind(this);
        this.onSelectEvent = this.onSelectEvent.bind(this);
        this.changeViewOption = this.changeViewOption.bind(this);
        this.closeCurrentEvent = this.closeCurrentEvent.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        this.renderEventView = this.renderEventView.bind(this);
        this.renderDayEventView = this.renderDayEventView.bind(this);
        this.renderAgendaEventView = this.renderAgendaEventView.bind(this);
    }

    componentDidMount() {
        this.getStudentNotes();
        this.getStudentsPosts();
    }

    getStudentNotes() {
        NotesService.getNotesByStudent(this.props.student_id).then(function (response) {
            this.setState({
                notes: response.data
            })
        }.bind(this))
    }

    getStudentsPosts() {

        PostsService.getPostByStudent(this.props.student_id).then(function (response) {
            if (response.data) {
                let events = Array.from(response.data, item => {
                    return {
                        title: 'Wpis ' + item.post_id,
                        desc: item.post_description,
                        start: new Date(item.post_date_start),
                        end: new Date(item.post_date_end),
                        post_id: item.post_id,
                        practise_id: item.practise_id,
                        student_id: item.student_id,
                        post_date_start: item.post_date_start,
                        post_date_end: item.post_date_end,
                        post_date_add: item.post_date_add,
                        post_date_edit: item.post_date_edit,
                        post_description: item.post_description,
                    }
                });

                console.log(events)

                this.setState({events: events});
            }
        }.bind(this));
    }

    onSelectSlot(slot) {
        console.log(slot)
    }

    onSelectEvent(event) {
        let note = this.state.notes.find(note => note.post_id == event.post_id);
        if(note)
            this.setState({current_note: note});
        this.setState({current_event: event})
    }

    changeViewOption(obj) {
        this.setState({
            timeslotsValue: obj.timeslot,
            stepValue: obj.step
        })
    }

    closeCurrentEvent(){
        this.setState({
            current_note: null,
            current_event: null
        })
    }

    handleEditPost(){
        console.log(this.state.current_event)
    }

    renderEventView({event}) {
        return (
            <div title={event.desc}>
                {event.title}
                <If isTrue={Boolean(this.state.notes.find(note => note.post_id == event.post_id))}>
                    <div className={'pull-right'} style={{color: '#d2ff00'}}>
                        <i className={'fa fa-comments'} title={'Leader dodał uwagę do tego wpisu'}></i>
                    </div>
                </If>
            </div>
        )
    }

    renderDayEventView({event}) {
        return (
            <div>
                <span style={{fontWeight: 'bold', lineHeight: '1.5em'}}>{event.title}</span>
                <If isTrue={Boolean(this.state.notes.find(note => note.post_id == event.post_id))}>
                    <div className={'pull-right'} style={{color: '#d2ff00'}}>
                        <i className={'fa fa-comments'} title={'Leader dodał uwagę do tego wpisu'}></i>
                    </div>
                </If>
                <div style={{color: '#c6e5ff', clear: 'both', textAlign: 'justify'}}>
                    {event.desc}
                </div>
            </div>
        )
    }

    renderAgendaEventView({event}) {
        return (
            <div>
                <span style={{fontWeight: 'bold'}}>{event.title}</span>
                <If isTrue={Boolean(this.state.notes.find(note => note.post_id == event.post_id))}>
                    <span style={{color: '#87ae00', marginLeft: '5px'}}>
                        <i className={'fa fa-comments'} title={'Leader dodał uwagę do tego wpisu'}></i>
                    </span>
                </If>
                <div>
                    {event.desc}
                </div>
            </div>
        )
    }

    render() {
        const translation = {
            date: 'Data',
            time: 'Czas',
            event: 'Wydarzenie',
            allDay: 'Cały dzień',
            week: 'tydzień',
            work_week: 'tydzień roboczy',
            day: 'dzień',
            month: 'miesiąc',
            previous: 'poprzedni',
            next: 'następny',
            yesterday: 'wczoraj',
            tomorrow: 'jutro',
            today: 'dziś',
            agenda: 'lista',

        };

        let formats = {
            timeGutterFormat: 'HH:mm'
        };

        return (
            <div>
                <div>
                    <CalendarTop handleChangeViewOption={this.changeViewOption}/>
                </div>
                <div style={{clear: 'both'}}>
                    <If isTrue={Boolean(this.state.current_event)}>
                        <CalendarCurrentEvent
                            event={this.state.current_event}
                            note={this.state.current_note}
                            editableMode={this.props.editableMode}
                            handleCloseClick={this.closeCurrentEvent}
                            handleEditClick={this.handleEditPost}
                        />
                    </If>
                </div>
                <div style={{clear: 'both'}}>
                    <BigCalendar
                        events={this.state.events}
                        formats={formats}
                        messages={translation}
                        culture='pl'
                        views={['month', 'week', 'day', 'agenda']}
                        step={this.state.stepValue}
                        timeslots={this.state.timeslotsValue}
                        selectable={this.props.editableMode}
                        onSelectSlot={(slot) => this.onSelectSlot(slot)}
                        onSelectEvent={(event) => this.onSelectEvent(event)}
                        min={new Date(this.state.today.getFullYear(), this.state.today.getMonth(), this.state.today.getDate(), 7)}
                        max={new Date(this.state.today.getFullYear(), this.state.today.getMonth(), this.state.today.getDate(), 20)}
                        components={{
                            event: this.renderEventView,
                            week: {
                                event: this.renderDayEventView
                            },
                            day: {
                                event: this.renderDayEventView
                            },
                            agenda: {
                                event: this.renderAgendaEventView
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}
