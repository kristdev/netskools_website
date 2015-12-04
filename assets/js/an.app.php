<?php
@$referer = $_SERVER['HTTP_REFERER'];
// Check URL
if ( $referer == 'http://netskools.com/website/' || $referer == 'http://netskools.com/website/sign-up.html' || $referer == 'http://netskools.com/website/index.html' || $referer == 'http://netskools.com/website/test.html') {
?>
    https://kristdev.cloudant.com/netskools_souscriptions
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