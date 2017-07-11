
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&#]*)/gi,
        function(m,key,value) {
            vars[key] = value;
        }
    );
    return vars;
}

function getUrlVar(key){
    return getUrlVars()[key];
}


$(function(){

    //TODO 查寻 填充
    var id = getUrlVar("id");

    if(id != undefined ){
        queryById(id,function(res){
            $("#script-content").val(res.content);
            $("#script-name").val(res.name);
            $("form").data('script',res);
        });
    }

    $("#btn-save").click(function(){
        var data =  $("form").data('script');
        var script = new Script();
        if(undefined != data){
            script.id=data.id;
        }
        script.name=$("#script-name").val();
        script.content=$("#script-content").val();
        script.save();

        $("form").data('script',script);
    });
});
