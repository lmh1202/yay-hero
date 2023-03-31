import DefaultValuesCollapse from "@src/components/settings/default-values/DefaultValuesCollapse"
import DefaultValuesModal from "@src/components/settings/default-values/DefaultValuesModal"
import LevelUpAttributesCollapse from "@src/components/settings/levelup-attributes/LevelUpAttributesCollapse"
import LevelUpAttributesModal from "@src/components/settings/levelup-attributes/LevelUpAttributesModal"
import SettingsAnchor from "@src/components/settings/SettingsAnchor"
import { Button, Col, Row } from "antd"
import { useNavigate } from "react-router-dom"

function SettingsPage() {
    const navigate = useNavigate()

    const defaultValuesComponentID = "defaultValue"

    const levelUpAttributesComponentID = "levelUp"

    return (
        <div>
            <h1>Settings</h1>
            <Row>
                <Col span={21}>
                    <Button type="primary" onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
                        Back
                    </Button>

                    <div id={defaultValuesComponentID}>
                        <DefaultValuesCollapse />
                        <DefaultValuesModal />
                    </div>

                    <div id={levelUpAttributesComponentID}>
                        <LevelUpAttributesCollapse />
                        <LevelUpAttributesModal />
                    </div>
                </Col>

                <Col span={3}>
                    <SettingsAnchor
                        defaultValuesComponentID={defaultValuesComponentID}
                        levelUpAttributesComponentID={levelUpAttributesComponentID}
                    />
                </Col>
            </Row>
        </div >
    )
}

export default SettingsPage