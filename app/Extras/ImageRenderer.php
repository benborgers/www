<?php

// CommonMark renderer for rendering images.

namespace App\Extras;

use League\CommonMark\Node\Node;
use League\CommonMark\Renderer\ChildNodeRendererInterface;
use League\CommonMark\Renderer\NodeRendererInterface;

class ImageRenderer implements NodeRendererInterface
{
    public function render(Node $node, ChildNodeRendererInterface $childRenderer)
    {
        // Not sure why intelephense says the getUrl() method doesn't exist, but it works.
        $src = str($node->getUrl())->replace('storage', 'storage/optimized');
        $caption = $childRenderer->renderNodes($node->children()); // Alt text used as caption.

        $captionHtml = $caption ? "<figcaption>$caption</figcaption>" : '';

        $assetHtml = $src->endsWith('mp4')
            ? "<video src=\"$src\" controls style=\"margin-bottom: 0\"></video>"
            : "<img src=\"$src\" alt=\"$caption\" style=\"margin-bottom: 0\">";

        return "<figure>
            $assetHtml
            $captionHtml
        </figure>";
    }
}
