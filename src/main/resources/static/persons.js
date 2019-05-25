
$(document).ready(function () {

    $("#get").click(function () {

        clearErrors();
        var regEx = /^[1-9]\d*$/;
        if(regEx.test($("#id").val())){
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/persons/get/" + $("#id").val(),
                success: function (answer) {showPerson(answer)}
            }).fail(function(jqXHR){
                alert(JSON.parse(jqXHR.responseText).message);
            });}
    });

    $("#delete").click(function () {

        clearErrors();
        var regEx = /^[1-9]\d*$/;
        if(regEx.test($("#id").val())){
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/persons/delete/" + $("#id").val()
            }).fail(function(jqXHR){
                alert(JSON.parse(jqXHR.responseText).message);
            }).done(function () {alert("Удалено!")});
        }
    });

    $("#update").click(function () {

        clearErrors();
        if(validate(/^[1-9]\d*$/,
                /^[А-Яа-яЁё]+$/,
                /^\d{4}([.\/-])\d{2}\1\d{2}$/)){
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/persons/update",
                contentType : 'application/json; charset=UTF-8',
                dataType: 'json',
                data: JSON.stringify({
                    id: $("#id").val(),
                    lastName: $("#lastName").val(),
                    firstName: $("#firstName").val(),
                    middleName: $("#middleName").val(),
                    birthDate: $("#birthDate").val()
                }),
                success: function (answer) {showPerson(answer)}
            }).fail(function(jqXHR){
                alert(JSON.parse(jqXHR.responseText).message);
            });}
    });

    $("#add").click(function () {

        clearErrors();
        if(validate(/^[1-9]\d*$|^$/,
            /^[А-Яа-яЁё]+$/,
            /^\d{4}([.\/-])\d{2}\1\d{2}$/)){
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/persons/add",
                contentType : 'application/json; charset=UTF-8',
                dataType: 'json',
                data: JSON.stringify({
                    id: $("#id").val(),
                    lastName: $("#lastName").val(),
                    firstName: $("#firstName").val(),
                    middleName: $("#middleName").val(),
                    birthDate: $("#birthDate").val()
                }),
                success: function (answer) {showPerson(answer);}
            }).fail(function(jqXHR){
                alert(JSON.parse(jqXHR.responseText).message);
            });}
    });

    $("#get-all").click(function () {

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/persons/get-all",
            contentType : 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (answer) {updateTable(answer);}
        });
    });

    $("#to-process").click(function () {

        var data = [];
        $("input:checkbox[name=array]:checked").each(function(){
            data.push($(this).val());
        });
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/persons/array",
            contentType : 'application/json; charset=UTF-8',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (answer) {updateTable(answer);}
        });
    });

    function showPerson(person) {

        $('#table tr').not('tr[id=head]').remove();
        $('#table').append('<tr><td>' +
            '<input type="checkbox" name="array" value='+ person.id +'></td><td>' + person.id +'</td>' +
            '<td>' + person.lastName + '</td><td>' + person.firstName + '</td>' +
            '<td>' + person.middleName + '</td><td>' + person.birthDate + '</td>' +
            '<td>' + person.comment + '</td><tr>');
    }

    function updateTable(array) {

        $('#table tr').not('tr[id=head]').remove();

        for(var i=0; i < array.length; i++){
            $('#table').append('<tr><td>' +
                '<input type="checkbox" name="array" value='+ array[i].id +'></td><td>' + array[i].id +'</td>' +
                '<td>' + array[i].lastName + '</td><td>' + array[i].firstName + '</td>' +
                '<td>' + array[i].middleName + '</td><td>' + array[i].birthDate + '</td>' +
                '<td>' + array[i].comment + '</td><tr>');
        }
    }

    function validate(idRegExp, nameRegExp, dateRegExp) {

        var isValid = true;

        if(!idRegExp.test($("#id").val())){
            document.getElementById("idErr").innerHTML="ID должен быть больше 0!";
            isValid = false;
        }
        if(!nameRegExp.test($("#lastName").val())){
            document.getElementById("lastNameErr").innerHTML="Ошибка!";
            isValid = false;
        }
        if(!nameRegExp.test($("#firstName").val())){
            document.getElementById("firstNameErr").innerHTML="Ошибка!";
            isValid = false;
        }
        if(!nameRegExp.test($("#middleName").val())){
            document.getElementById("middleNameErr").innerHTML="Ошибка!";
            isValid = false;
        }
        if(!dateRegExp.test($("#birthDate").val())){
            document.getElementById("birthDateErr").innerHTML="Выберите дату!";
            isValid = false;
        }
        return isValid;
    }
    
    function clearErrors() {
        document.getElementById("idErr").innerHTML="";
        document.getElementById("lastNameErr").innerHTML="";
        document.getElementById("firstNameErr").innerHTML="";
        document.getElementById("middleNameErr").innerHTML="";
        document.getElementById("birthDateErr").innerHTML="";
    }
});