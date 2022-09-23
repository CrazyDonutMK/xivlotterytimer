$(document).ready(function() {
    $('#entryPeriod').text(GetDatePeriod()[0])
    $('#resultsPeriod').text(GetDatePeriod()[1])
    $("#countdown").countdown(GetDatePeriod()[2], function(event) {
    $(this).text(GetDatePeriod()[3] +
      event.strftime('%D days %H:%M:%S')
    );
    if(event.elapsed) {
        $(this).text('Error (Wrong cycle in settings)');
    }
  });
});  

function GetDatePeriod() {
    var currentDate = new Date();
    var dateAnchor = new Date(2022, 8, 11);
    var currentCycle = Math.floor(dateDiffInDays(currentDate, dateAnchor)/9);
    dateAnchor.setDate(dateAnchor.getDate() + currentCycle*9)
    var dateStart = new Date(dateAnchor);
    var dateEntry = new Date(dateAnchor);
    var dateResults = new Date(dateAnchor);

    dateEntry.setDate(dateStart.getDate() + 5);
    dateResults.setDate(dateEntry.getDate() + 4);

    var strDateStart = formatDateNew(dateStart);
    var strDateEntry = formatDateNew(dateEntry);
    var strDateResults = formatDateNew(dateResults);

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
    return date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function formatDateNew(date) {
    return  monthNames[(date.getMonth())] + " " + date.getDate() + ", " + date.getFullYear();
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

