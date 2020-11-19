<?php
    require "../config.php";
    $json = file_get_contents('php://input');

    $data = json_decode($json);

    if(!isset($data->Name)){
        $response['code']='003';
        $response['message']='No Name';
        echo json_encode($response);
        exit;
    }
    $Name = $data->Name;
    if(!isset($data->Class)){
        $response['code']='004';
        $response['message']='No Class';
        echo json_encode($response);
        exit;
    }
    if(!isset($data->Address)){
        $response['code']='005';
        $response['message']='No Address';
        echo json_encode($response);
        exit;
    }
    try  {
        $connection = new PDO($dsn, $username, $password, $options);
        $sql = "SELECT RollNumber FROM StudentInformation WHERE Name = :Name ";
        $statement = $connection->prepare($sql);
        $statement->bindParam(':Name', $Name, PDO::PARAM_STR);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    } 
    catch(PDOException $error) {
        echo $sql . "<br>" . $error->getMessage();
    }  
    if ($statement->rowCount() == 0) {
        try  {
            $connection = new PDO($dsn, $username, $password, $options);
            $new_user = array(
                "Name"  => $data->Name,
                "Class"     => $data->Class,
                "Address"  => $data->Address
            );
            $sql = sprintf(
                    "INSERT INTO %s (%s) values (%s)",
                    "StudentInformation",
                    implode(", ", array_keys($new_user)),
                    ":" . implode(", :", array_keys($new_user))
            );
            $statement = $connection->prepare($sql);
            $statement->execute($new_user);
        } 
        catch(PDOException $error) {
            echo $sql . "<br>" . $error->getMessage();
        }
        if ($statement) {
            $response['code']='001';
            $response['message']='Insert Success';

        } 
        else {
            $response['code']='002';
            $response['message']='Insert Failed';
        } 
    } 
    else {
        $response['code']='007';
        $response['message']='Name Already Exist';
    } 
    echo json_encode($response);
    exit;
?>

