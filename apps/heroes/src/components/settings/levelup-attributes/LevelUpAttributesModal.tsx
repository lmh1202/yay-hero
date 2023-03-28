import { yayHeroSettings } from "@src/localize"
import { useHeroStore } from "@src/store/heroStore"
import { Button, Form, Input, Modal } from "antd"

function LevelUpAttributesModal() {
    const isModalOpen = useHeroStore((state) => state.isModalOpen)

    const setIsModalOpen = useHeroStore((state) => state.setIsModalOpen)

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onFinish = (value: any) => {
        setIsModalOpen(false)
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
            attributes: ['Strength', 'Dexterity', 'Intelligence', 'Vitality'],
            data: heroes.Mage,
        },
        {
            name: 'Paladin',
            attributes: ['Strength', 'Dexterity', 'Intelligence', 'Vitality'],
            data: heroes.Paladin,
        },
        {
            name: 'Shaman',
            attributes: ['Strength', 'Dexterity', 'Intelligence', 'Vitality'],
            data: heroes.Shaman,
        },
        {
            name: 'Rogue',
            attributes: ['Strength', 'Dexterity', 'Intelligence', 'Vitality'],
            data: heroes.Rogue,
        },
    ];

    console.log(heroes)

    const renderClassInputs = (inputsData: any) => {
        return inputsData.map((inputData: any) => (
            <Form.Item>
                <h4>{inputData.name}</h4>
                {inputData.attributes.map((attribute: any) => (
                    <Input key={attribute} prefix={attribute} value={""} />
                ))}
            </Form.Item>
        ))
    }

    return <div>
        <Modal
            title="Edit"
            open={isModalOpen}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={handleCancel}
        >
            <Form
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
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