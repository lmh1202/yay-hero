import { SettingOutlined } from "@ant-design/icons"
import { postSetting } from "@src/api/heroEndpoint"
import { Button, Col, Collapse, Form, Input, Modal } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { text } from "stream/consumers"

function SettingsPage() {
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

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const onFinish = (value: any) => {
        try {
            postSetting(window.yayHeroSettings.restUrl + 'yayhero/v1/settings/default-values', { value }).then((result) => console.log(result))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Settings</h1>
            <Button type="primary" onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
                Back
            </Button>

            <Collapse>
                <Panel header={"Default Hero"} key={"1"} extra={genExtra()}>
                    <div>{"This is text"}</div>
                </Panel>
            </Collapse>

            <Modal
                title="Settings"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={'Save'}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <Form
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 20 }}
                    labelAlign='right'
                    onFinish={onFinish}
                >
                    <Form.Item
                        label={'Name'}
                        name={'name'}
                    >
                        <Input defaultValue={window.yayHeroSettings.defaultValues.name} />
                    </Form.Item>
                    <Form.Item
                        label={'Level'}
                        name={'level'}
                    >
                        <Input defaultValue={window.yayHeroSettings.defaultValues.level} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
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