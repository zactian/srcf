/**
 * Created by gry260 on 5/1/15.
 */

$(document).ready(function() {
$("#ccn").keyup(function() {
    if($(this).val().length == 5){
        $(".ccn_info").show();
        $(".import-container").show();
    }
    else{
        $(".ccn_info").hide();
        $(".import-container").hide();
    }
});

$( "#datepicker" ).datepicker();

$('#slide').popup({
    focusdelay: 400,
    outline: true,
    vertical: 'top'
});

    $( "#srcf_action" ).click(function() {

      //var $elem = jQuery('<div/>', { 'class': "col-md-4" });

       if(!$("#course_info").is(":visible")){
           $("#course_info").show();
       }
       else{

           var text = $("#course_info").html();
           var vv = $("#course_container:last-child");
           var ss = vv.position();
           console.log(ss);

            $("#course_container").append("<div class='col-md-4'>"+$("#course_info").html()+"</div>");
          // $("#course_container").append());
       }

    });

    $( ".delete" ).click(function() {
        $(this).parent().parent().parent().hide();
    });





$( "#department_id" ).change(function() {
    $("#course_id").show();
    $("#listCCNS").show();
});

$( "#course_id" ).change(function() {
    $("#section_id").show();
    $( "#listCCNS" ).children(":gt(1)").hide();
});


$( "#section_id" ).change(function() {
    $( "#listCCNS" ).children(":gt(0)").hide();
});

    var mcVM_options={menuId:"menu-v",alignWithMainMenu:true};
    /* www.menucool.com/vertical/vertical-menu.*/
    init_v_menu(mcVM_options);function init_v_menu(a){if(window.addEventListener)window.addEventListener("load",function(){start_v_menu(a)},false);else window.attachEvent&&window.attachEvent("onload",function(){start_v_menu(a)})}function start_v_menu(i){var e=document.getElementById(i.menuId),j=e.offsetHeight,b=e.getElementsByTagName("ul"),g=/msie|MSIE 6/.test(navigator.userAgent);if(g)for(var h=e.getElementsByTagName("li"),a=0,l=h.length;a<l;a++){h[a].onmouseover=function(){this.className="onhover"};h[a].onmouseout=function(){this.className=""}}for(var k=function(a,b){if(a.id==i.menuId)return b;else{b+=a.offsetTop;return k(a.parentNode.parentNode,b)}},a=0;a<b.length;a++){var c=b[a].parentNode;c.getElementsByTagName("a")[0].className+=" arrow";b[a].style.left=c.offsetWidth+"px";b[a].style.top=c.offsetTop+"px";if(i.alignWithMainMenu){var d=k(c.parentNode,0);if(b[a].offsetTop+b[a].offsetHeight+d>j){var f;if(b[a].offsetHeight>j)f=-d;else f=j-b[a].offsetHeight-d;b[a].style.top=f+"px"}}c.onmouseover=function(){if(g)this.className="onhover";var a=this.getElementsByTagName("ul")[0];if(a){a.style.visibility="visible";a.style.display="block"}};c.onmouseout=function(){if(g)this.className="";this.getElementsByTagName("ul")[0].style.visibility="hidden";this.getElementsByTagName("ul")[0].style.display="none"}}for(var a=b.length-1;a>-1;a--)b[a].style.display="none"}

});