import { uid } from 'uid';

export default {
    onInit() {
        this.store.init('$page.items', [
            {
                id: uid(),
                text: 'Buy lolipop',
                completed: true,
            },
            {
                id: uid(),
                text: 'TODO App',
                completed: false,
            },
            {
                id: uid(),
                text: 'Teme i stilizovanje',
                completed: false,
            },
            {
                id: uid(),
                text: 'webpack i Babel',
                completed: false,
            },
        ]);

        this.store.init('$page.trash', []);

        ///page items is dependancy upon which we calculate the computable, there can be multiple dependencies...
        this.addComputable('$page.percentComplete', ['$page.items'], (items) => {
            let completed = 0;
            if (items.length === 0) {
                return '';
            }
            items.forEach((item) => {
                if (item.completed) completed++;
            });
            return completed / items.length;
        });

        this.addComputable('$page.sliderItem', ['$page.slider', '$page.items'], (slide, items) => {
            //console.log(items); works fine

            //console.log('aaa', slide); slide is just a number
            //let items = this.store.get('$page.items');
            //console.log(item); <-> (let item of '$page.items') prints the string LOL
            // same with '{$page.items}', `${'$page.items'}`  '{page.items}'
            if (slide === 8) {
                this.store.update('$page.items', (items) => {
                    for (let item of items) {
                        console.log(item.text);
                        if (item.text === 'I am a task from the SLIDER!') {
                            return [...items]; //I tried returning nothing or console.log() but it must return something that makes sense for store.update()
                        }
                    }
                    return [
                        ...items,
                        {
                            id: uid(),
                            text: 'I am a task from the SLIDER!',
                            completed: false,
                        },
                    ];
                });
            }
        });
    },

    onAddItem(event) {
        event.preventDefault();
        let newItemText = this.store.get('$page.newItem');

        if (!newItemText) return;

        this.store.update('$page.items', (items) => [
            ...items, //current value
            {
                id: uid(),
                text: newItemText,
                completed: false,
            },
        ]);

        this.store.set('$page.newItem', ''); ///remove text from textfield when we submit
    },

    /// getting store directly on the method
    onRemoveItem(event, { store }) {
        store.delete('$todo');
    },

    onClearCompleted() {
        let items = this.store.get('$page.items');
        let trash = items.filter((item) => item.completed);
        //console.log('clearing trash', trash); //looks normal

        this.store.update('$page.trash', (trashArr) => [...trashArr, ...trash]);
        this.store.update('$page.items', (items) => items.filter((item) => !item.completed));
    },
};
