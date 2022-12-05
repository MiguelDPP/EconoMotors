import React from 'react';

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import rrulePlugin from '@fullcalendar/rrule'

import Schedule from '@services/api/Schedule';


const CalendarI = ({ allSchedule, show ,setShow, setDataEvent, exceptionSchedule }) => {

  const { showSchedule } = Schedule();

  const handleEventClick = (arg) => {
    console.log(arg.event._def.extendedProps);
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
        case 'gasoline':
          setDataEvent({
            // Fecha en formato de calendario
            type:'gasoline',
            title: 'Tanqueo en '+ arg.event.extendedProps.station,
            date: arg.event.startStr,
            price: arg.event.extendedProps.price,
            priceXgalon: arg.event.extendedProps.priceXgalon,
            galons: arg.event.extendedProps.galones,
            km: arg.event.extendedProps.km,
          });

          setShow(true);
        break;
        case 'changeGasoline':
          setDataEvent({
            // Fecha en formato de calendario
            type:'changeGasoline',
            title: 'Proximo Tanqueo',
            date: arg.event.startStr,
            km: arg.event.extendedProps.km,
          });
          setShow(true);
        break;
        case 'changeOil':
          setDataEvent({
            // Fecha en formato de calendario
            type:'changeOil',
            title: 'Proximo Cambio de Aceite',
            date: arg.event.startStr,
            km: arg.event.extendedProps.km,
          });
          setShow(true);
        break;
        case 'oil':
          setDataEvent({
            // Fecha en formato de calendario
            type:'oil',
            title: 'Cambio de Aceite',
            date: arg.event.startStr,
            price: arg.event.extendedProps.price,
            km: arg.event.extendedProps.km,
          });
          setShow(true);
        break;
    }
    // setShow(true);
    // console.log(arg.event);
  }

  function renderEventContent(eventInfo) {
    let type = eventInfo.event.extendedProps.type;

    // Data sin hora
    

    let isException = false;

    exceptionSchedule.forEach((exception) => {
      let date = eventInfo.event.startStr.split('T')[0];
      if (date == exception) {
        isException = true;
        return;
      }
    });

    // Añadir propiedad 

    // let date = 
    // Obtener la fecha del evento
    // console.log(eventInfo);

    let color = '';
    let icon = '';
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
        icon = 'fa-route';
        break;
      case 'gasoline':
        color = 'dark';
        icon = 'fa-gas-pump';
        break;
      case 'changeGasoline':
        color = 'dark';
        icon = 'fa-gas-pump';
        break;
      case 'oil':
        color = 'warning';
        icon = 'fa-oil-can';
        break;
      case 'changeOil':
        color = 'warning';
        icon = 'fa-oil-can';
        break;
    }

    if (isException) {
      color = 'danger';
    }
    
    return (
      <>
        <span className={`badge badge-${color}`} style={{fontSize:12, width: '100%', height: '100%', cursor: 'pointer'}}>
        <i className={`fas ${icon} mr-2`} />
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