import { Anchor } from "antd"

type Props = {
    defaultValuesComponentID: string
    levelUpAttributesComponentID: string
}

function SettingsAnchor({ defaultValuesComponentID, levelUpAttributesComponentID }: Props) {
    return (
        <div id="anchor">
            <Anchor
                onClick={(e) => e.preventDefault()}
                offsetTop={50}
                items={[
                    {
                        key: defaultValuesComponentID,
                        href: `#${defaultValuesComponentID}`,
                        title: 'Default Value',
                    },
                    {
                        key: levelUpAttributesComponentID,
                        href: `#${levelUpAttributesComponentID}`,
                        title: 'Level Up Attributes',
                    },
                ]}
            />
        </div>
    )
}

export default SettingsAnchor