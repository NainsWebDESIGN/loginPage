<?php
#註冊
header('Content-Type: application/json; charset=UTF-8'); //設定資料類型為 json，編碼 utf-8
if ($_SERVER['REQUEST_METHOD'] == "POST") { //如果是 POST 請求
    @$username = $_POST['username'];
    @$password = $_POST['password'];
    @$email = $_POST['email'];
    $data = array();
    $DB_server = "your IP"; # 你的網域IP
    $DB_user = "your userName"; # 你的帳號
    $DB_pass = "your passWord"; # 你的密碼
    $DB_name = "your dataBase"; # 你的資料庫

    $connection = new mysqli($DB_server, $DB_user, $DB_pass, $DB_name);

    $Table = "Member"; #資料表名稱
    $sqlTable = "SELECT * FROM $Table WHERE username = '". $username ."';"; #查詢資料表
    $sqlInner = "INSERT INTO $Table (username, password, email) VALUES ('". $username ."', '". $password ."', '". $email ."')"; # 新增Table裡的資料

    if($connection -> connect_error){
        $data = array( 'failed' => $connection -> connect_error );
    }
    else{
        if($result = $connection->query($sqlTable)){
            while($row = $result->fetch_row()){
                if(count($row) !== 0){
                    $data = array('username' => $row[1], 'ret' => '名稱已使用');
                }
            }
            $result->close();
        }else{
            $data = array( 'selectFailed' => $connection->error );
        }
    }
    if(count($data) !== 0){
        echo json_encode($data);
    }else{
        if($connection->query($sqlInner) === TRUE){
            if($result = $connection->query($sqlTable)){
                while($row = $result->fetch_row()){
                    array_push($data, array('username' => $row[1], 'password' => $row[2], 'email' => $row[3]));
                    echo json_encode($data);
                }
            }
        }else{
            $data = array( 'InnerFailed' => $connection->error );
            echo json_encode($data);
        }
    }
    $connection -> close();
} else {
    //回傳 errorMsg json 資料
        $data = array( 'errorMsg' => '請求無效，只允許 POST 方式訪問！' );
    echo json_encode($data);
}
?>