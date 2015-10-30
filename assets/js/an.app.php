<?php
@$referer = $_SERVER['HTTP_REFERER'];
// Check URL
if ( $referer == 'http://netskools.com/website/netskools_website/' || $referer == 'http://netskools.com/website/netskools_website/sign-up.html' || $referer == 'http://netskools.com/website/netskools_website/index.html' || $referer == 'http://netskools.com/website/netskools_website/test.html') {
?>
    http://kristdev:Kokodi.1@kristdev.iriscouch.com/netskools_souscriptions
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