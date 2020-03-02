import React from "react";

import "./styles.css";
import {TextField, Button} from '@material-ui/core';
import addEvent from "../../actions/events";
import MenuItem from '@material-ui/core/MenuItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import { throwStatement } from "@babel/types";


/* Component for the main center component */
class Event extends React.Component {
    
    constructor(props) {
        super(props)
        if (this.props.viewing || this.props.editing) {
            this.state.course = this.props.event.course
            this.state.subject = this.props.event.subject
            this.state.username = this.props.event.username
            this.state.description = this.props.event.description
            this.state.location = this.props.event.location
            this.state.date = this.props.event.date
            this.state.time = this.props.event.time
            this.state.file = this.props.event.file
            this.state.size = this.props.event.size
            }
        }
    
    state = {
        
        isView:false,
        isEdit:false,
        isCreate:true,

        
        course:"",
        subject:"",
        username:"",
        description:"",
        location:"",
        date:"",
        time:"",
        file: "",
        size:"",
        members:[],
        

        sizes: ["1-5","6-10", "11-15","16-20"],
    };

    handleInputChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    onChange = e => {
        const { value } = e.target;
        this.setState({
          value: value
        })
    };

    // setEvent = (event) => {
    //     this.setState( {
    //         course: event.title,
    //         subject: event.subject,
    //         username: event.username,
    //         description: event.description,
    //         location: event.location,
    //         date: event.date,
    //         time: event.time,
    //         file: event.file,
    //         size: event.size,
    //     })
    // }

    // setView = (v) => {
    //     this.setState(
    //         { isView: v }
    //     )
    // }

