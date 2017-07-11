  
$(function(){

    var tmpl =    
    "<tr >"+
        "<td  class='col-xs-2'> __NAME </td>"+
        "<td>  __CONTENT  </td>"+
        "<td class='col-xs-2'>"+ 
        "   <button type='button' class='btn btn-primary  btn-edit'>编辑</button> "+
        "   <button type='button' class='btn btn-danger btn-remove'>删除</button>  "+
        "</td>"+
    "</tr>";
    
    queryAllScript(function(res){

        res.forEach(function(script){
            var rep = tmpl.replace("__NAME",script.name)
                          .replace("__CONTENT",script.content) ;
            rep = $(rep);
            $(rep).data("script",script);
            $("table > tbody").append(rep);
        })

        $(".btn-edit").on("click",function(){
            var line = $(this).parent().parent();
            var  obj = $(line).data('script');
            window.location.href="edit.html?id="+obj.id;
        });
        $(".btn-remove").on("click",function(){

            var line = $(this).parent().parent();
            var  obj = $(line).data('script');

            $( "#dialog-confirm" ).dialog({
                resizable: false,
                height: "auto",
                width: 300,
                modal: true,
                buttons: {
                    "删除": function() {
                        $( this ).dialog( "close" );
                        delById(obj.id);
                        $(line).remove();        
                    },
                    取消: function() {
                        $( this ).dialog( "close" );
                    }
                }
            });
        });
    });
     
});