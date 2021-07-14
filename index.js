const fs = require('fs');
const { get } = require('http');
var Discogs = require('disconnect').Client;  //https://github.com/bartve/disconnect

if(fs.existsSync("releases.txt") == false){
  console.log("no file releases.txt at program location")
  process.exit(0)
}

const data = fs.readFileSync("releases.txt");
const lines = data.toString().split('\r\n')
const count = lines.length - 3;
if(count < 0){
  console.log("file should contain at least 4 lines - user,access token,folder,release IDs")
  process.exit(0)
} else {
  console.log(count,"releases to be added")
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
    getCollection(user,folderID)
  } else {
    console.log("folder not found:",folder)
  }
})

async function getCollection(user,folderID){
  var i = 0;
  var releases = [];
  do{   
    i+=1;
    var data = await col.getReleases(user, folderID, {page: i, per_page: 100})
    console.log(data.pagination.items,"releases in collection. Reading page",data.pagination.page,"of",data.pagination.pages)
    for (release of data.releases) {
      releases.push(release.id.toString())
    }
  } while (i < data.pagination.pages)

  for(i=0;i<count;i++){
    if(releases.indexOf(lines[i+3]) == -1){
      await loadRelease(i+1,lines[i+3],folderID)
      releases.push(lines[i+3])
    } else {
      console.log(i+1,"/",count,": release",lines[i+3],"already in collection")
    }
  }
}

async function loadRelease(line,release,folderID){

  var duration = Date.now()

    try{
      var data = await col.addRelease(user,folderID,release)
      console.log(line,"/",count,":added release",data.basic_information.id,data.basic_information.title)
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


