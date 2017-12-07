import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import LoginService from "./pages/Login/LoginService";

import Sidebar from './components/sidebar/Sidebar';
import LoginContainer from './pages/Login/LoginContainer';
import AccountContainer from './pages/Account/AccountContainer';
import CalendarContainer from './pages/Calendar/CalendarContainer';
import CompaniesContainer from './pages/Companies/CompaniesContainer';
import CompanyAddContainer from './pages/Companies/CompanyAddContainer';
import GradesContainer from './pages/Grades/GradesContainer';
import NotesContainer from './pages/Notes/NotesContainer';
import PostsContainer from './pages/Posts/PostsContainer';
import PractisesContainer from './pages/Practises/PractisesContainer';
import PractiseAddContainer from './pages/Practises/PractiseAddContainer';
import ReportsContainer from './pages/Reports/ReportsContainer';
import ReportContainer from './pages/Reports/ReportContainer';
import SettingsContainer from './pages/Settings/SettingsContainer';
import UsersContainer from './pages/Users/UsersContainer';
import UserAddContainer from './pages/Users/UserAddContainer';
import StudentsContainer from "./pages/Students/StudentsContainer";
import StudentContainer from "./pages/Students/StudentContainer";
// for tests
import ForTestsContainer from "./pages/_FOR_TESTS/ForTestsContainer";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
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
                           <Route exact path="/uzytkownicy" render={(props)=> (LoginService.isAdmin())? <UsersContainer {...props}/> : <Redirect to="/konto"/>}/>
                           <Route exact path="/uzytkownicy/dodaj"  render={(props)=> (LoginService.isAdmin())? <UserAddContainer {...props}/> : <Redirect to="/konto"/>}/>
                           <Route exact path="/firmy" render={(props)=> (LoginService.isAdmin() || LoginService.isLecturer())? <CompaniesContainer {...props}/> : <Redirect to="/konto"/>}/>
                           <Route exact path="/firmy/dodaj" render={(props)=> (LoginService.isAdmin())? <CompanyAddContainer {...props}/> : <Redirect to="/konto"/>}/>
                           <Route path="/ustawienia" render={()=> (LoginService.isAdmin())? <SettingsContainer/> : <Redirect to="/konto"/>}/>
                           <Route path="/kalendarz" render={()=> (LoginService.isStudent())? <CalendarContainer/> : <Redirect to="/konto"/>}/>
                           <Route path="/wpisy" render={()=> (LoginService.isStudent())? <PostsContainer/> : <Redirect to="/konto"/>}/>
                           <Route exact path="/studenci" render={()=> (LoginService.isLecturer() || LoginService.isLeader())? <StudentsContainer/> : <Redirect to="/konto"/>}/>
                           <Route path="/student/:id" render={(props)=> (LoginService.isLecturer() || LoginService.isLeader())? <StudentContainer {...props}/> : <Redirect to="/konto"/>}/>
                           <Route exact path="/praktyki" render={(props)=> (LoginService.isAdmin() || LoginService.isLecturer() || LoginService.isStudent())? <PractisesContainer {...props}/> : <Redirect to="/konto"/>}/>
                           <Route exact path="/praktyki/dodaj" render={(props)=> (LoginService.isLecturer() || LoginService.isAdmin())? <PractiseAddContainer {...props}/> : <Redirect to="/konto"/>}/>
                           <Route path="/oceny" render={()=> (LoginService.isLecturer())? <GradesContainer/> : <Redirect to="/konto"/>}/>
                           <Route exact path="/raporty" render={()=> (LoginService.isLeader() || LoginService.isLecturer())? <ReportsContainer/> : <Redirect to="/konto"/>}/>
                           <Route path="/raport/:id" render={(props)=> (LoginService.isUserLogged())? <ReportContainer {...props}/> : <Redirect to="/login"/>}/>
                           <Route path="/konto" render={()=> (LoginService.isUserLogged())? <AccountContainer/> : <Redirect to="/login"/>}/>
                           <Route path="/uwagi"  render={()=> (LoginService.isLeader())? <NotesContainer/> : <Redirect to="/konto"/>}/>


                           <Route path="/fortests" component={ForTestsContainer}/>


                       </Switch>
                   </div>

               </div>
           </Router>
       )
    }
}

export default App;
