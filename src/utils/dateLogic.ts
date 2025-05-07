import { Event } from "@/generated/prisma";

export function parseToTijuanaDate(str: string): Date {
    const [year, month, day] = str.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day, 12));
  }
  
  
  export function isToday(str: string): boolean {
    const now = new Date();
    const date = parseToTijuanaDate(str);
  
    return (
      now.getFullYear() === date.getFullYear() &&
      now.getMonth() === date.getMonth() &&
      now.getDate() === date.getDate()
    );
  }
  
  export function isThisWeek(str: string): boolean {
    const today = new Date();
    const date = parseToTijuanaDate(str);
  
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // domingo
    startOfWeek.setHours(0, 0, 0, 0);
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
  
    return date >= startOfWeek && date <= endOfWeek;
  }
  
  export function isThisMonth(str: string): boolean {
    const today = new Date();
    const date = parseToTijuanaDate(str);
  
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth()
    );
  }

  export function isSameDay(d1:Date,d2:Date){
    return (d1.getFullYear()===d2.getFullYear() && d1.getMonth()===d2.getMonth() && d1.getDate()===d2.getDate())
  }

  export async function sortEventsByDate(e:Event[]){
    const sortedEvents = [...e].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
    return sortedEvents
  }

  export function buildCalendarObj(events: Event[]) {
    const now = new Date(); // Fecha actual
    const beginningOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Primer día del mes actual
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Último día del mes actual
    const beginningOfMonthDay = beginningOfMonth.getDay(); // Obtiene el día de la semana (0-6) del primer día del mes
    const endOfMonthDay = endOfMonth.getDate()

    // Inicializamos el array de días que contendrá todos los días del mes, incluidos los días vacíos al principio y final del mes
    let days: Day[] = [];
    let cont = 1

    // Iteramos para agregar los días al calendario. Usamos 35 para cubrir todos los días posibles de un mes, ya que pueden empezar en cualquier día de la semana
    for (let i = 0; i < 35; i++) {
      // Verificamos si el índice está dentro del rango de los días válidos del mes
      if (i>=beginningOfMonthDay && cont<=endOfMonthDay) {
        let eventsInDay: Event[] = []; // Inicializamos el array de eventos para ese día
  
        // Buscamos eventos que ocurran en el mismo día
        if (Array.isArray(events)) {
            events.forEach((e: any) => {
              const parsedDate = parseToTijuanaDate(e.date);
              if (isSameDay(parsedDate, beginningOfMonth)) {
                eventsInDay.push(e);
              }
            });
          }
  
        // Creamos un objeto Day para el día actual
        const d: Day = {
          id: i,
          date: cont+"", // Establecemos la fecha como el día del mes (como string)
          events: eventsInDay // Asignamos los eventos para ese día
        };
        days.push(d); // Agregamos el objeto Day al array de días
        cont++ 
        beginningOfMonth.setDate(beginningOfMonth.getDate()+1)
      } else {
        // Si el índice está fuera del rango de días del mes, lo tratamos como un día vacío
        const d: Day = {
          id: i,
          date: "", // Fecha vacía porque no es un día válido del mes
          events: [] // Sin eventos
        };
        days.push(d); // Agregamos el objeto Day al array de días
      } 
    }
    return days; // Retornamos el array con todos los días del mes y sus eventos
  }
  
  // Tipado para representar un día del calendario
  type Day = {
    id: number; // ID del día, que es solo un índice en este caso
    date: string; // Fecha del día en formato string
    events: Event[]; // Array de eventos que ocurren ese día
  }