<?php
require "../config.php";
    try  {
        $connection = new PDO($dsn, $username, $password, $options);
        $sql = "UPDATE studentinformation SET Class = :Class WHERE RollNumber = :RollNumber";
    
        $RollNumber = $_POST['RollNumber'];
        $Class = $_POST['Class'];
        $statement = $connection->prepare($sql);
        $statement->bindParam(':RollNumber', $RollNumber, PDO::PARAM_STR);
        $statement->bindParam(':Class', $Class, PDO::PARAM_STR);
        $statement->execute();
    } 
    catch(PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }  
    if ($statement) {
        $response['code']='012';
        $response['message']='Class Updated';
        
    } 
    else {
        $response['code']='013';
        $response['message']='Update Failed';
    } 
    echo json_encode($response);
    exit;
?> 
