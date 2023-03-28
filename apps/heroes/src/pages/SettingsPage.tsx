import { SettingOutlined } from "@ant-design/icons"
import { savePostSetting } from "@src/api/heroEndpoint"
import { Button, Collapse, Form, Input, Modal } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SettingsPage() {
    const DEFAULT_VALUE = {
        name: window.yayHeroSettings.defaultValues.name,
        level: window.yayHeroSettings.defaultValues.level,
    };

    const navigate = useNavigate()

    const { Panel } = Collapse

    const genExtra = () => (
        <SettingOutlined
            style={{ fontSize: 18 }}
            onClick={(event) => {
                event.stopPropagation()
                setIsModalOpen(true)
            }}
        />
    )

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

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

    return (
        <div>
            <h1>Settings</h1>
            <Button type="primary" onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
                Back
            </Button>

            <Collapse activeKey={1}>
                <Panel header={"Default Hero"} key={"1"} extra={genExtra()}>
                    <div>
                        <div>
                            <span id="yay_hero_name">Name: {window.yayHeroSettings.defaultValues.name}</span>
                        </div>
                        <div>
                            <span id="yay_hero_level">Level: {window.yayHeroSettings.defaultValues.level}</span>
                        </div>
                    </div>
                </Panel>
            </Collapse>

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
        </div>

    )
}

export default SettingsPage