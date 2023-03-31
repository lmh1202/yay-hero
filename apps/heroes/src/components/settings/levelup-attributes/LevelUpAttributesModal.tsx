import { savePostSetting } from "@src/api/heroEndpoint"
import { yayHeroSettings } from "@src/localize"
import { useHeroStore } from "@src/store/heroStore"
import { HeroClass } from "@src/types/heroes.type"
import { Button, Form, Input, Modal } from "antd"

function LevelUpAttributesModal() {
    const isModal2Open = useHeroStore((state) => state.isModal2Open)

    const setIsModal2Open = useHeroStore((state) => state.setIsModal2Open)

    const buttonId = useHeroStore((state) => state.buttonID)

    const handleCancel = () => {
        setIsModal2Open(false)
    }

    const getAttributes = (value: any, buttonId: string) => {
        const attributes = {
            strength: value[`${buttonId}_strength`],
            dexterity: value[`${buttonId}_dexterity`],
            intelligence: value[`${buttonId}_intelligence`],
            vitality: value[`${buttonId}_vitality`],
        }
        return {
            [buttonId]: attributes
        }
    }

    const onFinish = (value: any, buttonId: string) => {
        const heroesAttributes = getAttributes(value, buttonId)
        try {
            savePostSetting(yayHeroSettings.restUrl + 'yayhero/v1/settings/level-up-attributes', { heroesAttributes })
                .then((result) => console.log(result))
        } catch (error) {
            console.log(error)
        }
        setIsModal2Open(false)
    }

    const heroes = yayHeroSettings.levelUpAttributes

    const initialInputsData = () => {
        let inputsData: any = []
        for (let key in heroes) {
            if (heroes.hasOwnProperty(key)) {
                inputsData = [
                    ...inputsData,
                    {
                        name: `${key}`,
                        attributes: ['strength', 'dexterity', 'intelligence', 'vitality'],
                        data: heroes[key as HeroClass],
                    }
                ]
            }
        }
        return inputsData
    }

    const inputsData = initialInputsData();

    const toUpperCaseAttributeName = (attributes: string) => {
        return attributes.charAt(0).toUpperCase() + attributes.slice(1);
    }

    const renderClassInputs = (inputsData: any, buttonID: string) => {
        const obj_array = inputsData.filter((inputData: any) => inputData.name === buttonID)
        return obj_array.map((obj: any) => {
            return (
                <div key={`${obj.name}_attribute`}>
                    <h4 key={`${obj.name}`}>{obj.name}</h4>
                    {obj.attributes.map((attribute: any) => (
                        <Form.Item
                            key={`${attribute}_form_item`}
                            name={`${buttonID}_${attribute}`}
                            style={{ marginBottom: 10 }}
                            label={toUpperCaseAttributeName(attribute)}
                            initialValue={obj.data[attribute]}
                        >
                            <Input key={`${attribute}_input`} type="number" required />
                        </Form.Item>
                    ))}
                </div>
            )
        })
    }

    return (
        <div>
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
                    {renderClassInputs(inputsData, buttonId)}
                    <Form.Item wrapperCol={{ offset: 21, span: 16 }} style={{ marginBottom: 0, marginTop: 30 }}>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default LevelUpAttributesModal