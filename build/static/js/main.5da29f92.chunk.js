(this.webpackJsonpclinico_frontend=this.webpackJsonpclinico_frontend||[]).push([[0],{66:function(e,t,a){e.exports=a(97)},71:function(e,t,a){},72:function(e,t,a){},97:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(5),s=a.n(r),i=(a(71),a(10)),o=a(11),c=a(13),m=a(12),d=(a(72),a(8)),p=a(6),u=a(22),h=(a(73),a(51)),E=a(14),g=a.n(E),f=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).handleChange=function(t){var a="checkbox"===t.target.type?t.target.checked:t.target.value;e.setState(Object(u.a)({},t.target.name,a))},e.handleSubmit=function(t){if(t.preventDefault(),e.state.org){if(""===e.state.name||""===e.state.email||""===e.state.password||""===e.state.phone_number)return void console.log("missing fields")}else if(""===e.state.name||""===e.state.email||""===e.state.password||""===e.state.phone_number||""===e.state.dob)return void console.log("missing fields");var a,n={name:e.state.name,email:e.state.email,dob:e.state.dob,phone_number:e.state.phone_number,password:e.state.password,is_org:e.state.org};(a=n,!0===a.is_org?g.a.post("/api/org/register",{name:a.name,phone_number:a.phone_number,email:a.email,password:a.password}).then((function(e){return e.data})).catch((function(e){console.log(e)})):g.a.post("/api/patient/register",{name:a.name,phone_number:a.phone_number,dob:a.dob,email:a.email,password:a.password}).then((function(e){return e.data})).catch((function(e){console.log(e)}))).then((function(t){t.success&&e.props.history.push("/login")})).catch((function(e){console.log(e)}))},e.state={name:"",email:"",phone_number:"",password:"",dob:"",org:!1,errors:{}},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return this.props.isAuthenticated?l.a.createElement(p.a,{to:"/profile"}):l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-6 mt-5 mx-auto"},l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement("h2",null,"Register "),l.a.createElement("br",null),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"name"},"Name"),l.a.createElement("input",{type:"text",className:"form-control",name:"name",pattern:"^[a-zA-Z]+( [a-zA-Z_]+)*$",placeholder:"Enter name",value:this.state.name,onChange:this.handleChange})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"phone-number"},"Phone Number"),l.a.createElement(h.a,{placeholder:"Enter phone number",name:"phone_number",defaultCountry:"US",value:this.state.phone_number,onChange:function(t){return e.setState({phone_number:t})}})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"dob"},"Date of Birth (if registering as patient user)"),l.a.createElement("input",{type:"date",className:"form-control",name:"dob",value:this.state.dob,onChange:this.handleChange})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"email"},"Email"),l.a.createElement("input",{type:"email",className:"form-control",name:"email",placeholder:"Enter email",value:this.state.email,onChange:this.handleChange})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"password"},"Password"),l.a.createElement("input",{type:"password",className:"form-control",name:"password",placeholder:"Enter password",value:this.state.password,onChange:this.handleChange})),l.a.createElement("div",{className:"form-row"},l.a.createElement("label",{htmlFor:"org"},"This is an organization account"),l.a.createElement("input",{type:"checkbox",className:"form-org-check",name:"org",checked:this.state.org,onChange:this.handleChange})),l.a.createElement("button",{type:"submit",className:"btn btn-lg btn-primary btn-block"},"Register")))))}}]),a}(n.Component),v=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleChange=function(e){var t="checkbox"===e.target.type?e.target.checked:e.target.value;n.setState(Object(u.a)({},e.target.name,t))},n.handleSubmit=function(e){if(console.log("login clicked"),e.preventDefault(),""!==n.state.email&&""!==n.state.password){var t={email:n.state.email,password:n.state.password,is_org:n.state.is_org};n.props.appLogin(t)}else console.log("missing fields")},n.state={email:"",password:"",is_org:!1},n}return Object(o.a)(a,[{key:"render",value:function(){return this.props.isAuthenticated?l.a.createElement(p.a,{to:"/profile"}):l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-6 mt-5 mx-auto"},l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement("h2",null,"Login"),l.a.createElement("br",null),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"email"},"Email"),l.a.createElement("input",{type:"email",className:"form-control",name:"email",placeholder:"Enter email",value:this.state.email,onChange:this.handleChange})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"password"},"Password"),l.a.createElement("input",{type:"password",className:"form-control",name:"password",placeholder:"Enter password",value:this.state.password,onChange:this.handleChange})),l.a.createElement("div",{className:"form-row"},l.a.createElement("label",{htmlFor:"is_org"},"This is an organization account"),l.a.createElement("input",{type:"checkbox",className:"form-org-check",name:"is_org",checked:this.state.is_org,onChange:this.handleChange})),l.a.createElement("button",{type:"submit",className:"btn btn-lg btn-primary btn-block"},"Login")))))}}]),a}(n.Component),b=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return this.props.isAuthenticated?l.a.createElement(p.a,{to:"/profile"}):l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"jumbotron mt-5"},l.a.createElement("div",{className:"col-sm-8 mx-auto"},l.a.createElement("h1",null," Welcome to ClinicO "),l.a.createElement("br",null),l.a.createElement("p",{className:"lead"},"ClinicO is a platform that provides an easy way for businesses such as dentistries to store people's phone numbers and upcoming appointments and automate sending notifications and reminders"),l.a.createElement("hr",{className:"my-4"}),l.a.createElement("br",null),l.a.createElement("h3",null,"Get Started"),l.a.createElement("br",null),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-6"},l.a.createElement("p",{className:"lead"},l.a.createElement(d.b,{to:"/login"},"Login"))),l.a.createElement("div",{className:"col-md-6"},l.a.createElement("p",{className:"lead"},l.a.createElement(d.b,{to:"/register"},"Register")))))))}}]),a}(n.Component),_=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).logout=function(){console.log("logout"),e.props.logout()},e}return Object(o.a)(a,[{key:"render",value:function(){var e=l.a.createElement("ul",{className:"navbar-nav"},l.a.createElement("li",{className:"nav-item"},l.a.createElement(d.b,{to:"/",className:"nav-link"},"Home"))),t=l.a.createElement("ul",{className:"navbar-nav"},l.a.createElement("li",{className:"nav-item"},l.a.createElement(d.b,{to:"/profile",className:"nav-link"},"Profile")),l.a.createElement("li",{className:"navbar-nav"},l.a.createElement("button",{type:"button",className:"btn btn-link",onClick:this.logout},"Log out")));return l.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark rounded"},this.props.isAuthenticated?t:e)}}]),a}(n.Component),N=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return this.props.isAuthenticated?this.props.is_org?l.a.createElement("div",{className:"container"},l.a.createElement("h1",null,"Profile"),l.a.createElement("br",null),l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-header"},l.a.createElement("div",{className:"row"},l.a.createElement("span",{className:"card-title col "},"ID #"),l.a.createElement("span",{className:"card-title col "},"Date Created"),l.a.createElement("span",{className:"card-title col "},"Organization"),l.a.createElement("span",{className:"card-title col"},"Patient"),l.a.createElement("span",{className:"card-title col "},"Start Time"))),l.a.createElement("ul",{className:"list-group list-group-flush"},this.props.appointments&&this.props.appointments.map((function(e){var t=new Date(e.created),a=new Date(e.start_time);return l.a.createElement(d.b,{key:e.ap_id,to:"/appointments/"+e.ap_id,style:{textDecoration:"none"}},l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",{className:"row"},l.a.createElement("span",{className:"card-title col "},e.ap_id),l.a.createElement("span",{className:"card-title col "},t.toLocaleString()),l.a.createElement("span",{className:"card-title col "},e.o.name),l.a.createElement("span",{className:"card-title col"},e.p.name),l.a.createElement("span",{className:"card-title col "},a.toLocaleString()))))})))),l.a.createElement("br",null),l.a.createElement(d.b,{to:"/make_appointment",style:{textDecoration:"none"}},"New Appointment")):l.a.createElement("div",{className:"container"},l.a.createElement("h1",null,"Profile"),l.a.createElement("br",null),l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-header"},l.a.createElement("div",{className:"row"},l.a.createElement("span",{className:"card-title col "},"ID #"),l.a.createElement("span",{className:"card-title col "},"Date Created"),l.a.createElement("span",{className:"card-title col "},"Organization"),l.a.createElement("span",{className:"card-title col"},"Patient"),l.a.createElement("span",{className:"card-title col "},"Start Time"))),l.a.createElement("ul",{className:"list-group list-group-flush"},this.props.appointments&&this.props.appointments.map((function(e){var t=new Date(e.created),a=new Date(e.start_time);return l.a.createElement(d.b,{key:e.ap_id,to:"/appointments/"+e.ap_id,style:{textDecoration:"none"}},l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",{className:"row"},l.a.createElement("span",{className:"card-title col "},e.ap_id),l.a.createElement("span",{className:"card-title col "},t.toLocaleString()),l.a.createElement("span",{className:"card-title col "},e.o.name),l.a.createElement("span",{className:"card-title col"},e.p.name),l.a.createElement("span",{className:"card-title col "},a.toLocaleString()))))}))))):l.a.createElement(p.a,{to:"/"})}}]),a}(n.Component),w=a(7),y=a(129),C=a(24),O=a(17),k=a.n(O),D=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l)))._isMounted=!1,e.state={deleted:!1,id:"",org:"",org_email:"",patient:"",patient_email:"",start_time:"",reason:"",reminders:[],new_reminder:""},e.handleChange=function(t){var a="checkbox"===t.target.type?t.target.checked:t.target.value;e.setState(Object(u.a)({},t.target.name,a))},e.handleDateChange=function(t){e.setState({start_time:t._d})},e.handleReminderChange=function(t){e.setState({new_reminder:t._d})},e.handleNewReminder=function(){var t=k()(e.state.new_reminder).format("YYYY-MM-DD HH:mm"),a={id:e.state.id,reminder:t};e.props.handleNewReminder(a)},e.handleDelete=function(){e.props.handleDelete(e.state.id)},e.handleEdit=function(){var t={id:e.state.id,start_time:k()(e.state.start_time).format("YYYY-MM-DD HH:mm"),reason_for_visit:e.state.reason};e.props.handleEdit(t)},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0;var t=this.props.match.params.id;(function(e){return g.a.get("/api/appointments/get/"+e,{withCredentials:!0}).then((function(e){return e.data})).catch((function(e){console.log(e)}))})(t).then((function(a){if(a.success&&e._isMounted){var n=k()(a.appointment.start_time),l=k()();e.setState({id:t,org:a.appointment.o.name,org_email:a.appointment.o.email,patient:a.appointment.p.name,patient_email:a.appointment.p.email,start_time:n,reason:a.appointment.reason_for_visit,reminders:JSON.parse(a.appointment.reminders),new_reminder:l})}else e.setState({deleted:!0})})).catch((function(e){console.log(e)}))}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){return this.props.isAuthenticated?this.props.edited_data?l.a.createElement(p.a,{to:"/profile"}):this.props.is_org?l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-6 mt-5 mx-auto"},l.a.createElement("form",{onSubmit:this.handleSave},l.a.createElement("h2",null,"Appointment ",this.state.id," Details"),l.a.createElement("br",null),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"org"},"Organization"),l.a.createElement("input",{readOnly:!0,value:this.state.org,className:"form-control"}))),l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"org_email"},"Organization Email"),l.a.createElement("input",{readOnly:!0,value:this.state.org_email,className:"form-control"})))),l.a.createElement("br",null),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"patient"},"Patient"),l.a.createElement("input",{readOnly:!0,value:this.state.patient,className:"form-control"}))),l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"patient_email"},"Patient Email"),l.a.createElement("input",{readOnly:!0,value:this.state.patient_email,className:"form-control"})))),l.a.createElement("br",null),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"start_time"},"Start Time"),l.a.createElement(w.a,{utils:C.a},l.a.createElement(y.a,{name:"start_time",variant:"inline",ampm:!0,value:this.state.start_time,onChange:this.handleDateChange,onError:console.log,disablePast:!0,format:"YYYY-MM-DD hh:mm a"}))),l.a.createElement("br",null),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"reason"},"Reason For Appointment"),l.a.createElement("input",{type:"text",className:"form-control",name:"reason",placeholder:"optional",value:this.state.reason,onChange:this.handleChange})),l.a.createElement("br",null),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("span",{className:"card-title col "},"Current Reminders Set"),l.a.createElement("ul",{className:"list-group list-group-flush"},this.state.reminders.length&&this.state.reminders.map((function(e){var t=k()(e).format("YYYY-MM-DD hh:mm a");return l.a.createElement("li",{className:"list-group-item",key:t},l.a.createElement("div",{className:"row"},l.a.createElement("span",{className:""},t)))})))),l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"start_time"},"Create New Reminder"),l.a.createElement(w.a,{utils:C.a},l.a.createElement(y.a,{name:"reminder_time",variant:"inline",ampm:!0,value:this.state.new_reminder,onChange:this.handleReminderChange,onError:console.log,disablePast:!0,format:"YYYY-MM-DD hh:mm a"})),l.a.createElement("input",{type:"button",value:"Create Reminder",onClick:this.handleNewReminder})))),l.a.createElement("br",null),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("input",{type:"button",value:"Save Changes",onClick:this.handleEdit})),l.a.createElement("div",{className:"col"},l.a.createElement("input",{type:"button",value:"Delete Appointment",onClick:this.handleDelete}))),l.a.createElement("br",null),l.a.createElement("br",null))))):l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-6 mt-5 mx-auto"},l.a.createElement("form",{onSubmit:this.handleSave},l.a.createElement("h2",null,"Appointment ",this.state.id," Details"),l.a.createElement("br",null),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"org"},"Organization"),l.a.createElement("input",{readOnly:!0,value:this.state.org,className:"form-control"}))),l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"org_email"},"Organization Email"),l.a.createElement("input",{readOnly:!0,value:this.state.org_email,className:"form-control"})))),l.a.createElement("br",null),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"patient"},"Patient"),l.a.createElement("input",{readOnly:!0,value:this.state.patient,className:"form-control"}))),l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"patient_email"},"Patient Email"),l.a.createElement("input",{readOnly:!0,value:this.state.patient_email,className:"form-control"})))),l.a.createElement("br",null),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"start_time"},"Start Time"),l.a.createElement(w.a,{utils:C.a},l.a.createElement(y.a,{name:"start_time",variant:"inline",ampm:!0,value:this.state.start_time,disabled:!0,onError:console.log,disablePast:!0,format:"YYYY-MM-DD hh:mm a"}))),l.a.createElement("br",null),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"reason"},"Reason For Appointment"),l.a.createElement("input",{type:"text",className:"form-control",name:"reason",placeholder:"optional",value:this.state.reason,readOnly:!0})),l.a.createElement("br",null),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("span",{className:"card-title col "},"Current Reminders Set"),l.a.createElement("ul",{className:"list-group list-group-flush"},this.state.reminders.length&&this.state.reminders.map((function(e){var t=k()(e).format("YYYY-MM-DD hh:mm a");return l.a.createElement("li",{className:"list-group-item",key:t},l.a.createElement("div",{className:"row"},l.a.createElement("span",{className:""},t)))})))),l.a.createElement("div",{className:"col"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"start_time"},"Create New Reminder"),l.a.createElement(w.a,{utils:C.a},l.a.createElement(y.a,{name:"reminder_time",variant:"inline",ampm:!0,value:this.state.new_reminder,onChange:this.handleReminderChange,onError:console.log,disablePast:!0,format:"YYYY-MM-DD hh:mm a"})),l.a.createElement("input",{type:"button",value:"Create Reminder",onClick:this.handleNewReminder})))),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement(d.b,{to:"/profile"},"Back"))),l.a.createElement("br",null),l.a.createElement("br",null))))):l.a.createElement(p.a,{to:"/"})}}]),a}(n.Component),S=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l)))._isMounted=!1,e.state={org_email:"",patient_email:"",start_time:k()(),reason:""},e.handleChange=function(t){var a="checkbox"===t.target.type?t.target.checked:t.target.value;e.setState(Object(u.a)({},t.target.name,a))},e.handleDateChange=function(t){e.setState({start_time:t._d})},e.handleSubmit=function(t){console.log("submit new appointment info"),t.preventDefault();var a=k()(e.state.start_time).format("YYYY-MM-DD HH:mm"),n={patient_email:e.state.patient_email,appointment_time:a,reason:e.state.reason};e.props.createNewAppointment(n)},e}return Object(o.a)(a,[{key:"render",value:function(){return this.props.isAuthenticated?this.props.is_org?this.props.new_data?l.a.createElement(p.a,{to:"/profile"}):l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-6 mt-5 mx-auto"},l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement("h2",null,"New Appointment"),l.a.createElement("br",null),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"org_email"},"Organization Email"),l.a.createElement("input",{readOnly:!0,value:this.props.user_email,className:"form-control"})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"patient_email"},"Patient Email"),l.a.createElement("input",{type:"email",className:"form-control",name:"patient_email",placeholder:"Enter patient's email",value:this.state.patient_email,onChange:this.handleChange})),l.a.createElement("br",null),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"start_time"},"Start Time"),l.a.createElement(w.a,{utils:C.a},l.a.createElement(y.a,{name:"start_time",variant:"inline",ampm:!0,value:this.state.start_time,onChange:this.handleDateChange,onError:console.log,disablePast:!0,format:"YYYY-MM-DD hh:mm a"}))),l.a.createElement("br",null),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"reason"},"Reason For Appointment"),l.a.createElement("input",{type:"text",className:"form-control",name:"reason",placeholder:"optional",value:this.state.reason,onChange:this.handleChange})),l.a.createElement("button",{type:"submit",className:"btn btn-lg btn-primary btn-block"},"Create"))))):l.a.createElement(p.a,{to:"/profile"}):l.a.createElement(p.a,{to:"/"})}}]),a}(n.Component),j=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).navbarLogout=function(){g.a.get("/api/logout",{withCredentials:!0}).then((function(t){t.data.success&&e.setState({logged_in:!1,user_email:"",is_org:!1})})).catch((function(e){console.log(e)}))},e.handleLogin=function(t){(function(e){return e.is_org?g.a.post("/api/org/login",{email:e.email,password:e.password}).then((function(e){return e.data})).catch((function(e){console.log(e)})):g.a.post("/api/patient/login",{email:e.email,password:e.password}).then((function(e){return e.data})).catch((function(e){console.log(e)}))})(t).then((function(t){t.success&&e.setState({logged_in:!0,is_org:t.is_org,user_email:t.user_email})}))},e.handleDelete=function(t){(function(e){return g.a.delete("/api/appointments/delete/"+e,{withCredentials:!0}).then((function(e){return console.log(e),e})).catch((function(e){console.log(e)}))})(t).then((function(t){t.data.success&&e.setState({edited_data:!0})}))},e.handleNewAppointment=function(t){(function(e){return g.a.post("/api/make_appointment",{patient_email:e.patient_email,appointment_time:e.appointment_time,reason:e.reason},{withCredentials:!0})})(t).then((function(t){e.setState({new_data:!0})})).catch((function(e){console.log(e)}))},e.handleNewReminder=function(t){(function(e){return g.a.post("/api/reminder/create",{appointment_id:e.id,reminder:e.reminder},{withCredentials:!0}).then((function(e){return e})).catch((function(e){console.log(e)}))})(t).then((function(t){e.setState({edited_data:!0})}))},e.handleEditAppointment=function(t){(function(e){return g.a.put("/api/appointments/edit/"+e.id,{start_time:e.start_time,reason_for_visit:e.reason_for_visit},{withCredentials:!0}).then((function(e){return e})).catch((function(e){console.log(e)}))})(t).then((function(t){e.setState({edited_data:!0})})).catch((function(e){console.log(e)}))},e.state={logged_in:!1,user_email:"",is_org:!1,fetched_data:!1,deleted_data:!1,new_data:!1,edited_data:!1,appointments:[]},e}return Object(o.a)(a,[{key:"checkAuth",value:function(){var e=this;g.a.get("/api/login/status",{withCredentials:!0}).then((function(t){t.data.logged_in&&!e.state.logged_in?e.setState({logged_in:!0,user_email:t.data.user_email,is_org:t.data.is_org}):!t.data.logged_in&&e.state.logged_in&&e.setState({logged_in:!1,user_email:"",is_org:!1})})).catch((function(e){console.log(e)}))}},{key:"componentDidMount",value:function(){this.checkAuth()}},{key:"componentDidUpdate",value:function(){var e=this;this.state.logged_in&&(!this.state.fetched_data||this.state.deleted_data||this.state.new_data||this.state.edited_data)&&g.a.get("/api/appointments/get_all",{withCredentials:!0}).then((function(e){return e.data})).catch((function(e){console.log(e)})).then((function(t){t.success&&e.setState({appointments:t.appointments,fetched_data:!0,new_data:!1,deleted_data:!1,edited_data:!1})}))}},{key:"render",value:function(){var e=this;return l.a.createElement(d.a,null,l.a.createElement("div",{className:"App"},l.a.createElement(_,{isAuthenticated:this.state.logged_in,logout:this.navbarLogout}),l.a.createElement(p.b,{exact:!0,path:"/",render:function(t){return l.a.createElement(b,Object.assign({},t,{isAuthenticated:e.state.logged_in}))}}),l.a.createElement(p.d,null,l.a.createElement(p.b,{exact:!0,path:"/register",render:function(t){return l.a.createElement(f,Object.assign({},t,{isAuthenticated:e.state.logged_in}))}}),l.a.createElement(p.b,{exact:!0,path:"/login",render:function(t){return l.a.createElement(v,Object.assign({},t,{isAuthenticated:e.state.logged_in,appLogin:e.handleLogin}))}}),l.a.createElement(p.b,{exact:!0,path:"/profile",render:function(t){return l.a.createElement(N,Object.assign({},t,{isAuthenticated:e.state.logged_in,is_org:e.state.is_org,appointments:e.state.appointments}))}}),l.a.createElement(p.b,{exact:!0,path:"/make_appointment",render:function(t){return l.a.createElement(S,Object.assign({},t,{isAuthenticated:e.state.logged_in,is_org:e.state.is_org,user_email:e.state.user_email,createNewAppointment:e.handleNewAppointment,new_data:e.state.new_data}))}}),l.a.createElement(p.b,{path:"/appointments/:id",render:function(t){return l.a.createElement(D,Object.assign({},t,{isAuthenticated:e.state.logged_in,is_org:e.state.is_org,handleNewReminder:e.handleNewReminder,handleDelete:e.handleDelete,handleEdit:e.handleEditAppointment,edited_data:e.state.edited_data}))}}),l.a.createElement(p.b,{path:"/:any",component:b}))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[66,1,2]]]);
//# sourceMappingURL=main.5da29f92.chunk.js.map