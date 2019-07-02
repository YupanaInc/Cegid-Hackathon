
const mockDataBankStatement = [
    {
        id: '5f82996b-b71d-4db9-a68d-e630d6bc18e2',
        date: new Date(2019, 5, 13),
        label: 'Amazon UK',
        amount: 179.00
    },
    {
        id: '7a2ec712-6ba1-46b5-96d6-2fbf8fe1a8bf',
        date: new Date(2019, 5, 15),
        label: 'Pizza Express',
        amount: 23.45
    },
    {
        id: '439fe745-1981-4fc8-b840-1dedd8ba34c7',
        date: new Date(2019, 5, 18),
        label: 'Apple - Macbook',
        amount: 2599.50
    },
    {
        id: '22f8efff-b1ac-418a-b544-ba5f00a58f0c',
        date: new Date(2019, 5, 18),
        label: 'Google Suite Subscription',
        amount: 9.00
    },
    {
        id: '1f316a89-9d88-45fa-988a-da5e17d7d8e7',
        date: new Date(2019, 6, 2),
        label: 'Ibis Budget - Rueil Malmaison',
        amount: 144.58
    }
];

exports.getBankEntries = () => {
    return mockDataBankStatement;
};
