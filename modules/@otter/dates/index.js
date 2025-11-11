export const toMonthBegin = function(currentDate) {
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds(),
    currentDate.getMilliseconds()
  );
};

export const toMonthEnd = function(currentDate) {
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds(),
    currentDate.getMilliseconds()
  );
};

export const toDayBegin = function(currentDate) {
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0,
    0
  );
};

export const add = function(currentDate, amount, field) {
   return new Date(
    (/^years?$/).test(field) === true ? currentDate.getFullYear() + amount : currentDate.getFullYear(),
    (/^months?$/).test(field) === true ? currentDate.getMonth() + amount : currentDate.getMonth(),
    (/^days?$/).test(field) === true ? currentDate.getDate() + amount : currentDate.getDate(),
    (/^hours?$/).test(field) === true ? currentDate.getHours() + amount : currentDate.getHours(),
    (/^minutes?$/).test(field) === true ? currentDate.getMinutes() + amount : currentDate.getMinutes(),
    (/^seconds?$/).test(field) === true ? currentDate.getSeconds() + amount : currentDate.getSeconds(),
    (/^milliseconds?$/).test(field) === true ? currentDate.getMilliseconds() + amount : currentDate.getMilliseconds()
  );
};

export const calendar = function(date) {
  return 'Today';
};
