<?php
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    @$username = $_POST['username']; //取得 nickname POST 值
    @$password = $_POST['password']; //取得 gender POST 值
    $data = array();
    if ($username && $password) { //如果 nickname 和 gender 都有填寫
        $DB_server = "your IP"; # 你的網域IP
        $DB_user = "your userName"; # 你的帳號
        $DB_pass = "your passWord"; # 你的密碼
        $DB_name = "your dataBase"; # 你的資料庫

        $connection = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);

        $Table = "Member"; #資料表名稱
        $sqlTable = "SELECT username, password FROM $Table WHERE username = '". $username ."' AND password = '". $password ."';"; #查詢資料表
        $sqlInner = "INSERT INTO NainsCreate (username, password) VALUES ('". $username ."', '". $password ."')"; # 新增Table裡的資料

        if($connection -> connect_error){
            $data = array( 'failed' => $connection -> connect_error );
        }else{
            if($connection->query($sqlInner) === TRUE){
                if($result = $connection->query($sqlTable)){
                    while($row = $result->fetch_row()){
                        array_push($data, array('username' => $row[0], 'password' => $row[1]));
                    }
                    $result->close();
                }else{
                    $data = array( 'selectFailed' => $connection->error );
                }
                if(count($data) == 0){ $data = array('ret' => false); }
                else{ $data = array('ret' => true); }
            }else{
                $data = array( 'innerFailed' => $connection->error );
            }
        }
    } else {
        //回傳 errorMsg json 資料
        $data = array( 'errorMsg' => '資料未輸入完全！' );
    }
    echo json_encode($data);
} else {
    //回傳 errorMsg json 資料
        $data = array( 'errorMsg' => '請求無效，只允許 POST 方式訪問！' );
    echo json_encode($data);
}
?>