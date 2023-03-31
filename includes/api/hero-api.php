<?php

define('POST_TYPE', 'yayhero');

define('DEFAULT_PAGE_SIZE', 5);


function yayhero_has_api_write_permission()
{
    return current_user_can('manage_options');
}

function yayhero_has_api_read_permission()
{
    return current_user_can('read');
}


add_action('rest_api_init', function () {
    register_rest_route('yayhero/v1', '/heroes', [
        [
            'methods' => 'GET',
            'callback' => 'yayhero_get_heroes_with_pagination',
            'permission_callback' => 'yayhero_has_api_read_permission',
            'args' => [
                'page' => [
                    'required' => true,
                    'default' => 1,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'size' => [
                    'required' => true,
                    'default' => DEFAULT_PAGE_SIZE,
                    'sanitize_callback' => 'sanitize_text_field',
                ]
            ]
        ],
        [
            'methods' => 'POST',
            'callback' => 'yayhero_post_hero',
            'permission_callback' => 'yayhero_has_api_write_permission'
        ]
    ]);

    $yayhero_hero_id_api_args = array(
        'hero_id' => array(
            'validate_callback' => function ($param, $request, $key) {
                return is_numeric($param);
            }
        ),
    );

    register_rest_route(
        'yayhero/v1',
        '/heroes/(?P<hero_id>\d+)',
        [
            [
                'methods' => 'GET',
                'callback' => 'yayhero_get_hero_by_id',
                'args' => $yayhero_hero_id_api_args,
                'permission_callback' => 'yayhero_has_api_read_permission'
            ],
            [
                'methods' => 'PATCH',
                'callback' => 'yayhero_patch_hero',
                'args' => $yayhero_hero_id_api_args,
                'permission_callback' => 'yayhero_has_api_write_permission'
            ],
            [
                'methods' => 'DELETE',
                'callback' => 'yayhero_delete_hero',
                'args' => $yayhero_hero_id_api_args,
                'permission_callback' => 'yayhero_has_api_write_permission'
            ],
            [
                'methods' => 'PUT',
                'callback' => 'yay_hero_level_up_hero',
                'args' => $yayhero_hero_id_api_args,
                'permission_callback' => 'yayhero_has_api_write_permission'
            ]
        ]
    );

    register_rest_route('yayhero/v1', '/settings/default-values', [
        [
            'methods' => 'POST',
            'callback' => 'yay_hero_update_default_values',
            'permission_callback' => 'yayhero_has_api_write_permission'
        ]
    ]);

    register_rest_route('yayhero/v1', '/settings/level-up-attributes', [
        [
            'methods' => 'POST',
            'callback' => 'yay_hero_update_level_up_attributes',
            'permission_callback' => 'yayhero_has_api_write_permission'
        ]
    ]);
});

function get_hero_from_post(WP_Post $post)
{
    $extra_fields_object = json_decode($post->post_content);
    return [
        'id' => $post->ID,
        'name' => $post->post_title,
        'modified' => $post->post_modified,
        'class' => $extra_fields_object->class,
        'level' => $extra_fields_object->level,
        'attributes' => $extra_fields_object->attributes,
    ];
}

function get_post_from_hero($payload)
{
    $payload_clone = $payload;

    unset($payload_clone['name']);
    unset($payload_clone['id']);
    unset($payload_clone['modified']);

    $post_content = json_decode(json_encode($payload_clone), FALSE);

    $post = [
        'post_title' => $payload['name'],
        'post_content' => json_encode($post_content),
        'post_type' => POST_TYPE,
        'post_status' => 'publish',
    ];

    return $post;
}

function yayhero_get_heroes($page = 1, $size)
{
    $offset = ($page - 1) * $size;

    $posts = get_posts([
        'post_type' => POST_TYPE,
        'numberposts' => $size,
        'offset' => $offset
    ]);

    if (empty($posts)) {
        $content = [];
    } else {
        $content = array_map(function ($post) {
            return get_hero_from_post($post);
        }, $posts);
    }

    $post_counts = wp_count_posts('yayhero')->publish;

    return [
        'content' => $content,
        'page' => $page,
        'size' => $size,
        'totalItems' => $post_counts,
    ];
}

function yayhero_get_heroes_with_pagination(WP_REST_Request $request)
{
    $page = $request->get_params()['page'];

    $size = $request->get_params()['size'];

    $result = yayhero_get_heroes($page, $size);

    return $result;
}

function yayhero_get_hero_by_id(WP_REST_Request $request)
{
    $hero_id = $request->get_url_params()['hero_id'];

    if ($hero_id) {

        $post = get_post($hero_id);
        return get_hero_from_post($post);
    }

    return new WP_Error('no_id', 'Please provide hero ID', ['status' => 404]);
}

function yayhero_post_hero(WP_REST_Request $request)
{
    $payload = $request->get_json_params();

    $post = get_post_from_hero($payload);

    $result = wp_insert_post($post, true);

    return $result;
}

function yayhero_patch_hero(WP_REST_Request $request)
{
    $hero_id = $request->get_url_params()['hero_id'];

    if (!$hero_id) {

        return new WP_Error('no_id', 'Please provide hero ID', ['status' => 404]);
    }

    $payload = $request->get_json_params();

    $post = get_post_from_hero($payload);

    $post['ID'] = $hero_id;

    $result = wp_update_post($post, true);

    return $result;
}

function yayhero_delete_hero(WP_REST_Request $request)
{

    $hero_id = $request->get_url_params()['hero_id'];

    if (!$hero_id) {

        return new WP_Error('no_id', 'Please provide hero ID', ['status' => 404]);
    }

    $result = wp_delete_post($hero_id);

    return $result;
}

function yay_hero_level_up_hero(WP_REST_Request $request)
{
    $hero_id = $request->get_url_params()['hero_id'];

    if ($hero_id) {

        $post = get_post($hero_id);

        $hero = get_hero_from_post($post);

        level_up($hero);

        $hero['level'] = $hero['level'] + 1;


        $post = get_post_from_hero($hero);

        $post['ID'] = $hero_id;

        $result = wp_update_post($post, true);

        return $result;
    }

    return new WP_Error('no_id', 'Hero does not exist', ['status' => 404]);
}

function level_up($hero)
{
    $hero_class = $hero['class'];

    $yay_hero_settings = yay_hero_settings();
    
    $level_up_attributes = $yay_hero_settings->get_level_up_attributes();

    switch ($hero_class) {
        case 'Warrior':
            $hero['attributes']->strength += $level_up_attributes['Warrior']['strength'];
            $hero['attributes']->vitality += $level_up_attributes['Warrior']['vitality'];
            $hero['attributes']->dexterity += $level_up_attributes['Warrior']['dexterity'];
            $hero['attributes']->intelligence += $level_up_attributes['Warrior']['intelligence'];
            break;

        case 'Paladin':
            $hero['attributes']->strength += $level_up_attributes['Paladin']['strength'];
            $hero['attributes']->vitality += $level_up_attributes['Paladin']['vitality'];
            $hero['attributes']->dexterity += $level_up_attributes['Paladin']['dexterity'];
            $hero['attributes']->intelligence += $level_up_attributes['Paladin']['intelligence'];
            break;

        case 'Mage':
            $hero['attributes']->strength += $level_up_attributes['Mage']['strength'];
            $hero['attributes']->vitality += $level_up_attributes['Mage']['vitality'];
            $hero['attributes']->dexterity += $level_up_attributes['Mage']['dexterity'];
            $hero['attributes']->intelligence += $level_up_attributes['Mage']['intelligence'];
            break;

        case 'Rogue':
            $hero['attributes']->strength += $level_up_attributes['Rogue']['strength'];
            $hero['attributes']->vitality += $level_up_attributes['Rogue']['vitality'];
            $hero['attributes']->dexterity += $level_up_attributes['Rogue']['dexterity'];
            $hero['attributes']->intelligence += $level_up_attributes['Rogue']['intelligence'];
            break;

        case 'Shaman':
            $hero['attributes']->strength += $level_up_attributes['Shaman']['strength'];
            $hero['attributes']->vitality += $level_up_attributes['Shaman']['vitality'];
            $hero['attributes']->dexterity += $level_up_attributes['Shaman']['dexterity'];
            $hero['attributes']->intelligence += $level_up_attributes['Shaman']['intelligence'];
            break;

        default:
            break;
    }
}

function yay_hero_update_default_values(WP_REST_Request $request) {
    //TODO
    // yay_hero_settings();
    $reqs = wp_unslash($request->get_params());
    $default_values = $reqs['value'];
  
    if(!$default_values){
        $response_obj = array(
            'status' => false,
            'message'=>__('Update default values fail','yayhero'),
        );
        return new \WP_REST_Response($response_obj,500);
    }

    $yay_hero_settings_obj = yay_hero_settings();
    $succeses = $yay_hero_settings_obj->set_default_values($default_values);
    
    if($succeses){
        $response_obj = array(
            'status'=>true,
            'message'=>__('Update default values success','yayhero'),
        );
        return new \WP_REST_Response($response_obj,200);
    }else{
        $response_obj = array(
            'status'=>false,
            'message'=>__('Update default values fail','yayhero'),
        );
        return new \WP_REST_Response($response_obj,500);
    }
}

function yay_hero_update_level_up_attributes(WP_REST_Request $request) {
    //TODO
    $reqs = wp_unslash($request->get_params());
    $level_up_attributes = $reqs['heroesAttributes'];

    if(!$level_up_attributes){
        $response_obj = array(
            'status'=>false,
            'message'=>__('Update level up attributes fail','yayhero'),
        );
        return $response_obj;
    }

    $yay_hero_settings_obj = yay_hero_settings();
    $old_data = $yay_hero_settings_obj->get_level_up_attributes();  
    $level_up_attributes = array_replace_recursive($old_data,$level_up_attributes);
    $success = $yay_hero_settings_obj->set_level_up_attributes($level_up_attributes);
    
    if($success){
        $response_obj = array(
            'status'=> true,
            'message'=> __('Update level up attributes success','yayhero'),
        );
        return $response_obj;
    }else{
        $response_obj = array(
            'status'=>false,
            'message'=> __('Update level up attributes fail','yayhero'),
        );
        return $response_obj;
    }
}