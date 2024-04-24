<?php
/**
 * KB Search Block - render callback
 */

function uw_kb_search_cb($atts)
{
    $url = esc_attr($atts['articleUrl']);
    $title = $atts['articleTitle'];
    $summary = $atts['summary'];
    $context = $atts['additionalContext'];
    $updated = esc_attr($atts['lastUpdated']);
    $created = esc_attr($atts['created']);
    $keywords = esc_attr($atts['keywords']);
    $views = esc_attr($atts['views']);

    if ( empty( $title ) ) {
        return;
    }
    ob_start();
    ?>
    <div class="selected-kb-article">
        <h3><?php echo $title; ?></h3>
        <div class="article-content">
            <p class="summary"><?php echo $summary; ?></p>
            <?php if ( !empty( $context ) ) { ?>  
            <p class="summary"><?php echo $context; ?></p>
            <?php } ?>
            <p class="dates">
                <span>
                    <strong>Date Created:</strong> <?php echo $created; ?></strong>
                </span>
                <span>
                    <strong>Date Updated:</strong> <?php echo $updated; ?>
                </span>
            </p>
            <div class="views">
                <strong>Views:</strong> <?php echo $views; ?>
            </div>
            <div class="keywords">
                <strong>Keywords:</strong> <?php echo $keywords; ?>
            </div>
            <div class="button-wrapper">
                <a href="<?php echo $url; ?>" class="article-link button button-large button-primary">View KB Article</a>
            </div>
        </div>
    </div>
    <?php
    $output = ob_get_contents();
    ob_end_clean();
    return $output;
}