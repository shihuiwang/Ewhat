<?php
/**�û�ע��**/
header('Content-Type:application/json');
$output = [];
@$user_id = $_REQUEST['user_id'];//�û���
@$pwd = $_REQUEST['pwd'];//����
//@$phone = $_REQUEST['phone'];
//@$addr = $_REQUEST['addr'];
//@$did = $_REQUEST['did'];
$order_time = time()*1000;   //PHP�е�time()�������ص�ǰϵͳʱ���Ӧ������ֵ

if(empty($user_id) || empty($pwd)){
    echo "[]"; //���ͻ����ύ��Ϣ���㣬�򷵻�һ�������飬
    return;    //���˳���ǰҳ���ִ��
}

$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
$sql = 'SET NAMES utf8';//���ݸ�ʽ
mysqli_query($conn, $sql);//����SQL��䣨���ݸ�ʽ��
$sql = "INSERT INTO kf_sign VALUES(NULL,'$user_id','$pwd')";//��������
$result = mysqli_query($conn, $sql);//�Ѳ������ݷ��͸����ݿ�

$arr = [];
if($result){    //INSERT���ִ�гɹ�
    $arr['msg'] = 'succ';
    $arr['id']=$user_id;
    $arr['did'] = mysqli_insert_id($conn); //��ȡ���ִ�е�һ��INSERT������ɵ���������
}else{          //INSERT���ִ��ʧ��
    $arr['msg'] = 'err';
    $arr['reason'] = "SQL���ִ��ʧ�ܣ�$sql";
}
$output[] = $arr;



echo json_encode($output);
?>