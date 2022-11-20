import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    
    const {events, activeEvent} =  useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent) => {
        // TODO: Enviar al backend

        if (calendarEvent._id) {
            // Actualizando
            dispatch(onUpdateEvent({...calendarEvent}));
        } else {
            // Creando
            dispatch(onAddNewEvent({_id: new Date().getTime(), ...calendarEvent}));
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {
        // Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        
        // Metodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent
    }
}