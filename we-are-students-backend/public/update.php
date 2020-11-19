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
    if ($statement->rowCount() <= 1) {
        try  {
            $RollNumber = $data->RollNumber;
            $connection = new PDO($dsn, $username, $password, $options);
            $new_user = array(
                "Name"  => $data->Name,
                "Class"     => $data->Class,
                "Address"  => $data->Address
            );
            foreach($new_user as $field=>$value){
                $fields[] = sprintf("`%s` = '%s'", $field, $value);

            }
            $field_list = join(',', $fields);
            $sql = sprintf(
                    "UPDATE %s SET %s WHERE RollNumber = :RollNumber",
                    "StudentInformation",$field_list
            );
            $statement = $connection->prepare($sql);
            $statement->bindParam(':RollNumber', $RollNumber, PDO::PARAM_STR);
            $statement->execute();
        } 
        catch(PDOException $error) {
            echo $sql . "<br>" . $error->getMessage();
        }
        if ($statement) {
            $response['code']='016';
            $response['message']='Update Success';

        } 
        else {
            $response['code']='017';
            $response['message']='Update Failed';
        } 
    } 
    else {
        $response['code']='007';
        $response['message']='Namw Already Exist';
    } 
    echo json_encode($response);
    exit;
?>

