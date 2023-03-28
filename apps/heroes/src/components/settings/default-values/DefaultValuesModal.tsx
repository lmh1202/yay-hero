import { savePostSetting } from "@src/api/heroEndpoint"
import { yayHeroSettings } from "@src/localize";
import { useHeroStore } from "@src/store/heroStore";
import { Button, Form, Input, Modal } from "antd"

function DefaultValuesModal() {
    const isModalOpen = useHeroStore((state => state.isModalOpen))

    const setIsModalOpen = useHeroStore((state => state.setIsModalOpen))

    const DEFAULT_VALUE = {
        name: yayHeroSettings.defaultValues.name,
        level: yayHeroSettings.defaultValues.level,
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onFinish = (value: any) => {
        try {
            savePostSetting(yayHeroSettings.restUrl + 'yayhero/v1/settings/default-values', { value })
                .then((result) => console.log(result))
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(false)
    }

    return <>
        <Modal
            style={{ top: 20 }}
            title="Settings"
            open={isModalOpen}
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