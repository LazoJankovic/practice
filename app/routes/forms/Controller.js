export default {
    onInit() {},

    onLogin() {
        let { username, password, invalid } = this.store.get('$page');

        if (invalid) {
            this.store.set('$page.visited', true);
            return;
        }

        alert(username);
    },
};
