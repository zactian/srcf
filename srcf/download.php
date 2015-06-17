<?php
/**
 * Created by PhpStorm.
 * User: gry260
 * Date: 6/17/15
 * Time: 11:43 AM
 */


$file = 'pdfs/'.$_GET['file'];

if (file_exists($file)) {
  header('Content-Description: File Transfer');
  header('Content-Type: application/octet-stream');
  header('Content-Disposition: attachment; filename='.basename($file));
  header('Expires: 0');
  header('Cache-Control: must-revalidate');
  header('Pragma: public');
  header('Content-Length: ' . filesize($file));
  readfile($file);
  exit;
}


?>