function filterDate(date){

    var newFormat = [];
    var dates = date.split("-");
    var month = ["January", "February", "March", "April",
                 "May", "June", "July", "August",
                 "September", "October", "November", "December"];
    newFormat.year = dates[0];
    newFormat.month = month[dates[1]-1];
    newFormat.day = dates[2];
    return newFormat;

}

function getHTMLTemplate(link) {

    var template;
        $.ajax({
            type: 'GET',
            url: '/static/tpls/' + link,
            async: false,
            success: function(text){
                template = text;
            }
        });
    return template;

}

function hourToText(time){
    var splittedTime = time.split(':');
    return splittedTime[0]+'h'+splittedTime[1];
}

function loadHistory(){

    var myHistory = new Events();
    if(localStorage.getItem('myHistory')) {
        myHistory = new Events(JSON.parse(localStorage.getItem('myHistory')));
    }
    return myHistory;

}

function getHistoryInAgenda() {
    var myHistory = loadHistory();
    var events = [];
    myHistory.each(function(event){
        events.push(event.get('id'));
    });
    var results;
    $.ajax({
        type: "GET",
        data: {events: JSON.stringify(events)},
        dataType: 'json',
        url: "/agenda/history/",
        async: false,
        success: function(resp){
            results = resp;
        }
    });
    return results;
}