    // setEdit = (b) => {
    //     this.setState(
    //         { isEdit: b }
    //     )
    // }

  
    render() {
      const {event, events, userName, setEvents, viewEvents, viewing, editing}  = this.props;
        return (
            <div className="event-div">
                <div className="page-name">
                    Event
                </div>
                <div className="form-components">
                    <div className="section">
                        <div className="section-name">
                            Course:
                        </div>
                        <div className="course">
                        <TextField 
                            id="outlined-search"
                            value={this.state.course}
                            label="Course"
                            name='course'
                            type="search"
                            variant="outlined"
                            onChange={this.handleInputChange}
                            
                            InputProps={{
                                readOnly: viewing,
                              }}/>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-name">
                            Subject:
                        </div>
                        <div className="purpose">
                            <TextField 
                                id="outlined-search"
                                value={this.state.subject}
                                label="Subject"
                                name='subject'
                                type="search"
                                variant="outlined"
                                onChange={this.handleInputChange}
                                
                                InputProps={{
                                    readOnly: viewing,
                                  }}/>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-name">
                            Location:
                        </div>
                        <div className="location">
                            <TextField
                                id="outlined-full-width"
                                value={this.state.location}
                                fullWidth
                                label="Location"
                                name='location'
                                type="search"
                                variant="outlined"
                                onChange={this.handleInputChange}
                                
                                InputProps={{
                                    readOnly: viewing,
                                  }}/>
                        </div>
                    </div>
                    <div  className="section">
                        <div className="section-name">
                            Group Size:
                        </div>
                        <div className="group-size">
                        <TextField
                            id="outlined-select"
                            select
                            label="Select"
                            name='size'
                            value={this.state.size}
                            onChange={this.handleInputChange}
                            helperText="Please select your group size"
                            variant="outlined"
    
    
                            InputProps={{
                                readOnly: viewing,
                              }}
                            >
                            {this.state.sizes.map(option => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-name">
                            Date:
                        </div>
                        <div className="date">
                            <TextField
                                id="date"
                                id="outlined"
                                label="Date"
                                type="date"
                                name="date"
                                defaultValue="2020-01-01"
    
                                InputProps={{
                                    readOnly: viewing,
                                  }}
                            />
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-name">
                            Time:
                        </div>
                        <div className="time">
                            <TextField
                                id="time"
                                label="Alarm clock"
                                type="time"
                                defaultValue="06:00"
                                name="time"
    
                                InputProps={{
                                    readOnly: viewing,
                                  }}
                            />
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-name">
                            Description:
                        </div>
                        <div className="description">
                            <TextField
                                    rows="3"
                                    id="outlined-full-width"
                                    multiline
                                    value={this.state.description}
                                    fullWidth
                                    label="Description"
                                    name='description'
                                    variant="outlined"
                                    onChange={this.handleInputChange}
                                    
                                    InputProps={{
                                        readOnly: viewing,
                                      }}/>
                        </div>
                    </div>
                    <div className="section">
                        <div className="section-name">
                            Upload File:
                        </div>
                        <div className="file">
                            <Button
                                variant="outlined"
                                color="default"
                                startIcon={<CloudUploadIcon />}>
                            Upload
                            </Button>
                        </div>
                    </div>
                </div>
                <Button variant='outlined' onClick={() => addEvent(this, events, userName, setEvents, viewEvents)}>
                        Create Event
                </Button>
            </div>
          );
//       return (
//         <div className="event-div">
//             <div className="page-name">
//                 Event
//             </div>
//             <div className="form-components">
//                 <div className="section">
//                     <div className="section-name">
//                         Course:
//                     </div>
//                     <div className="course">
//                     <TextField 
//                         id="outlined-search"
//                         value={this.state.course}
//                         label="Course"
//                         name='course'
//                         type="search"
//                         variant="outlined"
//                         onChange={this.handleInputChange}
                        
//                         InputProps={{
//                             readOnly:  this.state.isView,
//                           }}/>
//                     </div>
//                 </div>
//                 <div className="section">
//                     <div className="section-name">
//                         Subject:
//                     </div>
//                     <div className="purpose">
//                         <TextField 
//                             id="outlined-search"
//                             value={this.state.purpose}
//                             label="Subject"
//                             name='subject'
//                             type="search"
//                             variant="outlined"
//                             onChange={this.handleInputChange}
                            
//                             InputProps={{
//                                 readOnly: this.state.isView,
//                               }}/>
//                     </div>
//                 </div>
//                 <div className="section">
//                     <div className="section-name">
//                         Location:
//                     </div>
//                     <div className="location">
//                         <TextField
//                             id="outlined-full-width"
//                             value={this.state.location}
//                             fullWidth
//                             label="Location"
//                             name='location'
//                             type="search"
//                             variant="outlined"
//                             onChange={this.handleInputChange}
                            
//                             InputProps={{
//                                 readOnly:  this.state.isView,
//                               }}/>
//                     </div>
//                 </div>
//                 <div  className="section">
//                     <div className="section-name">
//                         Group Size:
//                     </div>
//                     <div className="group-size">
//                     <TextField
//                         id="outlined-select-currency"
//                         select
//                         label="Select"
//                         name='size'
//                         value={this.state.size}
//                         onChange={this.handleInputChange}
//                         helperText="Please select your group size"
//                         variant="outlined"


//                         InputProps={{
//                             readOnly:  this.state.isView,
//                           }}
//                         >
//                         {this.state.sizes.map(option => (
//                             <MenuItem key={option} value={option}>
//                             {option}
//                             </MenuItem>
//                         ))}
//                     </TextField>
//                     </div>
//                 </div>
//                 <div className="section">
//                     <div className="section-name">
//                         Date:
//                     </div>
//                     <div className="date">
//                         <TextField
//                             id="date"
//                             id="outlined"
//                             label="Date"
//                             type="date"
//                             name="date"
//                             defaultValue="2020-01-01"

//                             InputProps={{
//                                 readOnly:  this.state.read_only,
//                               }}
//                         />
//                     </div>
//                 </div>
//                 <div className="section">
//                     <div className="section-name">
//                         Time:
//                     </div>
//                     <div className="time">
//                         <TextField
//                             id="time"
//                             label="Alarm clock"
//                             type="time"
//                             defaultValue="06:00"
//                             name="time"

//                             InputProps={{
//                                 readOnly:  this.state.read_only,
//                               }}
//                         />
//                     </div>
//                 </div>
//                 <div className="section">
//                     <div className="section-name">
//                         Description:
//                     </div>
//                     <div className="description">
//                         <TextField
//                                 rows="3"
//                                 id="outlined-full-width"
//                                 multiline
//                                 value={this.state.description}
//                                 fullWidth
//                                 label="Description"
//                                 name='description'
//                                 variant="outlined"
//                                 onChange={this.handleInputChange}
                                
//                                 InputProps={{
//                                     readOnly:  this.state.read_only,
//                                   }}/>
//                     </div>
//                 </div>
//                 <div className="section">
//                     <div className="section-name">
//                         Upload File:
//                     </div>
//                     <div className="file">
//                         <Button
//                             variant="outlined"
//                             color="default"
//                             startIcon={<CloudUploadIcon />}>
//                         Upload
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <Button variant='outlined' onClick={() => addEvent(this, events, userName, setEvents, viewEvents)}>
//                     Create Event
//             </Button>
//         </div>
//       );
    }
  }
  
  export default Event;