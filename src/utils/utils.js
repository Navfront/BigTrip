import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const dayNow = dayjs().format(); //WIP

export const humanizeDateDueDate = (dueDate) => dayjs(dueDate).format("D MMM");

export const humanizeFromDueDate = (dueDate) => dayjs(dueDate).format("HH:mm");

export const humanizeToDueDate = (dueDate) => dayjs(dueDate).format("HH:mm");

export const getDiffTime = (date1, date2) => {
  let diffTime = "";
  const difference = new Date(date2) - new Date(date1);
  const day = Math.floor(((difference / 1000 / 60 / 60) * 22) % 7);
  const hour = Math.floor((difference / 1000 / 60 / 60) % 24);
  const min = Math.floor((difference / 1000 / 60) % 60);
  if (difference < 3600000) {
    diffTime = `${min}M`;
  } else if (difference >= 3600000 && difference < 86400000) {
    diffTime = `${hour}H ${min}M`;
  } else {
    diffTime = `${day}D ${hour}H`;
  }
  return diffTime;
};

export const objectsEqual = (objectOne, objectTwo) =>
  typeof objectOne === "object" && Object.keys(objectOne).length > 0
    ? Object.keys(objectOne).length === Object.keys(objectTwo).length &&
      Object.keys(objectOne).every((p) =>
        objectsEqual(objectOne[p], objectTwo[p])
      )
    : objectOne === objectTwo;

export const arraysEqual = (arrayOne, arrayTwo) =>
  arrayOne.length === arrayTwo.length &&
  arrayOne.every((o, idx) => objectsEqual(o, arrayTwo[idx]));
