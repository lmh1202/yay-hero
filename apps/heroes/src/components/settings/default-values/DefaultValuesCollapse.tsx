import { SettingOutlined } from "@ant-design/icons"
import { useHeroStore } from "@src/store/heroStore"
import { Collapse } from "antd"

function DefaultValuesCollapse() {
    const setIsModalOpen = useHeroStore((state) => state.setIsModalOpen)

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

    return <>
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
    </>
}

export default DefaultValuesCollapse