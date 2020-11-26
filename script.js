$(document).ready(function() {
    'use strict';
    $('#togglePwd[type="checkbox"]').click(function() {
        if ($(this).prop("checked") == true) {
            $('#inputPassword').prop("type", "text");
        } else if ($(this).prop("checked") == false) {
            $('#inputPassword').prop("type", "password");
        }
    });

    $("#login").click(function() {
        if ($("#inputEmail").val() === 'admin' && $("#inputPassword").val() === "12345") {
            login_redirect();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Authenication Failed...',
                text: 'Invalid credentials!!!!!!!!!',
                footer: '<a href>Forget Password?</a>'
            })
        }
    });
    $("#getTodo").ready(() => {
        getTodoList();
    });
    $("#getTodo").click(function() {
        getTodoList();
    });
    $("#logout").click(function() {
        window.location.replace("index.html");
    });
    let count = 0;
    $("#todolist").on("change", ":checkbox", function() {
        var checked = this.checked;
        var promise = new Promise(function(resolve, reject) {
            (checked === true) ? count++ : count--;
            console.log(count, checked);
            if (count == 5) {
                resolve(`success`);
                count = 0
            } else {
                reject(`please select aleast five task`);
            }
        });
        promise
            .then((res) => Swal.fire({
                icon: 'success',
                title: ' Congrats....',
                text: '5 Tasks have been Successfully Completed '
            }))
            .catch((res) => console.log(res));
    });

});
login_redirect = () => window.location.replace("home.html");


var card = $('#todolist')
getTodoList = async() => {
    $.ajax({
        type: 'GET',
        url: "https://jsonplaceholder.typicode.com/todos",
        dataType: 'json',
        success: await
        function(data) {
            console.log(data);
            $.each(data, function(index, item) {
                card.append('<div class="col-sm-2"> ' + item.id + '</div> <div class="col-sm-8">' + item.title + '</div> <div class="col-sm-2">  <input type="checkbox" class="form-check-input" id="statusBox" ' + ((item.completed == true) ? 'checked disabled ' : '') + '>' + ' </div>');
            })
        }
    });
};

