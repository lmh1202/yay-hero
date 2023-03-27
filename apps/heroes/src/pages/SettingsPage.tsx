import { Button } from "antd"
import { useNavigate } from "react-router-dom"

function SettingsPage() {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Settings</h1>
            <Button onClick={() => navigate(-1)}>
                Back
            </Button>
        </div>

    )
}

export default SettingsPage