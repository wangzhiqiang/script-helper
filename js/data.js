// 生成uuid
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// 定义对象
var Script = class Script{
    constructor(id,name,content){
        this.id=id;
        this.name=name;
        this.content=content;
        if(this.id == "" || this.id == undefined ){
            this.id = guid();
        }
    }
    save(){
        console.log("save:"+  JSON.stringify( this) );
        saveScript(this);
    }
}

var DBOpenRequest = window.indexedDB.open("js-helper", 2);
var DB_IS_READY = false;

DBOpenRequest.onerror = function(event) {
   console.log("OpenDB onerror");
};

DBOpenRequest.onsuccess = function(event) {
    console.log("OpenDB onsuccess");
    DB_IS_READY = true;
};
 
DBOpenRequest.onupgradeneeded = function(event) {
    //建表
    var objectStore = this.result.createObjectStore("script", { keyPath: "id" ,unique: true});
    objectStore.createIndex("content", "content", { unique: false });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("id", "id", { unique: true });
};


function saveScript(script){

    if(!DB_IS_READY){
        setTimeout(function(){
           saveScript(script)
        },100);
        return;
    }

    var transaction = DBOpenRequest.result.transaction(["script"],"readwrite");
    var objectStore = transaction.objectStore("script");
    var request = objectStore.put( script);

    request.onsuccess = function (evt) {
        console.log("request.onsuccess");        
    };
    request.onerror=function(evt){
        console.log("request.onerror");
    };
}

function queryAllScript(fun){
   
    if(!DB_IS_READY){
        setTimeout(function(){
            queryAllScript(fun)
        },100);
        return;
    }

    var transaction = DBOpenRequest.result.transaction(["script"],"readwrite");
    var objectStore = transaction.objectStore("script");
    var request = objectStore.openCursor();

    var res = new Array()

    request.onsuccess = function(evt) {  
        var cursor = evt.target.result;  
        if (cursor) {  
            res.push(cursor.value);
            cursor.continue();  
        }else {  
            fun(res);
        }  
    };
}


function queryById(id,call){

    if(!DB_IS_READY){
        setTimeout(function(){
            queryById(id,call);
        },100);
        return;
    }

    var transaction = DBOpenRequest.result.transaction(["script"],"readwrite");
    var objectStore = transaction.objectStore("script");
    objectStore = objectStore.index("id");

    var request = objectStore.openCursor(IDBKeyRange.only(id));

    request.onerror = function(evt){
        call(null);
    }
    request.onsuccess = function(evt) {  
        var cursor = evt.target.result;  
        if (cursor) {  
            call(cursor.value);
        } 
    };
    
}

function delById(id){

    if(!DB_IS_READY){
        setTimeout(function(){
            delById(id);
        },100);
        return;
    }

    var transaction = DBOpenRequest.result.transaction(["script"],"readwrite");
    var objectStore = transaction.objectStore("script");
    objectStore = objectStore.index("id");
    var request = objectStore.openCursor(IDBKeyRange.only(id));
  
    request.onsuccess = function(evt) {  
        var cursor = evt.target.result;  
        if (cursor) {
            cursor.delete();
        } 
    };
    
}


