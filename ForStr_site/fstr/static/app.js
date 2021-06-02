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
var del_btn
var id_btn
function disp_info(click_id){
  document.getElementById('popup_info_p').style.display = 'block'
  del_btn = document.querySelector("#btn_del")
  del_btn.id = click_id
  id_btn = del_btn.id
  console.log(id_btn)
  async function getReqCard(){
    const response = await fetch('/get_card',{
      method:'POST',
      headers:{
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({obj_id:`${del_btn.id}`})
    })
    return response.json() 
    
  }
  getReqCard()
    .then(data =>{
        resp = JSON.parse(data['resp'])
        console.log(resp);
	 document.getElementById(`${del_btn.id}`).id = "btn_del"
      document.getElementById('floatingTextarea1').innerHTML = resp[0].fields.title
      document.getElementById('floatingTextarea2').innerHTML = resp[0].fields.comment
      console.log(data);
	try{
      files_list = JSON.parse(data['files'])
      console.log(files_list['list_files']);
	  const ch_ul = document.querySelector('#file_list_ul')
		while(ch_ul.lastChild){
			ch_ul.removeChild(ch_ul.lastChild)
		}
      for(f of files_list['list_files']){
        const ls_e = document.createElement('li')
        const lnk_fl = document.createElement('a')
        const a_text = document.createTextNode(String(f.slice(27)))
		const img_del = document.createElement('img')
		img_del.setAttribute('src','/static/delete-sign.png')
		img_del.setAttribute('class','del_img_ls')
        lnk_fl.appendChild(a_text)
        lnk_fl.setAttribute('href',f.substr(4))
		lnk_fl.setAttribute('target','blank')
        document.querySelector('#file_list_ul').appendChild(ls_e).appendChild(lnk_fl)
		ls_e.appendChild(img_del)
      }
	}catch(e){
		const ch_ul = document.querySelector('#file_list_ul')
		while(ch_ul.lastChild){
			ch_ul.removeChild(ch_ul.lastChild)
		}
		return(console.log('В данном обьекте нет файлов'))}
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
function loadFiles(){
  const inp = document.querySelector('#file_inp')
  const img = document.querySelector('#file_inp_pin')
  const formDat = new FormData()
  img.onclick = function(){
    inp.click()
  }
  async function loadOnServer(file){
	const title_name = document.querySelector('#floatingTextarea1').innerHTML
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
	  console.log(id_btn)
	  updateAfterLoad()
    })
    return response
  }
  const file_selected = () => loadOnServer(inp.files[0])
  inp.addEventListener("change",file_selected,false)
}
function updateAfterLoad(){
	console.log(id_btn)
	async function getReqCard(){
    const response = await fetch('/get_card',{
      method:'POST',
      headers:{
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({obj_id:`${id_btn}`})
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
	try{
      files_list = JSON.parse(data['files'])
      console.log(files_list['list_files']);
	  const ch_ul = document.querySelector('#file_list_ul')
		while(ch_ul.lastChild){
			ch_ul.removeChild(ch_ul.lastChild)
		}
      for(f of files_list['list_files']){
        const ls_e = document.createElement('li')
        const lnk_fl = document.createElement('a')
        const a_text = document.createTextNode(String(f.slice(27)))
		const img_del = document.createElement('img')
		img_del.setAttribute('src','/static/delete-sign.png')
		img_del.setAttribute('class','del_img_ls')
        lnk_fl.appendChild(a_text)
        lnk_fl.setAttribute('href',f.substr(4))
		lnk_fl.setAttribute('target','blank')
        document.querySelector('#file_list_ul').appendChild(ls_e).appendChild(lnk_fl)
		ls_e.appendChild(img_del)
      }
	}catch(e){
		const ch_ul = document.querySelector('#file_list_ul')
		while(ch_ul.lastChild){
			ch_ul.removeChild(ch_ul.lastChild)
		}
		return(console.log('В данном обьекте нет файлов'))}
    })
	
}