<?php
require_once 'vendor/autoload.php';

use Crwlr\Crawler\Output;
use GonzaloHirsch\Dupe\Crawler;
use Crwlr\Crawler\Steps\Html;
use Crwlr\Crawler\Steps\Loading\Http;
use Crwlr\Crawler\Stores\JsonFileStore;

// Program Options
// Reference: https://www.php.net/manual/en/function.getopt.php

$shortopts = "";
$shortopts .= "u:";

$options = getopt($shortopts);
if (!isset($options['u'])) {
    echo "Missing 'u' option.\n\nReceived:\n";
    var_dump($options);
    exit(1);
}

// Parsing URL as options.
$url = $options['u'];

if (!filter_var($url, FILTER_VALIDATE_URL)) {
    echo "Invalid " . $url . " received\n";
    var_dump($url);
    exit(1);
}

// Crawler

$store = new JsonFileStore(__DIR__ . '/results', 'dupe-gonzalohirsch-com');

$crawler = new Crawler();

// Better results with the headless browser.
$crawler->getLoader()->useHeadlessBrowser()->browser()->addOptions(['noSandbox' => true]);

$crawler->input($url)
    ->addStep(
        Http::get()
    )
    ->addStep(
        Html::schemaOrg()
            ->onlyType('Product')
    )
    ->setStore($store);

$crawler->runAndTraverse();

// Results are stored where the filepath to the store points.
// Reference: https://github.com/crwlrsoft/crawler/blob/fd6aac5133f4005eb343424ded266f6ce448b3bd/tests/Stores/JsonFileStoreTest.php
print $store->filePath() . PHP_EOL;