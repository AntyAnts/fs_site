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
async function deleteInfo(click_id){
  
  const response = await fetch('/delete_card',{
    method:'POST',
    headers:{
      "X-Requested-With": "XMLHttpRequest"
    }
  })
}
function disp_info(click_id){
  document.getElementById('popup_info_p').style.display = 'block'
  async function getReqCard(){
    const response = await fetch('/get_card',{
      method:'POST',
      headers:{
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({obj_id:`${click_id}`})
    })
    return response.json() 
    
  }
  getReqCard()
    .then(data =>{
        resp = JSON.parse(data['resp'])
        console.log(resp);
      document.getElementById('floatingTextarea1').innerHTML = resp[0].fields.title
      document.getElementById('floatingTextarea2').innerHTML = resp[0].fields.comment
      console.log(data);
      files_list = JSON.parse(data['files'])
      console.log(files_list['list_files']);
      for(f of files_list['list_files']){
        const ls_e = document.createElement('li')
        const lnk_fl = document.createElement('a')
        const a_text = document.createTextNode(String(f))
        lnk_fl.appendChild(a_text)
        lnk_fl.setAttribute('href',f)
        document.querySelector('#file_list_ul').appendChild(ls_e).appendChild(lnk_fl)
      }
    })
  //   .then(resp_ans =>{
  //   document.getElementById('floatingTextarea').innerHTML = '{{thisCard.title}}'
  // })
}
async function deleteCard(){
  const title_textarea = document.getElementById('floatingTextarea1').textContent
  const response = await fetch('delete_card',{
    method:'POST',
    headers:{
      "X-Requested-With": "XMLHttpRequest"
    },
    body: JSON.stringify({title:`${title_textarea}`})
  }).then(()=>{
    location.reload()
  })
}
function loadFiles(click_id){
  const inp = document.querySelector('#file_inp')
  const img = document.querySelector('#file_inp_pin')
  const title_name = document.querySelector('#floatingTextarea1').innerHTML
  const formDat = new FormData()
  img.onclick = function(){
    inp.click()
  }
  async function loadOnServer(file){
    formDat.append('media',file)
    formDat.append('title',title_name)
    console.log(formDat);
    const response = await fetch('upload',{
      method:'POST',
      body:formDat,
      headers:{
        "X-Requested-With": "XMLHttpRequest"
      },
    }).then(data=>{
      console.log(data);
    })
    return response
  }
  const file_selected = () => loadOnServer(inp.files[0])
  inp.addEventListener("change",file_selected,false)
}