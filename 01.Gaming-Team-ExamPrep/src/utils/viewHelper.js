exports.getOptions = function (platform){
    const titles = [
        "----",
        "PC",
       "Nintendo",
        "PS4",
        "PS5",
        "XBOX",
    ];

    const options = titles.map((title) => ({
        title: `${title}`,
        selected: platform === title,
    }));

    return options;


}