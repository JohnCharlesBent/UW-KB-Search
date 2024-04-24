<?php

function uw_kb_search_register_blocks()
{
    $blocks = [
        [
            'name' => 'kb-search',
            'options' => [
                'render_callback' => 'uw_kb_search_cb'
            ]
        ]
    ];
    foreach ( $blocks as $block ) {
        register_block_type( 
            UW_KB_DIR . 'build/blocks/' . $block['name'],
            isset( $block['options'] ) ? $block['options'] : []
        );
    }
}