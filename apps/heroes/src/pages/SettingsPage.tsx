import DefaultValuesCollapse from "@src/components/settings/default-values/DefaultValuesCollapse"
import DefaultValuesModal from "@src/components/settings/default-values/DefaultValuesModal"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"

function SettingsPage() {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Settings</h1>
            <Button type="primary" onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
                Back
            </Button>
            <DefaultValuesCollapse />
            <DefaultValuesModal />
        </div>
    )
}

export default SettingsPage