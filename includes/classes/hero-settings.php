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
        'name'=> 'Omen',
        'level'=> 1
    ];

    const DEFAULT_LEVEL_UP_ATTRIBUTES = [
        YayHeroClassEnum::WARRIOR => [
            YayHeroAttributeEnum::STRENGTH => 1,
            YayHeroAttributeEnum::DEXTERITY => 0,
            YayHeroAttributeEnum::INTELLIGENCE => 0,
            YayHeroAttributeEnum::VITALITY => 1
        ],
        // TODO
         YayHeroClassEnum::PALADIN => [
            YayHeroAttributeEnum::STRENGTH => 1,
            YayHeroAttributeEnum::DEXTERITY => 300,
            YayHeroAttributeEnum::INTELLIGENCE => 0,
            YayHeroAttributeEnum::VITALITY => 1
        ],
         YayHeroClassEnum::MAGE => [
            YayHeroAttributeEnum::STRENGTH => 1,
            YayHeroAttributeEnum::DEXTERITY => 0,
            YayHeroAttributeEnum::INTELLIGENCE => 200,
            YayHeroAttributeEnum::VITALITY => 1
        ],
         YayHeroClassEnum::ROUGE => [
            YayHeroAttributeEnum::STRENGTH => 1,
            YayHeroAttributeEnum::DEXTERITY => 0,
            YayHeroAttributeEnum::INTELLIGENCE => 0,
            YayHeroAttributeEnum::VITALITY => 1
        ],
         YayHeroClassEnum::SHAMAN => [
            YayHeroAttributeEnum::STRENGTH => 1,
            YayHeroAttributeEnum::DEXTERITY => 0,
            YayHeroAttributeEnum::INTELLIGENCE => 0,
            YayHeroAttributeEnum::VITALITY => 1
        ],
    ];
    
    public function get_default_values() {
        //TODO
        return get_option('yayHeroDefaultValues');
    }

    public function set_default_values($data) {
        //TODO
        if(!$data){
            return;
        }
        update_option('yayHeroDefaultValues', $data);
    }

    public function get_level_up_attributes() {
        //TODO
        $data = get_option('yayHeroLevelUpAttributes');
        if(empty($data)){
            return self::DEFAULT_LEVEL_UP_ATTRIBUTES;
        }
        return $data;
    }

    public function set_level_up_attributes($data) {
        //TODO
        if(!$data){
            return;
        }
        update_option('yayHeroLevelUpAttributes', $data);
    }
}

function yay_hero_settings() {
    return YayHeroSettings::get_instance();
}