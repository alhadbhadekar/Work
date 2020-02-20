$(function(){
    //define variables
    var activeNote = 0;
    var editMode = false;
    
    //load notes on page load: Ajax call to loadnotes.php
    $.ajax({
        url: "loadnotes.php",
        success: function(data){
            $('#notes').html(data);
            clickonNote();
            clickonDelete();
        },
        error: function(){
            $('#alertContent').text("There was an error with the Ajax Call. Please try again later.");
            $("#alert").fadeIn();
        }
    });
    
    //add a new note: : Ajax call to createnote.php. This php file is going to return note id as data
    $('#addNote').click(function(){
        $.ajax({
            url: "createnote.php",
            success: function(data){
                if(data == 'error'){
                    $('#alertContent').text("There was an issue inserting the new note in the database!");
                    $("#alert").fadeIn();
                }else{
                    //update activeNote to the id of the new note
                    activeNote = data;
                    $('textarea').val("");
                    //show hide elements
                    showHide(["#notePad", "#allnotes"], ["#notes", "#addNote", "#edit", "#done"]);
                    $("textarea").focus();
                }
                
            },
            error: function(){
                $('#alertContent').text("There was an error with the Ajax Call. Please try again later.");
                $("#alert").fadeIn();
            }
        });   
    });
    
    //type note: : Ajax call to updatenote.php
    $("textarea").keyup(function(){
        //ajax call to update the task of id activenote
        $.ajax({
            url: "updatenote.php",
            type: "POST",
            //we need to send the current note content with its id to the php file
            data: {note: $(this).val(), id:activeNote},
            success: function (data){
                if(data == 'error'){
                    $('#alertContent').text("There was an issue updating the note in the database!");
                    $("#alert").fadeIn();
                }
            },
            error: function(){
                $('#alertContent').text("There was an error with the Ajax Call. Please try again later.");
                        $("#alert").fadeIn();
            }

        });
        
    });
    
    
    //click on all notes button
     $("#allnotes").click(function(){
        $.ajax({
            url: "loadnotes.php",
            success: function(data){
                $('#notes').html(data);
                showHide(["#addNote", "#edit", "#notes"], ["#allnotes", "#notePad"]);
                clickonNote();
                clickonDelete();
            },
            error: function(){
                $('#alertContent').text("There was an error with the Ajax Call. Please try again later.");
                $("#alert").fadeIn();
            }
        });
    });
    
    //click on done after editing: load notes again
    
    $('#done').click(function(){
        editMode=false;
        //Increase the width of notes by removing following classes added when clicked on #edit. see section right below this
        $(".noteheader").removeClass("col-xs-7 col-sm-9");
        //show hide elements
        showHide(["#edit"],[this, ".delete"]);
        $.ajax({
            url: "loadnotes.php",
            success: function(data){
                $('#notes').html(data);
                clickonNote();
                clickonDelete();
            },
            error: function(){
                $('#alertContent').text("There was an error with the Ajax Call. Please try again later.");
                $("#alert").fadeIn();
            }
        });
    });
    
    //click on edit: go to edit mode (show delete buttons, ...)
    
    $('#edit').click(function(){
        //Swich to edit mode
        editMode = true;
        //reduce the width of notes
        $(".noteheader").addClass("col-xs-7 col-sm-9");
        
        //show hide elements
        showHide(["#done", ".delete"],[this]);
    });
    
    
    //functions
        //click on a note
        function clickonNote(){
            $(".noteheader").click(function(){
                if(!editMode){
                    //update activeNode variable to id of note
                    //Note Id is stored as id in loadnotes.php
                    activeNote = $(this).attr("id");
                    
                    //fill text area
                    //look for noteheader class and in that find text class and get it's value
                    $("textarea").val($(this).find('.text').text());
                    showHide(["#notePad", "#allnotes"], ["#notes", "#addNote", "#edit", "#done"]);
                    $("textarea").focus();
                }   
            });
        }

        //click on delete
        function clickonDelete(){
            $(".delete").click(function(){
               var deleteButton = $(this); //Access div containing button
               //send ajax call to delete note
               $.ajax({
                    url: "deletenote.php",
                    type: "POST",
                    //we need to send the id of the note to be deleted. next funtion returns next div. current div is delete. Next div is noteID. See in loadnotes.php
                    data: {id:deleteButton.next().attr("id")},
                    success: function (data){
                        if(data == 'error'){
                            $('#alertContent').text("There was an issue delete the note from the database!");
                            $("#alert").fadeIn();
                        }else{
                            //remove containing div
                            //Parent div is note div See in loadnotes.php. Do find for note
                            deleteButton.parent().remove();
                        }
                    },
                    error: function(){
                        $('#alertContent').text("There was an error with the Ajax Call. Please try again later.");
                                $("#alert").fadeIn();
                    }

                }); 
                
            });
            
        }
        //show Hide function
        function showHide(array1, array2){
           for(i=0; i<array1.length; i++){
                $(array1[i]).show();   
            }
        for(i=0; i<array2.length; i++){
                $(array2[i]).hide();   
            } 
        }   
});