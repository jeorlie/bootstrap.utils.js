console.log('bootstrap5.utils.js loaded. ok');

var SYSTEM_MODAL_ALERT_INSTANCE;
var SYSTEM_MODAL_CONFIRM_INSTANCE;
function do_alert(t){
    var p = $.extend({
        title : 'Alert',
        message: '',
        closeText: 'Close',
        closeClass: 'btn-primary',
        callback: function(){

        }
    }, t);
    var btnClose = $("#modal-alert-box-close-button");
    SYSTEM_MODAL_ALERT_INSTANCE.find('.modal-body').html(p.message);
    SYSTEM_MODAL_ALERT_INSTANCE.find('.modal-header h5').html(p.title);
    btnClose.addClass(p.closeClass).html(p.closeText);
    btnClose.off('click').unbind('click').on('click', function(){
        SYSTEM_MODAL_ALERT_INSTANCE.modal('hide');
        setTimeout(function(){
            p.callback();
        }, 350);
    });
    SYSTEM_MODAL_ALERT_INSTANCE.modal('show');
}

function do_confirm(t){
    var p = $.extend({
        title : 'Confirm',
        message: '',
        noText: 'No',
        noClass: 'btn-secondary',
        yesText: 'Yes',
        yesClass: 'btn-primary',
        callback: function(){

        }
    }, t);
    var btnNo = $("#modal-confirm-box-no-button");
    var btnYes = $("#modal-confirm-box-ok-button");

    SYSTEM_MODAL_CONFIRM_INSTANCE.find('.modal-body').html(p.message);
    SYSTEM_MODAL_CONFIRM_INSTANCE.find('.modal-header h5').html(p.title);
    btnNo.addClass(p.noClass).html(p.noText);
    btnYes.addClass(p.yesClass).html(p.yesText);
    btnYes.off('click').unbind('click').on('click', function(){
        SYSTEM_MODAL_CONFIRM_INSTANCE.modal('hide');
        setTimeout(function(){
            p.callback();
        }, 350);
    });
    btnNo.unbind('click').off('click').on('click', function(){ SYSTEM_MODAL_CONFIRM_INSTANCE.modal('hide');});
    SYSTEM_MODAL_CONFIRM_INSTANCE.modal('show');
}

function do_screen_block(tBool, tMessage = "Requesting..."){
    var overlay = $("#screen-blocker-overlay");
    if(tBool) {
        overlay.show().find('p').text(tMessage);
        overlay.find('input').focus();
    } else {
        overlay.hide();
    }
}

function do_ajax(pObj, pcallback){
    var p = $.extend({
        url: '',
        data: {},
        type: 'POST',
        dataType: 'json',
        cache: false,
        overlay: true,
        clear: false,
        message: 'Please wait...'
    }, pObj);
    $.ajax({
        url     : p.url,
        data    : p.data,
        type    : p.type,
        cache   : p.cache,
        dataType: p.dataType,
        beforeSend: function(){
            var overlay = $("#screen-blocker-overlay");
            if(p.clear){                
                overlay.css({'background': 'none'});
                overlay.find('p').removeClass("text-white");
            } else {
                overlay.css({'background': 'rgba(0, 0, 0, 0.9)'});
                overlay.find('p').addClass("text-white");
            }
            if(p.overlay){
                do_screen_block(true, p.message)
            }
        },
        complete: function(){
            if(p.overlay){
                do_screen_block(false, p.message)
            }
        },
        success: function(ret){
            if(ret.success == false){
                do_alert({
                    message: ret.message
                });
            }
            pcallback(ret);
        }
    });
}


function do_charming(pTarget, pConfig) {
    var selfie = this;
    var target = pTarget;
    var t = $.extend({
        backButtonText: 'Back',
        toolbarCss: 'container pt-4',
        onClose: function(){

        },
        onOpen: function(){

        },
        buttons: [],
        backgroundColor: '#fff',
        zIndex: 100,
    }, pConfig);

    this.init = function(){
        var str = `
            <div class="boot-charming-toolbar `+ t.toolbarCss+`">
                <div class="d-inline-block w-100">
                    <button class="btn boot-charming-back-button float-start btn-danger" type="button">`+ t.backButtonText+`</button>
                </div>
            </div>
        `;
        var cssOptions = {
            'top': '-110%', 
            'position': 'fixed',
            'height' : '100vh',
            'width'     : '100%',
            'z-index'   : t.zIndex,
            'background': t.backgroundColor 
        };
        target.css(cssOptions).prepend(str);

        if(t.buttons.length > 0){
            console.log('found buttons');
            var btn;
            var str = ''
            for(i in t.buttons) {
                btn  = $.extend({
                    'label' : '',
                    'css'   : 'btn btn-primary float-end',
                    'class' : 'extend-button'
                }, t.buttons[i]);
                str += `
                    <button class="`+ btn.css + ` `+ btn.class +`" type="button">`+ btn.label + `</button>
                `;
            }
            target.find('.boot-charming-toolbar  .d-inline-block').append(str);
        }

        target.on('click', '.boot-charming-back-button', function(){
            t.onClose();
            target.animate({
                'top': '-110%'
            }, 300);
        });
    }
    this.parent = function(){
        return target;
    }

    this.show = function(){
        t.onOpen();
        target.animate({
            'top': '0'
        }, 300);
    }

    this.hide = function(){
        console.log("close event");
        target.find('.boot-charming-back-button').click();
    }

}


window.addEventListener("load", function(){

    var t =`
    <div class="modal modal-alert-box" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" id="modal-alert-box-close-button" class="btn" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal modal-confirm-box" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" id="modal-confirm-box-close-button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" id="modal-confirm-box-no-button" class="btn" data-bs-dismiss="modal">No</button>
        <button type="button" id="modal-confirm-box-ok-button" class="btn">Yes</button>
      </div>
    </div>
  </div>
</div>

<div id="screen-blocker-overlay" style="display:none;position:fixed;top:0;left:0;width:100%;height:100vh;z-index:5000;background:rgba(0, 0, 0, 0.9)">
    <div class="d-flex justify-content-center align-items-center" style="height:80vh;">
        <p class="text-center text-lowercase text-white fw-bold h4">loading...</p>
        <input type="text" readonly="true" style="position:absolute;bottom:0;right:0;width:1px;border:0;outline:none;padding:0;">
    </div>
</div>
    
    `;

    $("body").append(t);
    var options = {
        show: false
    }
    SYSTEM_MODAL_ALERT_INSTANCE = $(".modal-alert-box");
    SYSTEM_MODAL_CONFIRM_INSTANCE = $(".modal-confirm-box");
    SYSTEM_MODAL_ALERT_INSTANCE.modal(options);
    SYSTEM_MODAL_CONFIRM_INSTANCE.modal(options);


});