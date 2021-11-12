import Controller from './Controller';
import { Repeater, Checkbox, TextField, Button, Slider } from 'cx/widgets';
import { ExpandOnHover } from '../../components/LazarExpandOnHover';

export default (
    <cx>
        <div controller={Controller} class="p-8">
            <div>
                TODO <span text-tpl="{$page.percentComplete:p;0}"></span>
            </div>

            <div class="text-gray-500 mt-4" visible-expr=" {$page.items.length} == 0">
                There are no items in your list.
            </div>

            <Repeater records:bind="$page.items" recordAlias="$todo">
                {/* Sometimes it is useful to change the default record and index aliases ($record and $index), e.g. if nesting one Repeater inside another. This can be done by setting the recordAlias and indexAlias attributes. */}
                <Checkbox value-bind="$todo.completed">
                    <span text-bind="$todo.text" class={{ 'line-through opacity-50': { bind: '$todo.completed' } }} />
                </Checkbox>
                {/* changes propagate to Repeater */}
                <Button onClick="onRemoveItem" icon="close" mod="hollow" title="Obliviate the item" class="ml-5" />
                {/*hollow reduces button size to fit text */}
                <ExpandOnHover text="blabla" icon="close" style="color: red" />
                <br />
            </Repeater>

            <form class="mt-4" onSubmit="onAddItem">
                <TextField
                    inputAttrs={{
                        autoComplete: 'off',
                    }}
                    value-bind="$page.newItem"
                />
                <Button class="ml-2" submit>
                    Add
                </Button>

                <Button onClick="onClearCompleted" class="ml-3">
                    Clear completed items
                </Button>
            </form>

            <Slider value:bind="$page.slider" step={10} wheel increment={4} />

            {/* <ul style="width: fit-content">
                <Repeater records:bind="$page.trash" recordAlias="$trash">
                    <li text-bind="$trash.text"></li>
                </Repeater>
            </ul> */}

            <div>
                TODO <span text-tpl="{$page.percentComplete:p;0}"></span>
            </div>

            <div class="text-gray-500 mt-4" visible-expr=" {$page.items.length} == 0">
                There are no items in your list.
            </div>

            <Repeater records:bind="$page.items" recordAlias="$todo">
                {/* Sometimes it is useful to change the default record and index aliases ($record and $index), e.g. if nesting one Repeater inside another. This can be done by setting the recordAlias and indexAlias attributes. */}
                <Checkbox value-bind="$todo.completed">
                    <span text-bind="$todo.text" class={{ 'line-through opacity-50': { bind: '$todo.completed' } }} />
                </Checkbox>
                {/* changes propagate to Repeater */}
                <Button onClick="onRemoveItem" icon="close" mod="hollow" title="Obliviate the item" class="ml-5" />
                {/*hollow reduces button size to fit text */}
            </Repeater>

            <form class="mt-4" onSubmit="onAddItem">
                <TextField
                    inputAttrs={{
                        autoComplete: 'off',
                    }}
                    value-bind="$page.newItem"
                />
                <Button class="ml-2" submit>
                    Add
                </Button>

                <Button onClick="onClearCompleted" class="ml-3">
                    Clear completed items
                </Button>
            </form>

            <Slider value:bind="$page.slider" step={10} wheel increment={4} />
        </div>
    </cx>
);
