function Torrentz(img, tImg) {

    var isDownloadPage = /(.*)torrentz(.{3}).*(\w{40})/gi.test(document.URL);
    if (!(isDownloadPage || /search|verified|any/i.test(document.URL))){return;};

    document.getElementByTagClass = getElementByTagClass;
    
    var link, dd, span, customSpan, dl, div;
    if (isDownloadPage){
        div = document.getElementByTagClass("div", "download")
        dl = div.getElementsByTagName("dl");
    }else{
        dl = document.getElementByTagClass("div", "results").getElementsByTagName("dl");
    };
    if (dl == null){return;};
    
    for (var i = 0; i < dl.length; i++) {
        
        link = dl[i].getElementsByTagName("a")[0];
        dd = dl[i].getElementsByTagName("dd")[0];
        
        if (isDownloadPage){
            cloneDL = dl[0].cloneNode(true);
            cloneDL.getElementByTagClass = getElementByTagClass;
            
            dl[0].getElementByTagClass = getElementByTagClass;
            span = dl[0].getElementByTagClass("span", "u");
            
            span.className = "mlink";
            link.href = "#"
            span.setAttribute("id", document.URL);
            span.setAttribute("style", "background: transparent url('" + img + "') no-repeat 5px " +
                "center; color:#FF0000 !important;font-size:17px;line-height:30px;padding-left:30px;text-decor" +
                "ation:underline;width:200px");
            span.innerHTML = "Magnet Link";
            span.onclick = emitData;
            dl[0].removeChild(dl[0].getElementsByTagName("dd")[0]);
            
            span = cloneDL.getElementByTagClass("span", "u");
            link = cloneDL.getElementsByTagName("a")[0];
            dd = cloneDL.getElementsByTagName("dd")[0];
            span.className = "tlink";
            link.href = "http://torrage.com/torrent/" + 
                /.*torrentz.{3}.*(\w{40})/gi.exec(link.href)[1].toUpperCase() + ".torrent";
            span.setAttribute("style", "background: transparent url('" + tImg + "') no-repeat 5px " +
                "center; color:#00FF00 !important;font-size:17px;line-height:30px;padding-left:30px;text-decor" +
                "ation:underline;width:200px");
            span.innerHTML = "Torrent File";
            div.insertBefore(cloneDL, dl[1]);
            cloneDL.removeChild(cloneDL.getElementsByTagName("dd")[0]);
            break;
        };
        
        if (link == undefined){continue;};
        
        dd.style.width = "290px";
        span = dd.childNodes[0];
        if (span.innerHTML == " ") {span.setAttribute("style", "background:none !important;");};
        
        customSpan = document.createElement("span");
        customSpan.setAttribute("style", "float:left;width:18px;padding-right:6px;margin-top:-2px;cursor: pointer;");
        customSpan.appendChild(createMagnet(link));
        dd.insertBefore(customSpan, span);
        
    };
    function getElementByTagClass(tagName, className) {
        var elem = this.getElementsByTagName(tagName);
        for (i = 0; i < elem.length - 1; i++) {
            if (elem[i].className == className) {
                return elem[i]
                break;
            };
        };
        return null;
    };
    
    function createTorrent(elem) {
        var torrent = document.createElement("img");
        torrent.src = tImg;
        torrent.title = elem.innerHTML;
        torrent.onclick = function() {
            var torrentLink = 
            self.port.emit("torrent-clicked", torrentLink);
        };
        return torrent;
    };
    
    function createMagnet(elem) {
        var magnet = document.createElement("img");
        magnet.setAttribute("id", elem.href)
        magnet.src = img;
        magnet.title = elem.innerHTML;
        magnet.onclick = emitData;
        return magnet;
    };
    
    function emitData(link){
        self.port.emit("magnet-clicked", link.target.id);
        return false;
    };
    
};




