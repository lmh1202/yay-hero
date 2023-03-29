import { savePostSetting } from "@src/api/heroEndpoint"
import { yayHeroSettings } from "@src/localize"
import { useHeroStore } from "@src/store/heroStore"
import { Button, Divider, Form, Input, Modal } from "antd"
import { useState } from "react"

function LevelUpAttributesModal() {
    const isModal2Open = useHeroStore((state) => state.isModal2Open)

    const setIsModal2Open = useHeroStore((state) => state.setIsModal2Open)

    const [defaulvalue, setDefaultValue] = useState({})

    const handleCancel = () => {
        setIsModal2Open(false)
    }

    const onFinish = (value: any) => {
        const heroesAttributes = {
            'Warrior': {
                strength: value.Warrior_strength,
                vitality: value.Warrior_vitality,
                dexterity: value.Warrior_dexterity,
                intelligence: value.Warrior_intelligence,
            },
            'Mage': {
                strength: value.Mage_strength,
                vitality: value.Mage_vitality,
                dexterity: value.Mage_dexterity,
                intelligence: value.Mage_intelligence,
            },
            'Paladin': {
                strength: value.Paladin_strength,
                vitality: value.Paladin_vitality,
                dexterity: value.Paladin_dexterity,
                intelligence: value.Paladin_intelligence,
            },
            'Shaman': {
                strength: value.Shaman_strength,
                vitality: value.Shaman_vitality,
                dexterity: value.Shaman_dexterity,
                intelligence: value.Shaman_intelligence,
            },
            'Rogue': {
                strength: value.Rogue_strength,
                vitality: value.Rogue_vitality,
                dexterity: value.Rogue_dexterity,
                intelligence: value.Rogue_intelligence,
            }
        }
        try {
            savePostSetting(yayHeroSettings.restUrl + 'yayhero/v1/settings/level-up-attributes', { heroesAttributes })
                .then((result) => console.log(result))
        } catch (error) {
            console.log(error)
        }
        setIsModal2Open(false)
    }

    const heroes = yayHeroSettings.levelUpAttributes
    console.log(heroes.Warrior)

    const initialInputsData = [
        {
            name: 'Warrior',
            attributes: ['strength', 'dexterity', 'intelligence', 'vitality'],
            data: heroes.Warrior,
        },
        {
            name: 'Mage',
            attributes: ['strength', 'dexterity', 'intelligence', 'vitality'],
            data: heroes.Mage,
        },
        {
            name: 'Paladin',
            attributes: ['strength', 'dexterity', 'intelligence', 'vitality'],
            data: heroes.Paladin,
        },
        {
            name: 'Shaman',
            attributes: ['strength', 'dexterity', 'intelligence', 'vitality'],
            data: heroes.Shaman,
        },
        {
            name: 'Rogue',
            attributes: ['strength', 'dexterity', 'intelligence', 'vitality'],
            data: heroes.Rogue,
        },
    ];

    const renderClassInputs = (inputsData: any) => {
        return inputsData.map((inputData: any, index: number) => {
            return <>
                <h4>{inputData.name}</h4>
                {inputData.attributes.map((attribute: any) => (
                    <>
                        <Form.Item style={{ marginBottom: 10 }} name={`${inputData.name}_${attribute}`} label={attribute}>
                            <Input value={inputData.data.dexterity} type={'number'} required />
                        </Form.Item>
                    </>
                ))}
            </>
        })
    }

    return <div>
        <Modal
            title="Edit"
            open={isModal2Open}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={handleCancel}
        >
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 25 }}
                labelAlign='right'
                onFinish={onFinish}

            >
                {renderClassInputs(initialInputsData)}
                <Form.Item wrapperCol={{ offset: 10, span: 16 }} style={{ marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}

export default LevelUpAttributesModal