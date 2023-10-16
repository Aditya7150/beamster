import React from "react";

import MiniCalendar from "components/calendar/MiniCalendar";
import Tasks from "views/admin/default/components/Tasks";

export default function Upcoming(props){


    return (
        <div style={{ display:"flex" ,justifyContent:'space-between'}}>


                
                  <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </div>



    )



}