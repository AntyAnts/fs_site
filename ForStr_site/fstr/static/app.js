window.onload = function(){
  var btn_lnk = document.getElementById('plus_cr');
  var class_lnk = document.getElementsByClassName('close')[0];
  var div_lnk = document.getElementById('popup_card');
  var btn_conf = document.getElementsByClassName('save_btn')[0];
  var div_info = document.getElementById('popup_info_p')
  console.log(class_lnk);
  console.log(btn_lnk);
  btn_lnk.onclick = function(){
    div_lnk.style.display = 'block';
  }
  window.onclick = function(event) {
    if (event.target == div_lnk) {
      div_lnk.style.display = "none";
    }
    else if (event.target == div_info){
      div_info.style.display = 'none';
    }
  }
}