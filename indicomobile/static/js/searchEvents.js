function searchInDB(term){

    var results;
    $.ajax({
        type: "GET",
        url: "/searchEvent",
        dataType: "json",
        data: {
            search: term
        },
        async: true,
        success: function(resp){
            results = resp;
            $('#searchResults').data('resultEvents', new Events(results));
            $('#searchResults').data('part', 0);
            $('#loadingEvents').show();
            var resultEventsView = new EventsListView({
                viewContainer : $('#searchResults'),
                part: $('#searchResults').data('part')
            });
            resultEventsView.render();
            $('#searchResults').data('view', resultEventsView);

            $.mobile.hidePageLoadingMsg();

            $(window).scroll(function() {
                if($(window).scrollTop() + $(window).height() > $('#eventHome').height()-150 &&
                        $('#searchResults').data('part') != -1) {
                    resultEventsView.options.create = false;
                    resultEventsView.render();
                }
            });
        }
    });

}

$('#eventHome').live('pageshow', function(){
    var container = $('#searchResults');
    $(window).on('scroll', function() {
        if(container.data('part') != -1 &&
                $(window).scrollTop() + $(window).height() >= $('#eventHome').height()-150) {
            container.data('view').options.create = false;
            container.data('view').render();
        }
    });
});

$('#searchEvent').live('keyup', function(event){

    visited = false;
    if (event.keyCode == 13){
        $.mobile.loadingMessageTextVisible = true;
        $.mobile.loadingMessage = "Searching... Please wait.";
        $.mobile.showPageLoadingMsg();
        searchInDB($(this).val());
    }

});