import React from 'react'
import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {

    const { activeEvent, hasEventSelected, startDeletingEvent} = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    }

    return (
        <button className='btn btn-danger fab-danger' onClick={handleDelete} style={{display: hasEventSelected && activeEvent.id ? '' : 'none'}}>
            <i className='fas fa-trash'></i>
        </button>
    )
}
