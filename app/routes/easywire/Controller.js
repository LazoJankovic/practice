const payments = [
    {
        name: 'Molly Sanders',
        value: 2000,
        status: 'Success',
        date: 'July 11 2020',
    },
    {
        name: 'Jolly Sanders',
        value: 2000,
        status: 'Success',
        date: 'July 11 2020',
    },
    {
        name: 'Nolly Sanders',
        value: 2000,
        status: 'Success',
        date: 'July 11 2020',
    },
    {
        name: 'Dolly Sanders',
        value: 2000,
        status: 'Success',
        date: 'July 11 2020',
    },
];

export default {
    onInit() {
        ///if it's alreadu there, it will not update
        this.store.init('$payments', payments);
    },
};
