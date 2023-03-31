import { savePostSetting } from "@src/api/heroEndpoint"
import { yayHeroSettings } from "@src/localize";
import { useHeroStore } from "@src/store/heroStore";
import { Button, Form, Input, Modal } from "antd"

function DefaultValuesModal() {
    const isModal1Open = useHeroStore((state) => state.isModal1Open)

    const setIsModal1Open = useHeroStore((state) => state.setIsModal1Open)

    const DEFAULT_VALUE = {
        name: yayHeroSettings.defaultValues.name,
        level: yayHeroSettings.defaultValues.level,
    };

    const handleCancel = () => {
        setIsModal1Open(false);
    }

    const onFinish = (value: any) => {
        try {
            savePostSetting(yayHeroSettings.restUrl + 'yayhero/v1/settings/default-values', { value })
                .then((result) => {
                    console.log(result)
                })
        } catch (error) {
            console.log(error)
        }
        setIsModal1Open(false)

    }

    return <>
        <Modal
            title="Settings"
            open={isModal1Open}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={handleCancel}
        >
            <Form
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                initialValues={DEFAULT_VALUE}
                labelAlign='right'
                onFinish={onFinish}
            >
                <Form.Item
                    label={'Name'}
                    name={'name'}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={'Level'}
                    name={'level'}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 16 }} style={{ marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default DefaultValuesModal