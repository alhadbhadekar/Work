<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="styling.css">
    <link href="https://fonts.googleapis.com/css?family=Arvo&display=swap" rel="stylesheet">

    <title>Hello, world!</title>
  </head>
  <body>
    
    <div class="jumbotron">
        <div class="container-fluid">
            
            <h1>Distance between cities App.</h1>
            
            <p>Our App will help you calculate travelling distances.</p>
            
            <form class="form-horizontal">
                  <div class="form-group">
                      <label for="from" class="col-xs-2 control-label">From:</label>
                      <div class="col-xs-10">
                          <input type="text" id="from" placeholder="Origin" class="form-control">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="to" class="col-xs-2 control-label">To:</label>
                      <div class="col-xs-10">
                          <input type="text" id="to" placeholder="Destination" class="form-control">
                      </div>
                  </div>
            </form>
            
            <div class="col-xs-offset-2 col-xs-10">
                <button class="btn btn-info" onclick="calcRoute();">Submit</button>
            </div>
            <div class="container-fluid">
                <div id="googleMap">
                
                </div>
            </div>
            <div id="output">
            
            </div>
            
            
        </div>
      
    </div>  

      
      
      
      
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBBvYLslYwXc1OKu0iOI8ElbtCtXAWS6VE&libraries=places"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="javascript.js"></script>
  </body>
</html>