/*jslint browser: true*/ /*global  $*/

$(document).ready(function () {
  $('#timeZoneCheckbox').prop('checked', JSON.parse(localStorage.getItem('timeZonePrefered')));
  RenderInfo();
  $('#timeZoneCheckbox').on('change', function() {
    localStorage.setItem('timeZonePrefered', this.checked);
    RenderInfo();
  });
});

function RenderInfo() {
  let data = GetDatePeriod();
  $('#entryPeriod').text(data[0]);
  $('#resultsPeriod').text(data[1]);
  $('#countdown').countdown(data[2], function (event) {
    $(this).text(data[3] + event.strftime('%D days %H:%M:%S'));
    if (event.elapsed) {
      $(this).text('Error (Wrong cycle in settings)');
    }
  });
}

function GetDatePeriod() {
  let currentDate = new Date(); // Local DateTime
  let dateAnchor = new Date('October 8, 2022, 15:00:00 GMT+0000'); // Initial Entry period start date to count cycles from
  let currentCycle = Math.floor(dateDiff(currentDate, dateAnchor) / 9);
  console.log(dateDiff(currentDate, dateAnchor));
  console.log(dateDiff(currentDate, dateAnchor) / 9);
  dateAnchor.setUTCDate(dateAnchor.getUTCDate() + currentCycle * 9);
  let dateStart = new Date(dateAnchor.toUTCString());
  let dateEntry = new Date(dateAnchor.toUTCString());
  let dateResults = new Date(dateAnchor.toUTCString());

  dateStart.setUTCHours(15);
  dateEntry.setUTCDate(dateStart.getUTCDate() + 5);
  dateEntry.setUTCHours(15);
  dateResults.setUTCDate(dateStart.getUTCDate() + 9);
  dateResults.setUTCHours(15);

  console.log('Entry ' + dateEntry.toUTCString());
  console.log('Result ' + dateResults.toUTCString());
  
  //Related to LT/ST switch
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
    countdownPeriod = 'Entry period ends in ';
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
      ' ➜ ' +
      strDateEntry +
      '',
    '' +
      strDateEntry +
      ' ➜ ' +
      strDateResults +
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
  return JSON.parse(localStorage.getItem('timeZonePrefered')) ? (
    date.toLocaleString('en', { month: 'long', timeZone: 'UTC'}) +
    ' ' +
    date.getUTCDate() +
    ', ' +
    date.getUTCFullYear() +
    ', ' + date.toLocaleTimeString('en', { hour12: false, timeZoneName: 'short', timeZone: 'UTC'})
  ) : (
    date.toLocaleString('en', { month: 'long'}) +
    ' ' +
    date.getDate() +
    ', ' +
    date.getFullYear() +
    ', ' + date.toLocaleTimeString('en', { hour12: false, timeZoneName: 'short'})
  );
}

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));
}

function dateDiff(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getUTCHours(), b.getUTCMinutes(), b.getUTCSeconds());

  return Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));
}
