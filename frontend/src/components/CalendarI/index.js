import React from 'react';

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import rrulePlugin from '@fullcalendar/rrule'

import Schedule from '@services/api/Schedule';


const CalendarI = ({ allSchedule, show ,setShow, setDataEvent }) => {

  const { showSchedule } = Schedule();

  const handleEventClick = (arg) => {
    switch (arg.event.extendedProps.type) {
      case 'schedule':
        showSchedule((arg.event.extendedProps.isException)?arg.event.extendedProps.schedule_id:arg.event.id).then((response) => {
          console.log(response.data);
          setDataEvent({
            // Fecha en formato de calendario
            date: arg.event.startStr,
            id: arg.event.id,
            isException: arg.event.extendedProps.isException,
            type: 'schedule',
            title: 'Ruta de la agenda',
            data: response.data,
          });
          setShow(true);
        })
        .catch((error) => {
          console.log(error);
        });

        break;
    }
    // setShow(true);
    // console.log(arg.event);
  }

  function renderEventContent(eventInfo) {
    let type = eventInfo.event.extendedProps.type;
    // let date = 
    // Obtener la fecha del evento
    // console.log(eventInfo);

    let color = '';
    switch (type) {
      case 'schedule':
        if (eventInfo.event.extendedProps.isException) {
          color = 'danger';
        } else {
          if (eventInfo.event.extendedProps.type_record === 1) {
            color = 'success';
          } else {
            color = 'primary';
          }
        }
        break;
      }
    
    return (
      <>
        <span className={`badge badge-${color}`} style={{fontSize:15, width: '100%', height: '100%', cursor: 'pointer'}}>
        <i className="fas fa-route mr-2" />
          {eventInfo.event.timeText}
        <i>{eventInfo.event.title}</i></span>
      </>
    )
  }

  return (
    <FullCalendar

      eventContent={renderEventContent}
      // initialView="dayGridMonth"

      // Para que muestre las vistas de día, semana y mes
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}

      timeZone='GMT-5'
      slotLabelFormat={
        {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }
      }
      locale='es'

      eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }}

      eventClick={handleEventClick}


      // plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
      // events={[
      //   { title:"Repeticion evento",
      //   startTime: '10:00',
      //   // endTime: '10:00',        
      //   daysOfWeek: [ 1, 4 ] 
      // },
      //   { title: 'event 2',
      //   date: '2022-12-01 11:00' }
      // ]}
      events={allSchedule}
      // Eventos que se repiten cada semana excepto los días que se especifiquen
      // events={[
      //   {
      //     title: 'event 1',
      //     startTime: '10:00',
      //     // endTime: '10:00',
      //     // daysOfWeek: [1, 4],
      //   // Añadir exepcion de fecha especifica
      //     // startRecur: '2022-12-01',
      //     // endRecur: '2022-12-31',
      //     rrule: {
      //       freq: 'weekly',
      //       byweekday: [5, 4],
      //       dtstart: '2022-12-01',
      //       until: '2022-12-31'
      //     },
      //     exdate: ['2022-12-02', '2022-12-03']
      //     // exrule: {
      //     //   freq: 'weekly',
      //     //   byweekday: [2, 4],
      //     //   dtstart: '2022-12-01',
      //     //   until: '2022-12-31',
      //     // },


      //     // repetir exepto los dias que se especifiquen
          


      //   },]}
    />
  )
}

export default CalendarI