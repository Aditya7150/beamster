import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import Grid from "@mui/material/Unstable_Grid2";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Twitter from "@mui/icons-material/Twitter";
import axios from "axios";

import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './popup.css'

import { LinkedIn ,Facebook,Instagram, ModelTraining} from "@mui/icons-material";
import {
  Typography,
  useTheme,
} from "@mui/material";


import {
    Flex,
    Box,
    Link,
    List,
    ListItem,
    Text,
    Button,
    useColorMode,
    useColorModeValue,
  } from "@chakra-ui/react";


const MyCalendars = () => {

  const [currentEvents, setCurrentEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [datains,setDatains]=useState(false)

  const [post, setPost] = useState({
    heading: '',
    content: '',
    platform: 'Twitter',
  });

  const [postScore,setPostScore]= useState('')
  const toggle = () => {
    setModal(!modal)};

// useEffect(()=>{

//     const options = {
//         method: 'POST',
//         url: 'https://text-sentiment-analysis5.p.rapidapi.com/detect',
//         headers: {
//           'content-type': 'application/json',
//           'X-RapidAPI-Key': 'edebcb3fefmshbfad445a38e8d34p187484jsndb628b020431',
//           'X-RapidAPI-Host': 'text-sentiment-analysis5.p.rapidapi.com'
//         },
//         data: {
//           text: post?post.content:''
//         }
//       };
//       const response = axios.request(options).then(res=>{
//         console.log(res.data,post.content)
//         setPostScore(res.data)
//       });

// },[post])


  const handleDateClick = (selected) => {
    setModal(true)
    setDatains(selected)
    //const title = prompt("Please enter a new title for your event");
    // const calendarApi = selected.view.calendar;
    // calendarApi.unselect();

    // console.log(post,selected.view.calendar)
    // const value =post
  
    // if (value) {
    //   calendarApi.addEvent({
    //     id: `${selected.dateStr}-${post.heading}`,
    //     title:post.heading,
    //     content:post.content,
    //     platform:post.platform,
    //     start: selected.startStr,
    //     end: selected.endStr,
    //     allDay: selected.allDay,
    //   });
    // }
  };

  const handleEventClick = (selected) => {
    console.log(selected)
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  currentEvents.map((event)=>{
    console.log("currentEvents", event, event.extendedProps.platform)
  })

  const togglePopup = () => {
    console.log(modal)
  
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Post:', post);

    const calendarApi = datains.view.calendar;
    calendarApi.unselect();

    
    const value =post
  
    if (value) {
      calendarApi.addEvent({
        id: `${datains.dateStr}-${post.heading}`,
        title:post.heading,
        content:post.content,
        platform:post.platform,
        start: datains.startStr,
        end: datains.endStr,
        allDay: datains.allDay,
      });
    }
    toggle()
    // You can add further logic to send the data to a server or perform any other actions here.
  };

 

  return (
    <Box m="20px">
      
      <Modal isOpen={modal} toggle={toggle} className="bg">
        <ModalHeader toggle={toggle}><h1>Create a New Post</h1></ModalHeader>
        <ModalBody className="">

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="heading">Post Heading</label>
          <input
            type="text"
            name="heading"
            id="heading"
            value={post.heading}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Post Content</label>
          <textarea
            name="content"
            id="contentpost"
            value={post.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
        {/* <h1>`${postScore}`</h1> */}
        </div>
        <div className="form-group">
          <label htmlFor="platform">Post Platform</label>
          <select
            name="platform"
            id="platform"
            value={post.platform}
            onChange={handleInputChange}
          >
            <option value="Twitter">Twitter</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>

   <div style={{display:"flex"}}>
          <Box    
            p="15px"
            borderRadius="4px"
          >
        
        <h1 style={{  "textAlign": "center",
  "textTransform": "uppercase",
  "fontSize":'24xp',
  "fontWeight": "bold",
  "color": "#4CAF50"}}>event</h1>
            <div style={{ 
  'boxShadow': '0 1rem 2rem hsl(0 0% 0% / 20%)',
  "background": 'hsl(0 0% 100%)',
  "color": 'hsl(200 50% 20%)',
  "lineHeight":' 1.5',
  "fontSize": '1.0rem',
  "fontWeight": "200",
  "width": "35vmin",
  "height": "70vmin",
  "overflow":"scroll", 

  "padding": "1ch",
  "borderRadius": "2ch",
  "border": '1px solid hsl(0 0% 83%)'}}>
       
       {currentEvents.map((event) => (
        
  <span key={event.id} className="event-box" style={{  "backgroundColor": '#f0f0f0',
    "border": '1px solid #ccc',
    "padding": "5px",
     "width": '100%',
    "margin": "3px",
    "borderRadius": "5px",
    "boxShadow": '0 2px 4px rgba(0, 0, 0, 0.1)',
    "display":'flex',
    "overflow":"hidden", 
    "display": 'inline-block',
    "verticalAlign": "middle"}}>
        {event.extendedProps.platform=='Twitter'?<Twitter/>:
        event.extendedProps.platform=="Facebook"?<Facebook/>:
        event.extendedProps.platform=='LinkedIn' ?<LinkedIn/>:
        event.extendedProps.platform=="Instagram"?<Instagram/>:
        <Twitter/>}
        
    <div style={{color:'#FF0000'}}>{event.title}</div> Post Schedule at : {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
  </span>
))}
            </div>
          </Box>
 
          <Box ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
              
              ]}
            />
          </Box>
          </div>
      
    </Box>
  );
};

export default MyCalendars;
