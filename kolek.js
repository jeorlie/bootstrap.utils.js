/**
 * Author: Jeorlie Edang
 * File: Strap.js
 * Description: Personal bootstrap wrapper
 * Dependencies: Jquery3+, Bootstrap5+
 */
var strap_alert_modal_instance;
var strap_confirm_modal_instance;

function strap_blockscreen(t){

}

function strap_ajax(xUrl, xData, xCallback){
    $.ajax({
        url: xUrl, data: xData, type:'POST', dataType: 'json', cache: false,
        beforeSend: function(){ strap_blockscreen(true); },
        complete: function() { strap_blockscreen(false);},
        error: function(er) { console.dir(er); strap_alert({message: 'Unknown error has occured. Try again'});},
        success: function(ret){
            if(ret.success == false) {
                strap_alert({message: ret.message});
            }
            xCallback(ret);
        }
    })
}

function strap_alert(y){
    var t = $.extend({
        title: 'Alert',
        message: '',
        callBack: function(){}
    }, y);
    var obj = $("#appl-alert-modal-bs");
    obj.find('.modal-title').html(t.title).end().find('.modal-body p').html(t.message);
    strap_alert_modal_instance.show();
    obj.find('.btn-secondary').off('click').unbind('click').on('click', function(){
        setTimeout(function(){
            t.callBack();
        }, 300);
    });
}

function strap_confirm(y){
    var t = $.extend({
        title: 'Confirm',
        message: '',
        callBack: function(){}
    }, y);
    var obj = $("#appl-confirm-modal-bs");
    obj.find('.modal-title').html(t.title).end().find('.modal-body p').html(t.message);
    strap_confirm_modal_instance.show();

    obj.find('.modal-btn-yes').off('click').unbind('click').click(function(){
        setTimeout(function(){
            t.callBack();
        }, 300);
    });

}

window.addEventListener('load', function(){
    var str = `
        
        <div class="modal" id="appl-confirm-modal-bs" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No/Cancel</button>
                    <button type="button" class="btn btn-primary modal-btn-yes" data-bs-dismiss="modal">Yes</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal" id="appl-alert-modal-bs" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    `;

    $("body").append(str);
    setTimeout(function(){
        var options = {
            backdrop: 'static',
            keyboard: false   
        };        
        strap_alert_modal_instance = new bootstrap.Modal(document.getElementById('appl-alert-modal-bs'), options);
        strap_confirm_modal_instance = new bootstrap.Modal(document.getElementById('appl-confirm-modal-bs'), options);
        
    },250);

    setTimeout(function(){
        $(".appl-loader").hide();
    }, 900);

});
