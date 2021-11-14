import { GET } from '../../api/util/methods';

export default {
    onInit() {
        this.store.init('$page.loading', false);
        this.store.init('$page.pageSize', 10);

        this.store.init('search', {
            query: null,
        });

        this.addTrigger(
            'resetPage',
            ['$page.search.query', '$page.pageSize'],
            () => {
                this.store.set('$page.page', 1);
                this.store.set('$page.pageCount', 1);
            },
            true
        );

        this.addTrigger('load', ['$page.search.query', '$page.page', '$page.pageSize'], () => this.onLoad(), true);
    },
    async onLoad() {
        this.store.set('$page.loading', true);
        var filter = this.store.get('$page.search');
        var pageSize = this.store.get('$page.pageSize');
        var page = this.store.get('$page.page');
        var pageCount = this.store.get('$page.pageCount');
        try {
            await GET('customers', { query: { ...filter, page, pageSize } }).then((data) => {
                this.store.set('customers', data.slice(0, pageSize));
                //if we got more than what we asked that increase the pageCount
                this.store.set('$page.pageCount', Math.max(pageCount, page + (data.length == pageSize ? 1 : 0)));
            });
        } catch (exc) {
            console.error(exc);
        } finally {
            this.store.set('$page.loading', false);
        }
    },

    onRemove(e, {store}) {
      // TODO: call endpoint for deleting
      store.delete('$record')
    }
};
