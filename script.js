
console.log('%cWebsite by Juni', 'background: #ff7777; font-weight: bold; padding: 5px; padding-right: 10px; border-radius: 5px; border-top-right-radius: 50%; border-bottom-right-radius: 50%');

async function setup() {

    let video = document.getElementById('video');
    let source = document.getElementById('vid_source');

    await setEpisode(video, source);
    setFrame(video);
}


async function setEpisode(video, source) {

    let selectedSeries = [];
    for (let chbx of document.getElementsByClassName('series_chbx')) {
        if (chbx.checked) selectedSeries.push(chbx.value);
    }
    let seriesDict = await getEpisodeCountDict();

    let path = getRandomEpPath(selectedSeries, seriesDict);

    source.setAttribute('src', path);
    video.load();
}

async function getEpisodeCountDict() {
    return await fetch('/series_data.json').then(response => response.json())
        .then(data => { return data; })
        .catch(err => console.error("Error fetching episode data:", err));
}

function getRandomEpPath(selectedSeries, seriesDict) {

    let seriesNr = Math.floor( Math.random() * (selectedSeries.length) );

    let chosenSeries = selectedSeries[seriesNr]; // Randomly chosen series
    let seriesObj = seriesDict[chosenSeries]
    
    let chosenSeason = Math.floor( Math.random() * (Object.keys(seriesObj).length) ) + 1; // Randomly chosen season

    let chosenEp = Math.floor( Math.random() * (seriesObj[chosenSeason]) ) + 1;  // Randomly chosen episode
    
    return '/videos/'+chosenSeries+'/'+chosenSeason+'/'+chosenEp+'.mp4';
}


function setFrame(video) {

    video.onloadedmetadata = function() {
        let max = this.duration;
        let frame = Math.floor( Math.random() * max );

        this.currentTime = frame;
    };
}
