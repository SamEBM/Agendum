import { addHours } from 'date-fns';
import React from 'react'
import { useDispatch } from 'react-redux'
import { useCalendarStore, useUIStore } from '../../hooks';

export const FabAddNew = () => {

    const dispatch = useDispatch();
    const {openDateModal} = useUIStore();
    const {setActiveEvent} = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: 'New note',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: 123,
                name: 'SamuelEBM'
            }
        });
        openDateModal();
    }

    return (
        <button className='btn btn-primary fab' onClick={handleClickNew}>
            <i className='fas fa-plus'></i>
        </button>
    )
}
