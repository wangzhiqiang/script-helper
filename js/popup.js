function doInCurrentTab(tabCallback) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { tabCallback(tabArray[0]); }
    );
}
var activeTabId;
doInCurrentTab( function(tab){
 activeTabId = tab.id;
} );


$(function() {

     var tmpl =
        "<li class='list-group-item' >"+
        "<label  for='_FOR_ID' class='text-left'  > _NAME </label>"+
        "<input  type='radio'     id='_ID' name='radio' value='_ID_VAL'/>"+
        "</li>";

      queryAllScript(function(res){

        res.forEach(function(script){

             var rep = tmpl.replace("_FOR_ID",script.id)
                          .replace("_ID",script.id)
                          .replace("_ID_VAL",script.id)
                          .replace("_NAME",script.name) ;
            rep = $(rep);
            $(rep).data("script",script);
            $("ol#list ").append(rep);
        });
        $( "#list input" ).checkboxradio({ icon: false });
        $("#list input").last().click();
      });


      $("#run-select").click(function(){

          var p = $("#list input:checked").parent();
          var script = p.data("script");
          console.log(script);


                chrome.tabs.executeScript(activeTabId, {"code":script.content},function(){
                  console.log("jq-code");
                  // console.log(res);
                  // if(undefined!= res &&  res.length >0){
                  //     console.log(res[0])
                  // }
                });
          
      });
});
