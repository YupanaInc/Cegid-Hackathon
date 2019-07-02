
const mockDataBankStatement = [
    {
        date: new Date(2019, 5, 13),
        label: 'Amazon UK',
        amount: 179.00
    },
    {
        date: new Date(2019, 5, 15),
        label: 'Pizza Express',
        amount: 23.45
    },
    {
        date: new Date(2019, 5, 18),
        label: 'Apple - Macbook',
        amount: 2599.50
    },
    {
        date: new Date(2019, 5, 18),
        label: 'Google Suite Subscription',
        amount: 9.00
    },
    {
        date: new Date(2019, 6, 2),
        label: 'Ibis Budget - Rueil Malmaison',
        amount: 144.58
    }
];

exports.getBankEntries = () => {
    return mockDataBankStatement;
};
