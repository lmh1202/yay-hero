import { yayHeroSettings } from "@src/localize"
import { useHeroStore } from "@src/store/heroStore"
import { Button, Divider, Form, Input, Modal } from "antd"

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
        return inputsData.map((inputData: any) => (
            <Form.Item style={{ marginBottom: -20 }}>
                <h4>{inputData.name}</h4>
                {inputData.attributes.map((attribute: any) => (
                    <>
                        <h5 style={{ marginBottom: 5, textTransform: 'capitalize' }}>{attribute}</h5>
                        <Input key={attribute} value={inputData.data[attribute]} />
                    </>
                ))}
                <Divider></Divider>
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