import { SettingOutlined } from "@ant-design/icons"
import { Button, Col, Collapse, Form, Input, Modal } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={'Save'}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Form>
                    <Form.Item>
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}

export default SettingsPage