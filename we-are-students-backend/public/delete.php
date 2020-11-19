<?php
require "../config.php";

$json = file_get_contents('php://input');

$data = json_decode($json);

    try  {
        $connection = new PDO($dsn, $username, $password, $options);
        $sql = "DELETE FROM studentinformation WHERE RollNumber = :RollNumber";
        
        $RollNumber = $data->RollNumber;
        $statement = $connection->prepare($sql);
        $statement->bindParam(':RollNumber', $RollNumber, PDO::PARAM_STR);
        $statement->execute();
    } 
    catch(PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }  
    if ($statement) {
        $response['code']='008';
        $response['message']='Delete Success';
        
    } 
    else {
        $response['code']='009';
        $response['message']='Delete Failed';
    } 
    echo json_encode($response);
    exit;
?> 
