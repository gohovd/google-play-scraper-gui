var gplay = require('google-play-scraper');
var createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: "output.csv",
    header: [
        {id: 'timestamp', title: 'Timestamp'},
        {id: 'username', title: 'Username'},
        {id: 'rating', title: 'Rating'},
        {id: 'review', title: 'Review'},
        {id: 'likes', title: 'Likes'},
        {id: 'replydate', title: 'ReplyDate'}
    ]
});

gplay.reviews({
    appId: 'com.instagram.android',
    sort: gplay.sort.NEWEST,
    num: 10
}).then(writeCsv);

function writeCsv(data) {
    var reviews = [];

    for (var i = 0; i < data.length; i++) {
        m = {
            timestamp: data[i].date,
            username: data[i].userName,
            rating: data[i].score,
            review: data[i].text,
            likes: data[i].thumbsUp,
            replydate: data[i].replyDate

        }
        reviews.push(m);
    }

    csvWriter.writeRecords(reviews).then(() => {
        console.log(".csv file created..");
     });

    console.log("Scrape completed at " + reviews.length + " reviews scraped..");
}