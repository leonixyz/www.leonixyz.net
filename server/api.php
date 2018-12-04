<?php
// gets the API_KEY constant
include('.env');

// get the last IP address in the X-Forwarded-For HTTP header
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
$last_blank = strrpos($ip, ' ');
if ($last_blank) {
    $ip = substr($ip, $last_blank+1);
}
if (!$ip) {
    header('HTTP/1.1 500 Internal Server Error');
    die();
}

// build a regex to match only allowed domains
$allowed_hosts = [
    'google\.com',
    'googlebot\.com',
    'duckduckgo\.com',
    // '151\.62\.221\.97'
];
$pattern = '/\.(' . implode($allowed_hosts, ')|(') . ').?$/';

// perform a reverse DNS query to get the hostname of the IP address
$host = gethostbyaddr($ip);

// gethostbyaddr() failed 
if (!$host) {
    header('HTTP/1.1 500 Internal Server Error');
    die();
} else {
    header('Content-type: application/json');
    header('Access-Control-Allow-Origin: http://localhost:8080');
}

// if the host matched the list of allowed domains, return API key
if (preg_match($pattern, $host)) {
    die('{"API_KEY":"'.API_KEY.'"}');
} else {
    die('{"API_KEY":""}');
}
