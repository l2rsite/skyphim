<?php

$actual_link = "$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$all_links = explode("/", $actual_link);
$link = $all_links['2'];
echo $link;

?>
