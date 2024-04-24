<?php 
/**
 * Plugin Name: University of Wisconsin - Knowledge Base Article Search
 * Description: Adds a Gutenberg block that can search the UW KB API and return a preformatted block with an article link, description, and tags.
 * Version: 1.0.0
 * Author: John Bent
 */

 define( 'UW_KB_DIR', plugin_dir_path( __FILE__ ) );

 // Includes 
 include UW_KB_DIR . 'includes/register-blocks.php';
 include UW_KB_DIR . 'includes/blocks.php';

 // Hooks 
 add_action( 'init', 'uw_kb_search_register_blocks' );