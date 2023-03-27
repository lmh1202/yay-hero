<?php

class YayHeroSettings {

    private static $instance;

    protected function __construct() { }

    public static function get_instance( ...$args ) {
        $class = get_called_class();
        if ( ! self::$instance ) {
            self::$instance = new $class( ...$args );
        }

        return self::$instance;
    }

    const DEFAULT_VALUES = [
        //TODO
    ];

    const DEFAULT_LEVEL_UP_ATTRIBUTES = [
        YayHeroClassEnum::WARRIOR => [
            YayHeroAttributeEnum::STRENGTH => 1,
            YayHeroAttributeEnum::DEXTERITY => 0,
            YayHeroAttributeEnum::INTELLIGENCE => 0,
            YayHeroAttributeEnum::VITALITY => 1
        ],
        //TODO
    ];
    
    public function get_default_values() {
        //TODO
        return self::DEFAULT_VALUES;
    }

    public function set_default_values() {
        //TODO
    }

    public function get_level_up_attributes() {
        //TODO
        return self::DEFAULT_LEVEL_UP_ATTRIBUTES;
    }

    public function set_level_up_attributes() {
        //TODO
    }
}

function yay_hero_settings() {
    return YayHeroSettings::get_instance();
}