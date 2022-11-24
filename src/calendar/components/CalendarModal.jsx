import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { useUIStore } from '../../hooks/useUIStore';
import { useCalendarStore } from '../../hooks';
registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};  

Modal.setAppElement('#root');

export const CalendarModal = ({ language }) => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const {isDateModalOpen, closeDateModal} = useUIStore();
    const {activeEvent, startSavingEvent} = useCalendarStore();

    const [formValues, setFormValues] = useState({
        title: 'New Event',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return formValues.title.length > 0 ? '' : 'is-invalid'
    }, [formValues.title, setFormSubmitted]);


    useEffect(() => {
        if (activeEvent !== null ){
            setFormValues({...activeEvent});
        }
    }, [activeEvent])
    

    const onInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        closeDateModal();
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const diff = differenceInSeconds(formValues.end, formValues.start);
        
        if ( isNaN(diff) || diff < 0) {
            Swal.fire('Wrong dates', 'Please check that the dates are valid', 'error');
            return;
        }

        if (formValues.title.length <= 0) return Swal.fire('Missing title', 'Event title is required', 'error');;

        console.log({"Formulario" : formValues});

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);
    }

    return (
        <Modal className="modal animate__animated animate__fadeIn"
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1 className="text-center mt-2">
                <i className="fas fa-calendar-check"></i>
                &nbsp;
                New Event
            </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-3">
                    <label>Start date</label>
                    <DatePicker className="form-control"
                        dateFormat="Pp"
                        selected={formValues.start} 
                        onChange={(event) => onDateChange(event, 'start')}
                        showTimeSelect
                        locale={ language ? 'es' : '' }
                        timeCaption={ language ? 'Hora' : 'Time' } 
                    />
                </div>

                <div className="form-group mb-3">
                    <label>End date</label>
                    <DatePicker className="form-control"
                        dateFormat="Pp" 
                        selected={formValues.end} 
                        onChange={(event) => onDateChange(event, 'end')}
                        minDate={formValues.start}
                        showTimeSelect
                        locale={ language ? 'es' : '' }
                        timeCaption={ language ? 'Hora' : 'Time' } 
                    />
                </div>

                <div className="form-group mb-3">
                    <label>Title and notes</label>
                    <input onChange={onInputChange}
                        type="text" 
                        className={`form-control ${titleClass}`}
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                    />
                    <small id="emailHelp" className="form-text text-muted p-2">Short description</small>
                </div>

                <div className="form-group mb-3">
                    <textarea onChange={onInputChange}
                        type="text" 
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted p-2">Additional Information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-dark btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>
        </Modal>
    )
}
