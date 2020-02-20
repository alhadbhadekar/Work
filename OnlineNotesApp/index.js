//Ajax call for signup form
//Once the form is submitted
$("#signupform").submit(function(event){
    //prevent default processing
    
    event.preventDefault();
    
    //Collect user inputs
    //this refers to #signupform
    var datatopost = $(this).serializeArray();
    console.log(datatopost);
    
    //Send them to signup.php using Ajax
    $.ajax({
        url: "signup.php",
        type: "POST",
        data: datatopost,
        success: function(data){
            if(data){
                $("#signupmessage").html(data);
            }
        },
        error: function(){
            $("#signupmessage").html("<div class='alert alert-danger'>There was an error with the Ajax call. Please try again later.</div>");
        } 
    });                   
});

//Ajax call for login form
//Once the form is submitted
$("#loginform").submit(function(event){
    //prevent default processing
    
    event.preventDefault();
    
    //Collect user inputs
    //this refers to #signupform
    var datatopost = $(this).serializeArray();
    //console.log(datatopost);
    
    //Send them to signup.php using Ajax
    $.ajax({
        url: "login.php",
        type: "POST",
        data: datatopost,
        success: function(data){
            if(data == "success"){
                window.location = "mainpageloggedin.php";
            }else{
                $("#loginmessage").html(data);
            }
        },
        error: function(){
            $("#loginmessage").html("<div class='alert alert-danger'>There was an error with the Ajax call. Please try again later.</div>");
        } 
    });                   
});

//Ajax Call for the forgot password form
//Once the form is submitted
$("#forgotpasswordform").submit(function(event){ 
    //prevent default php processing
    event.preventDefault();
    //collect user inputs
    var datatopost = $(this).serializeArray();
//    console.log(datatopost);
    //send them to signup.php using AJAX
    $.ajax({
        url: "forgot-password.php",
        type: "POST",
        data: datatopost,
        success: function(data){
            
            $('#forgotpasswordmessage').html(data);
        },
        error: function(){
            $("#forgotpasswordmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            
        }
    
    });

});