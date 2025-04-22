<?php

namespace GonzaloHirsch\Dupe;

use Crwlr\Crawler\Cache\FileCache;
use Crwlr\Crawler\HttpCrawler;
use Crwlr\Crawler\Loader\Http\HttpLoader;
use Crwlr\Crawler\UserAgents\BotUserAgent;
use Crwlr\Crawler\UserAgents\UserAgentInterface;
use Crwlr\Crawler\Loader\LoaderInterface;
use Psr\Log\LoggerInterface;

class Crawler extends HttpCrawler
{
    protected function userAgent(): UserAgentInterface
    {
        return BotUserAgent::make('DupeGonzaloHirsch');
    }

    protected function loader(UserAgentInterface $userAgent, LoggerInterface $logger): LoaderInterface
    {
        $loader = new HttpLoader($userAgent, logger: $logger);

        $loader
            ->setCache(new FileCache(__DIR__ . '/cachedir')->ttl(60)->useCompression())
            ->retryCachedErrorResponses();

        return $loader;
    }
}