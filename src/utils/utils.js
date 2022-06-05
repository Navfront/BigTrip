import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export const dateToIso = (date) =>  dayjs(date).toISOString();

export const humanizeDateDueDate = (dueDate) => dayjs(dueDate).format('D MMM');

export const humanizeFromDueDate = (dueDate) => dayjs(dueDate).format('HH:mm');

export const humanizeToDueDate = (dueDate) => dayjs(dueDate).format('HH:mm');

export const humanizeForEdit = (dueDate) => {
  if (dueDate)
  { return dayjs(dueDate).format('DD/MM/YY HH:mm'); }
};

export const dateToPickr = (date) => dayjs(date).format('YYYY-MM-DD HH:mm');

export const getDiffTime = (date1, date2) => {
  let diffTime = '';
  const difference = new Date(date2) - new Date(date1);
  const day = dayjs.duration(difference).days();
  const hour = dayjs.duration(difference).hours();
  const minute = dayjs.duration(difference).minutes();

  if (day===0 && hour===0) {
    diffTime = `${minute}M`;
  } else if (day === 0) {
    diffTime = `${hour}H ${minute}M`;
  } else {
    diffTime = `${day}D ${hour}H`;
  }
  return diffTime;
};


