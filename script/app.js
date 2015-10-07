/**
 * Created by nxcong on 07/10/2015.
 */
$(document).ready(function () {
    var app = new Asteroid("45.55.67.5");
    var videoId = getUrlVars()['videoId'];
    var container = $('#container')[0];
    var opts = {
        lines: 13 // The number of lines to draw
        , length: 28 // The length of each line
        , width: 14 // The line thickness
        , radius: 42 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#000' // #rgb or #rrggbb or array of colors
        , opacity: 0.25 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '30%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    }
    var spinner = new Spinner(opts).spin();
    container.appendChild(spinner.el);
    if(videoId){
        var res = app.call('fetch_getVideoDownloadUrl', videoId);
        res.result
            .then(function (result) {
                if (result.status === 200) {
                    var filename = randomName();
                    var p = $('</p>',{
                        text : 'File name : ' + filename
                    });
                    $('body').attr('data-file', result.msg);
                    var button = $('<button/>',{
                        text : 'Download now',
                        class : 'button-warning pure-button button-download',
                        click : function(e){
                            var data = $('body').attr('data-file');
                            window.open(data);
                        }
                    })
                    $('#container').html(button);
                }
            }).catch(function (error) {
                console.error(error);
            });
    }

    /*$('#btnDownload').click(function(e){
     e.preventDefault();
     var src = urlDownload.html()

     });*/

    try {
        var isFileSaverSupported = !!new Blob;
    } catch (e) {
    }
})

function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + '.mp4';
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}