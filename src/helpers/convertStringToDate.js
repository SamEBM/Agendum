import { parseISO } from "date-fns";

export const convertStringToDate = (events = []) => {
    return events.map(evento => {
        evento.start = parseISO(evento.start);
        evento.end = parseISO(evento.end);
        return evento;
    })
}