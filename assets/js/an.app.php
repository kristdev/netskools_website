<?php
@$referer = $_SERVER['HTTP_REFERER'];
// Check URL
if ( $referer == 'http://localhost/netskools_website/' || $referer == 'http://localhost/netskools_website/sign-up.html' || $referer == 'http://localhost/netskools_website/index.html' || $referer == 'http://localhost/netskools_website/test.html') {
?>
    http://kristdev:Kokodi.1@kristdev.cloudant.com/netskools_souscriptions
<?php
}else{
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Error Page</title>
</head>
<body>
    <h3>Vous n'avez pas accès à cette page</h3>
</body>
</html>
<?php    
}
?>