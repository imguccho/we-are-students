<?php
require "../config.php";
    try  {
        $connection = new PDO($dsn, $username, $password, $options);
        $sql = "UPDATE studentinformation SET Address = :Address WHERE RollNumber = :RollNumber";
    
        $RollNumber = $_POST['RollNumber'];
        $Address = $_POST['Address'];
        $statement = $connection->prepare($sql);
        $statement->bindParam(':RollNumber', $RollNumber, PDO::PARAM_STR);
        $statement->bindParam(':Address', $Address, PDO::PARAM_STR);
        $statement->execute();
    } 
    catch(PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }  
    if ($statement) {
        $response['code']='014';
        $response['message']='Address Updated';
        
    } 
    else {
        $response['code']='015';
        $response['message']='Update Failed';
    } 
    echo json_encode($response);
    exit;
?> 
