document.addEventListener('DOMContentLoaded', () => {
    fetchJsonData('/Hypervideo/data/data.json').then(initializePaintings);
});

async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON file:', error);
    }
}

function initializePaintings({ paintings }) {
    const video = document.getElementById('video-louvre-tour');
    const videoContainer = document.getElementById('video-container');
    const paintingCardsDisplay = document.getElementById('paintingCards');

    paintings.forEach((painting, index) => {
        const rect = createOverlayRectangle(index);
        videoContainer.appendChild(rect);

        rect.addEventListener('click', () => handleRectangleClick(painting, index, paintingCardsDisplay));
    });

    video.addEventListener('timeupdate', () => handleVideoTimeUpdate(paintings, video));
}

function createOverlayRectangle(index) {
    const rect = document.createElement('div');
    rect.classList.add('overlay-rectangle');
    rect.id = `painting-${index}`;
    return rect;
}

function handleRectangleClick(painting, index, container) {
    if (!document.getElementById(`painting-card-${index}`)) {
        const card = createPaintingCard(painting, index);
        container.appendChild(card);
    }
}

function createPaintingCard(painting, index) {
    const col = document.createElement('div');
    col.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'col-xl-3');

    const { imageUrl, name, description, artist, paintedIn, measures } = painting;
    const cardHtml = `
        <div class="card" id="painting-card-${index}">
            <img src="${imageUrl}" class="card-img-top" alt="${name}">
            <div class="card-body">
                <h5 class="card-title">Name: ${name}</h5>
                <p class="card-text">Description: ${description}</p>
                <p class="card-text">Artist: ${artist}</p>
                <p class="card-text">Date: ${paintedIn}</p>
                <p class="card-text">Measures: ${measures}</p>
            </div>
        </div>
    `;
    col.innerHTML = cardHtml;
    return col;
}

function handleVideoTimeUpdate(paintings, video) {
    const currentTime = video.currentTime;
    document.getElementById("time").innerHTML = "Time: " + currentTime.toFixed(1);
    paintings.forEach((painting, index) => {
        const rect = document.getElementById(`painting-${index}`);
        const currentCoordinate = painting.timeCoordinates.find(coordinate => coordinate.time === parseFloat(currentTime.toFixed(1)));

        if (currentCoordinate) {
            const { x, y, width, height } = currentCoordinate;
            Object.assign(rect.style, {
                display: 'block',
                left: `${x}px`,
                top: `${y}px`,
                width: `${width}px`,
                height: `${height}px`
            });
        } else {
            rect.style.display = 'none';
        }
    });
}
