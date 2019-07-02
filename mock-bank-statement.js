
const mockDataBankStatement = [
    {
        transactionId: '6d228359-a921-425e-b858-88c2fc048c19',
        date: new Date(2019, 5, 13),
        label: 'Amazon UK',
        amount: 179.00
    },
    {
        transactionId: '7a2ec712-6ba1-46b5-96d6-2fbf8fe1a8bf',
        date: new Date(2019, 5, 15),
        label: 'Pizza Express',
        amount: 23.45
    },
    {
        transactionId: '439fe745-1981-4fc8-b840-1dedd8ba34c7',
        date: new Date(2019, 5, 18),
        label: 'Apple - Macbook',
        amount: 2599.50
    },
    {
        transactionId: '22f8efff-b1ac-418a-b544-ba5f00a58f0c',
        date: new Date(2019, 5, 18),
        label: 'Google Suite Subscription',
        amount: 55.08
    },
    {
        transactionId: 'c24758a1-6ff2-4c85-aae4-165d96dff7f7',
        date: new Date(2019, 6, 2),
        label: 'Ibis Budget - Rueil Malmaison',
        amount: 144.58
    }
];

exports.getBankEntries = () => {
    return mockDataBankStatement;
};
