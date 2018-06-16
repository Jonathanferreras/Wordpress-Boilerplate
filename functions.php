<?php 
  function get_files() {
    wp_enqueue_style( 'site_css', get_stylesheet_uri() );
    wp_enqueue_style( 'site_main_css', get_template_directory_uri() . '/css/build/bundle.css' );
    wp_enqueue_script( 'site_main_js', get_template_directory_uri() . '/js/build/bundle.js' , null , null , true );
  }

  add_action( 'wp_enqueue_scripts', 'get_files' );
  add_filter( 'show_admin_bar', '__return_false' );