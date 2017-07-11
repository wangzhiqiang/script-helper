function doInCurrentTab(tabCallback) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { tabCallback(tabArray[0]); }
    );
}

var activeTabId;

doInCurrentTab( function(tab){
 activeTabId = tab.id 
 // console.log(tab);
} );
$(function() {
    $("#btn-submit").click(function(){
        var text = jQuery("#run-content").val();
        // console.log(text);
        saveData("text-a",text);

        // chrome.tabs.executeScript(activeTabId, {"code":text},function(res){
        //     console.log(res);
        //     if(undefined!= res &&  res.length >0){
        //         console.log(res[0])
        //     }
        // })
    });
});


function saveData(key ,val){
    chrome.storage.sync.set({key: val}, function() {
          // Notify that we saved.
          // message('Settings saved');
          console.log(key+"-"+val+"-saved");
        });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
      });