import { savePostSetting } from "@src/api/heroEndpoint"
import { useHeroStore } from "@src/store/heroStore";
import { Button, Form, Input, Modal } from "antd"

function DefaultValuesModal() {
    const isModalOpen = useHeroStore((state => state.isModalOpen))
    const setIsModalOpen = useHeroStore((state => state.setIsModalOpen))

    const DEFAULT_VALUE = {
        name: window.yayHeroSettings.defaultValues.name,
        level: window.yayHeroSettings.defaultValues.level,
    };

    //const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onFinish = (value: any) => {
        try {
            savePostSetting(window.yayHeroSettings.restUrl + 'yayhero/v1/settings/default-values', { value }).then((result) => console.log(result))
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(false)
    }

    return <>
        <Modal
            title="Settings"
            open={isModalOpen}
            okText={'Save'}
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
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default DefaultValuesModal