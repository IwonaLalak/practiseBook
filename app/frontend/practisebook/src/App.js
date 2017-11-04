import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Sidebar from './components/sidebar/Sidebar';

import LoginContainer from './pages/Login/LoginContainer';
import AccountContainer from './pages/Account/AccountContainer';
import CalendarContainer from './pages/Calendar/CalendarContainer';
import CompaniesContainer from './pages/Companies/CompaniesContainer';
import CompanyContainer from './pages/Companies/CompanyContainer';
import CompanyAddContainer from './pages/Companies/CompanyAddContainer';
import GradesContainer from './pages/Grades/GradesContainer';
import NotesContainer from './pages/Notes/NotesContainer';
import PostsContainer from './pages/Posts/PostsContainer';
import PractisesContainer from './pages/Practises/PractisesContainer';
import ReportsContainer from './pages/Reports/ReportsContainer';
import SettingsContainer from './pages/Settings/SettingsContainer';
import UsersContainer from './pages/Users/UsersContainer';
import UserContainer from './pages/Users/UserContainer';
import UserAddContainer from './pages/Users/UserAddContainer';
import StudentsContainer from "./pages/Students/StudentsContainer";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: ''
        };
        this.getData = this.getData.bind(this);
        this.changeName = this.changeName.bind(this);
        this.addName = this.addName.bind(this);
    }

    getData() {
        let url = "http://localhost/practiseBook/app/backend/UserRest.php5";

        /*  console.log('getting data trololo');

          fetch(url)    // gdy konkretny user to dac /?user_id=1
              .then((resp) => resp.json()) // Transform the data into json
              .then(function (data) {
                  this.setState({data: data});
              }.bind(this))*/

        axios.get(url).then(function (response) {
            console.log(response.data);
            this.setState({data: response.data});
        }.bind(this))

    }
    changeName(e) {
        this.setState({name: e.target.value});
    }
    addName() {

        let data = {name: this.state.name};
        /* fetch('http://localhost/practiseBook/app/backend/index.php5', {    // gdy dodac nowa osobe, sam adres,  gdy updatowac , dodac do adresu /?user_id=1
             method: 'POST',
             body: JSON.stringify(data)
         }).then((resp) => resp.json()) // Transform the data into json
             .then(function (data) {
                 console.log(data)
             }.bind(this))*/

        /*axios({
            method: 'post',
            url: 'http://localhost/practiseBook/app/backend/index.php5', //      /?user_id=1
            data: JSON.stringify(data)
        }).
        then(function (response) {
            console.log(response);
        })*/


        let url = 'http://localhost/practiseBook/app/backend/index.php5';


        /* fetch(url+'/?user_id=1', {
             method: 'DELETE',

           //  body: JSON.stringify(data),
         })
             .then(response => response.json())
             .then(response => {
                 console.log(response);
             })*/


        /*  axios({
              url: url+'/?user_id=1',
              method: 'delete'
              }
          ).then(function (response) {
               console.log(response)
           })*/

        axios(
            {
                url: url + '/?user_id=1',
                method: 'put',
                data: JSON.stringify(data)
            }
        ).then(function (response) {
            console.log(response)
        })


    }
    componentDidMount() {
      //  this.getData();
    }

    render() {
       /* return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                </div>
                <ul>
                    {
                        this.state.data.map(item =>
                            <li key={item.user_id}>
                                <span style={{fontWeight: 'bold', marginRight: '5px'}}>{item.login}</span>{item.password}, {item.group_id}
                            </li>
                        )
                    }
                </ul>
                <div>
                    <div>
                        dodaj nową osobe (dodajesz: {this.state.name} )
                    </div>
                    <input type="text" onChange={this.changeName}/>
                    <button onClick={this.addName}>ok</button>
                </div>
            </div>
        );*/
       return(
           <Router>
               <div>
                   <div id="SidebarContainer">
                        <Sidebar/>
                   </div>
                   <div id="ViewContainer">
                       <Switch>
                           <Route exact path="/" component={LoginContainer}/>
                           <Route path="/login" component={LoginContainer}/>

                           <Route exact path="/uzytkownicy" component={UsersContainer}/>
                           <Route exact path="/uzytkownicy/dodaj" component={UserAddContainer}/>
                           <Route path="/uzytkownicy/:id" component={UserContainer}/>

                           <Route exact path="/firmy" component={CompaniesContainer}/>
                           <Route exact path="/firmy/dodaj" component={CompanyAddContainer}/>
                           <Route path="/firmy/:id" component={CompanyContainer}/>
                           <Route path="/ustawienia" component={SettingsContainer}/>
                           <Route path="/kalendarz" component={CalendarContainer}/>
                           <Route path="/wpisy" component={PostsContainer}/>
                           <Route path="/studenci" component={StudentsContainer}/>
                           <Route path="/praktyki" component={PractisesContainer}/>
                           <Route path="/oceny" component={GradesContainer}/>
                           <Route path="/raporty" component={ReportsContainer}/>
                           <Route path="/konto" component={AccountContainer}/>
                           <Route path="/uwagi" component={NotesContainer}/>




                       </Switch>
                   </div>

               </div>
           </Router>
       )
    }
}

export default App;
