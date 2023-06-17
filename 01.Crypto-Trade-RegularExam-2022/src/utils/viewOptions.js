exports.getViewOptions = function (payment) {
    const titles = [
        "crypto-wallet",
        "credit-card",
        "debit-card",
        "paypal"
    ];
    
    const options = titles.map((title) => ({
        title: `${title}`,
        selected: payment === title,
    }));

    return options;
}