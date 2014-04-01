var APP = {};

/* ROOT */

APP.init = function() {
    $('form').submit(function(e) {
        e.preventDefault();
        if ($(this).parsley('validate')) {
            var data = APP._getFormData();
            APP.RECEIPT.render(data);
            APP.TRACKS.render(data);
            APP._switchScreens();
        }
    });
};

APP._getFormData = function() {
    var result = {};
    $.each($('form').serializeArray(), function(i, field) {
        result[field.name] = field.value;
    });
    return result;
};

APP._switchScreens = function() {
    $("#first-screen").fadeToggle();
    $('#second-screen').delay(400).fadeToggle();
};

/* RECEIPT */

APP.RECEIPT = {};

APP.RECEIPT.render = function(data) {
    APP.RECEIPT._renderMandatoryData(data);
    APP.RECEIPT._renderOptionalData(data);
};

APP.RECEIPT._renderMandatoryData = function(data) {
    $('#name').text(data['name']);
    $('#email').text(data['email']);
};

APP.RECEIPT._renderOptionalData = function(data) {
    if (data['street']) {
        $('#street').text(data['street']);
    }
    else {
        $('#street').hide();
    }

    if (data['code']) {
        $('#code').text(data['code']);
    }
    else {
        $('#code').hide();
    }

    if (data['town']) {
        $('#town').text(data['town']);
    }
    else {
        $('#town').hide();
    }
};

/* TRACKS */

APP.TRACKS = {};

APP.TRACKS.render = function(data) {
    var url = 'http://ws.spotify.com/search/1/track.json';
    var query = '?q=artist:' + encodeURIComponent(data['band']);
    $.getJSON(url + query, function(result) {
        APP.TRACKS._renderArtist(data);
        if (result.tracks.length > 0) {
            APP.TRACKS._renderTracks(result);
        }
        else {
            $('#tracks').toggle();
            $('#no-tracks').toggle();
        }
    });
};

APP.TRACKS._renderArtist = function(data) {
    $('#band').text(data['band']);
};

APP.TRACKS._renderTracks = function(result) {
    for (var i = 0; i < result.tracks.length && i < 3; i++) {
        var link = $(document.createElement('a'));
        link.addClass('clickable');
        link.attr('href', result.tracks[i].href);
        link.text(result.tracks[i].name);

        var item = $(document.createElement('li'));
        item.append(link);
        $('#tracks').append(item);
    }
};
