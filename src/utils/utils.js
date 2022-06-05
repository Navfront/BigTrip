import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(duration);
dayjs.extend(localeData);


export const generateInfoData = (points) => {
  const nd = {};
  const destinations = new Set;
  let minMonth = 11;
  let minMonthDate;
  let maxMonth = 0;
  let maxMonthDate;
  let cost = 0;
  for (const point of points) {
    destinations.add(point.destination.name);
    const pointMonth = dayjs(point.dateFrom).month();
    const pointDay = dayjs(point.dateFrom).date();
    if (pointMonth < minMonth) { minMonth = pointMonth; minMonthDate = pointDay;}
    if (pointMonth > maxMonth) { maxMonth = pointMonth; maxMonthDate = pointDay; }
    cost += Number(point.basePrice);
  }
  nd.destinations = [...destinations];
  nd.startMonth = dayjs.months()[minMonth].slice(0, 3);
  nd.endMonth = dayjs.months()[maxMonth].slice(0, 3);
  nd.dateFrom = minMonthDate;
  nd.dateTo = maxMonthDate;
  nd.cost = cost;
  return nd;
};

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


