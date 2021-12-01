import Controller from './Controller';
import { Line, Rectangle, Svg, Text } from 'cx/svg';
import { ColorMap, Legend, PieChart, PieSlice } from 'cx/charts';
import { TextField, Button, Grid, Pagination, LookupField, Window, TextArea, DateField } from 'cx/widgets';
import { getSearchQueryPredicate } from 'cx/util';
import { LabelsLeftLayout, Repeater, KeySelection } from 'cx/ui';
export default () => (
    <cx>
        <div class="overflow-hidden flex flex-col text-gray-600" controller={Controller}>
            <div class="p-2 space-x-1 flex">
                <TextField
                    placeholder="Search customers..."
                    value={{
                        bind: '$page.search.query',
                        debounce: 300,
                    }}
                    icon="search"
                />

                <div class="flex-grow" />

                <Button
                    text="New customer"
                    mod="primary"
                    onClick={(e, { store }) => {
                        store.set('$page.contact.visible', true);
                    }}
                />
                <Window
                    title="Contact"
                    visible={{ bind: '$page.contact.visible', defaultValue: false }}
                    center
                    style={{ width: '500px' }}
                    modal
                    draggable
                    closeOnEscape
                >
                    <div style={{ padding: '20px' }} layout={{ type: LabelsLeftLayout, mod: 'stretch' }}>
                        <TextField
                            label="Name"
                            value-bind="$page.contact.name"
                            style={{ width: '100%' }}
                            tooltip="A Tooltip"
                        />
                        <TextField label="Email" value-bind="$page.contact.email" style={{ width: '100%' }} />
                        <TextArea
                            label="Message"
                            value-bind="$page.contact.message"
                            rows={10}
                            style={{ width: '100%' }}
                        />
                        <DateField label="Date" value-bind="$page.contact.date" />
                    </div>
                    <div putInto="footer" style={{ float: 'right' }} ws>
                        <Button mod="primary">Submit</Button>
                        <Button
                            // this will cause the Window to close
                            dismiss
                        >
                            Cancel
                        </Button>
                    </div>
                </Window>

                <Button icon-expr="{$page.loading} ? 'loading' : 'refresh'" onClick="onLoad" mod="hollow">
                    Refresh
                </Button>
            </div>
            {/* <Button
                
            >
                Open
            </Button> */}

            <div class="m-5 mt-10">
                Group by:
                <LookupField records-bind="$page.grouping" options-bind="$page.groupableFields" multiple={true} />
            </div>
            <Grid
                class="flex-grow"
                buffered
                fixedFooter //without fix footer my grouping is not shown
                //style={{ width: '100%', height: '800px' }}
                groupingParams-bind="$page.grouping" //Whenever groupingParams change, columns are recalculated using the onGetGrouping callback.
                onGetGrouping={(groupingParams) => [
                    { key: {}, showFooter: true },
                    ...(groupingParams || []).map((x) => x.id),
                ]}
                //caption // A selector used to calculate group's caption.
                //showCaption // Show group caption. Values shown in the caption should be specified in the column definition.
                //showHeader
                grouping={[
                    { showFooter: true },
                    {
                        key: {
                            name: { bind: '$record.country' },
                        },
                        showCaption: true,
                    },
                ]}
                //groupingParams
                // mod="fixed-layout"
                // filterParams-bind="search.query"
                // onCreateFilter={(query) => {
                //     let q = getSearchQueryPredicate(query);
                //     return (record) =>
                //         q(record.name) ||
                //         q(record.address.city) ||
                //         q(record.address.city) ||
                //         q(record.address.street) ||
                //         q(record.phone);
                // }}
                emptyText="No customers"
                records-bind="customers"
                columns={[
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
                                                    <Rectangle
                                                        anchors="1 1 1 1"
                                                        offset="-10 20 10 -20"
                                                        style="fill:white"
                                                    >
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
                ]}
            />
            <div class="border-t p-2 flex  ">
                <Pagination page-bind="$page.page" pageCount-bind="$page.pageCount" />
                <LookupField
                    value-bind="$page.pageSize"
                    class="ml-2 w-[180px]"
                    required
                    options={[
                        {
                            id: 5,
                            text: '5 rows per page',
                        },
                        {
                            id: 10,
                            text: '10 rows per page',
                        },
                        {
                            id: 20,
                            text: '20 rows per page',
                        },
                        {
                            id: 50,
                            text: '50 rows per page',
                        },
                    ]}
                />
            </div>
        </div>
    </cx>
);
