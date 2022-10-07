$(document).ready(function() {
    var data = GetDatePeriod();
    $('#entryPeriod').text(data[0])
    $('#resultsPeriod').text(data[1])
    $("#countdown").countdown(data[2], function(event) {
    $(this).text(data[3] +
      event.strftime('%D days %H:%M:%S')
    );
    if(event.elapsed) {
        $(this).text('Error (Wrong cycle in settings)');
    }
  });
});  

function GetDatePeriod() {
    var currentDate = new Date(); // Local DateTime
    var dateAnchor = new Date("September 11, 2022, 15:00:00 GMT+0000"); // 2022, 8, 11, 15, 0, 0
    var currentCycle = Math.floor(dateDiffInDays(currentDate, dateAnchor)/9); // FIX
    console.log(dateDiffInDays(currentDate, dateAnchor));
    console.log(dateDiffInDays(currentDate, dateAnchor)/9);
    dateAnchor.setUTCDate(dateAnchor.getUTCDate() + currentCycle*9)
    var dateStart = new Date(dateAnchor.toUTCString());
    var dateEntry = new Date(dateAnchor.toUTCString());
    var dateResults = new Date(dateAnchor.toUTCString());

    console.log('entry ' + dateEntry.toUTCString());
    console.log('result ' + dateResults.toUTCString());

    dateEntry.setUTCDate(dateStart.getUTCDate() + 5);
    dateResults.setUTCDate(dateStart.getUTCDate() + 9);

    var strDateStart = formatDateNew(dateStart);
    var strDateEntry = formatDateNew(dateEntry);
    var strDateResults = formatDateNew(dateResults);
    console.log(strDateStart);
    console.log(strDateEntry);
    console.log(strDateResults);

    // ---- Countdown related -----
    var countdown = 0;
    var countdownPeriod = 'Entry';
    if(currentDate.getTime() > dateStart.getTime() && currentDate.getTime() < dateEntry.getTime()) {
        countdown = formatDateOld(dateEntry);
        countdownPeriod = 'Entry  period ends in ';
    }

    if(currentDate.getTime() > dateEntry.getTime() && currentDate.getTime() < dateResults.getTime()) {
        countdown = formatDateOld(dateResults);
        countdownPeriod = 'Results period ends in ';
    }

    return [
        ('' + strDateStart + GetTimeByZone() + ' ➜ ' + strDateEntry + GetTimeByZone() + ''),
        ('' + strDateEntry + GetTimeByZone() + ' ➜ ' + strDateResults + GetTimeByZone() + ''),
        countdown,
        countdownPeriod
    ];
}

function formatDateOld(date) {
    return date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}


function formatDateNew(date) {
    return  date.toLocaleString('default', { month: 'long' }) + " " + date.getDate() + ", " + date.getFullYear();
}
function GetTimeByZone(zone){
    switch(zone) {
        case 0: return ' 8:00 PDT';
        case 1: return ' 15:00 ST';
        default: return ' 15:00 ST';
    }
}

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));
}

