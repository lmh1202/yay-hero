import { SettingOutlined } from "@ant-design/icons"
import { yayHeroSettings } from "@src/localize"
import { useHeroStore } from "@src/store/heroStore"
import { Collapse } from "antd"

function DefaultValuesCollapse() {
    const setIsModal1Open = useHeroStore((state) => state.setIsModal1Open)

    const { Panel } = Collapse

    const settingButton = () => (
        <SettingOutlined
            style={{ fontSize: 18 }}
            onClick={(event) => {
                event.stopPropagation()
                setIsModal1Open(true)
            }}
        />
    )

    return (
        <div>
            <Collapse activeKey={1} style={{ marginTop: 20 }}>
                <Panel header={"Default Hero"} key={"1"} extra={settingButton()}>
                    <div>
                        <div>
                            <span id="yay_hero_name">Name: {yayHeroSettings.defaultValues.name}</span>
                        </div>
                        <div>
                            <span id="yay_hero_level">Level: {yayHeroSettings.defaultValues.level}</span>
                        </div>
                    </div>
                    <div style={{ height: 500 }}></div>
                </Panel>
            </Collapse>
        </div>
    )
}

export default DefaultValuesCollapse