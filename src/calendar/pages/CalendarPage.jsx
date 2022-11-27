import React, { useState } from 'react'
import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from '../../helpers'
import { useUIStore, useCalendarStore } from '../../hooks'

export const CalendarPage = () => {
  
  const {events, setActiveEvent} = useCalendarStore();
  const {openDateModal} = useUIStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const [language, setLanguage] = useState(false);

  const onChangeLanguage = () => {
    setLanguage(current => !current); 
  }

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '10px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  return (
    <>
      <Navbar language={language} onChangeLanguage={onChangeLanguage}/>

      <Calendar
        messages={ language && getMessagesES() }
        components={{
          event: CalendarEvent
        }}
        eventPropGetter={eventStyleGetter}
        culture={ language && 'es' }
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }} // Restar el ancho del Navbar
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal language={language} />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
