
<?php

use Dompdf\Dompdf;
use Dompdf\Options;

$host = 'localhost';

require_once 'vendor/autoload.php';
header("Access-Control-Allow-Origin: http://". $host .":5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
header("Access-Control-Expose-Headers: Authorization");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: http://". $host .":5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['HTTP_ORIGIN'] == "http://". $host .":5173") {
    $options = new Options();
    $options->set('isRemoteEnabled', TRUE);

    $dompdf = new Dompdf($options);

    $input = file_get_contents('php://input');
    $dataTable = [
        "tittle" => "Table New",
        "fotter" => "Holaa",
        
    ];
    // $data = json_decode($input, true);
    // $dataTable = $data["dataTable"];
    // $table = $data["table"];
    // $filter = $data["filter"];
    // $keysTable = array_keys($table);
    // $keysBody = array_keys($dataTable[0]);

    /*  echo print_r($table[$keysTable[0]]);
     return */
    ob_start();
    include 'indexHtml.php';
    $html = ob_get_clean();
    /* header("Location: otra_pagina.php"); */
    $dompdf->load_html($html);
    $dompdf->setPaper("A3", "landscape");
    $dompdf->render();

    $dompdf->stream();
    // $pdfContent = $dompdf->output();

   
    // header('Content-Type: application/pdf');
    // header('Content-Disposition: inline; filename="example.pdf"');
    // header('Content-Length: ' . strlen($pdfContent));

  
    // echo $pdfContent;
// } else {
//     /* header("Location: http://". $host .":5173/notFound"); */
// }
?>