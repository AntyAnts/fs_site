window.onload = function(){
  var btn_lnk = document.getElementById('plus_cr');
  var class_lnk = document.getElementsByClassName('close')[0];
  var div_lnk = document.getElementById('popup_card');
  var btn_conf = document.getElementsByClassName('save_btn')[0];
  var div_info = document.getElementById('popup_info_p')
  var div_photo = document.getElementById('photo')
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
    else if (event.target == div_photo){
      div_photo.style.display = 'none'
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
  setTimeout(()=>{
    document.getElementById('photo').style.display = 'none'
  },0)
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
	  var itr = 0
      for(f of files_list['list_files']){
        const ls_e = document.createElement('li')
        const lnk_fl = document.createElement('a')
        const a_text = document.createTextNode(decodeURI(String(f.slice(27))))
		const img_del = document.createElement('img')
		img_del.setAttribute('src','/static/delete-sign.png')
		img_del.setAttribute('class','del_img_ls')
		img_del.setAttribute('id','del_img_ls_id'+String(itr))
		img_del.addEventListener('click',deleteFile)
        lnk_fl.appendChild(a_text)
        lnk_fl.setAttribute('href',f.substr(4))
		lnk_fl.setAttribute('target','blank')
		lnk_fl.setAttribute('class','a_arr_li')
        document.querySelector('#file_list_ul').appendChild(ls_e).appendChild(lnk_fl)
		ls_e.appendChild(img_del)
		itr++
      }
	}catch(e){
    console.log(e);
		const ch_ul = document.querySelector('#file_list_ul')
		while(ch_ul.lastChild){
			ch_ul.removeChild(ch_ul.lastChild)
		}
		return(console.log('В данном обьекте нет файлов'))}
    try{
      c_ind = 0
      document.querySelector('ymaps').remove()
      document.getElementById('map').style.display = 'none'
      }
      catch(e){}  
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
	  var itr = 0
      for(f of files_list['list_files']){
        const ls_e = document.createElement('li')
        const lnk_fl = document.createElement('a')
        const a_text = document.createTextNode(decodeURI(String(f.slice(27))))
		const img_del = document.createElement('img')
		img_del.setAttribute('src','/static/delete-sign.png')
		img_del.setAttribute('class','del_img_ls')
		img_del.setAttribute('id','del_img_ls_id'+String(itr))
		img_del.addEventListener('click',deleteFile)
        lnk_fl.appendChild(a_text)
        lnk_fl.setAttribute('href',f.substr(4))
		lnk_fl.setAttribute('target','blank')
        document.querySelector('#file_list_ul').appendChild(ls_e).appendChild(lnk_fl)
		ls_e.appendChild(img_del)
		itr++
      }
	}catch(e){
		const ch_ul = document.querySelector('#file_list_ul')
		while(ch_ul.lastChild){
			ch_ul.removeChild(ch_ul.lastChild)
		}
		return(console.log('В данном обьекте нет файлов'))}
    })
	
}
async function deleteFile(event){
	const gt_file = document.getElementById(String(event.target.id))
	formDat = new FormData()
	formDat.append('id',id_btn)
	formDat.append('file',gt_file.parentElement.innerText)
	const response = await fetch('delete_file',{
		method:"POST",
		headers:{
			"X-Requested-With": "XMLHttpRequest"
		},
		body:formDat
	}).then((data)=>{
		console.log(data.status)
		if (data.status == 200){
			gt_file.parentElement.remove()
		}
	})
}
var myMap
var coords
var c_ind = 0
function showMap(){
  const r = new RegExp('\d')
  getCoords().then(data =>{
    console.log(data);
    try{
      var res = JSON.parse(data.replaceAll("'",""));
    }
    catch(e){
      console.log("Не указана точка геолокации для обьекта");
    }

  document.getElementById('map').style.display = 'block'
  
  if (c_ind % 2 == 0){
  ymaps.ready(init)
  function init(){
      // Создание карты.
        if(res) {
        myMap = new ymaps.Map("map", {
          // Координаты центра карты.
          // Порядок по умолчанию: «широта, долгота».
          // Чтобы не определять координаты центра карты вручную,
          // воспользуйтесь инструментом Определение координат.
          center: res,
          
          // Уровень масштабирования. Допустимые значения:
          // от 0 (весь мир) до 19.
          zoom: 10});
        }else{
          myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [44.948239, 34.100325],
            
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 10});
        }
          if(res){
            myMap.geoObjects.add(new ymaps.Placemark(res,{
              balloonContent: String(document.getElementById('floatingTextarea1').innerHTML)
            }))
          }else{
            myMap.geoObjects.add(new ymaps.Placemark([44.948239, 34.100325],{
              balloonContent: String(document.getElementById('floatingTextarea1').innerHTML)
          }))}
          myMap.events.add('click',function(e){
              coords = e.get('coords')
            if(!myMap.balloon.isOpen()){
              myMap.balloon.open(coords,{
              contentHeader:'Назначить геометку в данной точке ?',
              contentBody:"<button class='btn btn-outline-danger' type='submit' style='margin-bottom:1em;margin-left:1em;' onclick='setCoords(coords,myMap)'>Да</button>"
              
            })
          }else{
            myMap.balloon.close()
          }
          return [coords,myMap]})
      c_ind++
      console.log(c_ind);
  }
}else{
  document.querySelector('ymaps').remove()
  document.getElementById('map').style.display = 'none'
  c_ind++
}
})
}
async function setCoords(coords){
  myMap.geoObjects.add(new ymaps.Placemark(coords,{
    balloonContent: String(document.getElementById('floatingTextarea1').innerHTML)
  }))
  myMap.balloon.close()
  formdat = new FormData()
  formdat.append('coords',coords)
  formdat.append('id',id_btn)
  const response = await fetch('set_coords',{
    method:'POST',
    headers:{
      "X-Requested-With": "XMLHttpRequest"
    },
    body:formdat
  })
}
async function getCoords(){
  formDat = new FormData()
  formDat.append('id',id_btn)
  const response = await fetch('get_coords',{
    method: "POST",
    headers:{
      "X-Requested-With": "XMLHttpRequest"
    },
    body:formDat
  })
  return response.json()
}
async function changeTitleComment(){
  const formDat = new FormData()
  const title = document.getElementById('floatingTextarea1').value
  const comment = document.getElementById('floatingTextarea2').value
  formDat.append('title',title)
  formDat.append('comment',comment)
  formDat.append('id',id_btn)
  console.log(document.getElementById('floatingTextarea1').value);
  const person = await fetch('change_title',{
    method:'POST',
    headers:{
      "X-Requested-With": "XMLHttpRequest"
    },
    body:formDat
  }).then(data=>{
    console.log(data);
    location.reload()
  })
}
var id_ph
function showPhoto(id){
  document.getElementById('photo').style.display = 'block'
  id_ph = id
  console.log(id_ph);
  getPhoto().then(
    data =>{
      console.log(data)
      document.getElementById('photo_loaded').setAttribute('src',data)
    }
  )
}
setTimeout(() =>{
btn_upl = document.getElementById('load_photo')
inp_photo = document.getElementById('inp_photo')
btn_upl.addEventListener('click',function(){
  inp_photo.click()
})
inp_photo.addEventListener('change',sendPhoto,false)
},1000)
  async function sendPhoto(){
    console.log(inp_photo.files[0].name);
    const formDat = new FormData()
    const file = inp_photo.files[0]
    if(file.name.split('.').pop() === 'png'||file.name.split('.').pop() === 'svg'||file.name.split('.').pop() === 'jpg'||file.name.split('.').pop() === 'jpeg'||file.name.split('.').pop() === 'gif'){
    formDat.append('file',file)
    formDat.append('id',id_ph)
    const response = await fetch('send_photo',{
      method:'POST',
      headers:{
        "X-Requested-With": "XMLHttpRequest"
      },
      body:formDat
    }).then(data =>{
      console.log(data);
      location.reload()
    })
  }else{
    console.log('Неверный формат файла');
  }
  }
async function getPhoto(){
  const formdat = new FormData()
  formdat.append('id',id_ph)
  const response = await fetch('get_photo',{
    method:'POST',
    headers:{
      "X-Requested-With": "XMLHttpRequest"
    },
    body:formdat
  })
  return response.json()
}






























