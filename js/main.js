var todoList = [];
var finishTodoList = [];
updateDomTodo();
updateDomFinish();

$("#btnAdd").click(function(){
console.log("click");
        if (localStorage.getItem("todoList") === null) {
            console.log("added !");
            todoList.push($('#txttodo').val())
            localStorage.setItem("todoList", JSON.stringify(todoList));
            updateDomTodo();
        } else {
            console.log("added !");
            todoList = JSON.parse(localStorage.getItem("todoList"));
            todoList.push($('#txttodo').val());
            localStorage.setItem("todoList", JSON.stringify(todoList));
            updateDomTodo();

        }

}); 

$("#btnCheckAll").click(function(){

    $('.chkbox').prop('checked', true).trigger("change");
}); 

$('#sortable').on('change', '.chkbox', function() {
    if($(this).is(":checked")) {
        console.log("ok");
        var id = $(this).attr("data-id");
        finishTodoList.push(todoList[id]);
        console.log(finishTodoList);
        localStorage.setItem("finishTodoList", JSON.stringify(finishTodoList));
        updateDomFinish();
    }
});

$('#done-items').on('click', '.remove-item', function() {
   finishTodoList = JSON.parse(localStorage.getItem("finishTodoList"));
   id = $(this).parents("li").attr("data-id");
   finishTodoList.splice(id,id);
   todoList.splice(id,id);
   console.log(id);
   localStorage.setItem("finishTodoList", JSON.stringify(finishTodoList));
   localStorage.setItem("todoList", JSON.stringify(todoList));
   

   if (id == 0) {
    finishTodoList.splice(0,1);
    todoList.splice(0,1);
    localStorage.setItem("finishTodoList", JSON.stringify(finishTodoList));
    localStorage.setItem("todoList", JSON.stringify(todoList));
   }
   updateDomTodo();
   updateDomFinish();
});

function updateDomTodo() {
    if (localStorage.getItem("todoList") === null) {
       
    } else {
        todoList = JSON.parse(localStorage.getItem("todoList"));
        $('#sortable').html("");
        for (var index = 0; index < todoList.length; index++) {
            $('#sortable').append("<li class='ui-state-default checkBoxli'><div class='checkbox' data-id='" + index + "'><label><input  data-id='" + index + "' class='chkbox' type='checkbox' value='' />" + todoList[index] + "</label></div></li>");
            
        }

    }

   
}

function updateDomFinish() {
    

    if (localStorage.getItem("finishTodoList") === null) {
       
    } else {
        $('#done-items').html("");
        finishTodoList = JSON.parse(localStorage.getItem("finishTodoList"));
        console.log(finishTodoList);
        for (var index = 0; index < finishTodoList.length; index++) {
        $('#done-items').append("<li data-id='"+ index +"'>" + todoList[index] + "<button value='X' class='remove-item btn btn-default btn-xs pull-right'><span class='fa fa-trash'></span></button></li>");
        
        }

    }

}
