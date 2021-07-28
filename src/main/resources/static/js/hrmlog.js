//代码如下
// 分页的js代码
$(function(){
    goPage(1,10);
    var tempOption="";
    for(var i=1;i<=totalPage;i++) {
        tempOption+='<option value='+i+'>'+i+'</option>'
    }
    $("#jumpWhere").html(tempOption);
})
var pageSize=0;//每页显示行数
var currentPage_=1;// 当前页全局变量，用于跳转时判断是否在相同页，在就不跳，否则跳转。
var totalPage;//总页数
function goPage(pno,psize){
    var itable = document.getElementById("adminTbody");
    var num = itable.rows.length;//表格所有行数(所有记录数)

    pageSize = psize;//每页显示行数
    // 总共分几页
    if(num/pageSize > parseInt(num/pageSize)){
        totalPage=parseInt(num/pageSize)+1;
    }else{
        totalPage=parseInt(num/pageSize);
    }
    var currentPage = pno;//当前页数
    currentPage_=currentPage;
    var startRow = (currentPage - 1) * pageSize+1;
    var endRow = currentPage * pageSize;
    endRow = (endRow > num)? num : endRow;
    //遍历显示数据实现分页
    /*for(var i=1;i<(num+1);i++){ var irow = itable.rows[i-1]; if(i>=startRow && i<=endRow){ irow.style.display = ""; }else{irow.style.display = "none"; } }*/
    $("#adminTbody tr").hide();
    for(var i=startRow-1;i<endRow;i++) {
         $("#adminTbody tr").eq(i).show();
    }
    //var tempStr = "共"+num+"条记录 分"+totalPage+"页 当前第"+currentPage+"页";
    //   $("#totalpage").append("<span>"+totalPage+"</span>");
    //   $("#currentPage").append("<span>"+currentPage+"</span>");
    //  $("#countsum").append("共<span>"+num+"</span>条记录");
     document.getElementById("totalpage").innerText ="共"+totalPage+"页";
     document.getElementById("currentPage").innerText=currentPage;
     document.getElementById("countsum").innerText="共"+num+"条记录";

     if(currentPage>1){ $("#firstPage").on("click",function(){
         goPage(1,psize);
     });
         $("#prePage").on("click",function(){
             goPage(currentPage-1,psize);
         });
         }else{
             $("#firstPage").off("click");
             $("#prePage").off("click");
         }
         if(currentPage<totalPage){
             $("#nextPage").on("click",function(){
                 goPage(currentPage+1,psize);
             })
             $("#lastPage").on("click",function(){
                 goPage(totalPage,psize);
             })
         }else{
             $("#nextPage").off("click");
             $("#lastPage").off("click");
           }
             $("#jumpWhere").val(currentPage);
            }
         function jumpPage() {
            var num=parseInt($("#jumpWhere").val());
            if(num!=currentPage_) {
                goPage(num,pageSize);
            }
}