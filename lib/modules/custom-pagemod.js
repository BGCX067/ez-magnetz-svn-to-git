// custom-pagemod.js - Ez Magnetz's module
// author: Rodney Teal

exports.PageMod = PageMod;

function PageMod(options){
    this.module = require('page-mod');
    this.construct = function(construct) {
        this.enable = function() {
            this.pageMod = construct.module.PageMod({
                include: options.include,
                contentStyleFile: options.contentStyleFile,
                contentScriptWhen: options.contentScriptWhen,
                contentScriptFile: options.contentScriptFile,
                onAttach: options.onAttach
            });
            options.onStateChange('enabled');
            return this;
        };
        this.destroy = function(){
            this.pageMod.destroy();
            options.onStateChange('disabled');
        };
    };
    this.toggle = function(){
        if (this.hasOwnProperty('pageMod') && this.pageMod) {
            this.pageMod.destroy();
            delete this.pageMod;
        }
        else {
            this.activate();
        }
    };
    this.activate = function()
        this.pageMod = new this.construct(this).enable();
    this.activate();
}