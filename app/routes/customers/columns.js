import { Line, Rectangle, Svg, Text } from 'cx/svg';
import { ColorMap, Legend, PieChart, PieSlice } from 'cx/charts';
import { Repeater } from 'cx/widgets';

let columns = [
    {
        header1: {
            text: 'Name',
            rowSpan: 2,
            allowSorting: true,
        },
        field: 'name',
        sortable: true,
        resizable: true,
    },
    {
        header1: {
            text: 'Image',
            rowSpan: 2,
        },
        field: 'image',
        items: (
            <cx>
                <img
                    class="h-14"
                    src-bind="$record.image"
                    tooltip={{
                        items: (
                            <cx>
                                <img class="h-128" src-bind="$record.image" />
                            </cx>
                        ),
                    }}
                />
            </cx>
        ),
    },
    {
        header: {
            text: 'Pie Chart',
            rowSpan: 2,
        },
        items: (
            <cx>
                <div>
                    <Svg style="width:200px; height:150px;">
                        <ColorMap />
                        <PieChart angle={360}>
                            <Repeater records-bind="$record.meGusta">
                                <PieSlice
                                    value-bind="$record.gusta"
                                    //active-bind="$record.active"
                                    colorMap="pie"
                                    r-expr="80"
                                    r0-expr="20"
                                    offset={2}
                                    tooltip={{
                                        text: {
                                            tpl: '{$record.name}: {$record.gusta}',
                                        },
                                        trackMouse: true,
                                        globalMouseTracking: true,
                                        destroyDelay: 50,
                                        createDelay: 0,
                                        animate: false,
                                    }}
                                    innerPointRadius={20}
                                    outerPointRadius={90}
                                    name-tpl="{$record.name}"
                                    /* selection={{
                                        type: KeySelection,
                                        bind: '$page.selection',
                                        records: { bind: 'meGusta' },
                                        record: { bind: '$record' },
                                        index: { bind: '$index' },
                                        keyField: 'id',
                                    }} */
                                >
                                    <Line style="stroke:gray" />
                                    <Rectangle anchors="1 1 1 1" offset="-10 20 10 -20" style="fill:white">
                                        <Text tpl="{$record.gusta:n;1}" dy="0.4em" ta="middle" />
                                    </Rectangle>
                                </PieSlice>
                            </Repeater>
                        </PieChart>
                    </Svg>
                </div>
            </cx>
        ),
    },
    /*  {
            header1: {
                text: 'Image',
                rowSpan: 2,
            },
            field: 'img',
            items: (
                <cx>
                    <img
                        class="h-14"
                        src-bind="$record.image"
                        tooltip={{
                            items: (
                                <cx>
                                    <img class="h-128" src-bind="$record.image" />
                                </cx>
                            ),
                        }}
                    />
                </cx>
            ),
        }, */
    {
        align: 'center',
        header1: {
            colSpan: 2,
        },
        style: 'white-space: nowrap',
        header2: 'City',
        field: 'address.city',
        sortable: true,
        align: 'center',
        //aggregate: 'count',
        caption: { tpl: '{$record.country}' },
    },
    {
        header2: 'Ulca',
        field: 'address.street',
        sortable: true,
        align: 'center',
    },

    {
        header1: {
            text: 'Telephone',
            rowSpan: 2,
        },
        field: 'phone',
    },
    /* {
            header1: {
                text: 'delete',
                rowSpan: 2,
            },

            items: (
                <cx>
                    <Button mod="hollow" icon="trash" onClick="onRemove" />
                </cx>
            ),
        }, */
];
export default columns;
