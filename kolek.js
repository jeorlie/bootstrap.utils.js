/**
 * Author: Jeorlie Edang
 * Date: 2023-07-14
 * File: kolek.js
 * Description: A collection of bunch of function and wrappers
 */
var _alertDomkolek, _alertModalkolek, _confirmDomkolek,  _confirmModalkolek, _screenblockkolek;

function kolek_alert(obj){
    var t = $.extend({
        text: '',
        callBack: function(){

        },
        title: 'Alert',
        closeText: "Close",
    }, obj);
    

    _alertDomkolek.find('.modal-title').html(t.title).end().find('.modal-body').html(t.text)
    _alertDomkolek.find('.btn-close-trigger').html(t.closeText).off('click').unbind('click').on('click', function(){
      setTimeout(function () {
        t.callBack();
      }, 250);
    });

    _alertModalkolek.modal('show');
    console.log('open');
}

function kolek_confirm(y){
    var t = $.extend({
        title: "Confirm",
        text: "",
        noText: "No",
        yesText: "Yes",
        callBack: function () {
  
        }
      }, y);

      _confirmDomkolek.find('.modal-title').html(t.title).end().find('.modal-body').html(t.text)
      _confirmDomkolek.find('.btn-close-trigger').html(t.noText).off('click').unbind('click');
      _confirmDomkolek.find('.btn-yes-trigger').html(t.yesText).off('click').unbind('click').on('click', function () {
      setTimeout(function () {
        t.callBack();
      }, 250);
    });

    _confirmModalkolek.modal('show');
}

function kolek_blockScreen(y) {
    if (y) _screenblockkolek.show().find('input').focus();
    else _screenblockkolek.fadeOut('fast');
}


function kolek_ajax(urlx, datax, funcx, showloading = true){
    $.ajax({
      url: _instance_config['endpoint'] + urlx, cache: false, dataType: "json",
      headers: {"Content-type":"application/json;UTF-8"},
      data: JSON.stringify(datax), type: "POST", error: function (er) {
        kolek_alert({
          title: "Request error!",
          text: "There was an error parsing data from the server. Try again or check if you are connected to the internet."
        });
        console.dir(er);
      }, beforeSend: function () {
        if (showloading) kolek_blockScreen(true);
      }, complete: function () {
        if (showloading) {
            kolek_blockScreen(false);
        }
      }, success: function (res) {
          if (res.success == false || res.success == "false") {             
            kolek_alert({
                  title: res.title || "Error!",
                  text: res.message
              });
          } else {
              funcx(res);
          }
        
      }
    });
  }


// load defaults
var xfalert = `
      <div class="modal fade" id="kolek-dom-alert-modal-box" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-close-trigger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
 `;

var xfconfirm = `
      <div class="modal fade" id="kolek-dom-confirm-modal-box" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary btn-close-trigger" data-bs-dismiss="modal" style="min-width:80px">No</button>
              <button type="button" class="btn btn-secondary btn-yes-trigger" data-bs-dismiss="modal">Yes</button>
            </div>
          </div>
        </div>
      </div>
`;

var xfscreenblocker = `
      <div id="kolek-dom-app-screen-blocker" style="display:none;position:fixed;top:0;left:0;width:100%;height:100vh;z-index:99999 !important;background:rgba(0,0,0,0.9);">
        <p style="text-align:center;padding-top:0.5em; color:#fff">
          Please wait...
        </p>
        <input type="text" readonly style="position:absolute;bottom:1px;right:1px;width:1px;height:1px;outline:none;background:none;padding:0;">
      </div>
`;


setTimeout(function () {    
    $("body").append(xfalert);
    $("body").append(xfconfirm);
    $("body").append(xfscreenblocker);
}, 150);

setTimeout(function () {
    _alertDomkolek = $("#kolek-dom-alert-modal-box");
    _alertModalkolek = _alertDomkolek.modal({ backdrop: 'static', keyboard: false });
    _confirmDomkolek = $("#kolek-dom-confirm-modal-box");
    _confirmModalkolek = _confirmDomkolek.modal({ backdrop: 'static', keyboard: false });
    _screenblockkolek = $("#kolek-dom-app-screen-blocker");
    console.log('kolek-dom initialized.');
}, 200);
