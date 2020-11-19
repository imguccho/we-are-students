<?php
require "../config.php";
    try  {
        $connection = new PDO($dsn, $username, $password, $options);
        $sql = "UPDATE studentinformation SET Name = :Name WHERE RollNumber = :RollNumber";
    
        $RollNumber = $_POST['RollNumber'];
        $Name = $_POST['Name'];
        $statement = $connection->prepare($sql);
        $statement->bindParam(':RollNumber', $RollNumber, PDO::PARAM_STR);
        $statement->bindParam(':Name', $Name, PDO::PARAM_STR);
        $statement->execute();
    } 
    catch(PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }  
    if ($statement) {
        $response['code']='010';
        $response['message']='Name Updated';
        
    } 
    else {
        $response['code']='011';
        $response['message']='Update Failed';
    } 
    echo json_encode($response);
    exit;
?> 
