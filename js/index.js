$(document).ready(function() {
    var currentCycle = 1;
    $('#entryPeriod').text('Entry Period (5 days): ' + GetDatePeriod(currentCycle)[0] + GetTimeByZone())
    $('#resultsPeriod').text('Results Period (4 days): ' + GetDatePeriod(currentCycle)[1] + GetTimeByZone())
    $("#countdown").countdown(GetDatePeriod(currentCycle)[2], function(event) {
    $(this).text(
      event.strftime('%D days %H:%M:%S')
    );
    if(event.elapsed) {
        $(this).text('Error (Wrong cycle in settings)');
    }
  });
});  

function GetDatePeriod(currentCycle) {
    var currentDate = new Date();
    var dateAnchor = new Date(2022, 8, 11);
    dateAnchor.setDate(dateAnchor.getDate() + currentCycle*9)
    var dateStart = new Date(dateAnchor);
    var dateEntry = new Date(dateAnchor);
    var dateResults = new Date(dateAnchor);

    dateEntry.setDate(dateStart.getDate() + 5);
    dateResults.setDate(dateEntry.getDate() + 4);

    var strDateStart = formatDate(dateStart);
    var strDateEntry = formatDate(dateEntry);
    var strDateResults = formatDate(dateResults);

    var countdown = 0;
    if(currentDate.getTime() > dateStart.getTime() && currentDate.getTime() < dateEntry.getTime()) {
        countdown = strDateEntry
    }

    if(currentDate.getTime() > dateEntry.getTime() && currentDate.getTime() < dateResults.getTime()) {
        countdown = strDateResults
    }

    return [
        (strDateStart + GetTimeByZone() + ' - ' + strDateEntry),
        (strDateEntry + GetTimeByZone() + ' - ' + strDateResults),
        countdown
    ];
}

function formatDate(date) {
    return date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();
}

function GetTimeByZone(zone){
    switch(zone) {
        case 0: return ' 8:00 PDT';
        case 1: return ' 15:00 ST';
        default: return ' 15:00 ST';
    }
}

