<?php
/**�û���½**/
header('Content-Type:application/json');

$output = [];

@$user = $_REQUEST['user'];//�û���
@$psw = $_REQUEST['psw'];//����
if(empty($user)||empty($psw)){
    echo "[]"; //���ͻ���δ�ύ�绰���룬�򷵻�һ�������飬
    return;    //���˳���ǰҳ���ִ��
}

//�������ݿ�
$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
$sql = 'SET NAMES utf8';
mysqli_query($conn, $sql);
$sql = "SELECT user_id FROM kf_sign WHERE kf_sign.pwd='$psw' AND kf_sign.user_id='$user'";
$result = mysqli_query($conn, $sql);
//���ݱ�Ų�ѯ����������ֻ��һ�м�¼
while( ($row=mysqli_fetch_assoc($result))!==NULL ){
    $output[] = $row;
}
echo json_encode($output);
?>