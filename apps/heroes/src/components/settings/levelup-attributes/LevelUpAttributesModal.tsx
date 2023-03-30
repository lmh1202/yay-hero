import { savePostSetting } from "@src/api/heroEndpoint"
import { yayHeroSettings } from "@src/localize"
import { useHeroStore } from "@src/store/heroStore"
import { Button, Form, Input, Modal } from "antd"

function LevelUpAttributesModal() {
    const isModal2Open = useHeroStore((state) => state.isModal2Open)

    const setIsModal2Open = useHeroStore((state) => state.setIsModal2Open)

    const buttonId = useHeroStore((state) => state.buttonID)

    const handleCancel = () => {
        setIsModal2Open(false)
    }

    const onFinish = (value: any, buttonId: string) => {
        switch (buttonId) {
            case 'Warrior':
                value = {
                    strength: value.Warrior_strength,
                    dexterity: value.Warrior_dexterity,
                    intelligence: value.Warrior_intelligence,
                    vitality: value.Warrior_vitality,
                }
                break
            case 'Paladin':
                value = {
                    strength: value.Paladin_strength,
                    dexterity: value.Paladin_dexterity,
                    intelligence: value.Paladin_intelligence,
                    vitality: value.Paladin_vitality,
                }
                break
            case 'Mage':
                value = {
                    strength: value.Mage_strength,
                    dexterity: value.Mage_dexterity,
                    intelligence: value.Mage_intelligence,
                    vitality: value.Mage_vitality,
                }
                break
            case 'Shaman':
                value = {
                    strength: value.Shaman_strength,
                    dexterity: value.Shaman_dexterity,
                    intelligence: value.Shaman_intelligence,
                    vitality: value.Shaman_vitality,
                }
                break
            case 'Rogue':
                value = {
                    strength: value.Rogue_strength,
                    dexterity: value.Rogue_dexterity,
                    intelligence: value.Rogue_intelligence,
                    vitality: value.Rogue_vitality,
                }
                break
        }

        const heroesAttributes = {
            [buttonId]: {
                strength: value.strength,
                dexterity: value.dexterity,
                intelligence: value.intelligence,
                vitality: value.vitality,
            },
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

    const renderClassInputs = (inputsData: any, buttonID: string) => {
        const obj_array = inputsData.filter((inputData: any) => inputData.name === buttonID)
        return obj_array.map((obj: any) => {
            return <>
                <h4>{obj.name}</h4>
                {obj.attributes.map((attribute: any) => (
                    <>
                        <Form.Item
                            style={{ marginBottom: 10 }}
                            name={`${buttonID}_${attribute}`}
                            label={attribute}
                            initialValue={obj.data[attribute]}
                        >
                            <Input type="number" required />
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
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 25 }}
                labelAlign='right'
                onFinish={(value) => onFinish(value, buttonId)}
            >
                {renderClassInputs(initialInputsData, buttonId)}
                <Form.Item wrapperCol={{ offset: 21, span: 16 }} style={{ marginBottom: 0, marginTop: 30 }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}

export default LevelUpAttributesModal