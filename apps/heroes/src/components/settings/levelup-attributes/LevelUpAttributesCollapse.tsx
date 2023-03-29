import { SettingOutlined } from "@ant-design/icons"
import { yayHeroSettings } from "@src/localize"
import { useHeroStore } from "@src/store/heroStore"
import { Collapse, Table } from "antd"


function LevelUpAttributesCollapse() {
    interface DataType {
        class: string;
        attributes: {
            strength: number;
            dexterity: number;
            intelligence: number;
            vitality: number;
        }
    }

    const setIsModal2Open = useHeroStore((state) => state.setIsModal2Open)

    const { Panel } = Collapse

    const settingButton = () => (
        <SettingOutlined
            style={{ fontSize: 18 }}
            onClick={(event) => {
                event.stopPropagation()
                setIsModal2Open(true)
            }}
        />
    )

    const heroes = yayHeroSettings.levelUpAttributes

    const data: DataType[] = [
        {
            class: 'Warrior',
            attributes: heroes.Warrior
        },
        {
            class: 'Mage',
            attributes: heroes.Mage
        },
        {
            class: 'Paladin',
            attributes: heroes.Paladin
        },
        {
            class: 'Shaman',
            attributes: heroes.Shaman
        },
        {
            class: 'Rogue',
            attributes: heroes.Rogue
        }
    ]

    const columns = [
        {
            title: 'Class',
            dataIndex: 'class',
        },
        {
            title: 'Strength',
            dataIndex: ['attributes', 'strength'],
        },
        {
            title: 'Dexterity',
            dataIndex: ['attributes', 'dexterity'],
        },
        {
            title: 'Intelligence',
            dataIndex: ['attributes', 'intelligence'],
        },
        {
            title: 'Vitality',
            dataIndex: ['attributes', 'vitality'],
        },
    ];


    return <div>
        <Collapse activeKey={2} style={{ marginTop: 20 }}>
            <Panel header={'Level Up Attributes'} key={'2'} extra={settingButton()}>
                <Table
                    dataSource={data}
                    columns={columns}
                />
            </Panel>
        </Collapse>
    </div>
}
export default LevelUpAttributesCollapse