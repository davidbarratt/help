<?php

use Symfony\Bundle\FrameworkBundle\HttpCache\HttpCache;

// Symfony libraries require an AppCache in the global namespace which is not
// allowed under PSR-2.
// @codingStandardsIgnoreStart
class AppCache extends HttpCache
// @codingStandardsIgnoreEnd
{
}
