// This is an active module of the Ez-Magnetz Add-on

// main-rev.js - Ez Magnetz's Link Generator module
// author: Rodney Teal

// Import Modules
var Request = require("request").Request;

exports.magnetLink = magnetLink;

// Generator Function
function magnetLink(pageUrl, callback) {
    var pageRequest = Request({
        url: pageUrl,
        onComplete: function(response) {
            var url = /(.*)torrentz(.{3}).*(\w{40})/gi.exec(pageUrl);
            var announce = /\/announcelist_[0-9]*/gi.exec(response.text)[0];
            var title = /\/z\/ddownload\/.*?\/(.*?)\//gi.exec(response.text)[1];
            var trackerRequest = Request({
                url: url[1] + "torrentz" + url[2] + announce,
                onComplete: function(response) {
                    var trackers = response.text.replace(/\s{2,}/g," ").replace(/^\s+|\s+$/g,"").split(" ");
                    var magnet = "";
                    for (var i = 0; i < trackers.length; i++) {
                        magnet += "&tr=" + encodeURIComponent(trackers[i]);
                    };
                    callback("magnet:?xt=urn:btih:" + url[3] + "&dn=" + title + magnet);
                }
            });
            trackerRequest.get();
        }
    });
    pageRequest.get();
};
