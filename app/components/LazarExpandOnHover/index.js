import { createFunctionalComponent } from 'cx/ui';
import { Icon } from 'cx/widgets';

export const ExpandOnHover = createFunctionalComponent(({ text, icon, ...props }) => {
    return (
        <cx>
            <div class="flex flex-row gap-1 items-center expandonhover" {...props}>
                <p text="Ogi" />
                <Icon name={icon} class="expandonhover_icon" />
                <p class="expandonhover_text" text={text} />
            </div>
        </cx>
    );
});
