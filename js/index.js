/*jslint browser: true*/ /*global  $*/

$(document).ready(function () {
  let data = GetDatePeriod();
  $('#entryPeriod').text(data[0]);
  $('#resultsPeriod').text(data[1]);
  $('#countdown').countdown(data[2], function (event) {
    $(this).text(data[3] + event.strftime('%D days %H:%M:%S'));
    if (event.elapsed) {
      $(this).text('Error (Wrong cycle in settings)');
    }
  });
});

function GetDatePeriod() {
  let currentDate = new Date(); // Local DateTime
  let dateAnchor = new Date('October 8, 2022, 15:00:00 GMT+0000'); // Initial Entry period start date to count cycles from
  let currentCycle = Math.floor(dateDiffInDays(currentDate, dateAnchor) / 9);
  console.log(dateDiffInDays(currentDate, dateAnchor));
  console.log(dateDiffInDays(currentDate, dateAnchor) / 9);
  dateAnchor.setUTCDate(dateAnchor.getUTCDate() + currentCycle * 9);
  let dateStart = new Date(dateAnchor.toUTCString());
  let dateEntry = new Date(dateAnchor.toUTCString());
  let dateResults = new Date(dateAnchor.toUTCString());

  dateStart.setUTCHours(15);
  dateEntry.setUTCDate(dateStart.getUTCDate() + 5);
  dateEntry.setUTCHours(15);
  dateResults.setUTCDate(dateStart.getUTCDate() + 9);
  dateResults.setUTCHours(15);

  console.log('entry ' + dateEntry.toUTCString());
  console.log('result ' + dateResults.toUTCString());

  let strDateStart = formatDateNew(dateStart);
  let strDateEntry = formatDateNew(dateEntry);
  let strDateResults = formatDateNew(dateResults);
  console.log(strDateStart);
  console.log(strDateEntry);
  console.log(strDateResults);

  // ---- Countdown related -----
  let countdown = 0;
  let countdownPeriod = 'Entry';
  console.log(
    'Entry: ' + currentDate.toUTCString() + '>' + dateStart.toUTCString()
  );
  if (
    currentDate.getTime() > dateStart.getTime() &&
    currentDate.getTime() < dateEntry.getTime()
  ) {
    countdown = formatDateOld(dateEntry);
    countdownPeriod = 'Entry  period ends in ';
  }

  console.log(
    'Result: ' +
      currentDate.toUTCString() +
      '>' +
      dateEntry.toUTCString() +
      ' && ' +
      currentDate.toUTCString() +
      '<' +
      dateResults.toUTCString()
  );
  if (
    currentDate.getTime() > dateEntry.getTime() &&
    currentDate.getTime() < dateResults.getTime()
  ) {
    countdown = formatDateOld(dateResults);
    countdownPeriod = 'Results period ends in ';
  }

  // if (currentDate.getTime() < dateStart.getTime()) {
  //     countdown = formatDateOld(dateEntry);
  //     countdownPeriod = 'Results period ends in ';
  // }

  return [
    '' +
      strDateStart +
      GetServerTimeByZone() +
      ' ➜ ' +
      strDateEntry +
      GetServerTimeByZone() +
      '',
    '' +
      strDateEntry +
      GetServerTimeByZone() +
      ' ➜ ' +
      strDateResults +
      GetServerTimeByZone() +
      '',
    countdown,
    countdownPeriod,
  ];
}

function formatDateOld(date) {
  console.log(
    date.toLocaleString('en', {
      hour12: true,
    })
  );
  return date.toLocaleString('en', {
    hour12: true,
  });
}

function formatDateNew(date) {
  return (
    date.toLocaleString('en', { month: 'long', timeZone: 'UTC' }) +
    ' ' +
    date.getDate() +
    ', ' +
    date.getFullYear()
  );
}
function GetServerTimeByZone(zone) {
  switch (zone) {
    case 0:
      return ' 8:00 PDT';
    case 1:
      return ' 15:00 ST';
    default:
      return ' 15:00 ST';
  }
}

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));
}
