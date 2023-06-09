<?php

function yayhero_enqueue_hero_app()
{
    yayhero_register_entry();

    add_action('admin_head', 'yayhero_register_preload_modules');
}

function yayhero_register_entry()
{
    add_filter(
        'script_loader_tag',
        function ($tag, $handle, $src) {
            if (strpos($handle, 'module/yayhero/') !== false) {
                $str  = "type='module'";
                $str .= YAY_HERO_IS_DEVELOPMENT ? ' crossorigin' : '';
                $tag  = '<script ' . $str . ' src="' . $src . '" id="' . $handle . '-js"></script>';
            }
            return $tag;
        },
        10,
        3
    );

    wp_register_script("module/yayhero/main.tsx", "http://localhost:3000/main.tsx", ['react', 'react-dom'], null, true); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
    wp_enqueue_script("module/yayhero/main.tsx");
    wp_localize_script("module/yayhero/main.tsx", "yayHeroData", [
        'isRtl' => is_rtl(),
        'restUrl' => esc_url_raw(rest_url()),
        'restNonce' => wp_create_nonce('wp_rest'),
        'preloadHeroes' => yayhero_get_heroes(1, 5),
        'auth' => [
            'canWrite' => current_user_can('manage_options'),
            'canRead' => current_user_can('read')
        ],
    ]);

    //TODO localize script
    // yay_hero_settings();
    $yay_hero_settings = yay_hero_settings();
    wp_localize_script("module/yayhero/main.tsx", "yayHeroSettings", [
        'restUrl' => esc_url_raw(rest_url()),
        'restNonce' => wp_create_nonce('wp_rest'),
        'defaultValues' => $yay_hero_settings->get_default_values(),
        'levelUpAttributes' => $yay_hero_settings->get_level_up_attributes(),
    ]);
}

function yayhero_register_preload_modules()
{
    echo '<script type="module">
        import RefreshRuntime from "http://localhost:3000/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
        </script>';
}
