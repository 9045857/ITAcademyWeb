var arrArticles = [
    {
        href: "/article7",
        title: "Статья 7",
        likes: 15,
        comments: [
            {
                1: 1,
                2: "2"
            },
            {
                1: 3,
                2: "3"
            }
        ]
    },
    {
        href: "/article1",
        title: "Статья 1",
        likes: 15,
        comments: [
            {
                1: 1,
                2: "2"
            },
            {
                1: 3,
                2: "3"
            },
            {
                1: 89,
                2: "9"
            }
        ]
    },
    {
        href: "/article5",
        title: "Статья 5",
        likes: 3,
        comments: [{}, {}]
    },
    {
        href: "/article3",
        title: "Статья 3",
        likes: 20,
        comments: [{}, {}]
    }
];

function compareTitle(articleA, articleB) {
    if (articleA.title < articleB.title)
        return -1;
    if (articleA.title > articleB.title)
        return 1;
    return 0;
}

arrArticles.sort(compareTitle);

console.log(arrArticles);
