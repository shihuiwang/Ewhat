<?php
header('Content-type:application/json');
@$id=$_REQUEST['id'];
if(empty($id)){
echo '[]';
return;
}
$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
$sql='set names utf8';
mysqli_query($conn,$sql);
$sql='select * from kf_dish where did='.$id;
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if(empty($row))
    echo '[]';
else
{
    $output[] = $row;
    echo json_encode($output);
}
?>