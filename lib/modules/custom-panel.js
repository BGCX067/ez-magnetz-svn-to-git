// custom-panel.js - Ez Magnetz's module
// author: Rodney Teal

let panels = require("panel");

exports.StatusPanel = StatusPanel;

function StatusPanel (obj){
    this.show = function(state){
        if (this.state != state) {
            this.state = state;
            this.panel = this.panels[state];
        };
        this.panel.show();
    };
    this.hide = function(){
        this.panel.hide();
    };
    this.createPanel = function() {
        this.panels = [];
        let text = obj.text;
        let width = obj.width;
        for (let i = 0; i < text.length; i++){
            this.panels.push(panels.Panel({
                width: width[i],
                height: obj.height,
                contentURL: obj.contentURL.replace("[text]", text[i]),
                contentScript: obj.contentScript
            }));
        };
        this.panel = this.panels[obj.defaultState];
        this.state = obj.defaultState;
    };
    this.createPanel();
};  