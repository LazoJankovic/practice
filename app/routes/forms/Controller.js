export default {
    onInit() {},

    onLogin() {
        let { username, password, invalid } = this.store.get('$page');

        if (invalid) {
            this.store.set('$page.visited', true);
            return;
        }
        console.log(username);
    },
    onValidate(event) {
        event.preventDefault();
        let validationForm = this.store.get('$validationForm');
        console.log(validationForm);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(validationForm),
        })
            .then((response) => {
                console.log(response);
                response.json();
            })
            .then((json) => console.log(json));
    },
};
