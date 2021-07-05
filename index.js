const fs = require('fs');
var Discogs = require('disconnect').Client;  //https://github.com/bartve/disconnect

if(fs.existsSync("releases.txt") == false){
  console.log("no file releases.txt at program location")
  process.exit(0)
}

const data = fs.readFileSync("releases.txt");
const lines = data.toString().split('\r\n')
if(lines.length < 3){
  console.log("file should contain at least 4 lines - user,access token,folder,release IDs")
  process.exit(0)
}

const user = lines[0]
const token = lines[1]
const folder = lines[2]

var dis = new Discogs({userToken: token});
var col = dis.user().collection();

col.getFolders(user,async function(err,data){
  var folderID = -1;
  if(err){console.log(err);return}
  else{

    for(i=0;i<data.folders.length;i++){
      if(data.folders[i].name == folder){
        folderID = data.folders[i].id
        break;
      }
    }
  }
  if(folderID != -1){
    for(i=3;i<lines.length;i++){
      await loadRelease(i-2,lines[i],folderID)
    }
  } else {
    console.log("folder not found:",folder)
  }
})



async function loadRelease(count,release,folderID){

  var duration = Date.now()

    try{
      var data = await col.addRelease(user,folderID,release)
      console.log(count,"added release",data.basic_information.id,data.basic_information.title)
    } catch(err){console.log(err)}
    
    var time = Date.now() - duration;
    if(time < 1000){
      sleep(time)
    }
    duration = Date.now();
}
  
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


