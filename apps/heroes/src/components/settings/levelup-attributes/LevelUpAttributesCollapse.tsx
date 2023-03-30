import { SettingOutlined } from "@ant-design/icons"
import { yayHeroSettings } from "@src/localize"
import { useHeroStore } from "@src/store/heroStore"
import { HeroClass } from "@src/types/heroes.type";
import { Button, Collapse, Table } from "antd"
import { ColumnProps } from "antd/es/table";


function LevelUpAttributesCollapse() {
    interface HeroesAttributesType {
        id: string;
        class: string;
        attributes: {
            strength: number;
            dexterity: number;
            intelligence: number;
            vitality: number;
        }
    }

    const setIsModal2Open = useHeroStore((state) => state.setIsModal2Open)

    const setButtonID = useHeroStore((state) => state.setButtonID)

    const { Panel } = Collapse

    const settingButton = (event: any, buttonId: string) => {
        event.stopPropagation(event)
        setIsModal2Open(true)
        setButtonID(buttonId)
        // console.log(buttonId)
    }

    const heroes = yayHeroSettings.levelUpAttributes

    // console.log(heroes)

    const dataTable = () => {
        let dataLeveUpAttribute: HeroesAttributesType[] = []
        for (let key in heroes) {
            if (heroes.hasOwnProperty(key)) {
                dataLeveUpAttribute = [
                    ...dataLeveUpAttribute,
                    {
                        id: `${key}`,
                        class: key,
                        attributes: heroes[key as HeroClass]
                    }
                ]
            }
        }
        return dataLeveUpAttribute
    }

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
        {
            title: 'Actions',
            render: (record: HeroesAttributesType) => (
                <Button id={`${record.id}`} onClick={(event) => settingButton(event, record.id)}>
                    <SettingOutlined />
                </Button>
            ),
        },
    ];

    return <div>
        <Collapse activeKey={2} style={{ marginTop: 20 }}>
            <Panel header={'Level Up Attributes'} key={'2'}>
                <Table
                    pagination={false}
                    dataSource={dataTable()}
                    columns={columns}
                />
            </Panel>
        </Collapse>
    </div>
}
export default LevelUpAttributesCollapse