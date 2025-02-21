/**
 * author: Jeorlie Edang
 * dep: bootstrap-4.6.2 / jquery 3.5+
 */

function boot_alert(k){
    var t = $.extend({
        title: 'Alert',
        message: '',
        callback: null
    },k);
    var ele = $("#modal-alert-box");
    ele.find('.modal-body').empty().append(t.message);
    ele.find('.modal-title').text(t.title);
    ele.find('.modal-footer .btn-secondary').unbind('click').off('click').on('click', function(){
        ele.modal('hide');
        if(typeof t.callback == "function"){
            setTimeout(function(){
                t.callback();
            }, 300);
        }
    });
    ele.modal('show');
}

function boot_ajax(turl, tdata, tcallback){
    $.ajax({
        cache: false,
        data: tdata,
        url: turl,
        dataType: 'json',
        type: 'POST',
        error: function(er){
            console.dir(er);
            boot_alert({title: 'Unknown', message: 'App has encountered an unknown error.'});
        },
        beforeSend: function(){
            boot_block_screen(true, "Requesting...");
        },
        complete: function(){
            boot_block_screen(false);
        },
        success: function(ret){

        }
    });
}

function boot_block_screen(tBool, tString){
    var ele = $("#app-block-screen");
    if(tBool) ele.show().find('p').text(tString).end().find('input').focus();
    else ele.fadeOut('fast');
}

function boot_alert(k){
    var t = $.extend({
        title: 'Confirm',
        message: '',
        callback: null
    },k);
    var ele = $("#modal-confirm-box");
    ele.find('.modal-body').empty().append(t.message);
    ele.find('.modal-title').text(t.title);
    ele.find('.modal-footer .btn-secondary').unbind('click').off('click').on('click', function(){
        ele.modal('hide');
        if(typeof t.callback == "function"){
            setTimeout(function(){
                t.callback();
            }, 300);
        }
    });

    ele.find('.modal-footer .btn-primary').unbind('click').off('click').on('click', function(){
        ele.modal('hide');
    });

    ele.modal('show');
}


window.addEventListener("load", function(){
    var options = {
        keyboard: false,
        backdrop: 'static',
        show: false
    }
    var str = `
            <div id="app-block-screen" style="display:none;width:100%;height:100vh;position:fixed;top:0;left:0;z-index:2000;background:rgba(0, 0, 0, 0.8)">
                <div class="d-flex justify-content-center align-items-center" style="min-height:90vh">
                    <p class="text-center text-white" style="font-size:1.5em">loading</p>
                </div>
                <input type="text" readonly="true" style="width:1px;height:1px;padding:0;margin:0;border:0;
                outline:none;position:absolute;bottom:1px;right:1px">
            </div>  

            <div class="modal" id="modal-alert-box" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
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

            <div class="modal" id="modal-confirm-box" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Yes</button>
                    </div>
                    </div>
                </div>
            </div>

    `;
    $("body").append(str);
    $("#modal-alert-box, #modal-confirm-box").modal(options);
    setTimeout(function(){
        $("#default-page-loader").fadeOut('fast');
    }, 1200);
});