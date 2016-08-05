<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "penangport";
//        $rows = array();

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

        $sql = "SELECT NODEID,FDESC,FONAME FROM fmedia";
        $result = $conn->query($sql);


        $outp = "[";
        while($rs = $result->fetch_array(MYSQLI_ASSOC)){
            if ($outp != "[") {
                $outp .= ",";
            }
            $outp .= '{"NODEID":"'  .$rs["NODEID"] .'",';
            $outp .= '{"FDESC":"'  . $rs["FDESC"] . '",';
            $outp .= '{"FONAME":"'  . $rs["FONAME"] . '",';
        }
        $outp .="]";

$conn->close();
        echo($outp);



//            if ($result->num_rows > 0) {
//                // output data of each row
//                while ($row = $result->fetch_assoc()) {
//                    $rows[] =  "<br> id: " . $row["FDESC"] . "<br>";
//                }
//            } else {
//                echo "0 results";
//            }

//    print json_encode($rows);
//    return $rows;

?>
