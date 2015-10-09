export default (soyie, app) => {
    return {
        props: ['data'],
        events: {
            wrapTemplate: function(temp){
                this.wrapname = this.virtualDom.getAttribute('name');
                this.zoom = this.virtualDom.getAttribute('zoom');
                if ( this.zoom == undefined ){
                    this.zoom = 0;
                }else{
                    this.zoom = Number(this.zoom);
                }
                return '<div class="webview"><section>' + temp + '</section></div>';
            },
            init(){
                for ( let i = 0 ; i < this.element.childNodes.length ; i++ ){
                    if ( this.element.childNodes[i].nodeType === 1 ){
                        this.wraproot = this.element.childNodes[i];
                        break;
                    }
                }
                app.webviews[this.wrapname] = this;
            }
        }
    };
}