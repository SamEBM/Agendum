import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarAPI from "../api/calendarAPI";
import { convertStringToDate } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    
    const {events, activeEvent} =  useSelector(state => state.calendar);
    const {user} =  useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent) => {
        try {
            if (calendarEvent.id) {
                // Actualizando
                const { data } = await calendarAPI.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}));
                Swal.fire('Event Updated', 'Your event has been updated successfully', 'success');
            } else {
                // Creando
                const { data } = await calendarAPI.post('/events', calendarEvent);
                dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
                Swal.fire('Event Created', 'Your event has been created successfully', 'success');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Event Update Failed', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarAPI.get('/events');
            const events = convertStringToDate(data.events);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log(error);
        }
    }

    const startDeletingEvent = async() => {
        Swal.fire({
            title: 'Are you sure you want to delete this event?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#dc3545'
        }).then( async(result) => {
            if (result.isConfirmed) {
                try {
                    await calendarAPI.delete(`/events/${activeEvent.id}`);
                    dispatch(onDeleteEvent());
                    Swal.fire('Event Deleted', 'Your event has been deleted successfully', 'success');
                } catch (error) {
                    console.log(error);
                    Swal.fire('Event Deletion Failed', error.response.data.msg, 'error');
                }
            }
        });
    }

    return {
        // Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        
        // Metodos
        startLoadingEvents,
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent
    }
}