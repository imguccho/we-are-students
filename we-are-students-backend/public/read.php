<?php
require "../config.php";
    try  {
        $connection = new PDO($dsn, $username, $password, $options);
        $sql = "SELECT RollNumber,Name,Class,Address FROM StudentInformation";
        $statement = $connection->prepare($sql);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    } 
    catch(PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }  
    if ($statement->rowCount() > 0) {
        $response['code']='006';
        $response['message']='Result Send';
        $response['payload']=$result;
    } 
    else {
        $response['code']='007';
        $response['message']='No Result';
    } 
    echo json_encode($response);
    exit;
?> 
